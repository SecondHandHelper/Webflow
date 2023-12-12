async function main() {
    //Get data
    //endpoint till FS

    //Format and display data
    if (user.current?.referralData?.referredUsers?.length > 0) {
        //TOP STAT
        const yearlyDataResponse = await firebase.app().functions("europe-west1").httpsCallable('referredUserStats')();
        const yearlyData = yearlyDataResponse.data;
        document.getElementById('soldItems').innerText = `${yearlyData.sold} st plagg`;
        // https://supermiljobloggen.se/nyheter/secondhand-200-ganger-mindre-klimatskadligt-an-nyproducerat/
        // 1 plagg orsakar 10 kg CO2 (2-17), och köpa begagnat orsakar 10/200 kg = 0.02kg så i genomsnitt 10kg sparat/plagg
        document.getElementById('savedCo2').innerHTML = `${(yearlyData.sold * 10 / 1000).toLocaleString('sv')} ton CO<sub>2</sub>`;
        document.getElementById('topStatsLoadingIcon').style.display = 'none';
        topStatsDiv.style.visibility = 'visible';
    }
  }  

document.getElementById('topStatsLoadingIcon').style.display = 'block';
await main();