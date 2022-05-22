function addItem() {
  const id = uuidv4();
  console.log(`addItem called, new id: ${id}`);
  addItemInner(id)
    .then(() => {
      console.log('addItem completed');
      firstNameSet().then(() => console.log('firstNameSet completed'));
    })
    .catch((e) => {
      console.error('addItem failed', e);
    });
}

function collect() {
  let sex = "";
  let pricing = "";
  const now = new Date();
  let status = "New";
  let shippingStatus = "Not sent";
  const size = itemSize.value;
  const material = itemMaterial.value;
  const brand = itemBrand.value;
  const model = itemModel.value;
  const originalPrice = Number(itemOriginalPrice.value);
  const age = itemAge.value;

  const condition = itemCondition.value;
  const defectDescription = itemDefectDescription.value;
  const noAnimals = itemNoAnimals.checked;
  const noSmoke = itemNoSmoke.checked;
  const userComment = itemUserComment.value;
  let happyPrice = Number(itemHappyPrice.value);
  let acceptPrice = Number(itemAcceptPrice.value);
  const lowestAcceptPrice = Number(itemLowestAcceptPrice.value);

  let defectElements = new Map().set("hole", hole.checked).set("stain", stain.checked).set("lostFit", lostFit.checked).set("nopprig", nopprig.checked).set("threadUp", threadUp.checked).set("colorChange", colorChange.checked).set("otherDefect", otherDefect.checked);
  let defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
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

  // Get who sets price
  var pricingRadioButtons = document.getElementsByName("Pricing");
  for (var x = 0; x < pricingRadioButtons.length; x++) {
    if (pricingRadioButtons[x].checked) {
      pricing = pricingRadioButtons[x].id;
      if (pricing === "We set price") {
        acceptPrice = lowestAcceptPrice;
        happyPrice = 0;
      }
    }
  }

  return {
    user: authUser.uid,
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
    pricing,
    happyPrice,
    acceptPrice,
  };
}

async function addItemInner(id) {
  console.log("addItemInner called");

  const pageData = collect();
  const images = await uploadImages(id);
  const item = { ...pageData, images, version: "2" };

  console.log('Storing item: ', item);

  await db.collection('items').doc(id).set(item);

  // TODO: Should this be here?
  const phoneNumber = itemPhoneNumber.value;
  if (phoneNumber) {
    await writePhoneNumberToFirestore(authUser.uid, phoneNumber);
  }
}

async function uploadImages(itemId) {
  const imageElements = ["frontImage", "brandTagImage", "productImage", "defectImage", "materialTagImage", "extraImage"];
  const imageData = imageElements.reduce((prev, current) => {
    const file = document.getElementById(current).files[0];
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

async function firstNameSet() {
  console.log('in firstNameSet');
  const docRef = db.collection("users").doc(authUser.uid);
  const doc = await docRef.get();
  const firstNameSet = doc.data().addressFirstName;
  console.log('firstNameSet', firstNameSet);
  if (!firstNameSet) {
    addressFormDiv.style.display = 'block';
    addItemFormDiv.style.display = 'none';
  } else {
    window.location.href = window.location.origin + "/private";
  }
}

async function updateItem(itemId, changedImages) {
  console.log("updateItem()");
  const now = new Date();
  const size = itemSize.value;
  const material = itemMaterial.value;
  const brand = itemBrand.value;
  const model = itemModel.value;
  const originalPrice = Number(itemOriginalPrice.value);
  const age = itemAge.value;
  const condition = itemCondition.value;
  const defectDescription = itemDefectDescription.value;
  const userComment = itemUserComment.value;
  const lowestAcceptPrice = Number(itemLowestAcceptPrice.value);
  let changes = {
    updatedAt: now,
    size: size,
    material: material,
    brand: brand,
    model: model,
    originalPrice: originalPrice,
    age: age,
    condition: condition,
    defectDescription: defectDescription,
    userComment: userComment,
    acceptPrice: lowestAcceptPrice
  }

  async function uploadImages(itemId) {
    console.log("uploadImages()");
    if (changedImages.length > 0) {
      // START - Mark imageRequest as Resolved
      await db.collection("items").doc(itemId).get().then((doc) => {
        if (doc.data()?.infoRequests?.images?.status === "Active") {
          changes["infoRequests.images.status"] = "Resolved";
        }
      });
      // END - Mark imageRequest as Resolved
      let elements = changedImages;
      let images = new Map(); //Gather files from the form in a map "Images"
      elements.forEach(element => {
        if (document.getElementById(element).files[0]) {
          let file = document.getElementById(element).files[0];
          images.set(element, file);
        }
      });
      // Uploads files and add the new imageUrls to the changes object
      const storageRef = storage.ref();
      images.forEach(async (value, key) => {
        console.log(`${key}: ${value}`);
        // If images was changed, set photo directions to default, since an 'info request' of images could have been shown
        photoDirectionsText.style.display = 'block';
        infoRequestImagesDiv.style.display = 'none';

        let imagePathReference = `images/${itemId}/${key}`;
        let fileRef = storageRef.child(imagePathReference);
        await fileRef.put(value);
        const imageDownloadUrl = await fileRef.getDownloadURL();
        let k = "images." + key;
        changes[k] = imageDownloadUrl;
        if (key == "frontImage") {
          console.log("CHANGES SET!!!!!!");
          changes["images.frontImageSmall"] = "";
          changes["images.frontImageMedium"] = "";
          changes["images.frontImageLarge"] = "";
        }
        if (elements.length == images.size) {
          updateItemDoc(itemId, changes);
        }
      })
    } else {
      updateItemDoc(itemId, changes);
    }
  }

  async function updateItemDoc(itemId, changes) {
    console.log("updateItemDoc()");
    // Update item in FS without the images first, only because that's how I did it when adding an item.
    console.log("CHANGES: ", changes);
    const itemRef = db.collection('items').doc(itemId);
    const res = await itemRef.update(changes)
      .then((itemRef) => {
        console.log("Document updated with ID: ", itemId);
        saveChangesButtonText.style.color = "#7a7575";
        saveChangesButtonText.innerHTML = "Sparat";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  uploadImages(itemId);
}