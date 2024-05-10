import {
  capitalizeFirstLetter, checkBlockedOrLowShareSoldBrand,
  enhanceFrontImage, initializeCategorySelect,
  rememberNewItemImageField,
  requestUniqueId,
  showDeleteImageIcon,
  showImagePreview,
  showImageState,
  showLoadingIcon,
  uploadImageAndShowPreview,
  fieldLabelToggle
} from "./sellItemHelpers";
import QRCode from "qrcode";
import { formatPersonalId, getFormAddressFields, isValidSwedishSsn } from "./general";
import { autocomplete, brands } from "./autocomplete-brands";
import { setFieldValue, setupModelSearchEventListeners } from "./sellItemModelSearch";


let itemDraftSaved = false;
const params = getParamsObject();
let itemDraft;

async function addUserDetails() {
  // Grab values from form
  const addressFields = getFormAddressFields();

  let personalId = document.getElementById("personalId").value;
  personalId = personalId ? formatPersonalId(personalId) : null;

  // Write to Firestore
  const itemRef = db.collection('users').doc(authUser.current.uid);
  itemRef.update({
    ...addressFields,
    personalId
  })
    .then(() => {
      console.log(`User address of ${authUser.current.uid} is now updated`);
      itemConfirmationScreen.style.display = 'block';
      addressFormDiv.style.display = 'none';
    })
    .catch((error) => {
      errorHandler.report(error);
      console.error("Error updating document: ", error);
    });
}

function defectsChoicesInSwedish() {
  return new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("pilling", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
}
function imageElements() {
  return ["frontImage", "brandTagImage", "defectImage", "materialTagImage", "extraImage"];
}

async function trackUserActivated() {
  // Track with segment 'User Activated'
  if ((await userItemsCount()) === 1) {
    analytics.track('User Activated');
  }
}

async function userItemsCount() {
  const items = await getItems(authUser.current.uid);
  return items.docs.filter(i => i.data()?.status !== 'Draft').length;
}

function imageUploadHandlers() {
  let frontImageUpload = document.getElementById("frontImage");
  let brandTagImageUpload = document.getElementById("brandTagImage");
  let productImageUpload = document.getElementById("productImage");
  let defectImageUpload = document.getElementById("defectImage");
  let materialTagImageUpload = document.getElementById("materialTagImage");
  let extraImageUpload = document.getElementById("extraImage");

  // display image when file has been selected
  $('#frontImage').off('change');
  frontImageUpload.addEventListener('change', frontImageChangeHandler, { capture: true });
  $('#brandTagImage').off('change');
  brandTagImageUpload.addEventListener('change', brandTagImageChangeHandler, { capture: true });
  $('#productImage').off('change');
  productImageUpload.addEventListener('change', productImageChangeHandler, { capture: true });
  $('#defectImage').off('change');
  defectImageUpload.addEventListener('change', defectImageChangeHandler, { capture: true });
  $('#materialTag').off('change');
  materialTagImageUpload.addEventListener('change', materialTagImageChangeHandler, { capture: true });
  $('#extraImage').off('change');
  extraImageUpload.addEventListener('change', extraImageChangeHandler, { capture: true });
}

async function sellItemMainAuthenticated() {
  console.log("sellItemMainAuthenticated " + new Date());
  if (params.type !== 'draft' && params.type !== 'resell') {
    document.getElementById('saveItemDraftButton').style.display = 'flex';
  }
  window.addEventListener('beforeunload', () => {
    if (params.id || itemDraftSaved) {
      localStorage.removeItem('newItem');
    }
  });
  // Visa alla "viktiga" fält om man är inloggad
  toggleMoreInfoFields.click();

  // Create item from sessionStorage
  if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
    // ... if we are redirected here from the sign-in page
    if (document.referrer.includes('/sign-in')) {
      document.getElementById('loadingDiv').style.display = 'flex';
      document.getElementById('creatingItemText').style.display = 'block';
      await createItemAfterSignIn();
      const shippingMethod = sessionStorage.getItem('shippingMethod');
      if (shippingMethod) {
        await firebase.app().functions("europe-west1").httpsCallable('updateFirebaseUser')({ preferences: { shippingMethod } });
      }
      const userPhoneSet = user.current?.phoneNumber?.length;
      return location.href = userPhoneSet ? '/item-confirmation' : '/user-contact';
    } else {
      // otherwise make sure to remove any previously saved item as a precaution
      sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    }
  }
}

