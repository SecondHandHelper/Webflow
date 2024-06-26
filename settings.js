import {
  formatPersonalId,
  getFormAddressFields,
  isValidSwedishSsn,
  setFormAddressFields
} from "./general";

async function updateUserAddress() {
    try {
        loadOnSavePressed()
        await callBackendApi('/api/users', {
          data: { data: getFormAddressFields() },
          method: 'PUT'
        })
        await onUpdateComplete()
    } catch (e) {
        errorHandler.report(e);
        console.log('Error updating user', e)
    }
}

async function updateShippingPreference() {
    loadOnSavePressed()
    let shippingMethod = "";
    let radioButtons = document.getElementsByName('shippingMethodSettings');
    for (let x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            shippingMethod = radioButtons[x].value; // "Service point" or "Pickup"
        }
    }
    await callBackendApi('/api/users', {
      data: { data: { preferences: { shippingMethod } } },
      method: 'PUT'
    })
    await onUpdateComplete()
}

async function updateContactNumbers(isSwish) {
    try {
        loadOnSavePressed()
        await callBackendApi('/api/users',{
          data: { data: getCleanedNumber(isSwish) },
          method: 'PUT'
        })
        await onUpdateComplete()
    } catch (e) {
      errorHandler.report(e);
    }
}

async function updateUserPersonId() {
    try {
        loadOnSavePressed()
        await callBackendApi('/api/users', {
          data: { data: { personalId: formatPersonalId(personalId.value.trim().replace(/\D/g, '')) } },
          method: 'PUT'
        })
        await onUpdateComplete()
    } catch (e) {
        errorHandler.report(e);
        console.log('Error updating user', e)
    }
}

let fullPersonId = '';
let data;
let pageHeader = document.getElementById('pageTitleText');

async function getUserInfo(onUpdate) {
  try {
    const response = await callBackendApi('/api/users', { requiresAuth: true });
    data = response.data;
    await displayPersonalId(data.personalId);
    console.log('data', data);
    const shippingMethod = data?.preferences?.shippingMethod || null;
    console.log('shippingMethod', shippingMethod);
    addressDisplay.innerHTML = data.addressStreetAddress ? `${data.addressFirstName} ${data.addressLastName}${data.addressCO ? `, C/o ${data.addressCO}` : ''}<br/>${data.addressStreetAddress}<br/>${data.addressPostalCode} ${data.addressCity}` : '-';
    console.log('address displayed');
    swishNumberDisplay.innerHTML = data.swishPayeeAlias || '-';
    console.log('swish displayed');
    phoneNumberDisplay.innerHTML = data.phoneNumber || '-';
    console.log('phoneNumberDisplay');
    console.log('data.phoneNumber', data.phoneNumber);

    if (shippingMethod) {
      if (shippingMethod === 'Pickup') { shippingPreferencesDisplay.innerHTML = 'Upphämtning vid dörren' }
      if (shippingMethod === 'Service point') { 
        shippingPreferencesDisplay.innerHTML = 'Lämna till ombud';
        // Hide expand button since we don't allow users to change to Pickup anymore
        expandShippingPrefButton.style.display = 'none';
      }
    } else {
      shippingPreferencesDisplay.innerHTML = '-';
    }
  } catch (e) {
    errorHandler.report(e);
    console.log('error fetching user data', e)
  } finally {
    if (!onUpdate) {
      loadingDiv.style.display = 'none'
      settingsContainer.style.display = 'block'
    }
  }
}

async function displayPersonalId(personId) {
  fullPersonId = personId || ''
  let personIdLastFour = '-'

  if (fullPersonId.length > 4) {
    personIdLastFour = fullPersonId.substring(fullPersonId.length - 4);
    personalIdDisplay.innerHTML = `XXXXXXXX${personIdLastFour}`
    return
  }
  personalIdDisplay.innerHTML = personIdLastFour
}

async function onUpdateComplete() {
  await getUserInfo(true)
  savedCheckIcon.style.display = 'flex'
  saveLoadingSpinner.style.display = 'none'
}

function getCleanedNumber(isSwish) {
  let input = isSwish ? swishNumber.value.trim() : phoneNumber.value.trim()
  return isSwish ? { swishPayeeAlias: formatPhoneNumber(input) } : { phoneNumber: formatPhoneNumber(input) }
}

function loadOnSavePressed() {
  saveButton.style.display = 'none'
  saveLoadingSpinner.style.display = 'flex'
}

function displayForm(divId, formId, newValue, headerText) {
  document.getElementById(formId).style.display = 'block'
  document.getElementById('updateContainer').style.display = 'block'
  document.getElementById('goBackDiv').style.display = 'none'
  document.getElementById('resetPageDiv').style.display = 'block'
  saveButton.style.display = 'block'
  saveButtonContainer.style.display = 'flex'
  settingsContainer.style.display = 'none'
  pageHeader.innerHTML = headerText
  pageHeader.value = headerText
  if (newValue) {
    if (newValue === personalId) {
      newValue.value = fullPersonId
    } else {
      newValue.value = document.getElementById(divId).innerHTML.length > 2 ? document.getElementById(divId).innerHTML : ''
    }
    newValue.dispatchEvent(new Event('input'));
  }
  if (formId === 'shippingPrefForm'){
    if (document.getElementById(divId).innerHTML.includes('ombud')){
      servicePointSettings.previousElementSibling.classList.add("w--redirected-checked");
      servicePointSettings.checked = true;
    }
    if (document.getElementById(divId).innerHTML.includes('Upphämtning')) {
      pickupSettings.previousElementSibling.classList.add("w--redirected-checked");
      pickupSettings.checked = true;
    }
  }
}

