const campaignSignUpMain = async () => {
  const url = 'https://itemrecommendationssignup-heypmjzjfq-ew.a.run.app';

  try {
    document.getElementById('emailText').innerText = getParamsObject().email;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: getParamsObject().email })
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