async function sellItemMain() {
  const qrCanvas = document.getElementById('qrCanvas')
  if (qrCanvas) {
    QRCode.toCanvas(qrCanvas, window.location.href, function (error) {
      if (error) console.error(error)
      console.log('success!');
    });
  }
  localStorage.removeItem('latestItemCreated');
  sessionStorage.removeItem('itemValuation');

  // Initial state
  imageUploadHandlers();
  setupModelSearchEventListeners();
  initializeSelectColor();
  initializeInputEventListeners();
  autocomplete(document.getElementById("itemBrand"), brands);

  // Hide/Show warning about difficulty to sell certain brands
  let brand = document.getElementById("itemBrand");
  const category = document.getElementById('itemCategory');
  brand.oninput = function () {
    shareSoldDiv.style.display = 'none';
    checkBlockedOrLowShareSoldBrand(this.value, category.value);
  };
  brand.onblur = function () {
    const hardToSellDiv = document.getElementById('hardToSellDiv');
    const unknownBrandWords = ['Okänt', 'Unknown', 'Vet ej', 'Vet inte', 'Okänd', 'Se bild'];
    if (unknownBrandWords.some(words => this.value.toLowerCase().includes(words.toLowerCase())) || (this.value.length && !this.value.match(/(\w|\d)/))) {
      hardToSellText.innerHTML = `Vi känner inte till märket '${this.value}', och säljer i regel inte okända varumärken.`;
      stopIcon.style.display = 'none';
      warningIcon.style.display = 'block';
      hardToSellDiv.style.display = 'block';
    }
  }

  // Hide/Show extra fields for defects
  itemCondition.onchange = function () {
    let input = this.value;
    if (input === "Använd, tecken på slitage") {
      defectInfoDiv.style.display = 'block';
      itemCondition.style.color = "#333";
    } else if (input === "") {
      defectInfoDiv.style.display = 'none';
      itemCondition.style.color = "#929292";
    } else {
      defectInfoDiv.style.display = 'none';
      itemCondition.style.color = "#333";
    }
  };

  personalId.addEventListener("input", () => {
    const error = isValidSwedishSsn(personalId.value) ? '' : 'Ogiltigt personnummer';
    personalId.setCustomValidity(error);
  })

  initializeCategorySelect();
  await initializeColorConfirm();
  await initializeBrandConfirm();
  await initializeMaterialConfirm();
  await initializeSizeConfirm();
  initializeSuggestButtonsSaveState();
  initializeClearFormButton();
  initializeSaveFormButton();

  initializeDeleteImageListeners();
  document.getElementById('clearItemForm').addEventListener('click', clearFormFields);
  window.addEventListener('scroll', function scrolledToBottom() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 40) {
      document.getElementById('bottomBarContainer').classList.add('sticky-bottom-bar');
      window.removeEventListener('scroll', scrolledToBottom);
    }
  });
  if (params.id) {
    // Fill form if the user comes from a prefill link (re-sell item or continue with draft item)
    sessionStorage.removeItem('newItemId');
    localStorage.removeItem('newItem');
    auth.onAuthStateChanged(function (user) {
      if (!user) { document.getElementById('maiIntro').style.display = 'block'; }
    });
    document.getElementById('resellIntro').style.display = 'block';
    document.getElementById('bottomBarContainer').classList.add('sticky-bottom-bar');
    document.getElementById('clearItemForm').style.display = 'none';
    if (params.type === 'draft' || params.type === 'resell') {
      document.querySelector('#resellIntro .text-block-176').innerText = 'Fyll i de sista detaljerna för att sälja ditt plagg och kontrollera skickbeskrivningen.';
      document.getElementById("frontImage").required = true;
      document.getElementById("brandTagImage").required = true;
    }
    await fillForm(params.id, null, params.type === 'draft');
    document.getElementById("triggerShowSellItemContent").click();
  } else if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sign-in')) {
    // A new item will be created in sellItemMainAuthenticated
  } else if (localStorage.getItem('newItem') && !isDefaultFormState(JSON.parse(localStorage.getItem('newItem')))) {
    // Saved state from a previous visit to /sell-item - restore the data
    const newItem = JSON.parse(localStorage.getItem('newItem'));
    document.getElementById("frontImage").required = true;
    document.getElementById("brandTagImage").required = true;
    await fillForm(null, newItem, true);
    document.getElementById('clearItemForm').style.display = 'block';
    document.getElementById("triggerShowSellItemContent").click();
  } else {
    document.getElementById("triggerShowSellItemContent").click();
    document.getElementById("frontImage").required = true;
    document.getElementById("brandTagImage").required = true;
  }
  initializeSaveStateListeners();
  initializeRestoreOnNavigation();
}

async function addItem() {
  const id = params.type === 'draft' ? params.id : (sessionStorage.getItem('newItemId') || await requestUniqueId());
  try {
    document.getElementById('addItemFormDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    document.getElementById('clearItemForm').style.display = 'none';
    document.getElementById('saveItemDraftDiv').style.display = 'none';
    const item = await addItemInner(id);
    const nextStep = await getAndSaveValuation(id, item);
    location.href = nextStep;
  } catch (e) {
    errorHandler.report(e);
    console.error('addItem failed', e);
  }
}

function needsHumanCheck({ humanCheckNeeded, newMinMaxLog, lowValueSegment, lowValueCategory }) {
  return humanCheckNeeded || (newMinMaxLog.match(/accept price is above max/i) && !lowValueSegment && !lowValueCategory)
}

async function saveValuationInStorageOrBackend(valuationData, itemId) {
  if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
    const item = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({
      id: item.id,
      item: { ...item.item, ...valuationData }
    }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('saveItemValuationFields')({ itemId, ...valuationData });
    const latestItemCreated = JSON.parse(localStorage.getItem('latestItemCreated'));
    localStorage.setItem('latestItemCreated', JSON.stringify({ ...latestItemCreated, ...valuationData }));
  }
}

async function saveItemValuation(itemId, mlValuationData) {
  const { minPrice, maxPrice, decline, humanCheckNeeded, humanCheckExplanation, willNotSell, soldPrice, version,
    newMinPriceEstimate, newMaxPriceEstimate, newMinMaxLog, adjustmentAllowed, newBrand, newBrandCategory,
    valuatedBrandItems, brandMeanMax, brandAccuracy, brandCategoryAccuracy, fewBrand, brandMeanSold,
    brandCategoryMeanSold, highPriceVarBrandCategory, brandShareSold } = mlValuationData || {};
  if (!minPrice && !decline) {
    return;
  }
  const valuationData = {
    mlValuation: {
      decline, humanCheckNeeded, minPriceEstimate: minPrice, maxPriceEstimate: maxPrice,
      humanCheckExplanation,
      willNotSellPrediction: willNotSell,
      soldPriceEstimate: soldPrice,
      modelVersion: version?.toString(),
      newMinPriceEstimate, newMaxPriceEstimate, newMinMaxLog, adjustmentAllowed, newBrand, newBrandCategory,
      valuatedBrandItems, brandMeanMax, brandAccuracy, brandCategoryAccuracy, fewBrand, brandMeanSold,
      brandCategoryMeanSold, highPriceVarBrandCategory, brandShareSold
    },
    ...(decline || needsHumanCheck(mlValuationData) ? {} : {
      valuationStatus: 'Completed',
      valuationDate: new Date().toISOString(),
      infoRequests: {
        price: {
          status: 'Active',
          response: '',
          description: 'Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar. Värderingen utgår från vad liknande sålts för.',
          minPrice: newMinPriceEstimate || minPrice,
          maxPrice: newMaxPriceEstimate || maxPrice,
        }
      }
    })
  }
  await saveValuationInStorageOrBackend(valuationData, itemId);
}

function round10(val) {
  return Math.round((val || 0) / 10) * 10;
}

async function setValuationFromResellItem(resellItem, item, itemId) {
  const maxPrice = resellItem.status === 'Sold' ? resellItem.maxPriceEstimate :
    Math.min(resellItem.maxPriceEstimate,
      Math.max(resellItem.minPriceEstimate + 150, round10(resellItem.minPriceEstimate * 1.3)));
  const valuationData = {
    valuationStatus: 'Completed',
    valuationDate: new Date().toISOString(),
    infoRequests: {
      price: {
        status: 'Active',
        response: '',
        description: 'Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar. Värderingen utgår från vad liknande sålts för.',
        minPrice: resellItem.minPriceEstimate,
        maxPrice: maxPrice,
        type: 'Valuation',
        source: 'createdFromItem',
        adjustmentAllowed: true,
      }
    }
  }
  await saveValuationInStorageOrBackend(valuationData, itemId);
}

async function getAndSaveValuation(itemId, item) {
  if (!itemId && !item) {
    console.error('No item and no itemId, unexpected!!');
    return '/item-confirmation';
  }
  if (params.id && params.type !== 'draft') {
    const getItemResponse = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId: params.id });
    const resellItem = getItemResponse.data;
    await setValuationFromResellItem(resellItem, item, itemId);
    return '/item-valuation';
  }
  try {
    const res = await firebase.app().functions("europe-west1").httpsCallable('itemMlValuation')({ itemId, item });
    const { minPrice, maxPrice, decline } = res.data || {};
    await saveItemValuation(itemId, res.data);
    return nextStepAfterValuation(minPrice && maxPrice, decline, needsHumanCheck(res.data));
  } catch (e) {
    console.error('Failed to get ml valuation', e);
  }
  return nextStepAfterValuation();
}

