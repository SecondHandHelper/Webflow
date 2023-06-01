const defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
const imageElements = ["frontImage", "brandTagImage", "productImage", "defectImage", "materialTagImage", "extraImage"];

async function addItem() {
  const id = uuidv4();
  try {
    await addItemInner(id);

    // Track with segment 'User Activated'
    if (userItemsCount === 0) {
      analytics.track('User Activated');
    }

    await nextStep();
  } catch (e) {
    console.error('addItem failed', e);
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
  const noAnimals = itemNoAnimals.checked;
  const noSmoke = itemNoSmoke.checked;
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
      category: modelData['category'],
      color: modelData['maiColor'],
    }
  }

  return {
    user: authUser.current?.uid || null,
    createdAt: now,
    status,
    shippingStatus,
    sex,
    size,
    material,
    brand,
    model,
    originalPrice,
    age,
    condition,
    defects,
    defectDescription,
    noAnimals,
    noSmoke,
    userComment,
    acceptPrice,
    preferences: { userValuationApproval },
    ...modelVariantFields,
  };
}

async function getShippingMethod() {
  // If first time: User chooses shipping method preference in sell item form
  let shippingMethod = 'Service point';
  if (!user.current?.preferences?.shippingMethod) {
    var radioButtons = document.getElementsByName("shippingMethod");
    for (var x = 0; x < radioButtons.length; x++) {
      if (radioButtons[x].checked) {
        const method = radioButtons[x].value; // "Service point" or "Pickup"
        if (method) {
          shippingMethod = method;
          if (authUser.current) {
            await firebase.app().functions("europe-west1").httpsCallable('updateFirebaseUser')({ preferences: { shippingMethod } });
          } else {
            sessionStorage.setItem('shippingMethod', shippingMethod);
          }
        }
      }
    }
  } else {
    shippingMethod = user.current?.preferences?.shippingMethod;
  }

  return shippingMethod;
}

async function addItemInner(id) {

  const { modelCoverImageUrl, ...pageData } = collect();
  const shippingMethod = await getShippingMethod();
  const images = await uploadImagesFromForm(id);
  if (modelCoverImageUrl) {
    images['coverImage'] = modelCoverImageUrl;
    pageData['coverImageUpdatedAt'] = new Date();
  }
  const createdFromItem = params.id ? { createdFromItem: params.id } : {};
  const item = { ...pageData, shippingMethod, images, ...createdFromItem, version: "2" };

  if (params.id && !authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });
  }

  // If first time: User submitted their phone number
  const phoneNumber = itemPhoneNumber.value;
  if (phoneNumber) {
    if (authUser.current) {
      await writePhoneNumberToFirestore(authUser.current.uid, phoneNumber);
    } else {
      sessionStorage.setItem('phoneNumber', phoneNumber);
    }
  }
}

async function createItemAfterSignIn() {
  const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
  await firebase.app().functions("europe-west1").httpsCallable('createItem')(itemFromStorage);
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
}

async function uploadImagesFromForm(itemId) {
  const imageData = imageElements.reduce((accumulator, current) => {
    const file = document.getElementById(current).files[0] || sessionStorage.getItem(`${current}PreviewUrl`);
    if (!file) return accumulator;
    return { ...accumulator, [current]: file }
  }, {}); // { frontImage: <file object>, ... }
  return await uploadUserImages(itemId, imageData);
}

async function uploadUserImages(itemId, imageData) {
  const storageRef = storage.ref();
  const promises = await Promise.all(Object.keys(imageData).map(async (key) => {
    if (typeof imageData[key] === 'string') {
      return { [key]: await Promise.resolve(imageData[key]) };
    }
    const imagePathReference = `images/${itemId}/${key}`;
    const file = imageData[key];
    let fileRef = storageRef.child(imagePathReference);
    await fileRef.put(file);
    return { [key]: await fileRef.getDownloadURL() };
  }));
  return Object.assign(...promises);
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
  const firstNameSet = user.current.addressFirstName;
  // If first name not set, show address form. Else, go to private page.
  if (!firstNameSet) {
    if (options && options.itemCreatedFromPrefill) {
      document.getElementById('maiIntroForPrefillAddress').style.display = 'block';
    }
    addressFormDiv.style.display = 'block';
    addItemFormDiv.style.display = 'none';
    loadingDiv.style.display = 'none';
  } else {
    window.location.href = window.location.origin + "/private";
  }
}

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

