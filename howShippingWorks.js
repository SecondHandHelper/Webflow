async function showOrderBagsButton() {
  const maxBags = await callBackendApi('/api/bags/orders/allowed', { requiresAuth: true });
  if (maxBags?.data?.maxOrderBags > 0) {
    document.getElementById('orderBagsButton').style.display = 'flex';
  }
}
showOrderBagsButton();