function nextStepAfterValuation(mlValuationPresent, decline, valuationNeedsChecking) {
  if (!mlValuationPresent || valuationNeedsChecking) {
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
      return '/sign-in';
    }
    const userPhoneSet = user.current?.phoneNumber?.length;
    return userPhoneSet ? '/item-confirmation' : '/user-contact';
  }
  return '/item-valuation';
}

function defaultFormState() {
  return {
    acceptPrice: null,
    age: null,
    brand: null,
    category: null,
    color: null,
    condition: null,
    defectDescription: null,
    defects: [],
    images: {},
    material: null,
    model: null,
    originalPrice: null,
    userValuationApproval: true,
    sex: "Woman",
    size: null,
    userComment: null,
  }
}

function collect() {
  let sex = "";
  const now = new Date();
  let shippingStatus = "Not sent";
  const size = itemSize.value;
  const material = itemMaterial.value ? itemMaterial.value.trim() : "";
  const brand = itemBrand.value ? itemBrand.value.trim() : "";
  const model = itemModel.value ? itemModel.value.trim() : "";
  const originalPrice = Number(itemOriginalPrice.value);
  const age = itemAge.value;
  const condition = itemCondition.value;
  const defectDescription = itemDefectDescription.value ? itemDefectDescription.value.trim() : "";
  const userComment = itemUserComment.value ? itemUserComment.value.trim() : "";
  const acceptPrice = Number(itemLowestAcceptPrice.value);

  // Get defects list
  let defectElements = new Map().set("hole", hole.checked).set("stain", stain.checked).set("lostFit", lostFit.checked).set("pilling", pilling.checked).set("threadUp", threadUp.checked).set("colorChange", colorChange.checked).set("otherDefect", otherDefect.checked);
  let defects = [];
  if (condition === 'Använd, tecken på slitage') {
    defectElements.forEach((value, key) => {
      if (value) {
        let string = defectsChoicesInSwedish().get(key);
        defects.push(string);
      }
    });
  }


  // Get radio buttons
  var sexRadioButtons = document.getElementsByName("Sex");
  for (var x = 0; x < sexRadioButtons.length; x++) {
    if (sexRadioButtons[x].checked) {
      sex = sexRadioButtons[x].id;
    }
  }

  const modelBoxFilled = document.getElementById('findModelBoxFilled');
  let modelVariantFields = {};
  if (modelBoxFilled.style.display === 'flex') {
    // There is a current model selected grab the cover image and id from it
    const modelData = JSON.parse(modelBoxFilled.getAttribute('data-model'));
    modelVariantFields = {
      modelCoverImageUrl: modelData['coverImage'],
      atModelVariantId: modelData['atVariantId'],
    }
  }

  const images = JSON.parse(localStorage.getItem('newItem') || '{}').images

  return {
    user: authUser.current?.uid || null,
    createdAt: now.toISOString(),
    status,
    shippingStatus,
    sex,
    size,
    material,
    color: itemColor.value,
    category: itemCategory.value,
    brand,
    model,
    originalPrice,
    age,
    condition,
    defects,
    defectDescription,
    userComment,
    acceptPrice,
    preferences: { userValuationApproval: true },
    ...modelVariantFields,
    images,
  };
}

async function getShippingMethod() {
  // If first time: User chooses shipping method preference in sell item form
  let shippingMethod = 'Service point';
  if (!user.current?.preferences?.shippingMethod) {
    if (authUser.current) {
      await firebase.app().functions("europe-west1").httpsCallable('updateFirebaseUser')({ preferences: { shippingMethod } });
    } else {
      sessionStorage.setItem('shippingMethod', shippingMethod);
    }
  } else {
    shippingMethod = user.current?.preferences?.shippingMethod;
  }
  return shippingMethod;
}

async function addItemInner(id, status = 'New') {
  const { modelCoverImageUrl, images, ...pageData } = collect();
  const shippingMethod = await getShippingMethod();
  if (modelCoverImageUrl) {
    images['modelImage'] = modelCoverImageUrl;
  }
  const createdFromItem = (params.id && params.type !== 'draft') ? { createdFromItem: params.id } : {};
  const isCreatedFromItem = Object.keys(createdFromItem).length ? true : false;
  const draftSource = status === 'Draft' ? { draftSource: isCreatedFromItem ? 'Mai purchase' : 'Sell item' } : {};
  const item = { ...pageData, status, ...draftSource, shippingMethod, images, ...createdFromItem, version: "2" };

  if (!authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    const createItemResponse = await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });

    await trackUserActivated();
    await setCampaignCoupon();
    localStorage.removeItem('newItem');
    sessionStorage.removeItem('newItemId');
    localStorage.setItem('latestItemCreated', JSON.stringify(createItemResponse.data));

    //Archive if "createdFromItem" is same seller
    if (isCreatedFromItem) {
      const createdFromItemUserId = await getCreatedFromItemUserId(params.id);
      if (createdFromItemUserId === authUser.current.uid){
        await db.collection('items').doc(params.id).update( {'archived': true} );
      }
    }
  }
  return { ...item, id };
}

