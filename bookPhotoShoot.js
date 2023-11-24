import {getFormAddressFields} from "./general";
import {deleteCookie} from "./cookieManagement";

async function submitPhotoShootForm() {
  localStorage.setItem('photoShootBooked', true);
  const addressFields = getFormAddressFields();
  let amount = document.getElementById('amount').value;
  let pn = formatPhoneNumber(phoneNumber.value);

  // Write to Firestore
  await db.collection('users').doc(authUser.current.uid).update({
    ...addressFields,
    phoneNumber: pn
  })
    .then(() => {
      console.log(`Address and phone of ${authUser.current.uid} is now updated`);
      confirmationScreen.style.display = 'block';
      header.style.display = 'none';
      formDiv.style.display = 'none';
      deleteCookie('photo_invite');
    })
    .catch((error) => {
      errorHandler.report(error);
      console.error("Error updating document: ", error);
    });
}

photoShootInviteCode.value = checkCookie('photo_invite');
photoShootForm.addEventListener('submit', submitPhotoShootForm);
phoneNumber.addEventListener('input', function () {
  const pn = formatPhoneNumber(phoneNumber.value);
  const error = pn.length >= 12 && pn.includes('+') ? '' : 'Ogiltigt mobilnummer';
  phoneNumber.setCustomValidity(error);
});
