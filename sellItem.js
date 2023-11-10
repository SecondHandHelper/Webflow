import {
  capitalizeFirstLetter,
  enhanceFrontImage,
  rememberNewItemImageField,
  requestUniqueId,
  showDeleteImageIcon,
  showImagePreview,
  showImageState,
  showLoadingIcon,
  uploadImageAndShowPreview
} from "./sellItemHelpers";

function defectsChoicesInSwedish() {
  return new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
}
function imageElements() {
  return ["frontImage", "brandTagImage", "defectImage", "materialTagImage", "extraImage"];
}

var userItemsCount;

function imageUploadHandlers() {
  let frontImageUpload = document.getElementById("frontImage");
  let brandTagImageUpload = document.getElementById("brandTagImage");
  let productImageUpload = document.getElementById("productImage");
  let defectImageUpload = document.getElementById("defectImage");
  let materialTagImageUpload = document.getElementById("materialTagImage");
  let extraImageUpload = document.getElementById("extraImage");

  // display image when file has been selected
  $('#frontImage').off('change');
  frontImageUpload.addEventListener('change', frontImageChangeHandler, {capture: true});
  $('#brandTagImage').off('change');
  brandTagImageUpload.addEventListener('change', brandTagImageChangeHandler, {capture: true});
  $('#productImage').off('change');
  productImageUpload.addEventListener('change', productImageChangeHandler, {capture: true});
  $('#defectImage').off('change');
  defectImageUpload.addEventListener('change', defectImageChangeHandler, {capture: true});
  $('#materialTag').off('change');
  materialTagImageUpload.addEventListener('change', materialTagImageChangeHandler, {capture: true});
  $('#extraImage').off('change');
  extraImageUpload.addEventListener('change', extraImageChangeHandler, {capture: true});
}

async function sellItemMainAuthenticated() {
  console.log("sellItemMainAuthenticated " + new Date());

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

  // Get user's item count to be able to send 'User Activated' event
  const items = await getItems(authUser.current.uid);
  userItemsCount = items.size;
}