async function getCreatedFromItemUserId(itemId) {
  console.log('getCreatedFromItemUserId()');
  const item = await db.collection("items").doc(itemId).get();
  if (!item.exists) return null;
  return item.data().user;
}

function initializeInputEventListeners() {
  itemBrand.addEventListener('input', fieldLabelToggle('itemBrandLabel'));
  itemBrand.addEventListener('input', clearConfirmButtonValidity);
  itemModel.addEventListener('input', fieldLabelToggle('itemModelLabel'));
  itemSize.addEventListener('input', fieldLabelToggle('itemSizeLabel'));
  itemSize.addEventListener('input', clearConfirmButtonValidity);
  itemMaterial.addEventListener('input', fieldLabelToggle('itemMaterialLabel'));
  itemMaterial.addEventListener('input', clearConfirmButtonValidity);
  itemOriginalPrice.addEventListener('input', fieldLabelToggle('itemOriginalPriceLabel'));
  itemAge.addEventListener('input', fieldLabelToggle('itemAgeLabel'));
  itemCondition.addEventListener('input', fieldLabelToggle('itemConditionLabel'));
  itemColor.addEventListener('change', fieldLabelToggle('itemColorLabel'));
  itemColor.addEventListener('input', clearConfirmButtonValidity);
  itemUserComment.addEventListener('input', fieldLabelToggle('userCommentLabel'));

  document.getElementById('saveItemDraftButton').addEventListener('click', async () => {
    document.getElementById('saveItemDraftButton').style.display = 'none';
    document.getElementById('saveDraftSpinner').style.display = 'flex';
    const id = sessionStorage.getItem('newItemId') || await requestUniqueId();
    const item = await addItemInner(id, 'Draft');
    itemDraftSaved = true;
    itemDraft = item;
    document.getElementById('clearItemForm').style.display = 'none';
    document.getElementById('saveDraftSpinner').style.display = 'none';
    document.getElementById('darkOverlay').style.display = 'block';
    const image = item.images?.enhancedFrontImageSmall || item.images?.enhancedFrontImage || item.images?.frontImage;
    if (image) {
      document.getElementById('popUpImage').src = image;
      document.getElementById('popUpImageDiv').style.display = 'block';
      document.getElementById('popUpCheckmark').style.display = 'none';
    } else {
      document.getElementById('popUpImage').src = '';
      document.getElementById('popUpImageDiv').style.display = 'none';
      document.getElementById('popUpCheckmark').style.display = 'block';
    }
    document.getElementById('itemDraftSavedPopup').style.display = 'flex';
  });
  document.getElementById('closeItemSavedPopup').addEventListener('click', () => {
    document.getElementById('itemDraftSavedPopup').style.display = 'none';
    document.getElementById('darkOverlay').style.display = 'none';
  });
  document.getElementById('popUpNewItem').addEventListener('click', () => {
    clearFormFields();
    location.href = '/sell-item';
  });
  document.getElementById('goToMyWardrobe').addEventListener('click', () => {
    window.location.href = '/private#wardrobe';
  });

  document.getElementById('addItemButton').addEventListener('click', () => {
    document.getElementById('wf-form-Add-Item').reportValidity();
    const invalidElements = document.getElementById('wf-form-Add-Item').querySelectorAll(':invalid');
    const element = invalidElements?.[0];
    if (element && element.getBoundingClientRect().height <= 1) {
      element.style.cssText = 'width:100% !important;height:100% !important;'
    }
    setTimeout(() => {
      if (invalidElements.length > 0) {
        if (!isElementInView(element)) {
          const y = element.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        document.getElementById('wf-form-Add-Item').reportValidity();
      }
    }, 300);
  });
  addItemForm.addEventListener("submit", () => addItem());
  userAddressForm.addEventListener("submit", addUserDetails);

}

function isElementInView(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight / 2 || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

async function setCampaignCoupon() {
  const campaignDateOk = new Intl.DateTimeFormat('se-SV').format(new Date()) <= '2024-03-10';
  if (campaignDateOk && getCookie('noCommissionCampaignCookie') === 'noCommission' && (await userItemsCount()) === 1) {
    await firebase.app().functions("europe-west1").httpsCallable('setNoCommissionCoupon')();
  }
}

async function createItemAfterSignIn() {
  const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
  sessionStorage.removeItem('newItemId');
  await firebase.app().functions("europe-west1").httpsCallable('createItem')(itemFromStorage);
  await trackUserActivated();
  await setCampaignCoupon()
  localStorage.removeItem('newItem');
  itemFromStorage.item.id = itemFromStorage.id;
  localStorage.setItem('latestItemCreated', JSON.stringify(itemFromStorage.item));
}

const shouldSaveState = () => !(localStorage.getItem('latestItemCreated') || itemDraftSaved || params.id);

function rememberUnsavedChanges() {
  if (!shouldSaveState()) {
    return;
  }
  const {
    user, createdAt, status, shippingStatus, modelVariantFields, ...itemToSave
  } = collect();
  // Replace '' with null values
  const item = Object.keys(itemToSave).reduce((acc, key) => {
    acc[key] = itemToSave[key] === '' ? null : itemToSave[key];
    return acc;
  }, {});
  item.defects = item.defects ? item.defects : [];
  item.userValuationApproval = true;
  delete item.preferences;
  item.acceptPrice = item.acceptPrice && item.acceptPrice > 0 ? item.acceptPrice : null;
  item.originalPrice = item.originalPrice && item.originalPrice > 0 ? item.originalPrice : null;
  ['itemBrand', 'itemSize', 'itemMaterial', 'itemColor'].forEach(inputName => {
    const suggestButtons = document.getElementById(inputName).parentNode.querySelector('.suggest-buttons') ||
      document.getElementById(inputName).parentNode.parentNode.querySelector('.suggest-buttons');
    if (suggestButtons?.style?.display === 'block') {
      item[`${inputName}Confirm`] = true;
    }
  })
  if (!isDefaultFormState(item)) {
    localStorage.setItem('newItem', JSON.stringify(item));
  } else {
    localStorage.removeItem('newItem');
  }
}

function isDraftItemChanged(itemState) {
  if (!itemDraft) {
    return false;
  }
  return itemStateDiffers(itemState, itemDraft);
}

function itemStateDiffers(itemState, defaultState) {
  for (const field in defaultState) {
    if (!(field in itemState)) {
      continue;
    }
    if (defaultState[field] instanceof Object) {
      if (JSON.stringify(defaultState[field]) !== JSON.stringify(itemState[field])) {
        return false
      }
      continue;
    }
    if (itemState[field] !== defaultState[field]) {
      return false;
    }
  }
  return true;
}

function isDefaultFormState(itemState) {
  return itemStateDiffers(itemState, defaultFormState());
}

function showSuggestButtons(fieldName, restoreSavedState, showConfirmation) {
  if (restoreSavedState && showConfirmation) {
    const suggestButtons = document.getElementById(fieldName).parentNode.querySelector('.suggest-buttons') ||
      document.getElementById(fieldName).parentNode.parentNode.querySelector('.suggest-buttons');
    suggestButtons.style.display = 'block';
    document.getElementById(fieldName).setCustomValidity('Bekräfta eller ändra värdet');
  }
}

async function fillForm(itemId, savedItem = null, restoreSavedState = false) {
  try {
    let item = { data: savedItem };
    let atItemResponse = null;
    if (!savedItem) {
      [item, atItemResponse] = await Promise.all([
        firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId }),
        fetch(`https://getatitem-heypmjzjfq-ew.a.run.app?itemId=${itemId}`)
      ]);
      itemDraft = item;
    }
    const atItem = (await atItemResponse?.json()) || {};
    const data = item.data;
    const images = data.images || {};
    let originalPrice = data.originalPrice;
    if (originalPrice <= 0) {
      originalPrice = null;
    }

    // Populate images
    for (const imageName in images) {
      let urlSmall = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[imageName] || images[`${imageName}Large`];
      let urlLarge = images[imageName] || images[`${imageName}Large`] || images[`${imageName}Medium`] || images[`${imageName}Small`];
      if (imageElements().includes(imageName)) {
        rememberNewItemImageField(imageName, urlLarge, urlSmall);
        if (imageName === 'frontImage') {
          if (images.enhancedFrontImage) {
            urlSmall = images['enhancedFrontImageSmall'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImage'] || images['enhancedFrontImageLarge'];
            urlLarge = images['enhancedFrontImage'] || images['enhancedFrontImageLarge'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImageSmall'];
            rememberNewItemImageField('enhancedFrontImage', urlLarge, urlSmall);
          } else {
            whenLoadingDivHidden(() => showLoadingIcon(imageName))
            // Don't await here to don't block the form from showing with the front image
            enhanceFrontImage(urlLarge).then(() => console.log('Image enhanced'));
          }
        }
        showImagePreview(imageName, urlSmall);
        showImageState(imageName, 'success-state');
        document.getElementById(imageName).required = false;
      }
    }
    if (images.modelImage) {
      const modelImageLarge = images.modelImageLarge || images.modelImage;
      const modelImageSmall = images.modelImageSmall || images.modelImageMedium || images.modelImage;
      document.getElementById('coverImageContainer').style.backgroundImage = `url('${modelImageSmall}')`;
      document.getElementById('coverImagePreview').style.display = 'block';
      rememberNewItemImageField('modelImage', modelImageLarge, modelImageSmall);
    } else if (images.coverImage && !(await isNoBgImage(images.coverImage))) {
      // Show cover image preview if it is a model image, if it is a noBg image we skip it
      sessionStorage.removeItem('coverImagePreviewUrl');
      const coverImageLarge = images.coverImageLarge || images.coverImage;
      const coverImageSmall = images.coverImage;
      document.getElementById('coverImageContainer').style.backgroundImage = `url('${coverImageSmall}')`;
      document.getElementById('coverImagePreview').style.display = 'block';
      rememberNewItemImageField('modelImage', coverImageLarge, coverImageSmall);
    }

    // Populate text input fields
    itemBrand.value = data.brand || '';
    showSuggestButtons('itemBrand', restoreSavedState, data.itemBrandConfirm);
    // Don't use the setFieldValue for the brand since that triggers a dropdown to open
    document.getElementById('itemBrandLabel').style.display = data.brand ? 'inline-block' : 'none';
    setFieldValue('itemSize', data.size);
    showSuggestButtons('itemSize', restoreSavedState, data.itemSizeConfirm);
    setFieldValue('itemMaterial', data.material);
    showSuggestButtons('itemMaterial', restoreSavedState, data.itemMaterialConfirm);
    setFieldValue('itemModel', data.model || atItem?.model);
    setFieldValue('itemOriginalPrice', originalPrice || atItem?.originalPrice);

    if (restoreSavedState) {
      setFieldValue('itemUserComment', data.userComment);
      setFieldValue('itemDefectDescription', data.defectDescription);
      setFieldValue('itemLowestAcceptPrice', data.acceptPrice <= 0 ? null : data.acceptPrice);
      selectFieldValue(itemCondition, data.condition);
    }
    if (params.id && data.status === 'Sold') {
      document.getElementById('priceSettings').style.display = 'none';
    }

    // Populate select fields
    selectFieldValue(itemAge, data.age);
    selectFieldValue(itemColor, data.color || atItem?.color);
    showSuggestButtons('itemColor', restoreSavedState, data.itemColorConfirm);
    if (itemCondition.selectedIndex >= 0 && itemCondition.options[itemCondition.selectedIndex].text === "Använd, tecken på slitage") {
      defectInfoDiv.style.display = 'block';
    }
    const itemCategory = $('#itemCategory');
    itemCategory.val(data.category);
    itemCategory.trigger('change');

    // Populate radio-buttons
    if (data.sex) {
      document.getElementById('Woman').previousElementSibling.classList.remove("w--redirected-checked"); // Unselect radio button 'Woman'
      document.getElementById('Woman').checked = false;
      document.getElementById(data.sex).previousElementSibling.classList.add("w--redirected-checked"); // Populate the right one
      document.getElementById(data.sex).checked = true;
    } else {
      document.getElementById('Woman').previousElementSibling.classList.add("w--redirected-checked"); // Unselect radio button 'Woman'
      document.getElementById('Woman').checked = true;
    }

    if (restoreSavedState) {
      // Populate checkboxes
      defectsChoicesInSwedish().forEach((value, key) => {
        if (data.defects && data.defects.includes(value)) {
          document.getElementById(key).previousElementSibling.classList.add("w--redirected-checked");
          document.getElementById(key).checked = true;
        }
      });
    }
  } catch (error) {
    console.error("Error getting item document:", error);
    errorHandler.report(error);
  }
  document.getElementById('loadingDiv').style.display = 'none';
}

function whenLoadingDivHidden(cb) {
  const observer = new MutationObserver(cb);
  const elm = document.getElementById('loadingDiv');
  observer.observe(elm, { attributeFilter: ['style'] })
}

function selectFieldValue(field, value) {
  const selectIndex = Array.from(field.options)
    .map(elm => elm.attributes.value.value)
    .indexOf(value);
  if (selectIndex > 0) {
    field.selectedIndex = selectIndex;
    field.style.color = "#333";
  } else {
    field.selectedIndex = 0;
    field.style.color = '#929292';
  }
  field.dispatchEvent(new Event('input'));
  field.dispatchEvent(new Event('change'));
}

async function checkAndDisplayShareSold(value) {
  const response = await firebase.app().functions("europe-west1").httpsCallable(
    'fetchBrandShareSoldInfo',
  )({ cleanedBrandName: value });

  if (response.data && response.data.cleanedBrand) {
    console.log('data.shareSold', response.data.shareSold, 'data.cleanedBrand', response.data.cleanedBrand);
    if (response.data.shareSold >= '65%') {
      shareSoldText.innerHTML = `Det är hög efterfrågan på ${response.data.cleanedBrand}`;
      shareSoldDiv.style.display = 'block';
      return;
    }
  } else {
    shareSoldText.innerHTML = '';
    shareSoldDiv.style.display = 'none';
  }
}

function initializeSelectColor() {
  const itemColor = document.getElementById("itemColor");
  itemColor.onchange = function () {
    let input = this.value;
    if (input !== "") {
      itemColor.style.color = "#333";
    } else {
      itemColor.style.color = "#929292";
    }
  };
  // Change font color of dropdown itemAge when user selects a value
  const itemAge = document.getElementById("itemAge");
  itemAge.onchange = function () {
    let input = this.value;
    if (input !== "") {
      itemAge.style.color = "#333";
    } else {
      itemAge.style.color = "#929292";
    }
  };
}

const apiColorMapping = {
  "black": "Black",
  "white": "White",
  "gray": "Grey",
  "blue": "Blue",
  "dark_blue": "Navy",
  "multicolor/colorful": 'Multicolour',
  "red": "Red",
  "pink": "Pink",
  "brown": "Brown",
  "beige": "Beige",
  "light_blue": "Blue",
  "green": "Green",
  "silver": "Silver",
  "purple": "Purple",
  "maroon": "Burgundy",
  "gold": "Gold",
  "orange": "Orange",
  "yellow": "Yellow",
  "teal": "Turquoise",
  "olive": "Green",
  "cyan": "Turquoise",
  "magenta": "Pink",
  "mustard": "Yellow"
};

async function frontImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'frontImage');
    if (!imageUrl || Object.keys(imageUrl).length === 0) {
      return;
    }
    const promises = [];
    promises.push(detectAndFillColor(imageUrl), detectAndFillBrandAndMaterialAndSize(imageUrl), enhanceFrontImage(imageUrl));
    await Promise.all(promises);
    rememberUnsavedChanges();
  }
}

