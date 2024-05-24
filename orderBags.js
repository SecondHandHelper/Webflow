import {callFirebaseFunction, getFormAddressFields, setFormAddressFields} from "./general";

var maxNumBags = 10;
async function getMaxNumBags() {
  const maxBags = await callFirebaseFunction("europe-west1", 'maxNumBags');
  if (maxBags?.data) {
    if (maxBags.data?.errorCode === 'unfulfilled-order') {
      document.getElementById('orderBagsError').style.display = 'block';
      document.getElementById('orderBagsError').innerText = 'Du har nyligen lagt en beställning som är på väg till dig.\nVänta in påsarna innan du lägger fler beställningar.';
      return 0;
    }
    if (maxBags.data?.maxOrderBags === 0) {
      document.getElementById('orderBagsError').style.display = 'block';
      document.getElementById('orderBagsError').innerText = 'Du kan bara beställa påsar om\ndu har pågående försäljningar.';
      return 0;
    }
    maxNumBags = Math.min(maxBags.data.maxOrderBags, maxNumBags);
    return maxNumBags;
  }
}

function validateAndDecrease(input) {
  input.value = Math.max(+input.value - 1, 0);
  input.style.color = +input.value === 0 ? '#c3c2c2' : '#000';
  updateOrderButton();
}

function numOrdered() {
  return +document.getElementById('numSmall').value + +document.getElementById('numMedium').value +
    +document.getElementById('numLarge').value
}

function updateOrderButton() {
  document.getElementById('orderBags').innerText = `Beställ ${numOrdered()} ${bagOrBags()} gratis`;
  document.getElementById('orderBagsError').style.display = 'none';
}

function bagOrBags() {
  return numOrdered() === 1 ? 'påse' : 'påsar';
}

function validateAndIncrease(input) {
  if (numOrdered() >= 10) {
    return
  }
  input.value = Math.min(+input.value + 1, 10);
  updateOrderButton();
  if (+input.value === 1) {
    input.style.color = 'black';
  }
}

function isSet(str) {
  return str?.replace(/\s/g, '')?.length > 0
}
async function isAdressSet() {
  const doc = await db.collection("users").doc(authUser.current.uid).get();
  const { addressFirstName, addressLastName, addressStreetAddress, addressPostalCode, addressCity } = doc.data();
  return [addressFirstName, addressLastName, addressStreetAddress, addressPostalCode, addressCity].every(isSet);
}

function addInputComponentEventListeners(minusElm, plusElm, inputElm) {
  document.getElementById(minusElm).addEventListener("click", function () {
    validateAndDecrease(document.getElementById(inputElm));
  });
  document.getElementById(plusElm).addEventListener("click", function () {
    validateAndIncrease(document.getElementById(inputElm));
  })
}
addInputComponentEventListeners('minusSmall', 'plusSmall', 'numSmall');
addInputComponentEventListeners('minusMedium', 'plusMedium', 'numMedium');
addInputComponentEventListeners('minusLarge', 'plusLarge', 'numLarge');

document.getElementById('userAddressForm').addEventListener("submit", async () => {
  const addressFields = getFormAddressFields();
  const userRef = db.collection('users').doc(authUser.current.uid);
  await userRef.update(addressFields);
  document.getElementById('orderBagsConfirmation').style.display = 'block';
  document.getElementById('addressFormDiv').style.display = 'none';
});

document.getElementById('orderBags').addEventListener('click', async function () {
  if (numOrdered() === 0) {
    document.getElementById('orderBagsError').style.display = 'block';
    document.getElementById('orderBagsError').innerText = 'Välj minst 1 påse';
    return;
  }
  if (numOrdered() > 10) {
    document.getElementById('orderBagsError').style.display = 'block';
    document.getElementById('orderBagsError').innerText = 'Max 10 påsar per beställning';
    return;
  }
  document.getElementById('orderBagsError').style.display = 'none';
  document.getElementById('orderBags').style.display = 'none';
  document.getElementById('orderBagsSpinner').style.display = 'flex';
  //Tobias added
  const maxNumBags = await getMaxNumBags();
  if (maxNumBags === 0) {
    document.getElementById('orderBags').style.display = 'flex';
    document.getElementById('orderBagsSpinner').style.display = 'none';
    return;
  }
  if (numOrdered() > maxNumBags) {
    document.getElementById('orderBagsError').style.display = 'block';
    document.getElementById('orderBagsError').innerText = `Inte fler än antalet pågående försäljningar, dvs ${maxNumBags}`;
    document.getElementById('orderBags').style.display = 'flex';
    document.getElementById('orderBagsSpinner').style.display = 'none';
    return;
  }
  const numSmallBags = +document.getElementById('numSmall').value;
  const numMediumBags = +document.getElementById('numMedium').value;
  const numLargeBags = +document.getElementById('numLarge').value;
  try {
    await callFirebaseFunction("europe-west1", 'orderSellerBags', { numLargeBags, numSmallBags, numMediumBags});
    document.getElementById('bagsOrdered').innerText = `${numOrdered()} ${bagOrBags()} på väg!`;
  } catch (e) {
    errorHandler.report(e);
    document.getElementById('orderBagsError').style.display = 'block';
    document.getElementById('orderBagsError').innerText = 'Något gick fel vid beställningen. Försök igen och kontakta oss om det fortfarande inte fungerar.';
    document.getElementById('orderBags').style.display = 'flex';
    document.getElementById('orderBagsSpinner').style.display = 'none';
    return;
  }
  document.getElementById('orderBagsForm').style.display = 'none';
  if (await isAdressSet()) {
    document.getElementById('orderBagsConfirmation').style.display = 'block';
  } else {
    const userDocRef = await db.collection('users').doc(authUser.current.uid).get();
    const userDoc = userDocRef.data();
    document.getElementById('addressFormDiv').style.display = 'block';
    setFormAddressFields(userDoc);
  }
});
document.getElementById('closeOrderBagsConfirmationButton').addEventListener("click", function () {
  document.getElementById('closeOrderBagsConfirmationButton').style.display = 'none';
  document.getElementById('closeOrderBagsSpinner').style.display = 'flex';
});