async function sellItemMain() {
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
  let hardToSellDiv = document.getElementById("hardToSellDiv");
  let words = ["H&M", "HM", "Zara", "ASOS", "Nelly", "Gina Tricot", "BikBok", "Bik Bok", "Lindex", "Kappahl", "Cubus", "NA-KD", "NAKD", "Mango", "Ellos", "Primark", "Shein", "Vila", "Forever 21", "Pull & Bear", "Bershka", "Stradivarius", "Okänt", "Unknown", "Vet ej", "...", "Vet inte", "Okänd", "-", "Se bild"];

  brand.oninput = function () {
    shareSoldDiv.style.display = 'none';
    let value = this.value;
    if (!checkBrand(value)) {
      //checkAndDisplayShareSold(value);
      //displayFindModelDiv(value);
    }
  };

  // Hide/Show extra fields for defects
  itemCondition.onchange = function () {
    let input = this.value;
    if (input == "Använd, tecken på slitage") {
      defectInfoDiv.style.display = 'block';
      itemCondition.style.color = "#333";
    } else if (input == "") {
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

  await initializeCategorySelect();
  await initializeColorConfirm();
  await initializeBrandConfirm();
  await initializeMaterialConfirm();
  await initializeSizeConfirm();
  initializeSuggestButtonsSaveState();
  initializeClearFormButton();

  initializeDeleteImageListeners();
  document.getElementById('clearItemForm').addEventListener('click', clearFormFields);

  if (params.id) {
    // Fill form if the user comes from a prefill link (re-sell item)
    sessionStorage.removeItem('newItemId');
    localStorage.removeItem('newItem');
    auth.onAuthStateChanged(function (user) {
      if (!user) { document.getElementById('maiIntro').style.display = 'block'; }
    });
    document.getElementById('resellIntro').style.display = 'block';
    await fillForm(params.id);
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

async function addItem(event) {
  const id = sessionStorage.getItem('newItemId') || await requestUniqueId();
  try {
    document.getElementById('addItemFormDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    document.getElementById('clearItemForm').style.display = 'none';
    const item = await addItemInner(id);
    const nextStep = await getAndSaveValuation(id, item);
    // Track with segment 'User Activated'
    if (userItemsCount === 0) {
      analytics.track('User Activated');
    }
    location.href = nextStep;
  } catch (e) {
    errorHandler.report(e);
    console.error('addItem failed', e);
  }
}

function needsHumanCheck({ humanCheckNeeded, newMinMaxLog }) {
  return humanCheckNeeded || newMinMaxLog.match(/accept price is above max/i)
}

async function saveItemValuation(itemId, mlValuationData, userValuationApproval) {
  const { minPrice, maxPrice, decline, humanCheckNeeded, humanCheckExplanation, willNotSell, soldPrice, version,
    newMinPriceEstimate, newMaxPriceEstimate, newMinMaxLog, adjustmentAllowed, newBrand, newBrandCategory } = mlValuationData || {};
  if (!minPrice && !decline) {
    return;
  }
  const valuationData = {
    mlValuation: {
      decline, humanCheckNeeded, minPriceEstimate: minPrice, maxPriceEstimate: maxPrice,
      humanCheckExplanation: humanCheckExplanation,
      willNotSellPrediction: willNotSell,
      soldPriceEstimate: soldPrice,
      modelVersion: version?.toString(),
      newMinPriceEstimate, newMaxPriceEstimate, newMinMaxLog, adjustmentAllowed, newBrand, newBrandCategory
    },
    ...(decline || needsHumanCheck(mlValuationData) ? {} : {
      valuationStatus: 'Completed',
      valuationDate: new Date().toISOString(),
      ...(userValuationApproval ? {} : { minPriceEstimate: minPrice, maxPriceEstimate: maxPrice }),
      infoRequests: {
        price: {
          status: userValuationApproval ? 'Active' : 'Resolved',
          response: userValuationApproval ? '' : 'Accepted',
          description: 'Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar. Värderingen utgår från vad liknande sålts för.',
          minPrice: newMinPriceEstimate || minPrice,
          maxPrice: newMaxPriceEstimate || maxPrice,
        }
      }
    })
  }
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

async function setValuationFromResellItem(resellItem, item, itemId) {
  const valuationData = {
    valuationStatus: 'Completed',
    valuationDate: new Date().toISOString(),
    infoRequests: {
      price: {
        status: 'Active',
        response: '',
        description: 'Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar. Värderingen utgår från vad liknande sålts för.',
        minPrice: resellItem.minPriceEstimate,
        maxPrice: resellItem.maxPriceEstimate,
        type: 'Valuation',
        adjustmentAllowed: true,
      }
    }
  }
  if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({
      id: item.id,
      item: {...item.item, ...valuationData}
    }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('saveItemValuationFields')({itemId, ...valuationData});
    const latestItemCreated = JSON.parse(localStorage.getItem('latestItemCreated'));
    localStorage.setItem('latestItemCreated', JSON.stringify({...latestItemCreated, ...valuationData}));
  }
}

async function getAndSaveValuation(itemId, item) {
  const userValuationApproval = item.preferences.userValuationApproval
  if (!itemId && !item) {
    console.error('No item and no itemId, unexpected!!');
    return '/item-confirmation';
  }
  if (params.id) {
    const getItemResponse = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId: params.id });
    const resellItem = getItemResponse.data;
    if (resellItem.status === 'Sold') {
      await setValuationFromResellItem(resellItem, item, itemId);
      return '/item-valuation';
    }
  }
  try {
    const res = await firebase.app().functions("europe-west1").httpsCallable('itemMlValuation')({itemId, item});
    const { minPrice, maxPrice, decline } = res.data || {};
    await saveItemValuation(itemId, res.data, userValuationApproval);
    return nextStepAfterValuation(minPrice && maxPrice, decline, needsHumanCheck(res.data), userValuationApproval);
  } catch (e) {
    console.error('Failed to get ml valuation', e);
  }
  return nextStepAfterValuation();
}

function nextStepAfterValuation(mlValuationPresent, decline, valuationNeedsChecking, userValuationApproval) {
  if (!mlValuationPresent || valuationNeedsChecking || !userValuationApproval) {
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
  let status = "New";
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
  const userValuationApproval = itemUserValuationApproval.checked;

  // Get defects list
  let defectElements = new Map().set("hole", hole.checked).set("stain", stain.checked).set("lostFit", lostFit.checked).set("nopprig", nopprig.checked).set("threadUp", threadUp.checked).set("colorChange", colorChange.checked).set("otherDefect", otherDefect.checked);
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
    preferences: { userValuationApproval },
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

async function addItemInner(id) {
  const { modelCoverImageUrl, images, ...pageData } = collect();
  const shippingMethod = await getShippingMethod();
  if (modelCoverImageUrl) {
    images['modelImage'] = modelCoverImageUrl;
  }
  const createdFromItem = params.id ? { createdFromItem: params.id } : {};
  const item = { ...pageData, shippingMethod, images, ...createdFromItem, version: "2" };

  if (!authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    const createItemResponse = await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });
    localStorage.removeItem('newItem');
    sessionStorage.removeItem('newItemId');
    localStorage.setItem('latestItemCreated', JSON.stringify(createItemResponse.data));
  }
  return item;
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
          window.scrollTo({ top: y, behavior: 'smooth'});
        }
        document.getElementById('wf-form-Add-Item').reportValidity();
      }
    }, 300);
  });
  addItemForm.addEventListener("submit", addItem);
  userAddressForm.addEventListener("submit", addUserDetails);

}