async function brandTagImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'brandTagImage');
    showDeleteImageIcon('brandTagImage')
    await detectAndFillBrandAndMaterialAndSize(imageUrl);
    rememberUnsavedChanges();
  }
}

async function productImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'productImage');
    showDeleteImageIcon('productImage')
    await detectAndFillBrandAndMaterialAndSize(imageUrl);
    rememberUnsavedChanges();
  }
}

async function defectImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'defectImage');
    showDeleteImageIcon('defectImage')
    await detectAndFillBrandAndMaterialAndSize(imageUrl);
    rememberUnsavedChanges();
  }
}

async function materialTagImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'materialTagImage');
    showDeleteImageIcon('materialTagImage')
    await detectAndFillBrandAndMaterialAndSize(imageUrl);
    rememberUnsavedChanges();
  }
}

async function extraImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'extraImage');
    showDeleteImageIcon('extraImage')
    await detectAndFillBrandAndMaterialAndSize(imageUrl);
    rememberUnsavedChanges();
  }
}

function clearConfirmButtonValidity(event) {
  event.currentTarget.setCustomValidity('');
  const suggestButtons = event.currentTarget.parentNode.querySelector('.suggest-buttons') ||
    event.currentTarget.parentNode.parentNode.querySelector('.suggest-buttons');
  suggestButtons.style.display = 'none';
}

