const WS_SERVER = 'wss://lwl-to-mai-heypmjzjfq-ey.a.run.app';
authUser.whenSet(async (authUser) => {
  if (localStorage.getItem('lwlItemDrafts') && document.referrer.includes('sign-in')) {
    document.getElementById('headerImage').style.display = 'none';
    document.getElementById('threadInputDiv').style.display = 'none';
    document.getElementById('lwlItemsDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    const draftItems = JSON.parse(localStorage.getItem('lwlItemDrafts'));
    for (const item of draftItems) {
      await firebase.app().functions("europe-west1").httpsCallable('createItem')({id: item.id, item});
    }
    location.href = '/private#wardrobe';
  }
});

document.getElementById('doneButton').addEventListener('click', () => {
  const lwlThreadUrl = document.getElementById('lwlThreadUrl');
  if (!lwlThreadUrl.value.length) {
    console.log('No url thread given');
    return;
  }
  document.getElementById('doneButton').disabled = true;
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
      document.getElementById('scrapeProgress').innerText = 'Skapar plagg i Mai med data hämtade från LWL';
      const draftItemResponse = await firebase.app().functions("europe-west3").httpsCallable('createItemDraftsFromLwl', { timeout: 240*1000})({
        itemData: message.data,
        url: lwlThreadUrl
      });
      if (authUser.current) {
        location.href = '/private#wardrobe';
      } else {
        document.getElementById('scrapeProgressDiv').style.display = 'none';
        showLwLDraftItems(draftItemResponse.data);
        document.getElementById('doneButton').disabled = false;
        document.getElementById('doneButton').style.display = 'none';
        document.getElementById('signInButton').style.display = 'block';
        document.getElementById('signInButton').innerText = 'Logga in/Skapa konto';
        document.getElementById('signInButton').addEventListener('click', async () => {
          localStorage.setItem('lwlItemDrafts', JSON.stringify(draftItemResponse.data));
          location.href = '/sign-in';
        });
      }
    }
  });
})

const showLwLDraftItems = (draftItems) => {
  document.getElementById('lwlItemsDiv').style.display = 'block'
  const itemCard = document.getElementById('lwlItemCard') || document.getElementsByClassName('lwlItemCard')[0];
  const itemList = document.getElementById('lwlItemList');
  itemList.innerHTML = '';
  for (const item of draftItems) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.id = `lwlItemCard${item.id}`;
    newItemCard.classList.add('lwlItemCard');
    const frontImage = item.images?.enhancedFrontImageLarge || item.images?.enhancedFrontImage || item.images?.frontImageLarge || item.images?.frontImage;
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
