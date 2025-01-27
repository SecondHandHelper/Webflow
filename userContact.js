import { formatPersonalId, isValidSwedishSsn } from "./general";

async function verifyUserCode() {
  const verificationCodeError = !verificationCode.value?.length || !/^[0-9]+$/.test(verificationCode.value) ?
    'Koden ska bestå av siffror' : '';
  verificationCode.setCustomValidity(verificationCodeError);
  if (document.getElementById('wf-form-Verify-phonenumber').reportValidity()) {
    verifyCheckButtonText.style.display = 'none';
    verifyCheckButtonSpinner.style.display = 'block';
    try {
      const res = await callBackendApi('/api/users/verifyPhoneNumber', {
        data: {data: {phoneNumber: formatPhoneNumber(phoneNumber.value), verificationCode: verificationCode.value}},
        method: 'POST'
      });
      console.log('Result: ', res);
      if (res.data?.phoneNumberVerified) {
        verifyCheckButtonSpinner.style.display = 'none';
        verifyCheckButtonCheckMark.style.display = 'block';
        setTimeout(() => {
          location.href = `/item-confirmation`;
        }, 200);
      } else {
        verificationCode.setCustomValidity('Fel kod angiven');
        document.getElementById('wf-form-Verify-phonenumber').reportValidity();
        verifyCheckButtonText.style.display = 'block';
        verifyCheckButtonSpinner.style.display = 'none';
      }
    } catch (e) {
      console.error('Wrong verification code', e);
    }
  }
}

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
  verificationCode.addEventListener('input', function () {
    fieldLabelToggle('verificationCodeLabel');
    verificationCode.setCustomValidity('');
  });

  saveUserDetailsButton.addEventListener('click', async () => {
    const personalIdError = !personalId.value?.length || isValidSwedishSsn(personalId.value) ?
      '' : 'Ogiltigt personnummer';
    personalId.setCustomValidity(personalIdError);
    if (document.getElementById('wf-form-User-Details').reportValidity()) {
      saveUserDetailsButtonText.style.display = 'none';
      saveUserDetailsButtonSpinner.style.display = 'block';
      try {
        const res = await callBackendApi('/api/users/saveAndVerify', {
          data: { data: { phoneNumber: formatPhoneNumber(phoneNumber.value), personalId: formatPersonalId(personalId.value) } },
          method: 'POST'
        });
        console.log('Result: ', res);
        if (res.data) {
          console.log('All went well!');
          //Next step
          verifyInstructionText.innerHTML = verifyInstructionText.innerHTML.replace(/\+46\d+/, formatPhoneNumber(phoneNumber.value));
          userDetailsFormDiv.style.display = 'none';
          verifyPhoneNumberDiv.style.display = 'block';
          setTimeout(() => {
            backButton.style.display = 'flex';
          }, 8000); 
        }
      } catch (e) {
        console.error('Failed saving user contact info', e);
      }
    }
  });
  verifyCheckButton.addEventListener('click', verifyUserCode);
  document.getElementById('wf-form-Verify-phonenumber').addEventListener('submit', verifyUserCode);

  backButton.addEventListener('click', async () => {
    saveUserDetailsButtonText.style.display = 'block';
    saveUserDetailsButtonSpinner.style.display = 'none';
    userDetailsFormDiv.style.display = 'block';
    verifyPhoneNumberDiv.style.display = 'none';
  });
}

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

pageSetUp();