async function detectAndFillBrandAndMaterialAndSize(imageUrl) {
  try {
    if (document.querySelector('#itemBrand').value.length && document.querySelector('#itemMaterial').value.length
      && document.querySelector('#itemSize').value.length) {
      // Don't do anything if both brand and material already filled in
      return;
    }
    const response = await firebase.app().functions("europe-west1").httpsCallable('detectItemBrandAndMaterialAndSize')({ imageUrl });
    if (!document.querySelector('#itemBrand').value.length && response.data?.brand) {
      document.querySelector('#itemBrand').value = response.data.brand;
      document.querySelector('#itemBrand').setCustomValidity('Bekräfta eller ändra märket');
      document.getElementById('itemBrandLabel').style.display = 'inline-block';
      document.querySelector('#brandSuggestButtons').style.display = 'block';
      document.querySelector('#itemBrand').dispatchEvent(new Event('change'));
      analytics.track("Element Viewed", { elementID: "brandSuggestButtons" });
    }
    if (!document.querySelector('#itemMaterial').value.length && response.data?.materials) {
      document.querySelector('#itemMaterial').value = response.data.materials;
      document.querySelector('#itemMaterial').setCustomValidity('Bekräfta eller ändra materialet');
      document.getElementById('itemMaterialLabel').style.display = 'inline-block';
      document.querySelector('#materialSuggestButtons').style.display = 'block';
      document.querySelector('#itemMaterial').dispatchEvent(new Event('change'));
      analytics.track("Element Viewed", { elementID: "materialSuggestButtons" });
    }
    if (!document.querySelector('#itemSize').value.length && response.data?.size) {
      document.querySelector('#itemSize').value = response.data.size;
      document.querySelector('#itemSize').setCustomValidity('Bekräfta eller ändra storlek');
      document.getElementById('itemSizeLabel').style.display = 'inline-block';
      document.querySelector('#sizeSuggestButtons').style.display = 'block';
      document.querySelector('#itemSize').dispatchEvent(new Event('change'));
      analytics.track("Element Viewed", { elementID: "sizeSuggestButtons" });
    }
  } catch (e) {
    errorHandler.report(e);
    console.log('Error calling detectItemBrandAndMaterialAndSize', e);
  }
}

