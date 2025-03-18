async function showOrderBagsButton() {
  if (authUser.current) {
    const maxBags = await callBackendApi('/api/bags/orders/allowed', {requiresAuth: true});
    console.log('maxBags', maxBags);
    if (maxBags?.data?.maxOrderBags > 0) {
      document.getElementById('orderBagsButton').style.display = 'flex';
    }
  }
}
showOrderBagsButton();
