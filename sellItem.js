const defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
const imageElements = ["frontImage", "brandTagImage", "defectImage", "materialTagImage", "extraImage"];

async function addItem(event) {
  const id = uuidv4();
  try {
    await addItemInner(id);

    // Track with segment 'User Activated'
    if (userItemsCount === 0) {
      analytics.track('User Activated');
    }

    await nextStep();
  } catch (e) {
    errorHandler.report(e);
    console.error('addItem failed', e);
  }
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
  defectElements.forEach((value, key) => {
    if (value) {
      let string = defectsChoicesInSwedish.get(key);
      defects.push(string);
    }
  });

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

  if (!authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });
    localStorage.removeItem('newItem');
    sessionStorage.setItem('latestItemCreated', JSON.stringify(item));
  }

  // If first time: User submitted their phone number
  const phoneNumber = itemPhoneNumber.value;
  if (phoneNumber) {
    const pn = formatPhoneNumber(phoneNumber);
    if (authUser.current) {
      await writePhoneNumberToFirestore(authUser.current.uid, pn);
    } else {
      sessionStorage.setItem('phoneNumber', pn);
    }
  }
  let personalId = itemPersonalId.value;
  if (personalId) {
    personalId = formatPersonalId(personalId);
    if (authUser.current) {
      // Write to Firestore
      const itemRef = db.collection('users').doc(authUser.current.uid);
      itemRef.update({ personalId }).then(() => {
          console.log(`Personal id of ${authUser.current.uid} is now updated`);
        });
    } else {
      sessionStorage.setItem('personalId', personalId);
    }
  }
}

async function createItemAfterSignIn() {
  const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
  await firebase.app().functions("europe-west1").httpsCallable('createItem')(itemFromStorage);
  localStorage.removeItem('newItem');
  sessionStorage.setItem('latestItemCreated', JSON.stringify(itemFromStorage.item));
}

async function enhanceFrontImage(imageUrl) {
  const enhancedImageUrl = await createEnhancedImage(imageUrl);
  rememberNewItemImageField('enhancedFrontImage', enhancedImageUrl);
  showImagePreview('frontImage', enhancedImageUrl);
}

async function rememberUnsavedChanges(event) {
  if (sessionStorage.getItem('latestItemCreated')) {
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
  item.images = item.images ? item.images : {};
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
    console.log("Saving form state");
    localStorage.setItem('newItem', JSON.stringify(item));
  } else {
    console.log('Removing saved item');
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
        console.log(`${field} differs ${defaultState[field]} vs ${itemState[field]}`);
        return false
      }
      continue;
    }
    if (itemState[field] !== defaultState[field]) {
      console.log(`${field} differs`);
      return false;
    }
  }
  return true;
}

async function nextStep(options) {
  if (!authUser.current) {
    // If user isn't logged in they will be taken through these steps:
    // 1. Logg in or create account on the /sign-in page
    // 2. Get back to /sell-item and continue normal flow (show address if no address, show confirmation div)
    location.href = "/sign-in";
    return
  }
  await nextStepSignedIn(options);
}