async function detectAndFillColor(imageUrl) {
  if (document.querySelector('#itemColor').value !== '') {
    return;
  }
  try {
    const response = await firebase.app().functions("europe-west1").httpsCallable('detectItemColor')({ imageUrl });
    if (!response.data?.colors || !response.data.colors.length) {
      console.log("Unable to detect product color");
      return;
    }
    if (response.data.colors.length > 2) {
      document.querySelector('#itemColor').value = 'Multicolour';
    } else if (apiColorMapping[response.data.colors?.[0]]) {
      document.querySelector('#itemColor').value = apiColorMapping[response.data.colors?.[0]];
    } else {
      console.log("Unable to set color from", response.data.colors?.[0]);
      return;
    }
    document.querySelector('#itemColor').setCustomValidity('Bekräfta eller ändra färgen');
    document.querySelector('#colorSuggestButtons').style.display = 'block';
    document.querySelector('#itemColor').dispatchEvent(new Event('change'));
    analytics.track("Element Viewed", { elementID: "colorSuggestButtons" });
  } catch (e) {
    errorHandler.report(e);
    console.log('Error calling detectItemColor', e);
  }
}

async function initializeMaterialConfirm() {
  document.getElementById('rejectMaterial').addEventListener('click', () => {
    document.querySelector('#itemMaterial').value = '';
    document.querySelector('#materialSuggestButtons').style.display = 'none';
    fieldLabelToggle('itemMaterialLabel');
    document.querySelector('#itemMaterial').setCustomValidity('')
  });
  document.getElementById('confirmMaterial').addEventListener('click', () => {
    document.querySelector('#itemMaterial').setCustomValidity('');
  })
}

async function initializeBrandConfirm() {
  document.getElementById('rejectBrand').addEventListener('click', () => {
    document.querySelector('#itemBrand').value = '';
    document.querySelector('#brandSuggestButtons').style.display = 'none';
    document.querySelector('#itemBrand').setCustomValidity('');
    fieldLabelToggle('itemBrandLabel');
  });
  document.getElementById('confirmBrand').addEventListener('click', () => {
    document.querySelector('#itemBrand').setCustomValidity('');
    document.querySelector('#itemBrand').setCustomValidity('');
  })
}

function initializeSaveFormButton() {
  const saveItemDraftDiv = document.getElementById('saveItemDraftDiv');
  function showButtonIfFormChanged(event) {
    if ((!params.id && !itemDraftSaved) || (params.id && params.type !== 'resell' && params.type !== 'draft')) {
      return;
    }
    let field = event.target;
    if (field instanceof Element) {
      const defaultValue = itemDraft[field.name];
      if (defaultValue !== field.value && field.value !== '') {
        saveItemDraftDiv.style.display = 'block';
      }
    }
  }
  document.getElementById('wf-form-Add-Item').addEventListener('input', showButtonIfFormChanged);
  document.querySelector('#wf-form-Add-Item select').addEventListener('change', showButtonIfFormChanged);

  document.getElementById('saveItemDraft').addEventListener('click', async () => {
    saveItemDraftDiv.classList.add('saving');
    const id = params.type === 'resell' ? await requestUniqueId() : (params.type === 'draft' ? params.id : itemDraft.id);
    await addItemInner(id, 'Draft');
    saveItemDraftDiv.classList.remove('saving');
    saveItemDraftDiv.classList.add('saved');
    setTimeout(() => {
      saveItemDraftDiv.classList.remove('saved');
      saveItemDraftDiv.style.display = 'none';
    }, 1500);
  });
}

function initializeClearFormButton() {
  function showButtonIfFormChanged(event) {
    if (itemDraftSaved) {
      return;
    }
    let field = event.target;
    if (field instanceof Element) {
      const defaultValue = defaultFormState()[field.name];
      if (defaultValue !== field.value && field.value !== '') {
        document.getElementById('clearItemForm').style.display = 'block';
      }
    }
  }
  if (!params.id) {
    document.getElementById('wf-form-Add-Item').addEventListener('input', showButtonIfFormChanged);
    document.querySelector('#wf-form-Add-Item select').addEventListener('change', showButtonIfFormChanged);
  }
}

function initializeSaveStateListeners() {
  // We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
  document.getElementById('wf-form-Add-Item').querySelectorAll('input').forEach(elm => {
    elm.addEventListener('input', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="radio"]').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="checkbox"]').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  // We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
  document.getElementById('wf-form-Add-Item').querySelectorAll('select').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('textarea').forEach(elm => {
    elm.addEventListener('input', rememberUnsavedChanges);
  });
}

function initializeRestoreOnNavigation() {
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && localStorage.getItem('newItem')) {
      // Use setTimeout to make sure the document is loaded before we call fillForm()
      setTimeout(async () => {
        await fillForm(null, JSON.parse(localStorage.getItem('newItem')), true);
      },
        10);
    }
  });
}

