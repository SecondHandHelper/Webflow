import {enhanceFrontImage, showImageState, uploadImageAndShowPreview, uploadTempImage} from "./sellItemHelpers";
import {autocomplete, brands} from "./autocomplete-brands";

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

async function validateInput() {
  return new Promise((resolve, reject) => {
    document.getElementById('wf-form-Add-Item').reportValidity();
    const invalidElements = document.getElementById('wf-form-Add-Item').querySelectorAll(':invalid');
    const element = invalidElements?.[0];
    if (element) {
      element.style.cssText = 'width:100% !important;height:100% !important;'
      if (element.getBoundingClientRect().height <= 1) {
        setTimeout(() => {
          if (!isElementInView(element)) {
            const y = element.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({top: y, behavior: 'smooth'});
          }
          document.getElementById('wf-form-Add-Item').reportValidity();
        }, 300);
      } else {
        document.getElementById('wf-form-Add-Item').reportValidity();
      }
      return resolve(false);
    }
    const initialCurrentPrice = Number(document.getElementById('currentPrice').dataset.currentPrice);
    if (isNaN(initialCurrentPrice) || initialCurrentPrice <= 0) {
      return resolve(true);
    }
    if (!isNumeric(currentPrice.value) || Number(currentPrice.value) > initialCurrentPrice) {
      document.getElementById('currentPrice').setCustomValidity(`Ange ett pris som är lägre än nuvarande pris på ${initialCurrentPrice} kr`);
      document.getElementById('wf-form-Add-Item').reportValidity();
      showSaveButton();
      return resolve(false);
    }
    if (Number(currentPrice.value) < 100) {
      document.getElementById('currentPrice').setCustomValidity('Priset måste vara minst 100 kr');
      document.getElementById('wf-form-Add-Item').reportValidity();
      showSaveButton();
      return resolve(false);
    }
    const lowestPrice = Number(document.getElementById('lowestPrice').dataset.lowestPrice);
    const startPrice = Number(document.getElementById('startPrice').dataset.startPrice);
    if (Number(currentPrice.value) >= lowestPrice) {
      return resolve(true);
    }
    document.getElementById('lowPriceInfoBox').style.display = 'block';
    document.getElementById('darkOverlay').style.display = 'block';
    document.getElementById('lowerPriceConfirm').innerText = `Priset går under intervallet på ${lowestPrice}-${startPrice} kr. Vill du sänka priset ändå?`
    document.getElementById('confirmLowerPrice').innerText = `Ja, sänk priset till ${currentPrice.value} kr`;
    document.getElementById('confirmLowerPrice').addEventListener('click', () => {
      document.getElementById('lowPriceInfoBox').style.display = 'none';
      document.getElementById('darkOverlay').style.display = 'none';
      document.getElementById('lowestPrice').innerText = currentPrice.value;
      resolve(true);
    });
    document.getElementById('closePricingInfoBox').addEventListener('click', () => {
      document.getElementById('lowPriceInfoBox').style.display = 'none';
      document.getElementById('darkOverlay').style.display = 'none';
      resolve(false);
    });
  })
}

async function updateItem(itemId, changedImages) {
  console.log("updateItem()");
  $('.goback').data('disabled', true);
  if (!(await validateInput())) {
    showSaveButton();
    $('.goback').data('disabled', false);
    return;
  }
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
  const initialCurrentPrice = Number(document.getElementById('currentPrice').dataset.currentPrice);
  const lowestPrice = Number(document.getElementById('lowestPrice').dataset.lowestPrice);
  const userSetCurrentPrice = Number(currentPrice.value);
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
    ...(userSetCurrentPrice >= 100 ? { userSetCurrentPrice } : {}),
    ...(initialCurrentPrice > 0 && userSetCurrentPrice !== 0 && userSetCurrentPrice < lowestPrice  ? { minPriceEstimate: userSetCurrentPrice } : {}),
  }

  async function uploadImages(itemId) {
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
      await Promise.all(Array.from(images).map(async ([imageName, value]) => {
        console.log(`${imageName}: ${value}`);
        // If images was changed, set photo directions to default, since an 'info request' of images could have been shown
        infoRequestImagesText.style.display = 'block';
        infoRequestImagesDiv.style.display = 'none';
        const {url: imageUrl} = await uploadTempImage(value, imageName);
        await firebase.app().functions("europe-west1").httpsCallable('saveItemImage')({
          itemId,
          fileName: imageName,
          url: imageUrl
        });
      }));
      if (changedImages.indexOf('frontImage') > -1) {
        // Front image was changed, also save the enhancedFrontImage in the right place
        const item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId})
        const itemData = item.data;
        await firebase.app().functions("europe-west1").httpsCallable('saveItemImage')({
          itemId, fileName: `enhancedFrontImage`,
          url: `${sessionStorage.getItem('enhancedFrontImage')}`
        });
        changes[`images.versionsStatus.enhancedFrontImage`] = '';
        if (itemData.images.coverImage === itemData.images.enhancedFrontImage) {
          changes['images.coverImage'] = '';
          changes['images.coverImageSmall'] = '';
          changes['images.coverImageMedium'] = '';
          changes['images.coverImageLarge'] = '';
          changes[`images.versionsStatus.coverImage`] = '';
        }
      }
    }
    await updateItemDoc(itemId, changes);
    sessionStorage.removeItem('enhancedFrontImage');
  }

  async function updateItemDoc(itemId, changes) {
    console.log("updateItemDoc()");
    // Update item in FS without the images first, only because that's how I did it when adding an item.
    console.log("CHANGES: ", changes);
    const itemRef = db.collection('items').doc(itemId);
    const res = await itemRef.update(changes)
      .then((itemRef) => {
        console.log("Document updated with ID: ", itemId);
        showChangesSaved();
      })
      .catch((error) => {
        errorHandler.report(error);
        console.error("Error adding document: ", error);
      });
  }

  await uploadImages(itemId);
  $('.goback').data('disabled', false);
}

