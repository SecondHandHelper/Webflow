async function main() {
  const params = getParamsObject();
  //Get data
  const url = 'https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: params.id })
  };
  const yearlyDataResponse = await fetch(url, options);
  if (!yearlyDataResponse.ok) { throw new Error('Network response was not ok.'); }
  const yearlyDataJson = await yearlyDataResponse.json();
  const yearlyData = yearlyDataJson.data;
  console.log("yearlyData: ", yearlyData);

  //Format and display data
  if (yearlyData.sold) {
    document.getElementById('moneyEarned').innerHTML = `${parseInt(yearlyData.earned).toLocaleString('en-US').replaceAll(',', ' ')} kr`;
    document.getElementById('soldItems').innerText = `${yearlyData.sold} st plagg`;
    document.getElementById('savedCo2').innerHTML = yearlyData.co2kg < 100 ? `${(parseInt(yearlyData.co2kg)).toLocaleString('sv')} kg CO<sub>2</sub>` : `${(parseInt(yearlyData.co2kg) / 1000).toLocaleString('sv')} ton CO<sub>2</sub>`;
    if (yearlyData.name) {
      document.getElementById('letterTitle').innerHTML = yearlyData.name.charAt(0).toUpperCase() + yearlyData.name.slice(1) + ',';
    } else {
      document.getElementById('letterTitle').style.display = 'none';
    }
    document.getElementById('letterBody').innerText = yearlyData.letter + "\n\nTillsammans ser vi till att plaggen får komma till användning, och vi hoppas vi får förtroendet att fortsätta sälja dina kläder under 2024!";
    document.getElementById('topStatsLoadingIcon').style.display = 'none';
    topStatsDiv.style.visibility = 'visible';
    letterDiv.style.display = 'flex';
    airplaneIcon.style.display = 'block';
    document.getElementById('shareYearlyHeaderButton').addEventListener('click', shareYearly);
    document.getElementById('shareYearlyButton').addEventListener('click', shareYearly);
  }
}

function shareYearly() {
  const params = getParamsObject();
  if (navigator.share) {
    navigator.share({
      url: `https://maiapp.se/2023withmai?id=${params.id}`
    }).then(() => { console.log('Thanks for sharing!'); }).catch((e) => {
      console.error(e);
      errorHandler.report(e);
    });
  } else {
    console.log("Browser doesn't support navigator.share => Copy to clipboard!");
    const shareText = `https://maiapp.se/2023withmai?id=${params.id}`;
    navigator.clipboard.writeText(shareText);
    linkCopiedBanner.style.display = 'flex';
    setTimeout(function () { linkCopiedBanner.style.display = 'none'; }, 1500);
  }
}

main();