async function initializeSizeConfirm() {
  document.getElementById('rejectSize').addEventListener('click', () => {
    document.querySelector('#itemSize').value = '';
    document.querySelector('#sizeSuggestButtons').style.display = 'none';
    fieldLabelToggle('itemSizeLabel');
    document.querySelector('#itemSize').setCustomValidity('');
  });
  document.getElementById('confirmSize').addEventListener('click', () => {
    document.querySelector('#itemSize').setCustomValidity('');
  })
}

function initializeSuggestButtonsSaveState() {
  const observer = new MutationObserver((mutationsList, observer) => {
    const mutatedElement = mutationsList.find(elm => elm.attributeName === 'style');
    if (mutatedElement && mutatedElement.target.style.display === 'none') {
      rememberUnsavedChanges();
    }
  });
  Array.from(document.querySelectorAll('.suggest-buttons')).forEach(elm =>
    observer.observe(elm, { attributes: true })
  )
}

async function initializeColorConfirm() {
  document.getElementById('rejectColor').addEventListener('click', () => {
    document.querySelector('#itemColor').value = '';
    document.querySelector('#colorSuggestButtons').style.display = 'none';
    fieldLabelToggle('itemColorLabel');
    document.querySelector('#itemColor').setCustomValidity('');
  });
  document.getElementById('confirmColor').addEventListener('click', () => {
    document.querySelector('#itemColor').setCustomValidity('');
  })
}

function clearFormFields() {
  document.getElementById('clearItemForm').style.display = 'none';
  imageElements().forEach(imageName => {
    document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
    showImageState(imageName, 'default-state');
  });

  setFieldValue('itemBrand', null);
  Array.from(document.querySelectorAll('.suggest-buttons')).forEach(el => el.style.display = 'none');
  setFieldValue('itemSize', null);
  setFieldValue('itemMaterial', null);
  setFieldValue('itemModel', null);
  setFieldValue('itemOriginalPrice', null);

  setFieldValue('itemUserComment', null);
  setFieldValue('itemDefectDescription', null);
  setFieldValue('itemLowestAcceptPrice', null);

  selectFieldValue(itemAge, '');
  selectFieldValue(itemColor, '');
  selectFieldValue(itemCondition, '');
  defectInfoDiv.style.display = 'none';
  const itemCategory = $('#itemCategory');
  itemCategory.val('');
  itemCategory.trigger('change');

  // Populate radio-buttons
  document.getElementById('Man').previousElementSibling.classList.remove("w--redirected-checked");
  document.getElementById('Man').checked = false;
  document.getElementById('Unisex').previousElementSibling.classList.remove("w--redirected-checked");
  document.getElementById('Unisex').checked = false;
  document.getElementById('Woman').previousElementSibling.classList.add("w--redirected-checked"); // select radio button 'Woman'
  document.getElementById('Woman').checked = true;

  // Populate checkboxes
  defectsChoicesInSwedish().forEach((value, key) => {
    document.getElementById(key).previousElementSibling.classList.remove("w--redirected-checked");
    document.getElementById(key).checked = false;
  });
  sessionStorage.removeItem('newItemId');
  localStorage.removeItem('newItem');
}

function initializeDeleteImageListeners() {
  imageElements().forEach(imageName => {
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).addEventListener('click', () => {
      removeSavedImage(imageName);
    });
  })
  document.getElementById("deleteFrontImageIcon").addEventListener('click', () => {
    document.getElementById("frontImage").required = true;
    removeSavedImage('enhancedFrontImage');
  });
  document.getElementById("deleteBrandTagImageIcon").addEventListener('click', () => {
    document.getElementById("brandTagImage").required = true;
  });
}

function removeSavedImage(imageName) {
  const newItem = JSON.parse(localStorage.getItem('newItem'));
  delete newItem?.images?.[imageName];
  delete newItem?.images?.[`${imageName}Small`];
  localStorage.setItem('newItem', JSON.stringify(newItem));
}

const BLACK_LIST = ['se', 'bild', 'vet', 'ej', 'flätad', 'klack', 'överdel', 'grovt', 'hälrem', 'vind', 'och', 'vattentålig', 'utsida', 'tillverkad', 'av', 'woolrichs', 'signatur', 'blandning', 'avslutad', 'med', 'en', 'speciell', 'teflonbeläggning', 'för', 'extra', 'skydd', 'ankdun', 'vadderingen', 'avtagbar', 'tvättbjörnspäls', 'på', 'luvan'];

const blackListSet = new Set(BLACK_LIST);

const blackListed = (s) => blackListSet.has(s?.toLowerCase());

const partsMatch = (s0, s1) => {
  return !blackListed(s0) && !blackListed(s1) && (s0.indexOf(s1) > -1 || s1.indexOf(s0) > -1);
};

export const isNoBgImage = async (source) => {
  const getImageMeta = async (url) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    await img.decode();
    return img
  };
  const checkUniformColor = (data) => {
    const [r, g, b, a] = [data[0], data[1], data[2], data[3]];
    for (let i = 4; i < data.length; i += 4) {
      if (data[i] !== r || data[i + 1] !== g || data[i + 2] !== b || data[i + 3] !== a) {
        return false;
      }
    }
    return true;
  };
  try {
    if (source.match(/nobg|no-bg/i)) {
      return true;
    }
    const img = await getImageMeta(source);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    const topBorder = ctx.getImageData(0, 0, img.naturalWidth, 10).data;
    const bottomBorder = ctx.getImageData(0, img.naturalHeight, img.naturalWidth, -10).data;
    const leftBorder = ctx.getImageData(0, 0, 10, img.naturalHeight).data;
    const rightBorder = ctx.getImageData(img.naturalWidth, 0, -10, img.naturalHeight).data;
    return (
      checkUniformColor(topBorder) &&
      checkUniformColor(bottomBorder) &&
      checkUniformColor(leftBorder) &&
      checkUniformColor(rightBorder)
    );
  } catch (e) {
    console.error(e);
    // If we cannot load the image, play it safe and assume it is the no-bg image
    return true;
  }
};

// Call sellItemMain directly
sellItemMain();
// and call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(sellItemMainAuthenticated);
