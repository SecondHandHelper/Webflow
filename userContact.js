import {callBackendApi, formatPersonalId, isValidSwedishSsn} from "./general";

const pageSetUp = async () => {
  const item = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'))?.item ||
    JSON.parse(localStorage.getItem('latestItemCreated'));
  if (item) {
    itemImage.src = item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || '';
    itemNotificationText.innerHTML = `Vi behöver dina uppgifter för att fullfölja försäljningen av ditt ${item.brand}-plagg. Anges bara en gång.`;
    itemToBeCreatedDiv.style.display = 'block';
  }

  phoneNumber.addEventListener('input', function () {
    fieldLabelToggle('phoneNumberLabel');
    const pn = formatPhoneNumber(phoneNumber.value);
    const error = pn.length >= 12 && pn.includes('+') ? '' : 'Ogiltigt mobilnummer';
    phoneNumber.setCustomValidity(error);
  });
  personalId.addEventListener('input', fieldLabelToggle('personalIdLabel'));

  saveUserDetailsButton.addEventListener('click', async () => {
    const personalIdError = !personalId.value?.length || isValidSwedishSsn(personalId.value) ?
      '' : 'Ogiltigt personnummer';
    personalId.setCustomValidity(personalIdError);
    if (document.getElementById('wf-form-User-Details').reportValidity()) {
      try {
        await callBackendApi('/api/users',
          { phoneNumber: formatPhoneNumber(phoneNumber.value), personalId: formatPersonalId(personalId.value) }
        );
      } catch (e) {
        console.error('Failed saving user contact info', e);
      }
      location.href = `/item-confirmation`;
    }
  });
}

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

pageSetUp();
