const WS_SERVER = 'wss://lwl-to-mai-heypmjzjfq-ey.a.run.app';
authUser.whenSet(async () => {
  if (localStorage.getItem('lwlItemDrafts') && (document.referrer.includes('sign-in') || document.referrer.includes('private'))) {
    document.getElementById('headerImage').style.display = 'none';
    document.getElementById('threadInputDiv').style.display = 'none';
    document.getElementById('lwlItemsDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    const draftItems = JSON.parse(localStorage.getItem('lwlItemDrafts'));
    await Promise.all(draftItems.map(item =>
      firebase.app().functions("europe-west1").httpsCallable('createItem')({id: item.id, item})
    ));
    localStorage.removeItem('lwlItemDrafts');
    location.href = '/private#wardrobe';
  }
});

let scrapingStarted = false;
document.getElementById('doneButton').addEventListener('click', () => {
  if (scrapingStarted) {
    return;
  }
  const lwlThreadUrl = document.getElementById('lwlThreadUrl');
  if (!lwlThreadUrl.value.length) {
    console.log('No url thread given');
    return;
  }
  scrapingStarted = true;
  document.getElementById('scrapeProgressDiv').style.display = 'flex';
  document.getElementById('scrapeProgress').innerText = 'Startar...'
  const webSocket = new WebSocket(WS_SERVER);
  webSocket.addEventListener('open', () => {
    console.log('connected to lwl thread scraping server');
    webSocket.send(JSON.stringify({ url: lwlThreadUrl.value }));
  });
  webSocket.addEventListener('message', async (event) => {
    console.log('received message from server', event.data);
    let message = event.data;
    try {
      message = JSON.parse(event.data);
    } catch (e) {
      message = { status: 'Startar...' };
    }
    document.getElementById('scrapeProgress').innerText = message.status;
    if (message.status.match(/klar/i)) {
      webSocket.close();
      // showLwLDraftItemsPreview(message.data);
      document.getElementById('scrapeProgress').innerText = 'Skapar plagg i Mai med data hämtade från LWL';
      const draftItemResponse = await firebase.app().functions("europe-west3").httpsCallable('createItemDraftsFromLwl', { timeout: 240*1000})({
        itemData: message.data,
        url: lwlThreadUrl
      });
      if (authUser.current) {
        location.href = '/private#wardrobe';
      } else {
        document.getElementById('scrapeProgressDiv').style.display = 'none';
        // showLwLDraftItemsFromPreview(draftItemResponse.data);
        showLwLDraftItems(draftItemResponse.data);
        document.getElementById('introHeading').innerText = 'Plaggen från din tråd. Logga in för att låta Mai sälja dem.';
        document.getElementById('lwlThreadUrl').style.display = 'none';
        document.getElementById('doneButton').disabled = false;
        document.getElementById('doneButton').style.display = 'none';
        document.getElementById('signInButton').style.display = 'flex';
        document.getElementById('signInButton').addEventListener('click', async () => {
          localStorage.setItem('lwlItemDrafts', JSON.stringify(draftItemResponse.data));
          location.href = '/sign-in';
        });
      }
    }
  });
})

const showLwLDraftItemsPreview = (data) => {
  document.getElementById('lwlItemsDiv').style.display = 'block'
  const itemCard = document.getElementById('lwlItemCard') || document.getElementsByClassName('lwlItemCard')[0];
  const itemList = document.getElementById('lwlItemList');
  itemList.innerHTML = '';
  for (const item of data) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.classList.add('lwlItemCard');
    const frontImage = item.images?.[0];
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