function showSaveButton() {
  if (!saveChangesButton.style.display || saveChangesButton.style.display === 'none') {
    if (window.scrollY >= 50) {
      document.getElementById('header').classList.add('header-sticky-animated');
    } else {
      document.getElementById('header').style.position = 'sticky';
    }
    document.getElementById('header').style.zIndex = '2';
  }
  saveChangesButton.style.display = 'block'
  savedCheckIcon.style.display = 'none'
  saveLoadingSpinner.style.display = 'none'
}

function showSavingSpinner() {
  saveChangesButton.style.display = 'none'
  saveLoadingSpinner.style.display = 'block'
  savedCheckIcon.style.display = 'none'
}

function showChangesSaved() {
  saveChangesButton.style.display = 'none'
  saveLoadingSpinner.style.display = 'none'
  savedCheckIcon.style.display = 'block'
}

async function fillForm(itemId) {
  try {
    const userId = authUser.current.uid;
    const item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId})
    const data = item.data;
    if (userId !== data.user && userId !== '3OkW5av20HP8ScpUDS8ip9fBEZr1') {
      return;
    }
    console.log("Item data:", data);
    const itemDetailsCollapsed = document.getElementById('itemDetailsCollapsed');
    let collapsedText = [data.category, data.size, data.material, data.brand].join(', ').substring(0, 30) + '...';
    itemDetailsCollapsed.innerText = collapsedText;
    document.getElementById('itemDetailsCollapsedDiv').style.display = 'flex';
    document.getElementById('itemDetailsCollapsedDiv').addEventListener('click', () => {
      document.getElementsByClassName('accordion')[0].classList.toggle('open');
      if (itemDetailsCollapsed.innerText === 'Dölj') {
        setTimeout(() => itemDetailsCollapsed.innerText = collapsedText, 250);
      } else {
        itemDetailsCollapsed.innerText = 'Dölj';
      }
    });
    if (data.publishedDate && data.status === 'Published') {
      document.getElementById('lowestPrice').innerText = `${data.minPriceEstimate} kr`;
      document.getElementById('lowestPrice').dataset.lowestPrice = `${data.minPriceEstimate}`;
      document.getElementById('startPrice').innerText = `${data.maxPriceEstimate} kr`;
      document.getElementById('startPrice').dataset.startPrice = `${data.maxPriceEstimate}`;
      const publishedDate = new Date(data.publishedDate);
      const nowDate = new Date();
      const timeDifference = nowDate.getTime() - publishedDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      const sellingPeriodLength = data.longerPeriodAcceptedDate ? 60 : 30;
      const daysLeft = Math.max(0, Math.round(sellingPeriodLength - daysDifference));
      document.getElementById('daysLeft').innerText = `${daysLeft} ${daysLeft === 1 ? 'dag' : 'dagar'} kvar`;
      const currentPrice = Math.min(data.userSetCurrentPrice || data.currentPrice, data.currentPrice);
      document.getElementById('currentPrice').value = currentPrice;
      document.getElementById('currentPrice').dataset.currentPrice = `${currentPrice}`;
      document.getElementById('currentPriceDiv').style.display = 'flex';
    }

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
    const defectDescription = data.defectDescription;
    const userComment = data.userComment;
    const infoRequests = data.infoRequests;
    const images = data.images;
    let category = "";
    if (data.category) {
      category = data.category;
    }

    // Populate images
    function showImageAndHideSiblings(imageName, url) {
      document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
      showImageState(imageName, 'success-state');
      document.getElementById(imageName).required = false;
    }

    for (const imageName in images) {
      const possibleElmts = ["brandTagImage", "materialTagImage", "defectImage", "productImage", "extraImage"];
      const url = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[`${imageName}Large`] || images[imageName];
      if (possibleElmts.includes(imageName)) {
        showImageAndHideSiblings(imageName, url);
      }
    }
    // Special case for frontImage where we want to show the enhancedFrontImage
    const frontImageUrl = images[`enhancedFrontImageSmall`] || images[`enhancedFrontImageMedium`] || images[`enhancedFrontImageLarge`] || images['enhancedFrontImage'] ||
      images[`frontImageSmall`] || images[`frontImageMedium`] || images[`frontImageLarge`] || images['frontImage'];
    if (frontImageUrl) {
      showImageAndHideSiblings('frontImage', frontImageUrl);
    }

    // Populate text input fields
    pageTitle.innerHTML = brand;
    pageSubTitle.innerHTML = category;
    itemSize.setAttribute('value', size);
    itemBrand.setAttribute('value', brand);
    itemMaterial.setAttribute('value', material);
    itemModel.setAttribute('value', model);
    itemOriginalPrice.setAttribute('value', originalPrice);
    itemUserComment.value = userComment; //Textarea
    itemDefectDescription.value = defectDescription; //Textarea

    // Populate select fields
    let options = itemAge.options;
    for (let i = 0; i < options.length; i++) {
      if (age === options[i].attributes.value.value) {
        itemAge.selectedIndex = i;
        if (age !== "") {
          itemAge.style.color = "#333";
        }
      }
    }
    options = itemCondition.options;
    for (let i = 0; i < options.length; i++) {
      if (condition === options[i].innerText) {
        itemCondition.selectedIndex = i;
        itemCondition.style.color = "#333";
        if (options[i].innerText === "Använd, tecken på slitage") {
          defectInfoDiv.style.display = 'block';
        }
      }
    }

    // Populate checkboxes and radio-buttons is harder to do with Webflow, so not allowing users to change defects right now

    // If "info request" for images exist, show the directions
    if (infoRequests?.images?.status === "Active" && infoRequests?.images?.description) {
      infoRequestImagesText.style.display = 'none';
      infoRequestImagesText.innerHTML = infoRequests.images.description;
      infoRequestImagesDiv.style.display = 'flex';
    }

    // Show form
    updateItemFormDiv.style.display = "block";
    pageTitleDiv.style.display = "flex";
    loadingDiv.style.display = "none";
  } catch (error) {
    errorHandler.report(error);
    console.log("Error getting item document:", error);
  }
}

