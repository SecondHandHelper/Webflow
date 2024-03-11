const WS_SERVER = 'wss://lwl-to-mai-heypmjzjfq-ey.a.run.app';
const fbCookies = [{"sourceScheme":"Secure","path":"/","expires":-1,"sourcePort":443,"size":75,"sameParty":false,"session":true,"domain":".facebook.com","name":"presence","httpOnly":false,"secure":true,"value":"C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1709677040691%2C%22v%22%3A1%7D"},{"expires":1717453009.372352,"sourcePort":443,"sameParty":false,"session":false,"secure":true,"sourceScheme":"Secure","path":"/","size":82,"domain":".facebook.com","sameSite":"None","name":"fr","httpOnly":true,"value":"1Q49ICUSijZ20nwbT.AWVLICBtB1ta5J8iCYUydGTMET8.Bl55nQ..AAA.0.0.Bl55nQ.AWXZXjvmXTg"},{"expires":1741213009.372328,"sourcePort":443,"sameParty":false,"session":false,"secure":true,"sourceScheme":"Secure","path":"/","size":98,"domain":".facebook.com","sameSite":"None","name":"xs","httpOnly":true,"value":"21%3AjHet3D7sHY-ahg%3A2%3A1709676989%3A-1%3A6776%3A%3AAcU_Zs1FzpmhVFi1OMuz3RNqhcuhFaxDSdNZDaY1lg"},{"expires":1741213009.372166,"sourcePort":443,"sameParty":false,"session":false,"secure":true,"sourceScheme":"Secure","path":"/","size":21,"domain":".facebook.com","sameSite":"None","name":"c_user","httpOnly":false,"value":"100000005802870"},{"expires":1710281838,"sourcePort":443,"sameParty":false,"session":false,"secure":true,"sourceScheme":"Secure","path":"/","size":11,"domain":".facebook.com","sameSite":"None","name":"wd","httpOnly":false,"value":"1920x1200"},{"expires":1744236986.178777,"sourcePort":443,"sameParty":false,"session":false,"secure":true,"sourceScheme":"Secure","path":"/","size":5,"domain":".facebook.com","sameSite":"Lax","name":"ps_l","httpOnly":true,"value":"0"},{"sourceScheme":"Secure","path":"/","expires":1744236986.17879,"sourcePort":443,"size":5,"sameParty":false,"session":false,"domain":".facebook.com","name":"ps_n","httpOnly":true,"secure":true,"value":"0"},{"sourceScheme":"Secure","path":"/","expires":1744236986.178708,"sourcePort":443,"size":28,"sameParty":false,"session":false,"domain":".facebook.com","name":"datr","httpOnly":true,"secure":true,"value":"t5nnZbm8Oi8Q97yMOBwn_YQ_"},{"sourceScheme":"Secure","path":"/","expires":1744236993.430514,"sourcePort":443,"size":26,"sameParty":false,"session":false,"domain":".facebook.com","name":"sb","httpOnly":true,"secure":true,"value":"t5nnZde9cZWl0rpLdEEhz9jI"}];
document.getElementById('doneButton').addEventListener('click', () => {
  const lwlThreadUrl = document.getElementById('lwlThreadUrl');
  if (!lwlThreadUrl.value.length) {
    console.log('No url thread given');
    return;
  }
  const webSocket = new WebSocket(WS_SERVER);
  webSocket.addEventListener('open', () => {
    console.log('connected to lwl thread scraping server');
    webSocket.send(JSON.stringify({ fbCookies, url: lwlThreadUrl.value }));
  });
  webSocket.addEventListener('message', async (event) => {
    document.getElementById('scrapeProgressDiv').style.display = 'flex';
    console.log('received message from server', event.data);
    const message = JSON.parse(event.data);
    document.getElementById('scrapeProgress').innerText = message.status;
    if (message.status.match(/done/i)) {
      webSocket.close();
      document.getElementById('scrapeProgress').innerText = 'Skapar plagg i Mai med data hämtade från LWL';
      const draftItemResponse = await firebase.app().functions("europe-west3").httpsCallable('createItemDraftsFromLwl')({itemData: message.data});
      document.getElementById('scrapeProgressDiv').style.display = 'none';
      if (draftItemResponse.data.length) {
        showLwLDraftItems(draftItemResponse.data);
      }
    }
  });
})

const showLwLDraftItems = (draftItems) => {
  document.getElementById('lwlItemsDiv').style.display = 'block'
  const itemCard = document.getElementById('lwlItemCard');
  const itemList = document.getElementById('lwlItemList');
  itemList.innerHTML = '';
  for (const item of draftItems) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.id = item.id;
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