async function nextStepSignedIn(options) {
  // Show item confirmation screen
  if (sessionStorage.getItem('latestItemCreated')) {
    const enhancedFrontImageUrl = JSON.parse(sessionStorage.getItem('latestItemCreated'))?.images?.enhancedFrontImage;
    if (enhancedFrontImageUrl) { itemConfirmationImage.style.backgroundImage = `url('${enhancedFrontImageUrl}')`; console.log("Found front image"); }
    else { console.log("Couldn't find front image"); }
  }
  triggerShowItemConfirmation.click();
  // Track with segment
  analytics.track("Element Viewed", { elementID: "itemConfirmationScreen" });
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
    imageElements.map(img => sessionStorage.removeItem(`${img}PreviewUrl`));
    for (const imageName in images) {
      let urlSmall = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[imageName] || images[`${imageName}Large`];
      let urlLarge = images[imageName] || images[`${imageName}Large`] || images[`${imageName}Medium`] || images[`${imageName}Small`];
      if (imageName === 'frontImage' && images.enhancedFrontImage) {
        urlSmall = images['enhancedFrontImageSmall'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImage'] || images['enhancedFrontImageLarge'];
        urlLarge = images['enhancedFrontImage'] || images['enhancedFrontImageLarge'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImageSmall'];
      }
      if (imageElements.includes(imageName)) {
        showImagePreview(imageName, urlSmall);
        showImageState(imageName, 'success-state');
        document.getElementById(imageName).required = false;
        sessionStorage.setItem(`${imageName}PreviewUrl`, urlLarge); // Store large preview url to create image from on submit
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
    document.getElementById('itemBrandLabel').style.display = 'inline-block'
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
      data.phoneNumber ? setFieldValue('itemPhoneNumber', data.phoneNumber) : '';
      data.personalId ? setFieldValue('itemPersonalId', data.personalId) : '';
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
    field.dispatchEvent(new Event('input'));
  } else {
    field.style.color = '#929292';
  }
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

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

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
    const promises = [];
    if (featureIsEnabled('colorCategory')) {
      promises.push(detectAndFillColor(imageUrl), detectAndFillBrandAndMaterialAndSize(imageUrl));
    }
    if (featureIsEnabled('enhanceImage')) {
      promises.push(enhanceFrontImage(imageUrl));
    }
    await Promise.all(promises);
  }
}

async function uploadImageAndShowPreview(input, imageName) {
  let src = URL.createObjectURL(input);
  document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = `url('${src}')`;
  document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${src}')`;
  showLoadingIcon(imageName)
  showImageState(imageName, 'success-state');
  const imageUrl = await uploadTempImage(input, imageName);
  rememberNewItemImageField(imageName, imageUrl);
  return imageUrl;
}

function rememberNewItemImageField(filedName, value) {
  let newItem = JSON.parse(localStorage.getItem('newItem') || JSON.stringify({ images: {} }));
  if (!newItem.images) {
    newItem.images = {};
  }
  newItem['images'][filedName] = value;
  localStorage.setItem('newItem', JSON.stringify(newItem));
}

async function uploadTempImage(input, filename) {
  const tempId = uuidv4();
  const imageBase64 = await toBase64(input);
  const response = await firebase.app().functions("europe-west1").httpsCallable('uploadItemImage')({
    itemId: tempId, fileName: `${filename}`, file: imageBase64, temporary: true
  });
  return response.data.url;
}

async function brandTagImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'brandTagImage');
    showDeleteImageIcon('brandTagImage')
    if (featureIsEnabled('colorCategory')) {
      await detectAndFillBrandAndMaterialAndSize(imageUrl);
    }
  }
}

function showLoadingIcon(imageName) {
  document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
  document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showDeleteImageIcon(imageName) {
  document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
  document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
}

async function productImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'productImage');
    showDeleteImageIcon('productImage')
    if (featureIsEnabled('colorCategory')) {
      await detectAndFillBrandAndMaterialAndSize(imageUrl);
    }
  }
}

async function defectImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'defectImage');
    showDeleteImageIcon('defectImage')
    if (featureIsEnabled('colorCategory')) {
      await detectAndFillBrandAndMaterialAndSize(imageUrl);
    }
  }
}

async function materialTagImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'materialTagImage');
    showDeleteImageIcon('materialTagImage')
    if (featureIsEnabled('colorCategory')) {
      await detectAndFillBrandAndMaterialAndSize(imageUrl);
    }
  }
}

async function extraImageChangeHandler(event) {
  let input = this.files[0];
  if (input) {
    event.stopPropagation();
    const imageUrl = await uploadImageAndShowPreview(input, 'extraImage');
    showDeleteImageIcon('extraImage')
    if (featureIsEnabled('colorCategory')) {
      await detectAndFillBrandAndMaterialAndSize(imageUrl);
    }
  }
}

function hideConfirmButtons(event, elementID) {
  event.currentTarget.setCustomValidity('');
  event.currentTarget.closest('.text-input-container').querySelector('.suggest-buttons').style.display = 'none';
}

async function detectAndFillBrandAndMaterialAndSize(imageUrl) {
  try {
    if (document.querySelector('#itemBrand').value.length && document.querySelector('#itemMaterial').value.length
      && document.querySelector('#itemSize').value.length) {
      // Don't do anything if both brand and material already filled in
      return;
    }
    const response = await firebase.app().functions("europe-west1").httpsCallable('detectItemBrandAndMaterialAndSize')({ imageUrl });
    console.log(response);
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
    console.log(response);
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
    document.querySelector('#itemColor').dispatchEvent(new Event('change'));
    document.querySelector('#itemColor').dispatchEvent(new Event('input'));
    document.querySelector('#colorSuggestButtons').style.display = 'block';
    analytics.track("Element Viewed", { elementID: "colorSuggestButtons" });
  } catch (e) {
    errorHandler.report(e);
    console.log('Error calling detectItemColor', e);
  }
}

async function initializeMaterialConfirm() {
  document.getElementById('rejectMaterial').addEventListener('click', () => {
    document.querySelector('#itemMaterial').value = '';
    document.querySelector('#itemMaterial').dispatchEvent(new Event('change'));
    document.querySelector('#itemMaterial').dispatchEvent(new Event('input'));
    document.querySelector('#materialSuggestButtons').style.display = 'none';
    document.querySelector('#itemMaterial').setCustomValidity('');
  });
  document.getElementById('confirmMaterial').addEventListener('click', () => {
    document.querySelector('#itemMaterial').setCustomValidity('');
  })
}