function isValid(id) {
  return !!id.validity.valid && saveButton.innerHTML === 'Spara'
}

function isAllValid(ids) {
  let valid = true

  for (const id of ids) {
    if (!id.validity.valid) {
      valid = false
    }
  }
  return !!valid && saveButton.innerHTML === 'Spara'
}

function displayFieldLabel(id, show) {
  id.style.display = !!show ? 'inline-block' : 'none'
}

//Address
adressDiv.addEventListener("click", async function () {
  await setFormAddressFields(data)
  displayForm('adressDiv', 'addressForm', null, 'Adress')
})

addressFirstName.addEventListener("input", function () {
  displayFieldLabel(firstNameLabel, addressFirstName.value)
  displaySaveButton()
})
addressLastName.addEventListener("input", function () {
  displayFieldLabel(lastNameLabel, addressLastName.value)
  displaySaveButton()
})
addressStreetAddress.addEventListener("input", function () {
  displayFieldLabel(streetAddressLabel, addressStreetAddress.value)
  displaySaveButton()
})
addressCO.addEventListener("input", function () {
  displayFieldLabel(addressCoLabel, addressCO.value)
  displaySaveButton()
})
addressPostalCode.addEventListener("input", function () {
  displayFieldLabel(postalCodeLabel, addressPostalCode.value)
  displaySaveButton()
})
addressCity.addEventListener("input", function () {
  displayFieldLabel(cityLabel, addressCity.value)
  displaySaveButton()
})
addressDoorCode.addEventListener("input", function () {
  displayFieldLabel(doorCodeLabel, addressDoorCode.value)
  displaySaveButton()
})


//Phone
phoneDiv.addEventListener("click", function () {
  displayForm('phoneNumberDisplay', 'phoneForm', phoneNumber, 'Mobilnummer')
})

phoneNumber.addEventListener("input", function () {
  displayFieldLabel(phoneNumberLabel, phoneNumber.value)
  displaySaveButton()
  const pn = formatPhoneNumber(phoneNumber.value);
  const error = pn.length >= 12 && pn.includes('+') ? '' : 'Ogiltigt mobilnummer';
  phoneNumber.setCustomValidity(error);
})

//Shipping
shippingPrefDiv.addEventListener("click", function () {
  if(shippingPreferencesDisplay.innerHTML.includes('ombud')){
    shippingPrefInfoText.style.display = 'block';
    setTimeout(function () { shippingPrefInfoText.style.display = 'none'; }, 3000);
  } else {
    displayForm('shippingPreferencesDisplay', 'shippingPrefForm', null, 'Skicka plagg')
  }
})

//Swish
swishDiv.addEventListener("click", function () {
  displayForm('swishNumberDisplay', 'swishForm', swishNumber, 'Swish')
})

swishNumber.addEventListener("input", () => {
  displayFieldLabel(swishNumberLabel, swishNumber.value)
  displaySaveButton()
  const error = swishNumber.length !== 0 ? '' : 'Ogiltigt swishnummer';
  swishNumber.setCustomValidity(error);
})

personIdDiv.addEventListener("click", function () {
  displayForm('fullPersonId', 'personIdForm', personalId, 'Personnummer')
})

personalId.addEventListener("input", () => {
  displayFieldLabel(personalIdLabel, personalId.value)
  displaySaveButton()
  const error = isValidSwedishSsn(personalId.value) ? '' : 'Ogiltigt personnummer';
  personalId.setCustomValidity(error);
})

function displaySaveButton () {
  saveButton.style.display = 'flex'
  savedCheckIcon.style.display = 'none'
  saveLoadingSpinner.style.display = 'none'
}

saveButton.addEventListener("click", async function () {
  switch (pageHeader.value) {
    case 'Adress':
      if (isAllValid([addressFirstName, addressLastName, addressCity, addressPostalCode, addressStreetAddress])) {
        await updateUserAddress()
      }
      addressFirstName.reportValidity()
      addressLastName.reportValidity()
      addressCity.reportValidity()
      addressPostalCode.reportValidity()
      addressStreetAddress.reportValidity()

      break
    case 'Skicka plagg':
      await updateShippingPreference()
      break
    case 'Personnummer':
      if (isValid(personalId)) {
        await updateUserPersonId()
      }
      personalId.reportValidity()
      break
    case 'Swish':
      if (isValid(swishNumber)) {
        await updateContactNumbers(true)
      }
      swishNumber.reportValidity()
      break
    case 'Mobilnummer':
      if (isValid(phoneNumber)) {
        await updateContactNumbers()
      }
      phoneNumber.reportValidity()
      break
  }
})

resetPageButton.addEventListener("click", () => {
  const formIds = {
    'Adress': 'addressForm',
    'Mobilnummer': 'phoneForm',
    'Swish': 'swishForm',
    'Personnummer': 'personIdForm',
    'Skicka plagg': 'shippingPrefForm',
  }
  document.getElementById(formIds[pageHeader.value]).style.display = 'none'
  document.getElementById('updateContainer').style.display = 'none'
  document.getElementById('goBackDiv').style.display = 'block'
  document.getElementById('resetPageDiv').style.display = 'none'
  settingsContainer.style.display = 'block'
  saveButton.style.display = 'none'
  saveLoadingSpinner.style.display = 'none'
  savedCheckIcon.style.display = 'none'
  pageHeader.innerHTML = 'Inställningar'
  pageHeader.value = 'Inställningar'
})

getUserInfo()