async function saveChanges() {
  showSavingSpinner();
  console.log("changedImages: ", changedImages);
  const params = getParamsObject();
  await updateItem(params.id, changedImages);
}

function setUpEventListeners() {
  // EVENT LISTENERS
  let imageElementIds = ['frontImage', 'brandTagImage', 'materialTagImage', 'productImage', 'defectImage', 'extraImage'];
  imageElementIds.forEach(function (id) {
    let elemUpload = document.getElementById(id);
    let elemPreviewUploading = document.getElementById(`${id}PreviewUploading`);
    let elemPreview = document.getElementById(`${id}Preview`);
    elemUpload.addEventListener("change", function () {
      let input = this.files[0];
      if (input) {
        let src = URL.createObjectURL(input);
        elemPreviewUploading.style.backgroundImage = `url('${src}')`;
        elemPreview.style.backgroundImage = `url('${src}')`;
        document.getElementById(id).required = false;
      }
    });
  });
  document.getElementById('frontImage').addEventListener('change', async function () {
    let input = this.files[0];
    if (input) {
      const imageUrl = await uploadImageAndShowPreview(input, 'frontImage', false);
      if (!imageUrl || Object.keys(imageUrl).length === 0) {
        return;
      }
      await enhanceFrontImage(imageUrl, false);
    }
  });

  let elementsArray = [...document.querySelectorAll("input").values(),
    ...document.querySelectorAll("textarea").values(), ...document.querySelectorAll("select").values()];
  elementsArray.forEach(function (elem) {
    elem.addEventListener("input", function (event) {
      showSaveButton();
      event.currentTarget.setCustomValidity('');
      if (elem.id.includes("Image")) {
        changedImages.push(elem.id);
      }
    });
  });

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

  itemAge.onchange = function () {
    let input = this.value;
    if (input != "") {
      itemAge.style.color = "#333";
    } else {
      itemAge.style.color = "#929292";
    }
  };

  saveChangesButton.addEventListener('click', saveChanges);
  currentPrice.addEventListener('focus', () => {
    lowerPriceButton.style.display = 'none';
  });
  currentPrice.addEventListener('blur', () => {
    lowerPriceButton.style.display = 'block';
  });
  document.getElementById("deleteFrontImageIcon").addEventListener('click', () => {
    document.getElementById("frontImage").required = true;
  });
  document.getElementById("deleteBrandTagImageIcon").addEventListener('click', () => {
    document.getElementById("brandTagImage").required = true;
  });
}

let changedImages = [];
sessionStorage.removeItem('enhancedFrontImage');
setUpEventListeners();
const params = getParamsObject();
user.whenSet(async () => await fillForm(params.id));
autocomplete(document.getElementById("itemBrand"), brands); // Enable autocomplete