function isElementInView (el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight/2 || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

async function createItemAfterSignIn() {
  const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
  sessionStorage.removeItem('newItemId');
  await firebase.app().functions("europe-west1").httpsCallable('createItem')(itemFromStorage);
  localStorage.removeItem('newItem');
  itemFromStorage.item.id = itemFromStorage.id;
  localStorage.setItem('latestItemCreated', JSON.stringify(itemFromStorage.item));
}

function rememberUnsavedChanges() {
  if (localStorage.getItem('latestItemCreated')) {
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
  item.userValuationApproval = item.preferences.userValuationApproval;
  delete item.preferences;
  item.acceptPrice = item.acceptPrice && item.acceptPrice > 0 ? item.acceptPrice : null;
  item.originalPrice = item.originalPrice && item.originalPrice > 0 ? item.originalPrice : null;
  [ 'itemBrand', 'itemSize', 'itemMaterial', 'itemColor' ].forEach(inputName => {
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

function isDefaultFormState(itemState) {
  const defaultState = defaultFormState();
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

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
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
    if (!savedItem) {
      item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId });
    }
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
    setFieldValue('itemModel', data.model);
    setFieldValue('itemOriginalPrice', originalPrice);

    if (restoreSavedState) {
      setFieldValue('itemUserComment', data.userComment);
      setFieldValue('itemDefectDescription', data.defectDescription);
      setFieldValue('itemLowestAcceptPrice', data.acceptPrice <= 0 ? null : data.acceptPrice);
      selectFieldValue(itemCondition, data.condition);
    }
    if (params.id && item.status === 'Sold') {
      document.getElementById('priceSettings').style.display = 'none';
    }

    // Populate select fields
    selectFieldValue(itemAge, data.age);
    selectFieldValue(itemColor, data.color);
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
      if ('userValuationApproval' in data && !data.userValuationApproval) {
        document.getElementById('itemUserValuationApproval').click();
        document.getElementById('itemUserValuationApproval').previousElementSibling.classList.remove("w--redirected-checked");
      }
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

function checkBrand(value) {
  if (words.some(words => value.toLowerCase().includes(words.toLowerCase()))) {
    hardToSellText.innerHTML = `Vi säljer i regel inte ${value}-plagg på grund av för lågt andrahandsvärde. Undantag kan finnas.`;
    hardToSellDiv.style.display = 'block';
    return true;
  } else {
    hardToSellDiv.style.display = 'none';
  }
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

function initializeClearFormButton() {
  function showButtonIfFormChanged(event) {
    let field = event.target;
    if (field instanceof Element) {
      const defaultValue = defaultFormState()[field.name];
      if (defaultValue !== field.value && field.value !== '') {
        document.getElementById('clearItemForm').style.display = 'block';
      }
    }
  }
  document.getElementById('wf-form-Add-Item').addEventListener('input', showButtonIfFormChanged);
  document.querySelector('#wf-form-Add-Item select').addEventListener('change', showButtonIfFormChanged);
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
    fieldLabelToggle('itemBrandLabel');
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
    observer.observe(elm, { attributes: true})
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
  if (document.getElementById('itemUserValuationApproval').checked === false) {
    document.getElementById('itemUserValuationApproval').click();
    document.getElementById('itemUserValuationApproval').previousElementSibling.classList.add("w--redirected-checked");
  }
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

async function initializeCategorySelect() {
  const itemCategories = [
    {"id": "", "text": "",},
    {"text": "Överdelar", "children": [
        {"id": "Tröja", "text": "Tröja",}, {"id": "Blus", "text": "Blus",}, {"id": "Topp", "text": "Topp",}, {"id": "Skjorta", "text": "Skjorta",}, {"id": "Linneskjorta", "text": "Linneskjorta",}, {"id": "T-shirt", "text": "T-shirt",}, {"id": "Kavaj", "text": "Kavaj",}, {"id": "Sweatshirt", "text": "Sweatshirt",}, {"id": "Hoodie", "text": "Hoodie",}, {"id": "Polotröja", "text": "Polotröja",}, {"id": "Tunika", "text": "Tunika",}, {"id": "Väst", "text": "Väst",}, {"id": "Kofta", "text": "Kofta",}, {"id": "Linne", "text": "Linne",}, {"id": "Träningströja", "text": "Träningströja",}, {"id": "Poncho", "text": "Poncho",}, {"id": "Piké", "text": "Piké",}, {"id": "Långärmad T-shirt", "text": "Långärmad T-shirt",}, {"id": "Kostymväst", "text": "Kostymväst",}
      ]},
    {"text": "Underdelar", "children": [
        {"id": "Kjol", "text": "Kjol",}, {"id": "Byxor", "text": "Byxor",}, {"id": "Jeans", "text": "Jeans",}, {"id": "Chinos", "text": "Chinos",}, {"id": "Fritidsbyxor", "text": "Fritidsbyxor",}, {"id": "Träningsbyxor", "text": "Träningsbyxor",}, {"id": "Tights", "text": "Tights",}, {"id": "Strumpbyxor", "text": "Strumpbyxor",}, {"id": "Mjukisbyxor", "text": "Mjukisbyxor",}, {"id": "Kostymbyxor", "text": "Kostymbyxor",}, {"id": "Shorts", "text": "Shorts",}, {"id": "Sarong", "text": "Sarong",}
      ]},
    {"text": "Helkropp", "children": [
        {"id": "Klänning", "text": "Klänning",}, {"id": "Kaftan", "text": "Kaftan",}, {"id": "Kostym", "text": "Kostym",}, {"id": "Set", "text": "Set",}, {"id": "Jumpsuit", "text": "Jumpsuit",}, {"id": "Baddräkt", "text": "Baddräkt",}, {"id": "Bikini", "text": "Bikini",}, {"id": "Pyjamas", "text": "Pyjamas",}, {"id": "Morgonrock", "text": "Morgonrock",}, {"id": "Bröllopsklänning", "text": "Bröllopsklänning",}, {"id": "Balklänning", "text": "Balklänning",}, {"id": "Bodysuit", "text": "Bodysuit",}, {"id": "Underställ", "text": "Underställ",}
      ]},
    {"text": "Ytterkläder", "children": [
        {"id": "Jacka", "text": "Jacka",}, {"id": "Kappa", "text": "Kappa",}, {"id": "Rock", "text": "Rock",}, {"id": "Fritidsjacka", "text": "Fritidsjacka",}, {"id": "Trenchcoat", "text": "Trenchcoat",}, {"id": "Skinnjacka", "text": "Skinnjacka",}, {"id": "Dunjacka", "text": "Dunjacka",}, {"id": "Regnjacka", "text": "Regnjacka",}, {"id": "Pälsjacka", "text": "Pälsjacka",}
      ]},
    {"text": "Skor", "children": [
        {"id": "Sneakers", "text": "Sneakers",}, {"id": "Sandaler", "text": "Sandaler",}, {"id": "Klackar", "text": "Klackar",}, {"id": "Ballerinaskor", "text": "Ballerinaskor",}, {"id": "Loafers", "text": "Loafers",}, {"id": "Flip-flops", "text": "Flip-flops",}, {"id": "Boots", "text": "Boots",}, {"id": "Kängor", "text": "Kängor",}, {"id": "Vinterskor", "text": "Vinterskor",}, {"id": "Skor", "text": "Annat (Skor)",}
      ]},
    {"text": "Väskor", "children": [
        {"id": "Axelremsväska", "text": "Axelremsväska",}, {"id": "Handväska", "text": "Handväska",}, {"id": "Kuvertväska", "text": "Kuvertväska",}, {"id": "Ryggsäck", "text": "Ryggsäck",}, {"id": "Träningsväska", "text": "Träningsväska",}, {"id": "Resväska", "text": "Resväska",}, {"id": "Datorväska", "text": "Datorväska",}, {"id": "Väska", "text": "Annat (Väska)",}
      ]},
    {"text": "Accessoarer", "children": [
        {"id": "Solglasögon", "text": "Solglasögon",}, {"id": "Glasögon", "text": "Glasögon",}, {"id": "Örhänge", "text": "Örhänge",}, {"id": "Halsband", "text": "Halsband",}, {"id": "Armband", "text": "Armband",}, {"id": "Ring", "text": "Ring",}, {"id": "Brosch", "text": "Brosch",}, {"id": "Keps", "text": "Keps",}, {"id": "Sjal", "text": "Sjal",}, {"id": "Krage", "text": "Krage",}, {"id": "Bälte", "text": "Bälte",}, {"id": "Plånbok", "text": "Plånbok",}, {"id": "Halsduk", "text": "Halsduk",}, {"id": "Hatt", "text": "Hatt",}, {"id": "Mössa", "text": "Mössa",}, {"id": "Vantar", "text": "Vantar",}, {"id": "Necessär", "text": "Necessär",}, {"id": "Slips", "text": "Slips",}, {"id": "Handduk", "text": "Handduk",}, {"id": "Klocka", "text": "Klocka",}
      ]}
  ];
  $('#itemCategory').select2({ selectionCssClass: 'form-field', placeholder: 'Kategori', data: itemCategories });
  $("body").on('click', '.select2-container--open .select2-results__group', function () {
    if ($(this).parent().attr('class').match(/expanded-group/)) {
      $(this).parent().removeClass('expanded-group');
    } else {
      $('.expanded-group').first().removeClass('expanded-group');
      $(this).parent().addClass('expanded-group');
    }
  });

  let headerAdded = false;
  $('#itemCategory').on( 'select2:select', () => {
    analytics.track('Click', { elementID: 'itemCategoryValue' });
    document.querySelector('#itemCategory').dispatchEvent(new Event('change'));
  });
  let searchClickTracked = false;
  $('#itemCategory').on('select2:open', () => {
    if (!searchClickTracked) {
      searchClickTracked = true;
      $('input.select2-search__field').on('click', () => {
        analytics.track('Click', { elementID: 'itemCategorySearch' });
      });
    }
  });

  $('#itemCategory').on('select2:close', () => {
    document.querySelector('body').style.overflow = 'auto'
    document.querySelector('body').style.position = 'static';
    document.querySelector('html').style.overflow = 'static';
  });
  $('#itemCategory').on('select2:open', function () {
    analytics.track("Element Viewed", { elementID: "itemCategoryContainer" });
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.position = 'fixed';
    document.querySelector('html').style.overflow = 'fixed';
    const searchField = document.querySelector('.select2-search__field');
    searchField.placeholder = 'Sök... (t.ex. Klänning/Sneakers/Blus)';
    $('.select2-search__field').on('input', (e) => {
      if (e.target.value.length > 0) {
        $('.select2-results__option[role=group]').each((idx, elm) => $(elm).addClass('expanded-group'));
      } else {
        $('.expanded-group').each((idx, elm) => $(elm).removeClass('expanded-group'));
      }
    });
    if (!headerAdded) {
      const header = document.getElementById('categoryPopUpHeader');
      const container = document.querySelector('.select2-dropdown');
      container.insertBefore(header, container.firstChild);
      header.style.display = 'block';
      header.querySelector('#categorySelectClose').onclick = () => $('#itemCategory').select2('close');
      headerAdded = true;
    }
    document.querySelector('.select2-results__options').addEventListener('scroll', () => document.activeElement.blur());
  });

  $('#itemCategory').on('change', fieldLabelToggle('itemCategoryLabel'));

  // From https://github.com/select2/select2/issues/3015#issuecomment-570171720
  $("#itemCategory").on("select2:open", function () {
    $(".select2-results").css("visibility", "hidden");
  });
  $("#itemCategory").on('select2:opening', function () {
    setTimeout(function () {
      $(".select2-results").css("visibility", "visible");
    }, 50);
  });
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
    let nonConformingCount = 0;
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
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const topBorder = ctx.getImageData(0, 0, img.naturalWidth, 10).data;
    const bottomBorder = ctx.getImageData(0, img.naturalHeight - 10, img.naturalWidth, 10).data;
    const leftBorder = ctx.getImageData(0, 0, 10, img.naturalHeight).data;
    const rightBorder = ctx.getImageData(img.naturalWidth - 10, 0, 10, img.naturalHeight).data;

    return (
        checkUniformColor(topBorder) &&
        checkUniformColor(bottomBorder) &&
        checkUniformColor(leftBorder) &&
        checkUniformColor(rightBorder)
    );
  } catch(e) {
    console.error(e);
    // If we cannot load the image, play it safe and assume it is the no-bg image
    return true;
  }
};

// Call sellItemMain directly
sellItemMain();
// and call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(sellItemMainAuthenticated);
