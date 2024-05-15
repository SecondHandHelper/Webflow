import QRCode from "qrcode";

const WS_SERVER = 'wss://lwl-to-mai-heypmjzjfq-ey.a.run.app';
const params = getParamsObject();

if (params.createDrafts === 'true') {
  if (localStorage.getItem('lwlItemDrafts') && (document.referrer.includes('sign-in') || document.referrer.includes('private'))) {
    document.getElementsByClassName('div-block-230')[0].style.display = 'none';
    document.getElementById('header').style.display = 'none'
    document.getElementById('formDiv').style.display = 'none';
    document.getElementById('threadInputDiv').style.display = 'none';
    document.getElementById('lwlItemsDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    const draftItems = JSON.parse(localStorage.getItem('lwlItemDrafts'));
    authUser.whenSet(async () => {
        await Promise.all(draftItems.map(item =>
          firebase.app().functions("europe-west1").httpsCallable('createItem')({id: item.id, item})
        ));
        localStorage.removeItem('lwlItemDrafts');
        location.href = '/private#wardrobe';
    });
  }
}

let scrapingStarted = false;

const showParseError = (error) => {
  const message = error || 'Något gick fel, kontrollera att du skrivit in en giltig LWL tråd och försök igen.';
  document.getElementById('errorMessage').innerHTML = message;
  document.getElementsByClassName('w-form-fail')[0].style.display = 'block';
  document.getElementById('lwlThreadUrl').style.display = 'block';
  document.getElementById('buttonsDiv').style.display = 'block';
  document.getElementById('doneButton').style.display = 'flex';
  document.getElementById('doneButton').innerText = 'Starta om';
  document.getElementById('introHeading').style.display = 'block';
  document.getElementById('scrapeProgressDiv').style.display = 'none';
  scrapingStarted = false;
}

document.getElementById('doneButton').addEventListener('click', () => {
  if (scrapingStarted) {
    return;
  }
  document.getElementsByClassName('w-form-fail')[0].style.display = 'none';
  const lwlThreadUrl = document.getElementById('lwlThreadUrl');
  if (!lwlThreadUrl.value.length) {
    console.log('No url thread given');
    return;
  }
  if (!lwlThreadUrl.value.match(/^https:\/\/www.facebook.com\/groups\/982264948455365\/permalink\/\d+/)
    && !lwlThreadUrl.value.match(/^https:\/\/www.facebook.com\/share\/p\/\w+/)) {
    showParseError('Ogilitg LWL url angiven.');
    return;
  }
  scrapingStarted = true;
  document.getElementById('lwlThreadUrl').style.display = 'none';
  document.getElementById('buttonsDiv').style.display = 'none';
  document.getElementById('doneButton').style.display = 'none';
  document.getElementById('introHeading').style.display = 'none';
  document.getElementById('openIntroDiv').style.display = 'none';

  document.getElementById('scrapeProgressDiv').style.display = 'flex';
  document.getElementById('scrapeProgress').innerText = 'Startar...'
  const webSocket = new WebSocket(WS_SERVER);
  webSocket.addEventListener('open', () => {
    console.log('connected to lwl thread scraping server');
    webSocket.send(JSON.stringify({ url: lwlThreadUrl.value }));
  });
  webSocket.addEventListener('error', (event) => {
    showParseError();
    webSocket.close();
  });
  webSocket.addEventListener('message', async (event) => {
    console.log('received message from server', event.data);
    let message = event.data;
    try {
      message = JSON.parse(event.data);
    } catch (e) {
      message = { status: 'Startar...' };
    }
    if (message.status === 'Error') {
      showParseError(message.data?.threadIsValid ? 'Något gick fel, försök gärna igen.' : null);
      webSocket.close();
      return;
    }
    if (message.status === 'Item' && message.data) {
      addLwLItemPreview(message.data);
    }
    document.getElementById('scrapeProgress').innerText = message.status;
    if (message.status.match(/klar/i)) {
      webSocket.close();
      document.getElementById('scrapeProgress').innerText = 'Skapar plaggen i Mai...';
      if (!message.data.length) {
        showParseError();
        webSocket.close();
        return;
      }
      const draftItemResponse = await firebase.app().functions("europe-west3").httpsCallable('createItemDraftsFromLwl', {timeout: 240 * 1000})({
        itemData: message.data,
        url: lwlThreadUrl.value,
      });
      if (authUser.current) {
        location.href = '/private#wardrobe';
      } else {
        document.getElementById('scrapeProgressDiv').style.display = 'none';
        document.getElementById('introHeading').innerText = 'Osålda plagg från din tråd. Logga in för att justera och sälja.';
        document.getElementById('introHeading').style.display = 'block';

        showLwLDraftItemsFromPreview(draftItemResponse.data);
        // TODO: remove this comment and the function when we are happy with addLwLItemPreview + showLwLDraftItemsFromPreview
        // showLwLDraftItems(draftItemResponse.data);
        document.getElementById('buttonsDiv').style.display = 'block';
        document.getElementById('signInButton').style.display = 'flex';
        document.getElementById('signInButton').addEventListener('click', async () => {
          localStorage.setItem('lwlItemDrafts', JSON.stringify(draftItemResponse.data));
          location.href = '/sign-in';
        });
      }
    }
  });
})

let firstPreviewShown = false;
const addLwLItemPreview = (itemData) => {
  const itemCard = document.getElementsByClassName('lwlitemcard')[0];
  const itemList = document.getElementById('lwlItemList');
  if (!firstPreviewShown) {
    document.getElementById('lwlItemsDiv').style.display = 'block'
    itemList.innerHTML = '';
    firstPreviewShown = true;
  }
  const newItemCard = itemCard.cloneNode(true);
  newItemCard.classList.add('lwlItemCard');
  const frontImage = itemData.images?.[0];
  if (frontImage) {
    newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
    newItemCard.querySelector('.no-image-text').style.display = 'none';
    newItemCard.style.opacity = '0.5';
  } else {
    newItemCard.querySelector('.img-container').style.display = 'none';
  }
  newItemCard.querySelector('.lwl-item-title').innerText = '';
  newItemCard.querySelector('.lwl-item-subtext').innerText = '';
  itemList.appendChild(newItemCard);
}

const showLwLDraftItemsFromPreview = (draftItems) => {
  const itemCards = document.getElementsByClassName('lwlItemCard');
  for (const itemCard of itemCards) {
    const itemImageUrl = itemCard.getElementsByClassName('img-container')[0].style.backgroundImage.slice(4,-1).replaceAll(/"/g, '');
    const draftItem = draftItems.find(di => di.draftSourceProperties.rawData.images.includes(itemImageUrl));
    itemCard.style.opacity = '1';
    itemCard.querySelector('.lwl-item-title').innerText = `${draftItem.cleanedBrand || draftItem.brand?.trim()}`;
    itemCard.querySelector('.lwl-item-subtext').innerText = `${[draftItem.category, draftItem.maiSize].filter(i => i).join(', ')}`;
  }
}

const showLwLDraftItems = (draftItems) => {
  document.getElementById('lwlItemsDiv').style.display = 'block'
  const itemCard = document.getElementById('lwlItemCard') || document.getElementsByClassName('lwlItemCard')[0];
  const itemList = document.getElementById('lwlItemList');
  itemList.innerHTML = '';
  for (const item of draftItems) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.id = `lwlItemCard${item.id}`;
    newItemCard.classList.add('lwlItemCard');
    const frontImage = item.images?.frontImage;
    if (frontImage) {
      newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
      newItemCard.querySelector('.no-image-text').style.display = 'none';
    } else {
      newItemCard.querySelector('.img-container').style.display = 'none';
    }
    newItemCard.querySelector('.lwl-item-title').innerText = `${item.cleanedBrand || item.brand?.trim()}`;
    newItemCard.querySelector('.lwl-item-subtext').innerText = `${[item.category, item.maiSize].filter(i => i).join(', ')}`;
    itemList.appendChild(newItemCard);
  }
}

// Only on mobile
const qrCanvas = document.getElementById('qrCanvas')
if (qrCanvas) {
  QRCode.toCanvas(qrCanvas, window.location.href, function (error) {
    if (error) console.error(error)
  });
}

//INTRO STUFF
document.getElementById('introNext').addEventListener('click', () => {
  if (document.getElementById('introNext').innerText === 'Sätt igång') {
    setCookie('lwlIntroSeen', 'true');
    document.getElementById('introSection').style.display = 'none';
  }
  document.getElementById('introRightArrow').click();
  if (document.querySelector('.w-slider-nav div:last-child').classList.contains('w-active')) {
    document.getElementById('introNext').innerText = 'Sätt igång';
  }
});
document.getElementById('skipIntro').addEventListener('click', () => {
  setCookie('lwlIntroSeen', 'true');
  document.getElementById('introSection').style.display = 'none';
});

if (getCookie('lwlIntroSeen') !== 'true') {
  document.getElementById('introSection').style.display='flex';
}

document.getElementById('openIntroButton').addEventListener('click', () => {
  document.getElementById('introSection').style.display = 'flex';
  document.querySelector('.slide-nav-lwl div.w-slider-dot').click();
  document.getElementById('introNext').innerText = 'Nästa';
});

document.getElementById('chatLink').addEventListener('click', () => {
  Intercom('showNewMessage', 'Klistra in en länk till LWL tråden du försökte läsa in?\n\n');
})


window.intercomSettings = {
  app_id: "klyy0le5"
};
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
