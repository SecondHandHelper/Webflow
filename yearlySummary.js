async function main() {
  const params = getParamsObject();
  mainHeading.innerText = `Tack för ${params.year}!`;
  shareButtonText.innerText = `Dela ditt ${params.year}`;
  mainHeading.style.visibility = 'visible';
  //Get data
  const url = 'https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: params.id, year: params.year })
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
      document.getElementById('letterTitle').innerHTML = yearlyData.name.charAt(0).toUpperCase() + yearlyData.name.slice(1) + `${params.year === '2023' ? ',' : ''}`;
    } else {
      document.getElementById('letterTitle').style.display = 'none';
    }
    document.getElementById('letterBody').innerText = yearlyData.letter + `${params.year === '2023' ? "\n\nTillsammans ser vi till att plaggen får komma till användning, och vi hoppas vi får förtroendet att fortsätta sälja dina kläder under 2024!" : ''}`;
    document.getElementById('topStatsLoadingIcon').style.display = 'none';
    topStatsDiv.style.visibility = 'visible';
    letterDiv.style.display = 'flex';
    document.getElementById('shareYearlyHeaderButton').addEventListener('click', shareYearly);
    document.getElementById('shareYearlyButton').addEventListener('click', shareYearly);
    if (params.year === '2024') {
      document.getElementById('letterEnding').style.display = 'none';
    }
  }
}



function shareYearly() {
  const params = getParamsObject();
  if (navigator.share) {
    navigator.share({
      url: `https://mairesale.com/yearly-summary?id=${params.id}&year=${params.year}`
    }).then(() => { console.log('Thanks for sharing!'); }).catch((e) => {
      console.error(e);
      errorHandler.report(e);
    });
  } else {
    console.log("Browser doesn't support navigator.share => Copy to clipboard!");
    const shareText = `https://mairesale.com/yearly-summary?id=${params.id}&year=${params.year}`;
    navigator.clipboard.writeText(shareText);
    linkCopiedBanner.style.display = 'flex';
    setTimeout(function () { linkCopiedBanner.style.display = 'none'; }, 1500);
  }
}

main();
user.whenSet(async () => {
  const params = getParamsObject();
  if (authUser.current.uid.includes(params.id)) {
    airplaneIcon.style.display = 'block';
    shareYearlyButton.style.display = 'block';
    // Store elementViews to be able to hinder it to show automatically again
    db.collection('users').doc(authUser.current.uid).update({ elementViews: firebase.firestore.FieldValue.arrayUnion({ elementID: "yearlySummary", timestamp: new Date() }) });
    // Track with segment
    analytics.track("Element Viewed", { elementID: "yearlySummary" });
  }
});
