import {callBackendApi} from "./general";

async function showOrderBagsButton() {
  const maxBags = await callBackendApi('/api/bags/allowedOrders');
  if (maxBags?.data?.maxOrderBags > 0) {
    document.getElementById('orderBagsButton').style.display = 'flex';
  }
}
showOrderBagsButton();
