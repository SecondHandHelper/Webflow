const campaignSignUpMain = async () => {
  try {
    document.getElementById('emailText').innerText = getParamsObject().email;
    const response = await callBackendApi('/api/items/recommendationsSignup', {
      data: { email: getParamsObject().email },
      method: 'PUT'
    });
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Failed to register for purchase recommendation email.`, error);
    document.getElementById('emailText').innerText = 'Något gick fel';
  }
}

campaignSignUpMain()
