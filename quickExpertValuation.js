import {
  uploadImageAndShowPreview, requestUniqueId, enhanceFrontImage, fieldLabelToggle
} from "./sellItemHelpers";
import {
  selectFieldValue,
} from "./sellItemModelSearch";
import { setupMenuHandlers, prepareMenu } from "./general";

async function expertValuationMain() {
  setupMenuHandlers();
  const menuChatButton = document.getElementById('menuChatButton');
  if (menuChatButton) {
    menuChatButton.style.display = 'none';
  }
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (sessionUser) {
    prepareMenu(sessionUser);
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
  itemCondition.addEventListener('change', () => itemCondition.setCustomValidity(''));
  emailInput.addEventListener('input', fieldLabelToggle('emailLabel'));
  emailInput.addEventListener('input', () => emailInput.setCustomValidity(''));

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

  nwt.addEventListener('click', () => {
    selectFieldValue(itemCondition, 'Helt ny, med prislapp kvar');
  })
  nwot.addEventListener('click', () => {
    selectFieldValue(itemCondition, 'Helt ny, men utan prislapp');
  })
  usedLikeNew.addEventListener('click', () => {
    selectFieldValue(itemCondition, 'Använd, men utan anmärkning');
  })
  usedGood.addEventListener('click', () => {
    selectFieldValue(itemCondition, 'Använd, tecken på slitage');
  })
  usedWorn.addEventListener('click', () => {
    selectFieldValue(itemCondition, 'Använd, tydligt slitage');
  })

  document.getElementById('expertValuationButton').addEventListener('click', async () => {
    const itemCondition = document.getElementById('itemCondition');
    const emailInput = document.getElementById('email');
    const item = JSON.parse(localStorage.getItem('newItem'));

    itemCondition.setCustomValidity('');
    emailInput.setCustomValidity('');

    if (!itemCondition.value) {
      itemCondition.setCustomValidity('Välj ett skick');
    }
    if (!emailInput.value) {
      emailInput.setCustomValidity('Fyll i en e-postadress');
    }

    if (itemCondition.value && !emailInput.value) {
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailInput.focus();
    }

    if (!document.querySelector('#valuateForm form').reportValidity()) {
      return;
    }

    const button = document.getElementById('expertValuationButton');
    button.disabled = true;
    document.getElementById('buttonSpinner').style.display = 'block';
    button.style.display = 'none';
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