async function initializeBrandConfirm() {
  document.getElementById('rejectBrand').addEventListener('click', () => {
    document.querySelector('#itemBrand').value = '';
    document.querySelector('#itemBrand').dispatchEvent(new Event('change'));
    document.querySelector('#itemBrand').dispatchEvent(new Event('input'));
    document.querySelector('#brandSuggestButtons').style.display = 'none';
    document.querySelector('#itemBrand').setCustomValidity('');
  });
  document.getElementById('confirmBrand').addEventListener('click', () => {
    document.querySelector('#itemBrand').setCustomValidity('');
  })
}

function initializeClearFormButton() {
  document.getElementById('wf-form-Add-Item').addEventListener('input', (event) => {
    let field = event.target;
    if (field instanceof Element) {
      const defaultValue = defaultFormState()[field.name];
      if (defaultValue !== field.value && field.value !== '') {
        document.getElementById('clearItemForm').style.display = 'block';
      }
    }
  })
}

function initializeSaveStateListeners() {
  document.getElementById('wf-form-Add-Item').querySelectorAll('input').forEach(elm => {
    elm.addEventListener('blur', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="radio"]').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="checkbox"]').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('select').forEach(elm => {
    elm.addEventListener('change', rememberUnsavedChanges);
  });
  document.getElementById('wf-form-Add-Item').querySelectorAll('textarea').forEach(elm => {
    elm.addEventListener('blur', rememberUnsavedChanges);
  });
}

async function initializeSizeConfirm() {
  document.getElementById('rejectSize').addEventListener('click', () => {
    document.querySelector('#itemSize').value = '';
    document.querySelector('#itemSize').dispatchEvent(new Event('change'));
    document.querySelector('#itemSize').dispatchEvent(new Event('input'));
    document.querySelector('#sizeSuggestButtons').style.display = 'none';
    document.querySelector('#itemSize').setCustomValidity('');
  });
  document.getElementById('confirmSize').addEventListener('click', () => {
    document.querySelector('#itemSize').setCustomValidity('');
  })
}

async function initializeColorConfirm() {
  document.getElementById('rejectColor').addEventListener('click', () => {
    document.querySelector('#itemColor').value = '';
    document.querySelector('#itemColor').dispatchEvent(new Event('change'));
    document.querySelector('#itemColor').dispatchEvent(new Event('input'));
    document.querySelector('#colorSuggestButtons').style.display = 'none';
    document.querySelector('#itemColor').setCustomValidity('');
  });
  document.getElementById('confirmColor').addEventListener('click', () => {
    document.querySelector('#itemColor').setCustomValidity('');
  })
}

function clearFormFields() {
  localStorage.removeItem('newItem');
  document.getElementById('clearItemForm').style.display = 'none';
  imageElements.forEach(imageName => {
    document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
    showImageState(imageName, 'default-state');
  });

  setFieldValue('itemBrand', null);
  setFieldValue('itemSize', null);
  setFieldValue('itemMaterial', null);
  setFieldValue('itemModel', null);
  setFieldValue('itemOriginalPrice', null);

  setFieldValue('itemUserComment', null);
  setFieldValue('itemDefectDescription', null);
  setFieldValue('itemLowestAcceptPrice', null);
  setFieldValue('itemPhoneNumber', null);
  setFieldValue('itemPersonalId', null);

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
}

function initializeDeleteImageListeners() {
  imageElements.forEach(imageName => {
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).addEventListener('click', () => {
      removeSavedImage(imageName);
    });
  })
  document.getElementById("deleteFrontImageIcon").addEventListener('click', () => {
    document.getElementById("frontImage").required = true;
  });
  document.getElementById("deleteBrandTagImageIcon").addEventListener('click', () => {
    document.getElementById("brandTagImage").required = true;
  });
}

function removeSavedImage(imageName) {
  const savedItem = JSON.parse(localStorage.getItem('newItem'));
  delete savedItem.images[imageName];
  localStorage.setItem('newItem', JSON.stringify(savedItem));
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
  $('#itemCategory').on('select2:select', () => {
    analytics.track('Click', { elementID: 'itemCategoryValue' });
    console.log('Clicked itemCategoryValue');
  });
  let searchClickTracked = false;
  $('#itemCategory').on('select2:open', () => {
    if (!searchClickTracked) {
      searchClickTracked = true;
      $('input.select2-search__field').on('click', () => {
        analytics.track('Click', { elementID: 'itemCategorySearch' });
        console.log('Clicked itemCategorySearch');
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
    console.log('Viewed itemCategoryContainer');
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
