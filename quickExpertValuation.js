import {
  uploadImageAndShowPreview, requestUniqueId, enhanceFrontImage, fieldLabelToggle
} from "./sellItemHelpers";

function showMenu(u) {
  let identifier = '';
  let signInMethodText;
  if (u.signInMethod.includes('phone') && u.phoneNumber) {
    identifier = u.phoneNumber;
    signInMethodText = 'Inloggad med SMS-kod';
  } else if (u.signInMethod.includes('password') && u.email) {
    identifier = u.email;
    signInMethodText = 'Inloggad med email';
  } else if (u.signInMethod.includes('google') && u.email){
    identifier = u.email;
    signInMethodText = 'Inloggad med Google';
  }
  if (identifier) {
    account.innerHTML = identifier;
    account.style.display = 'block';
    accountSignInMethod.innerHTML = signInMethodText;
    accountSignInMethod.style.display = 'block';
  }
  if (u.addressFirstName && u.addressLastName) {
    accountName.innerHTML = u.addressFirstName + ' ' + u.addressLastName;
    accountName.style.display = 'block';
  }
  if (u?.referralData?.referralCode) {
    menuInviteLink.style.display = 'block';
  }
  menuButton.style.display = 'flex';
}

async function expertValuationMain() {
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (sessionUser) {
    showMenu(sessionUser);
  }
  Webflow.push(function () {
    $('form').submit(function () {
      return false;
    });
  });
  const item = JSON.parse(localStorage.getItem('newItem'));
  const itemBrand = document.getElementById("itemBrand");
  itemBrand.value = item?.brand;
  const itemCategory = document.getElementById('itemCategory');
  itemCategory.value = item?.category;
  const itemModel = document.getElementById('itemModel');
  const itemCondition = document.getElementById('itemCondition');
  const emailInput = document.getElementById('email');

  const toggleConditionColor = () => {
    itemCondition.style.color = itemCondition.value ? '#101010' : '#B9B9B9';
  };
  toggleConditionColor();

  itemModel.addEventListener('input', fieldLabelToggle('itemModelLabel'));
  itemCondition.addEventListener('input', fieldLabelToggle('itemConditionLabel'));
  itemCondition.addEventListener('change', fieldLabelToggle('itemConditionLabel'));
  itemCondition.addEventListener('change', toggleConditionColor);
  emailInput.addEventListener('input', fieldLabelToggle('emailLabel'));

  // Initialize label visibility for prefilled values.
  fieldLabelToggle('itemModelLabel')({ target: itemModel });
  fieldLabelToggle('itemConditionLabel')({ target: itemCondition });
  fieldLabelToggle('emailLabel')({ target: emailInput });

  const imageInput = document.getElementById('frontImage')
  imageInput.addEventListener('change', async (e) => {
    const imageUrl = await uploadImageAndShowPreview(imageInput.files[0], 'frontImage', false);
    const item = JSON.parse(localStorage.getItem('newItem'));
    const enhancedImage = await enhanceFrontImage(imageUrl, false)
    item.images = { frontImage: imageUrl, enhancedFrontImage: enhancedImage.url };
    localStorage.setItem('newItem', JSON.stringify(item));
  })
  document.getElementById('startOverButton')?.addEventListener('click', () => {
    window.location.href = '/valuation';
  });
  document.getElementById('expertValuationButton').addEventListener('click', async () => {
    const itemCondition = document.getElementById('itemCondition');
    const emailInput = document.getElementById('email');
    const item = JSON.parse(localStorage.getItem('newItem'));

    itemCondition.setCustomValidity('');
    emailInput.setCustomValidity('');

    if (!itemCondition.value) {
      itemCondition.setCustomValidity('Skick måste väljas');
    }
    if (!emailInput.value) {
      emailInput.setCustomValidity('E-post måste fyllas i');
    }

    if (!document.querySelector('#valuateForm form').reportValidity()) {
      return;
    }

    const button = document.getElementById('expertValuationButton');
    button.disabled = true;
    document.getElementById('buttonSpinner').style.display = 'block';
    item.status = 'Draft';
    item.version = '2'
    item.preferences = {
      userValuationApproval: true,
    }

    item.condition = itemCondition.value;
    item.valuationEmail = emailInput.value;
    item.model = document.getElementById('itemModel').value;
    const id = await requestUniqueId();
    await callBackendApi(`/api/items/${id}`, { requiresAuth: false, data: { item } });
    const estimatedValuationData = JSON.parse(localStorage.getItem('valuation'));
    const estimatedData = {
      estimatedValuation: estimatedValuationData,
      newMinPriceEstimate: estimatedValuationData.minPriceEstimate,
      newMaxPriceEstimate: estimatedValuationData.maxPriceEstimate,
      ...(estimatedValuationData.decline ||
        estimatedValuationData.humanCheckNeeded
          ? {}
          : {
              valuationDate: new Date().toISOString(),
              infoRequests: {
                price: {
                  type: 'MLValuation',
                  status: 'Active',
                  response: '',
                  description:
                    'Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar. Värderingen utgår från vad liknande sålts för.',
                  minPrice: estimatedValuationData.minPriceEstimate,
                  maxPrice: estimatedValuationData.maxPriceEstimate,
                },
              },
            })
    };
    await callBackendApi(`/api/valuation/${id}`, { requiresAuth: false, data: estimatedData });
    await callBackendApi(`/api/valuation/${id}`, { requiresAuth: false,data:
      {
        minPrice: estimatedValuationData.minPriceEstimate,
        maxPrice: estimatedValuationData.maxPriceEstimate,
        expertValuationRequested: true
      }, method: 'PUT' });
    localStorage.removeItem('newItem');
    localStorage.removeItem('valuation');
    document.getElementById('valuateForm').style.display = 'none';
    document.getElementById('expertInstruction').style.display = 'none';
    document.getElementById('expertValuationSent').style.display = 'flex';
  })
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the bfcache.');
    if (menu.style.display !== 'none') { menu.style.display = 'none' }
  }
});

expertValuationMain();
user.whenSet(async () => {
  if (user.current?.email) {
    const emailInput = document.getElementById('email');
    emailInput.value = user.current.email;
    fieldLabelToggle('emailLabel')({ target: emailInput });
  }
})
