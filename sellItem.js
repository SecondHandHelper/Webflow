const defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");

function addItem() {
  const id = uuidv4();
  console.log(`addItem called, new id: ${id}`);
  addItemInner(id)
    .then(() => {
      console.log('addItem completed');

      // Track with segment 'User Activated'
      if (userItemsCount === 0) { analytics.track('User Activated'); }

      nextStep().then(() => console.log('nextStep completed'));
    })
    .catch((e) => {
      console.error('addItem failed', e);
    });
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
    user: authUser.uid || null,
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
  // If first time: User choses shipping method preference in sell item form
  let shippingMethod = 'Service point';
  if (!user?.preferences?.shippingMethod) {
    var radioButtons = document.getElementsByName("shippingMethod");
    for (var x = 0; x < radioButtons.length; x++) {
      if (radioButtons[x].checked) {
        const method = radioButtons[x].value; // "Service point" or "Pickup"
        if (method) {
          shippingMethod = method;
          await db.collection('users').doc(authUser.uid).update({ "preferences.shippingMethod": method });
          console.log(`Shipping method '${method}' stored as preference on user with ID: ${authUser.uid}`);
        }
      }
    }
  } else {
    shippingMethod = user?.preferences?.shippingMethod;
    console.log(`Shipping method preference from user is '${shippingMethod}' and is now set on item`);
  }

  return shippingMethod;
}

async function addItemInner(id) {
  console.log("addItemInner called");

  const { modelCoverImageUrl, ...pageData } = collect();
  const shippingMethod = await getShippingMethod();
  const images = await uploadImages(id);
  if (modelCoverImageUrl) {
    images['coverImage'] = modelCoverImageUrl;
    pageData['coverImageUpdatedAt'] = new Date();
  }
  const createdFromItem = params.id ? { createdFromItem: params.id } : {} ;
  const item = { ...pageData, shippingMethod, images, ...createdFromItem, version: "2" };

  console.log('Storing item: ', item);

  await db.collection('items').doc(id).set(item);

  // If first time: User submitted their phone number
  const phoneNumber = itemPhoneNumber.value;
  if (phoneNumber) {
    await writePhoneNumberToFirestore(authUser.uid, phoneNumber);
  }
}

async function getFilesFromPreviewUrl(imageElements) { // This is for the case the form have been prefilled with images
  const files = {};
  for (let i = 0; i < imageElements.length; i++) {
    const elm = imageElements[i];
    const url = sessionStorage.getItem(`${elm}PreviewUrl`);
    if (url) {
      const response = await fetch(url); // Download to cache
      const file = await response.blob();
      files[elm] = file;
    }
  }
  return files // Return object with blob files: { frontImage: <file object>, ... }
}

async function uploadImages(itemId) {
  const imageElements = ["frontImage", "brandTagImage", "productImage", "defectImage", "materialTagImage", "extraImage"];
  const filesFromPreviewUrl = await getFilesFromPreviewUrl(imageElements);
  const imageData = imageElements.reduce((prev, current) => {
    const file = document.getElementById(current).files[0] || filesFromPreviewUrl[current];
    if (!file) return prev;
    return { ...prev, [current]: file }
  }, {}); // { frontImage: <file object>, ... }
  const storageRef = storage.ref();
  const promises = Object.keys(imageData).map(async (key) => {
    const imagePathReference = `images/${itemId}/${key}`;
    const file = imageData[key];
    let fileRef = storageRef.child(imagePathReference);
    await fileRef.put(file);
    return { key, url: await fileRef.getDownloadURL() };
  });
  const imageUrls = await Promise.all(promises);
  return imageUrls.reduce((prev, curr) => {
    return { ...prev, [curr.key]: curr.url };
  }, {});
}

async function nextStep() {
  console.log('in nextStep');
  if (!authUser) {
    // If user isn't logged in they will be taken through these steps:
    // 1. Logg in or create account on the /sign-in page
    // 2. Get back to /sell-item and continue normal flow (show address if no address, show confirmation div)
    window.location.href = window.location.origin + "/sign-in";
    return
  }
  signedInNextStep().then(() => console.log('signedInNextStep completed'));
}

async function signedInNextStep() {
  console.log('in signedInNextStep');
  const docRef = db.collection("users").doc(authUser.uid);
  const doc = await docRef.get();
  const firstNameSet = doc.data().addressFirstName;
  // If first name not set, show address form. Else, go to private page.
  if (!firstNameSet) {
    addressFormDiv.style.display = 'block';
    addItemFormDiv.style.display = 'none';
  } else {
    window.location.href = window.location.origin + "/private";
  }
}

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

function fillForm(itemId) {
  db.collection("items").doc(itemId)
    .get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
        console.log("Item data:", doc.data());
        const size = data.size;
        const material = data.material;
        const brand = data.brand;
        const model = data.model;
        let originalPrice = data.originalPrice;
        if (originalPrice <= 0) { originalPrice = null; }
        const age = data.age;
        const condition = data.condition;
        const images = data.images;

        //TODO: Get other data that's not part of the form, to store that immediately as well. Such as category, color, max / min price etc...

        // Populate images
        function showPreview(x, url) {
          document.getElementById(`${x}Preview`).style.backgroundImage = `url('${url}')`;
          siblings = document.getElementById(x).parentNode.parentNode.childNodes;
          for (var i = 0; i < siblings.length; i++) {
            if (siblings[i].className.includes("success-state")) {
              siblings[i].style.display = 'block';
            } else {
              siblings[i].style.display = 'none'; // Hide other states of file input field "empty-state" and "error-state"
            }
          }
        }
        for (const x in images) {
          const possibleElmts = ["frontImage", "brandTagImage", "materialTagImage", "defectImage", "productImage", "extraImage"];
          const url = images[x] || images[`${x}Large`] || images[`${x}Medium`] || images[`${x}Small`];
          if (possibleElmts.includes(x)) {
            showPreview(x, url);
            sessionStorage.setItem(`${x}PreviewUrl`, url); // Store preview url to create image from on submit
          }
        }

        // Populate text input fields
        itemBrand.value = brand;
        fieldLabelToggle('itemBrandLabel'); // Didn't want to use the setFieldValue for the brand since that triggered a dropdown to open
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
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting item document:", error);
    });
}