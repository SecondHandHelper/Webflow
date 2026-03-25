import {
  uploadImageAndShowPreview, requestUniqueId, enhanceFrontImage
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
  const itemBrandBg = window.getComputedStyle(itemBrand).backgroundColor;
  itemBrand.readOnly = true;
  itemBrand.style.backgroundColor = itemBrandBg;
  const itemCategory = document.getElementById('itemCategory');
  itemCategory.value = item?.category;
  itemCategory.readOnly = true;
  itemCategory.style.backgroundColor = itemBrandBg;
  const imageInput = document.getElementById('frontImage')
  console.log('imageInput', imageInput);
  imageInput.addEventListener('change', async (e) => {
    console.log('image uploading');
    const imageUrl = await uploadImageAndShowPreview(imageInput.files[0], 'frontImage', false);
    const item = JSON.parse(localStorage.getItem('newItem'));
    const enhancedImage = await enhanceFrontImage(imageUrl, false)
    item.imagesv2 = [{ name: 'frontImage', url: imageUrl }, { name: 'enhancedFrontImage', url: enhancedImage.url }];
    localStorage.setItem('newItem', JSON.stringify(item));
  })
  document.getElementById('expertValuationButton').addEventListener('click', async () => {
    const itemCondition = document.getElementById('itemCondition');
    const emailInput = document.getElementById('email');
    const imageInput = document.getElementById('frontImage');
    const item = JSON.parse(localStorage.getItem('newItem'));

    itemCondition.setCustomValidity('');
    emailInput.setCustomValidity('');
    imageInput.setCustomValidity('');

    if (!itemCondition.value) {
      itemCondition.setCustomValidity('Skick måste väljas');
    }
    if (!emailInput.value) {
      emailInput.setCustomValidity('E-post måste fyllas i');
    }
    if (!item?.imagesv2?.length) {
      imageInput.setCustomValidity('Bild måste laddas upp');
    }

    if (!document.querySelector('#valuateForm form').reportValidity()) {
      return;
    }

    const button = document.getElementById('expertValuationButton');
    button.disabled = true;
    document.getElementById('buttonSpinner').style.display = 'block';
    item.status = 'Draft';
    item.version = '2'

    item.condition = itemCondition.value;
    item.valuationEmail = emailInput.value;
    item.model = document.getElementById('itemModel').value;
    const id = await requestUniqueId();
    const createItemResponse = await callBackendApi(`/api/items/${id}`, { requiresAuth: false, data: { item } });
    const estimatedValuationData = JSON.parse(localStorage.getItem('valuation'));
    const estimatedData = {
      estimatedValuation: estimatedValuationData,
      newMinPriceEstimate: estimatedValuationData.minPriceEstimate,
      newMaxPriceEstimate: estimatedValuationData.maxPriceEstimate,
      ...(estimatedValuationData.decline ||
        estimatedValuationData.humanCheckNeeded
          ? {}
          : {
              valuationStatus: 'Completed',
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
    document.getElementById('email').value = user.current.email;
    const backgroundColor = window.getComputedStyle(document.getElementById('email')).backgroundColor;
    document.getElementById('email').readOnly = true;
    document.getElementById('email').style.backgroundColor = backgroundColor;
  }
})
