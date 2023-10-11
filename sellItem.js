const defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
const imageElements = ["frontImage", "brandTagImage", "defectImage", "materialTagImage", "extraImage"];

async function requestUniqueId() {
  const endpointUrl = 'https://generateuniqueid-heypmjzjfq-ew.a.run.app';
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(`Failed to fetch unique ID, generating uuidv4 id: ${error.message}`, error);
    return uuidv4();
  }
}

async function addItem(event) {
  const id = sessionStorage.getItem('newItemId') || await requestUniqueId();
  try {
    document.getElementById('addItemFormDiv').style.display = 'none';
    document.getElementById('loadingDiv').style.display = 'flex';
    document.getElementById('clearItemForm').style.display = 'none';
    const item = await addItemInner(id);
    const nextStep = await getAndSaveMlValuation(id, item.preferences.userValuationApproval);
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
          description: 'Värderingen utgår från vad liknande plagg sålts för nyligen. Vi börjar alltid i den övre delen av spannet och sänker successivt inom intervallet under säljperioden på 30 dagar.',
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

const getAndSaveMlValuation = async (itemId, userValuationApproval) => {
  const item = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn') || '{}').item;
  if (!itemId && !item) {
    console.error('No item and no itemId, unexpected!!');
    return '/item-confirmation';
  }
  try {
    const res = await firebase.app().functions("europe-west1").httpsCallable('itemMlValuation')({itemId, item});
    const { minPrice, maxPrice, decline } = res.data || {};
    await saveItemValuation(itemId, res.data, userValuationApproval);
    return nextStepAfterMlValuation(minPrice && maxPrice, decline, needsHumanCheck(res.data), userValuationApproval);
  } catch (e) {
    console.error('Failed to get ml valuation', e);
  }
  return nextStepAfterMlValuation();
}

function nextStepAfterMlValuation(mlValuationPresent, decline, valuationNeedsChecking, userValuationApproval) {
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
        let string = defectsChoicesInSwedish.get(key);
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
    images['coverImage'] = modelCoverImageUrl;
    pageData['coverImageUpdatedAt'] = new Date().toISOString();
  } else if (sessionStorage.getItem('coverImagePreviewUrl')) {
    images['coverImage'] = sessionStorage.getItem('coverImagePreviewUrl');
    pageData['coverImageUpdatedAt'] = new Date().toISOString();
  }
  const createdFromItem = params.id ? { createdFromItem: params.id } : {};
  const item = { ...pageData, shippingMethod, images, ...createdFromItem, version: "2" };
  item.maiMaterial = getMaiMaterial(item);

  if (!authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });
    localStorage.removeItem('newItem');
    sessionStorage.removeItem('newItemId');
    item.id = id;
    localStorage.setItem('latestItemCreated', JSON.stringify(item));
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

async function enhanceFrontImage(imageUrl) {
  const enhancedImageUrls = await createEnhancedImage(imageUrl);
  if (enhancedImageUrls?.url) {
    rememberNewItemImageField('enhancedFrontImage', enhancedImageUrls.url, enhancedImageUrls.urlSmall);
    showImagePreview('frontImage', window.innerWidth <= 400 ? enhancedImageUrls.urlSmall : enhancedImageUrls.url);
  }
  showDeleteImageIcon('frontImage');
  return enhancedImageUrls;
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

function showImagePreview(imageName, url) {
  document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
  showDeleteImageIcon(imageName);
}

function showImageState(imageName, state) {
  const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i].className.includes(state)) {
      siblings[i].style.display = 'block';
    } else {
      // Hide other states of file input field "empty-state" and "error-state"
      siblings[i].style.display = 'none';
    }
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

async function fillForm(itemId, savedItem, restoreSavedState = false) {
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
      if (imageElements.includes(imageName)) {
        rememberNewItemImageField(imageName, urlLarge, urlSmall);
        if (imageName === 'frontImage' && images.enhancedFrontImage) {
          urlSmall = images['enhancedFrontImageSmall'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImage'] || images['enhancedFrontImageLarge'];
          urlLarge = images['enhancedFrontImage'] || images['enhancedFrontImageLarge'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImageSmall'];
          rememberNewItemImageField('enhancedFrontImage', urlLarge, urlSmall);
        }
        showImagePreview(imageName, urlSmall);
        showImageState(imageName, 'success-state');
        document.getElementById(imageName).required = false;
      }
    }

    // Show cover image preview
    sessionStorage.removeItem('coverImagePreviewUrl');
    const coverImageLarge = images.coverImageLarge || images.coverImage || null;
    const coverImageSmall = images.coverImage || images.coverImageLarge || null;
    if (coverImageLarge) {
      document.getElementById('coverImageContainer').style.backgroundImage = `url('${coverImageSmall}')`;
      document.getElementById('coverImagePreview').style.display = 'block';
      sessionStorage.setItem('coverImagePreviewUrl', coverImageLarge);
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
    }

    // Populate select fields
    selectFieldValue(itemAge, data.age);
    selectFieldValue(itemColor, data.color);
    showSuggestButtons('itemColor', restoreSavedState, data.itemColorConfirm);
    selectFieldValue(itemCondition, data.condition);
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

    // Populate checkboxes
    defectsChoicesInSwedish.forEach((value, key) => {
      if (data.defects && data.defects.includes(value)) {
        document.getElementById(key).previousElementSibling.classList.add("w--redirected-checked");
        document.getElementById(key).checked = true;
      }
    });
    if (restoreSavedState) {
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

async function uploadImageAndShowPreview(input, imageName) {
  try {
    hideImageError(imageName);
    let src = URL.createObjectURL(input);
    document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = `url('${src}')`;
    document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${src}')`;
    showLoadingIcon(imageName)
    showImageState(imageName, 'success-state');
    const { url: imageUrl, urlSmall: imageUrlSmall } = await uploadTempImage(input, imageName);
    rememberNewItemImageField(imageName, imageUrl, imageUrlSmall);
    return imageUrl;
  } catch (ex) {
    console.error('Failed to upload image', ex);
    errorHandler.report(ex);
    document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = '';
    document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
    showImageState(imageName, 'default-state');
    if (input.size > 10 * 1024 * 1024) {
      showImageError(imageName, 'Error: Bilden är för stor. Max 10 MB.');
    } else {
      showImageError(imageName, 'Error: Något gick fel vid uppladdning, försök igen eller kontakt oss om felet kvarstår.');
    }
    document.getElementById(imageName).value = '';
  }
}

function showImageError(imageName, error) {
  const parentNode = document.getElementById(imageName).parentNode.parentNode;
  parentNode.querySelector('.w-file-upload-error').style.display = 'block';
  parentNode.querySelector('.w-file-upload-error-msg').innerText = error;
}

function hideImageError(imageName) {
  const parentNode = document.getElementById(imageName).parentNode.parentNode;
  parentNode.querySelector('.w-file-upload-error').style.display = 'none';
}

function rememberNewItemImageField(imageName, imageUrl, imageUrlSmall) {
  let newItem = JSON.parse(localStorage.getItem('newItem') || JSON.stringify({}));
  const images = newItem.images || {};
  images[imageName] = imageUrl;
  images[`${imageName}Small`] = imageUrlSmall;
  newItem.images = images;
  localStorage.setItem('newItem', JSON.stringify(newItem));
}

async function uploadTempImage(input, fileName) {
  if (!sessionStorage.getItem('newItemId')) {
    sessionStorage.setItem('newItemId', await  requestUniqueId());
  }
  const tempId = sessionStorage.getItem('newItemId');
  let image = await scaleImageToMaxSize(input);
  if (!image) {
    throw 'Fel vid bearbetning av vald bild.';
  }
  const form = new FormData();
  form.append('itemId', tempId);
  form.append('fileName', fileName);
  form.append('file', image);
  form.append('temporary', 'true');
  form.append('generateSmallImage', 'true');
  const response = await fetch('https://uploaditemimagebinary-heypmjzjfq-ew.a.run.app', {
    method: 'POST',
    body: form
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

async function scaleImageToMaxSize(input) {
  if (input.size < 9 * 1024 * 1024) {
    // Don't compress images < 9MB in size
    return Promise.resolve(input);
  }
  return new Promise((resolve, reject) => {
    const MAX_WIDTH = 1512;
    const MAX_HEIGHT = 2016;
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg')
      }
      img.src = reader.result;
      reader.onerror = reject;
    }
    reader.readAsDataURL(input);
  });
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

function showLoadingIcon(imageName) {
  if (imageName == 'frontImage'){
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
    document.getElementById('enhancedAnimationDiv').style.display = 'block';
    triggerEnhancingAnimation.click();
    return
  }
  document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
  document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showDeleteImageIcon(imageName) {
  document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
  document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
  if (imageName === 'frontImage'){
    document.getElementById('enhancedAnimationDiv').style.display = 'none';
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
  imageElements.forEach(imageName => {
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
  defectsChoicesInSwedish.forEach((value, key) => {
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
  imageElements.forEach(imageName => {
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

function getMaiMaterial(item) {
  const materials = item.material?.toLowerCase()?.trim().split(/\s*,?\s+/);
  if (!materials?.length) return null;
  for (const material of materials) {
    if (material?.length <= 1) return false;
    const match = maiMaterials.find(({ name, words }) => {
      if (material === 'ull' && name === 'Cotton') return false; // Special case!
      return [name, ...words].find((word) => {
        const w = word?.toLowerCase() || '';
        return partsMatch(w, material);
      });
    });
    if (match?.name) {
      return match?.name;
    }
  }
  return null;
}

const maiMaterials = [
  {
    "id": "selgdlc4B1zgu9mlA",
    "name": "Cashmere",
    "words": ["kashmir", "kaschmir"]
  },
  {
    "id": "selt2pAmVBnZ39qM2",
    "name": "Cotton",
    "words": ["bomull"]
  },
  {
    "id": "selKuQUkJMxcjMUqt",
    "name": "Leather",
    "words": ["läder", "skinn"]
  },
  {
    "id": "sel23NBtqvBHJk78G",
    "name": "Exotic leathers",
    "words": ["exotiskt läder", "exotiskt skinn"]
  },
  {
    "id": "selFcI7M3LJgLAjox",
    "name": "Denim - Jeans",
    "words": ["twill", "jeans"]
  },
  {
    "id": "selIhCRlvkNKKMUUr",
    "name": "Spandex",
    "words": []
  },
  {
    "id": "selxhEtnyAXM4ACsq",
    "name": "Wool",
    "words": ["ull", "ylle", "alpaca", "merino"]
  },
  {
    "id": "selKSXPlNux42EfA9",
    "name": "Linen",
    "words": ["linne"]
  },
  {
    "id": "sel67FYak6CsTk4jr",
    "name": "Patent leather",
    "words": ["lackat läder", "konstläder", "lackläder", "lackat skinn"]
  },
  {
    "id": "selnsZKTprFfdpbpL",
    "name": "Plastic",
    "words": ["plast", "av plast"]
  },
  {
    "id": "sel8yyj30LsADDnFx",
    "name": "Polyester",
    "words": ["ployester", "polyster", "polyamid", "polamid"]
  },
  {
    "id": "selBcoAapTVv0zATJ",
    "name": "Rubber",
    "words": ["gummi", "av gummi", "gummiband"]
  },
  {
    "id": "seliYLcDX1mwC8LV1",
    "name": "Silk",
    "words": ["siden", "silke"]
  },
  {
    "id": "sel12c4p1edN9vlJS",
    "name": "Suede",
    "words": ["mocka", "mocca"]
  },
  {
    "id": "selE8vZST4IiS6GQW",
    "name": "Synthetic",
    "words": ["syntetisk", "syntetiska", "syntetiskt", "acryl", "akryl", "lyocell", "nylon", "elestan", "rayon", "acetat", "gore"]
  },
  {
    "id": "selvDLHRONrlhlt5R",
    "name": "Cloth",
    "words": []
  },
  {
    "id": "seleLvSJq0ZKuQlKV",
    "name": "Velvet",
    "words": ["sammet", "sammetsväv"]
  },
  {
    "id": "selgREajUjUk3flrO",
    "name": "Viscose",
    "words": ["viskos"]
  },
  {
    "id": "selJgx9Y5xvyeeUAJ",
    "name": "Tweed",
    "words": []
  },
  {
    "id": "selHldRLi8o3USJ80",
    "name": "Faux fur",
    "words": ["fuskpäls", "imitationspäls"]
  },
  {
    "id": "selOl9VjI6qQBBzB9",
    "name": "Fur",
    "words": ["päls"]
  },
  {
    "id": "selsHi8HpO2EMmGlC",
    "name": "Glitter",
    "words": []
  },
  {
    "id": "selfN2I0IR0LPoX26",
    "name": "Sponge",
    "words": ["svamp"]
  },
  {
    "id": "seld9hDGKjA7JNje7",
    "name": "White gold",
    "words": ["vitt guld"]
  },
  {
    "id": "selsGCyjVIcgNpNm3",
    "name": "Yellow gold",
    "words": ["gult guld"]
  },
  {
    "id": "selQWYSJF3XR3wGAC",
    "name": "Pink gold",
    "words": ["rosa guld", "roséguld"]
  },
  {
    "id": "selN5o1szUKuAk47p",
    "name": "Gold plated",
    "words": ["guldpläterad", "förgylld"]
  },
  {
    "id": "sel1V9oOI0UrPI8um",
    "name": "Silver",
    "words": []
  },
  {
    "id": "selAwYRPXIBUfseOT",
    "name": "Silver Plated",
    "words": ["silverpläterad", "silverpläterat"]
  },
  {
    "id": "seljnrN35XuczyPMV",
    "name": "Metal",
    "words": ["metall"]
  },
  {
    "id": "selIfTH2wkuWLXvKw",
    "name": "Steel",
    "words": ["stål"]
  },
  {
    "id": "selVbpscPPj0e6RSP",
    "name": "Wood",
    "words": ["trä"]
  },
  {
    "id": "sel47FuFUekEVcyzW",
    "name": "Other",
    "words": ["annat"]
  }
]

const itemCategories = [
  {
    "id": "",
    "text": "",
  },
  {
    "text": "Överdelar",
    "children": [
      {
        "id": "Tröja",
        "text": "Tröja",
      }, {
        "id": "Blus",
        "text": "Blus",
      }, {
        "id": "Topp",
        "text": "Topp",
      }, {
        "id": "Skjorta",
        "text": "Skjorta",
      }, {
        "id": "Linneskjorta",
        "text": "Linneskjorta",
      }, {
        "id": "T-shirt",
        "text": "T-shirt",
      }, {
        "id": "Kavaj",
        "text": "Kavaj",
      }, {
        "id": "Sweatshirt",
        "text": "Sweatshirt",
      }, {
        "id": "Hoodie",
        "text": "Hoodie",
      }, {
        "id": "Polotröja",
        "text": "Polotröja",
      }, {
        "id": "Tunika",
        "text": "Tunika",
      }, {
        "id": "Väst",
        "text": "Väst",
      }, {
        "id": "Kofta",
        "text": "Kofta",
      }, {
        "id": "Linne",
        "text": "Linne",
      }, {
        "id": "Träningströja",
        "text": "Träningströja",
      }, {
        "id": "Poncho",
        "text": "Poncho",
      }, {
        "id": "Piké",
        "text": "Piké",
      }, {
        "id": "Långärmad T-shirt",
        "text": "Långärmad T-shirt",
      }, {
        "id": "Kostymväst",
        "text": "Kostymväst",
      }
    ]
  },
  {
    "text": "Underdelar",
    "children": [
      {
        "id": "Kjol",
        "text": "Kjol",
      }, {
        "id": "Byxor",
        "text": "Byxor",
      }, {
        "id": "Jeans",
        "text": "Jeans",
      }, {
        "id": "Chinos",
        "text": "Chinos",
      }, {
        "id": "Fritidsbyxor",
        "text": "Fritidsbyxor",
      }, {
        "id": "Träningsbyxor",
        "text": "Träningsbyxor",
      }, {
        "id": "Tights",
        "text": "Tights",
      }, {
        "id": "Strumpbyxor",
        "text": "Strumpbyxor",
      }, {
        "id": "Mjukisbyxor",
        "text": "Mjukisbyxor",
      }, {
        "id": "Kostymbyxor",
        "text": "Kostymbyxor",
      }, {
        "id": "Shorts",
        "text": "Shorts",
      }, {
        "id": "Sarong",
        "text": "Sarong",
      }
    ]
  },
  {
    "text": "Helkropp",
    "children": [
      {
        "id": "Klänning",
        "text": "Klänning",
      }, {
        "id": "Kaftan",
        "text": "Kaftan",
      }, {
        "id": "Kostym",
        "text": "Kostym",
      }, {
        "id": "Set",
        "text": "Set",
      }, {
        "id": "Jumpsuit",
        "text": "Jumpsuit",
      }, {
        "id": "Baddräkt",
        "text": "Baddräkt",
      }, {
        "id": "Bikini",
        "text": "Bikini",
      }, {
        "id": "Pyjamas",
        "text": "Pyjamas",
      }, {
        "id": "Morgonrock",
        "text": "Morgonrock",
      }, {
        "id": "Bröllopsklänning",
        "text": "Bröllopsklänning",
      }, {
        "id": "Balklänning",
        "text": "Balklänning",
      }, {
        "id": "Bodysuit",
        "text": "Bodysuit",
      }, {
        "id": "Underställ",
        "text": "Underställ",
      }
    ]
  },
  {
    "text": "Ytterkläder",
    "children": [
      {
        "id": "Jacka",
        "text": "Jacka",
      },
      {
        "id": "Kappa",
        "text": "Kappa",
      }, {
        "id": "Rock",
        "text": "Rock",
      }, {
        "id": "Fritidsjacka",
        "text": "Fritidsjacka",
      }, {
        "id": "Trenchcoat",
        "text": "Trenchcoat",
      }, {
        "id": "Skinnjacka",
        "text": "Skinnjacka",
      }, {
        "id": "Dunjacka",
        "text": "Dunjacka",
      }, {
        "id": "Regnjacka",
        "text": "Regnjacka",
      }, {
        "id": "Pälsjacka",
        "text": "Pälsjacka",
      }
    ]
  },
  {
    "text": "Skor",
    "children": [
      {
        "id": "Sneakers",
        "text": "Sneakers",
      }, {
        "id": "Sandaler",
        "text": "Sandaler",
      }, {
        "id": "Klackar",
        "text": "Klackar",
      }, {
        "id": "Ballerinaskor",
        "text": "Ballerinaskor",
      }, {
        "id": "Loafers",
        "text": "Loafers",
      }, {
        "id": "Flip-flops",
        "text": "Flip-flops",
      }, {
        "id": "Boots",
        "text": "Boots",
      }, {
        "id": "Kängor",
        "text": "Kängor",
      }, {
        "id": "Vinterskor",
        "text": "Vinterskor",
      }, {
        "id": "Skor",
        "text": "Annat (Skor)",
      }
    ]
  },
  {
    "text": "Väskor",
    "children": [
      {
        "id": "Axelremsväska",
        "text": "Axelremsväska",
      }, {
        "id": "Handväska",
        "text": "Handväska",
      }, {
        "id": "Kuvertväska",
        "text": "Kuvertväska",
      }, {
        "id": "Ryggsäck",
        "text": "Ryggsäck",
      }, {
        "id": "Träningsväska",
        "text": "Träningsväska",
      }, {
        "id": "Resväska",
        "text": "Resväska",
      }, {
        "id": "Datorväska",
        "text": "Datorväska",
      }, {
        "id": "Väska",
        "text": "Annat (Väska)",
      }
    ]
  },
  {
    "text": "Accessoarer",
    "children": [
      {
        "id": "Solglasögon",
        "text": "Solglasögon",
      }, {
        "id": "Glasögon",
        "text": "Glasögon",
      }, {
        "id": "Örhänge",
        "text": "Örhänge",
      }, {
        "id": "Halsband",
        "text": "Halsband",
      }, {
        "id": "Armband",
        "text": "Armband",
      }, {
        "id": "Ring",
        "text": "Ring",
      }, {
        "id": "Brosch",
        "text": "Brosch",
      }, {
        "id": "Keps",
        "text": "Keps",
      }, {
        "id": "Sjal",
        "text": "Sjal",
      }, {
        "id": "Krage",
        "text": "Krage",
      }, {
        "id": "Bälte",
        "text": "Bälte",
      }, {
        "id": "Plånbok",
        "text": "Plånbok",
      }, {
        "id": "Halsduk",
        "text": "Halsduk",
      }, {
        "id": "Hatt",
        "text": "Hatt",
      }, {
        "id": "Mössa",
        "text": "Mössa",
      }, {
        "id": "Vantar",
        "text": "Vantar",
      }, {
        "id": "Necessär",
        "text": "Necessär",
      }, {
        "id": "Slips",
        "text": "Slips",
      }, {
        "id": "Handduk",
        "text": "Handduk",
      }, {
        "id": "Klocka",
        "text": "Klocka",
      }
    ]
  }
]
