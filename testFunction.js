// This can be run by running:
// npx run-func testFunction.js functionToTest "2021-03-10"

const functionToTest = (soldDate) => {
  // Get the 4 first business§ days, 3 days after soldDate
  var soldDate = new Date(soldDate);
  var firstDate = new Date(soldDate);

  firstDate.setDate(soldDate.getDate() + 4); // 4

  // Om helgdag, skjut på det så att man bara kan välja veckodagar
  if (firstDate.getDay() == 0) {
      firstDate.setDate(firstDate.getDate() + 1);
  } else if (firstDate.getDay() == 6) {
      firstDate.setDate(firstDate.getDate() + 2);
  }

  var secondDate = new Date(firstDate);
  secondDate.setDate(secondDate.getDate() + 1);
  if (secondDate.getDay() == 6) {
      secondDate.setDate(secondDate.getDate() + 2);
  }

  var thirdDate = new Date(secondDate);
  thirdDate.setDate(thirdDate.getDate() + 1);
  if (thirdDate.getDay() == 6) {
      thirdDate.setDate(thirdDate.getDate() + 2);
  }

  var forthDate = new Date(thirdDate);
  forthDate.setDate(forthDate.getDate() + 1);
  if (forthDate.getDay() == 6) {
      forthDate.setDate(forthDate.getDate() + 2);
  }

  console.log('first date', firstDate, firstDate.getDay());
  console.log('second date', secondDate, secondDate.getDay());
  console.log('third date', thirdDate, thirdDate.getDay());
  console.log('forth date', forthDate, forthDate.getDay());

}

module.exports = { functionToTest }