const WS_SERVER = 'wss://lwl-to-mai-heypmjzjfq-ey.a.run.app';
document.getElementById('doneButton').addEventListener('click', () => {
  const lwlThreadUrl = document.getElementById('lwlThreadUrl');
  if (!lwlThreadUrl.value.length) {
    console.log('No url thread given');
    return;
  }
  const webSocket = new WebSocket(WS_SERVER);
  webSocket.addEventListener('open', () => {
    console.log('connected to lwl thread scraping server');
    webSocket.send(JSON.stringify({ url: lwlThreadUrl.value }));
  });
  webSocket.addEventListener('message', async (event) => {
    document.getElementById('scrapeProgressDiv').style.display = 'flex';
    console.log('received message from server', event.data);
    let message = event.data;
    try {
      message = JSON.parse(event.data);
    } catch (e) {
      message = { status: 'Starting...' };
    }
    document.getElementById('scrapeProgress').innerText = message.status;
    if (message.status.match(/klar/i)) {
      webSocket.close();
      document.getElementById('scrapeProgress').innerText = 'Skapar plagg i Mai med data hämtade från LWL';
      const draftItemResponse = await firebase.app().functions("europe-west3").httpsCallable('createItemDraftsFromLwl')({
        itemData: message.data,
        url: lwlThreadUrl
      });
      document.getElementById('scrapeProgressDiv').style.display = 'none';
      if (draftItemResponse.data.length) {
        showLwLDraftItems(draftItemResponse.data);
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