async function fillForm(itemId, savedItem) {
  try {
    let item = { data: savedItem };
    if (!savedItem) {
      item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId});
    }
    const data = item.data;
    const size = data.size;
    const material = data.material;
    const brand = data.brand;
    const model = data.model;
    let originalPrice = data.originalPrice;
    if (originalPrice <= 0) {
      originalPrice = null;
    }
    const age = data.age;
    const condition = data.condition;
    const images = data.images;
    const coverImageUrl = images.coverImageLarge || images.coverImage || null;

    // Populate images
    function showPreview(imageName, url) {
      document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
      const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i].className.includes("success-state")) {
          siblings[i].style.display = 'block';
        } else {
          // Hide other states of file input field "empty-state" and "error-state"
          siblings[i].style.display = 'none';
        }
      }
    }

    imageElements.map(img => sessionStorage.removeItem(`${img}PreviewUrl`));
    for (const imageName in images) {
      const urlSmall = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[imageName] || images[`${imageName}Large`];
      const urlLarge = images[imageName] || images[`${imageName}Large`] || images[`${imageName}Medium`] || images[`${imageName}Small`];
      if (imageElements.includes(imageName)) {
        showPreview(imageName, urlSmall);
        sessionStorage.setItem(`${imageName}PreviewUrl`, urlLarge); // Store large preview url to create image from on submit
      }
    }

    // Show cover image preview
    if (coverImageUrl){
      document.getElementById('coverImageContainer').style.backgroundImage = `url('${coverImageUrl}')`;
      document.getElementById('coverImagePreview').style.display = 'block';
    }

    // Populate text input fields
    itemBrand.value = brand;
    // Don't use the setFieldValue for the brand since that triggers a dropdown to open
    document.getElementById('itemBrandLabel').style.display = 'inline-block'
    setFieldValue('itemSize', size);
    setFieldValue('itemMaterial', material);
    setFieldValue('itemModel', model);
    setFieldValue('itemOriginalPrice', originalPrice);
    //itemUserComment.value = userComment; //Textarea
    //itemDefectDescription.value = defectDescription; //Textarea

    // Populate select fields
    let options = itemAge.options;
    for (let i = 0; i < options.length; i++) {
      if (age == options[i].attributes.value.value) {
        itemAge.selectedIndex = i;
        if (age != "") {
          itemAge.style.color = "#333";
          itemAge.dispatchEvent(new Event('input'));
        }
      }
    }
    options = itemCondition.options;
    for (let i = 0; i < options.length; i++) {
      if (condition == options[i].innerText) {
        itemCondition.selectedIndex = i;
        itemCondition.style.color = "#333";
        itemCondition.dispatchEvent(new Event('input'));
        if (options[i].innerText == "Använd, tecken på slitage") {
          defectInfoDiv.style.display = 'block';
        }
      }
    }

    // Populate radio-buttons
    document.getElementById('Woman').previousElementSibling.classList.remove("w--redirected-checked"); // Unselect radio button 'Woman'
    document.getElementById('Woman').checked = false;
    document.getElementById(data.sex).previousElementSibling.classList.add("w--redirected-checked"); // Populate the right one
    document.getElementById(data.sex).checked = true;

    // Populate checkboxes
    defectsChoicesInSwedish.forEach((value, key) => {
      if (data.defects.includes(value)) {
        document.getElementById(key).previousElementSibling.classList.add("w--redirected-checked");
        document.getElementById(key).checked = true;
      }
    });
  } catch (error) {
      console.log("Error getting item document:", error);
  }
  document.getElementById('loadingDiv').style.display = 'none';
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
    if (response.data.shareSold > '95%') {
      shareSoldText.innerHTML = `95% av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }

    if (response.data.shareSold > '55%') {
      shareSoldText.innerHTML = `${response.data.shareSold} av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }
    if (response.data.shareSold >= '45%') {
      shareSoldText.innerHTML = `Hälften av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }

    shareSoldText.innerHTML = `Mindre än hälften av plaggen från ${response.data.cleanedBrand} säljs`
    shareSoldDiv.style.display = 'block';
    demandLevelText.innerHTML = `Låg efterfrågan`;
    demandLevelText.style.display = 'block';
  } else {
    demandLevelText.innerHTML = '';
    shareSoldText.innerHTML = ''
    shareSoldDiv.style.display = 'none'
  }
}
