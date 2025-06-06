import { enhanceFrontImage, showImageState, uploadImageAndShowPreview, uploadTempImage } from "./sellItemHelpers";
import { autocomplete, brands } from "./autocomplete-brands";

const params = getParamsObject();
if (params.app) {
  const goBackButtons = document.querySelectorAll('.goback');
  goBackButtons.forEach(button => {
    button.style.visibility = 'hidden';
  });
}

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
            window.scrollTo({ top: y, behavior: 'smooth' });
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
      document.getElementById('lowestPrice').innerText = `${currentPrice.value} kr`;
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
    ...(userSetCurrentPrice >= 100 && userSetCurrentPrice !== initialCurrentPrice ? { userSetCurrentPrice } : {}),
    ...(userSetCurrentPrice >= 100 && userSetCurrentPrice < lowestPrice ? { minPriceEstimate: userSetCurrentPrice } : {}),
  }

  function inputNameToImageName(inputName, numExtraImagesSeen, numDefectImagesSeen) {
    console.log("inputNameToImageName()");
    if (inputName === 'brandTagImage') {
      return 'extraImage1';
    } else if (inputName === 'materialTagImage') {
      return 'extraImage2';
    } else if (inputName.includes('defectImage')) {
      return `defectImage${numDefectImagesSeen + 1}`;
    } else if (inputName.includes('extraImage')) {
      return `extraImage${numExtraImagesSeen + 1}`;
    } else {
      return inputName;
    }
  }

  async function uploadImages(itemId) {
    console.log("uploadImages()");
    if (changedImages.length >= 0) {
      console.log("uploadImages() running");
      const imagesv2 = document.getElementById('defectImagesSection').style.display === 'flex'
      // START - Mark imageRequest as Resolved
      const newFilesUploaded = [...document.querySelectorAll('input[type=file]')].find(input => input.value?.length) != null;
      if (newFilesUploaded) {
        await db.collection("items").doc(itemId).get().then((doc) => {
          if (doc.data()?.infoRequests?.images?.status === "Active") {
            changes["infoRequests.images.status"] = "Resolved";
          }
        });
      }
      // END - Mark imageRequest as Resolved
      let elements = changedImages;
      let images = new Map(); //Gather files from the form in a map "Images"
      if (imagesv2) {
        let numExtraImagesSeen = 0;
        let numDefectImagesSeen = 0;
        document.querySelectorAll('input[type=file]').forEach(fileInput => {
          if (fileInput.value?.length || fileInput.dataset.fileUrl?.length) {
            const imageName = inputNameToImageName(fileInput.id, numExtraImagesSeen, numDefectImagesSeen);
            images.set(imageName, fileInput.files[0] || fileInput.dataset.fileUrl);
            if (imageName.includes('extraImage')) {
              numExtraImagesSeen++;
            } else if (imageName.includes('defectImage')) {
              numDefectImagesSeen++;
            }
          }
        });
      } else {
        elements.forEach(element => {
          if (document.getElementById(element).files[0]) {
            let file = document.getElementById(element).files[0];
            images.set(element, file);
          }
        });
      }
      // Uploads files and add the new imageUrls to the changes object
      await Promise.all(Array.from(images).map(async ([imageName, value]) => {
        console.log(`${imageName}: ${value}`);
        // If images was changed, set photo directions to default, since an 'info request' of images could have been shown
        infoRequestImagesText.style.display = 'block';
        infoRequestImagesDiv.style.display = 'none';
        const { url: imageUrl } = value instanceof File ? await uploadTempImage(value, imageName, itemId) : { url: value };
        if (!imagesv2) {
          await callBackendApi(`/api/items/${itemId}/images`, {
            data: {
              fileName: imageName,
              url: imageUrl
            }
          });
        } else {
          changes['imagesv2'] = [
            ...(changes['imagesv2'] ? changes['imagesv2'] : []),
            {
              name: imageName,
              url: imageUrl
            }
          ];
        }
      }));

      if (changedImages.indexOf('frontImage') > -1) {
        // Front image was changed, also save the enhancedFrontImage in the right place
        if (!imagesv2) {
          const item = await callBackendApi(`/api/items/${itemId}`);
          const itemData = item.data;
          await callBackendApi(`/api/items/${itemId}/images`, {
            data: {
              fileName: `enhancedFrontImage`,
              url: `${sessionStorage.getItem('enhancedFrontImage')}`
            }
          });
          changes[`images.versionsStatus.enhancedFrontImage`] = '';
          if (itemData.images.coverImage === itemData.images.enhancedFrontImage) {
            changes['images.coverImage'] = '';
            changes['images.coverImageSmall'] = '';
            changes['images.coverImageMedium'] = '';
            changes['images.coverImageLarge'] = '';
            changes[`images.versionsStatus.coverImage`] = '';
          }
        } else {
          const enhancedFrontImageUrl = sessionStorage.getItem('enhancedFrontImage');
          const extension = enhancedFrontImageUrl.split('.').pop();
          const response = await callBackendApi(`/api/items/${itemId}/moveTempImage`, {
            data: {
              imageName: `enhancedFrontImage.${extension}`,
              url: enhancedFrontImageUrl
            }
          });
          changes['imagesv2'] = [
            {
              name: 'enhancedFrontImage',
              url: response.data.url
            },
            ...(changes['imagesv2'] ? changes['imagesv2'] : []),
          ];
        }
      } else if (imagesv2) {
        const enhancedFrontImageUrl = document.getElementById('frontImage').dataset.enhancedFileUrl;
        changes['imagesv2'] = [
          {
            name: 'enhancedFrontImage',
            url: enhancedFrontImageUrl,
          },
          ...(changes['imagesv2'] ? changes['imagesv2'] : []),
        ]
      }
      if (changes['imagesv2']) {
        changes['imagesv2Status'] = {
          status: 'Process',
          lastUpdated: Date.now(),
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
    const item = await callBackendApi(`/api/items/${itemId}`);
    const data = item.data;
    if (userId !== data.user && userId !== '3OkW5av20HP8ScpUDS8ip9fBEZr1') {
      return;
    }
    console.log("Item data:", data);
    const itemDetailsCollapsed = document.getElementById('itemDetailsCollapsed');
    let collapsedText = [data.category, data.size, data.material, data.brand].join(', ')/*.substring(0, 30) + '...'*/;
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
    const defectDescription = data.defectDescription || '';
    const userComment = data.userComment || '';
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

    function showDefectImagesV2(defectImagesV2) {
      let maxIdx = -1;
      const v2Containers = document.querySelectorAll('.file-upload-container-v2');
      v2Containers.forEach(container => {
        // Start by hiding all defect image containers
        container.style.display = 'none';
      });
      defectImagesV2.sort((a, b) => a.name.localeCompare(b.name)).forEach((imageV2, idx) => {
        const url = imageV2.versions?.small || imageV2.versions?.medium || imageV2.versions?.large || imageV2.url;
        document.getElementById(`defectImageV2_${idx + 1}`).dataset.fileUrl = imageV2.url;
        document.getElementById(`defectImageV2_${idx + 1}Preview`).style.backgroundImage = `url('${url}')`;
        showImageState(`defectImageV2_${idx + 1}`, 'success-state');
        document.getElementById(`defectImageV2_${idx + 1}`).required = false;
        document.querySelector(`.file-upload-container-v2:has(#defectImageV2_${idx + 1})`).style.display = 'inline-block';
        maxIdx = Math.max(maxIdx, idx);
      });
      if (maxIdx < (v2Containers.length - 1)) {
        // Show the first empty defect image container to allow adding new defect images
        document.querySelector(`.file-upload-container-v2:has(#defectImageV2_${maxIdx + 2})`).style.display = 'inline-block';
      }
    }

    function showExtraImagesV2(extraImagesV2) {
      let maxIdx = -1;
      const v2Containers = document.querySelectorAll('.file-upload-container-edit-v2');
      v2Containers.forEach(container => {
        // Start by hiding all extra image containers
        container.style.display = 'none';
      });
      extraImagesV2.sort((a, b) => a.name.localeCompare(b.name)).forEach((imageV2, idx) => {
        const url = imageV2.versions?.small || imageV2.versions?.medium || imageV2.versions?.large || imageV2.url;
        document.getElementById(`extraImageV2_${idx + 1}`).dataset.fileUrl = imageV2.url;
        document.getElementById(`extraImageV2_${idx + 1}Preview`).style.backgroundImage = `url('${url}')`;
        showImageState(`extraImageV2_${idx + 1}`, 'success-state');
        document.getElementById(`extraImageV2_${idx + 1}`).required = false;
        document.querySelector(`.file-upload-container-edit-v2:has(#extraImageV2_${idx + 1})`).style.display = 'inline-block';
        maxIdx = Math.max(maxIdx, idx);
      });
      console.log("maxIdx: ", maxIdx);
      console.log("v2Containers.length: ", v2Containers.length);
      if (maxIdx < (v2Containers.length - 1)) {
        // Show the first empty defect image container to allow adding new defect images
        document.querySelector(`.file-upload-container-edit-v2:has(#extraImageV2_${maxIdx + 2})`).style.display = 'inline-block';
      }
    }

    function showImageV2AndHideSiblings(imageV2, imageName) {
      if (!imageV2?.url || !imageV2.name) {
        return;
      }
      const url = imageV2.versions?.small || imageV2.versions?.medium || imageV2.versions?.large || imageV2.url;
      document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
      document.getElementById(imageName).dataset.fileUrl = imageV2.url;
      showImageState(imageName, 'success-state');
      document.getElementById(imageName).required = false;
    }

    if (data.imagesv2) {
      document.getElementById('defectImagesSection').style.display = 'flex'
      document.querySelector('.file-upload-container-edit:has(input#defectImage)').style.display = 'none'
      document.querySelector('.file-upload-container-edit:has(input#extraImage)').style.display = 'none'
      const enhancedFrontImage = data.imagesv2.find(img => img.name === 'enhancedFrontImage');
      const frontImage = data.imagesv2.find(img => img.name === 'frontImage');
      if (frontImage) {
        showImageV2AndHideSiblings(enhancedFrontImage, 'frontImage');
        document.getElementById('frontImage').dataset.enhancedFileUrl = enhancedFrontImage?.url;
      }
      showImageV2AndHideSiblings(data.imagesv2.find(img => img.name === 'extraImage1'), 'brandTagImage');
      showImageV2AndHideSiblings(data.imagesv2.find(img => img.name === 'extraImage2'), 'materialTagImage');
      // loop through extraImageX and defectImageY and show them in their respective containers
      showExtraImagesV2(data.imagesv2.filter(img => img.name.match(/extraImage[3456789]/)));
      showDefectImagesV2(data.imagesv2.filter(img => img.name.match(/defectImage\d/)));
    } else {
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
      infoRequestImagesText.style.display = 'block';
      infoRequestImagesText.innerHTML = infoRequests.images.description;
      infoRequestImagesDiv.style.display = 'flex';
    }

    // Show form
    updateItemFormDiv.style.display = "block";
    cancelSaleButton.style.display = "flex";
    pageTitleDiv.style.display = "flex";
    loadingDiv.style.display = "none";
  } catch (error) {
    console.log("Error getting item document:", error);
    errorHandler.report(error);
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

  document.querySelectorAll('.file-upload-container-v2').forEach(container => {
    const defectImageV2 = container.querySelector('input');
    const id = defectImageV2.id;
    defectImageV2.addEventListener("change", function () {
      let input = this.files[0];
      if (input) {
        let src = URL.createObjectURL(input);
        document.getElementById(`${id}PreviewUploading`).style.backgroundImage = `url('${src}')`;
        document.getElementById(`${id}Preview`).style.backgroundImage = `url('${src}')`;
        document.getElementById(id).required = false;
        const nextSibling = container.nextElementSibling;
        if (nextSibling) {
          nextSibling.style.display = 'inline-block';
        }
      }
    });
  });

  document.querySelectorAll('.file-upload-container-edit-v2').forEach(container => {
    const extraImageV2 = container.querySelector('input');
    const id = extraImageV2.id;
    extraImageV2.addEventListener("change", function () {
      let input = this.files[0];
      if (input) {
        let src = URL.createObjectURL(input);
        document.getElementById(`${id}PreviewUploading`).style.backgroundImage = `url('${src}')`;
        document.getElementById(`${id}Preview`).style.backgroundImage = `url('${src}')`;
        document.getElementById(id).required = false;
        const nextSibling = container.nextElementSibling;
        if (nextSibling) {
          nextSibling.style.display = 'inline-block';
        }
      }
    });
  });

  document.querySelectorAll('.w-file-remove-link').forEach(removeElement => {
    removeElement.addEventListener('click', () => {
      const container = removeElement.closest('.file-upload-container-v2') ||
        removeElement.closest('.file-upload-container-edit-v2') ||
        removeElement.closest('.file-upload-container-edit');
      if (!container) {
        console.log("No parent container found for removeElement: ", removeElement);
        return;
      }
      const id = container.querySelector('input').id;
      if (changedImages.includes(id)) {
        changedImages = changedImages.filter(image => image !== id);
      } else {
        changedImages.push(id);
        showSaveButton();
      }
    });
  });

  const defectRemoveLinks = document.querySelectorAll('#defectImageList .success-state .w-file-remove-link');
  [...defectRemoveLinks]?.forEach(link => {
    link.addEventListener('click', () => {
      const allContainers = document.querySelectorAll('#defectImageList .file-upload-container-v2');
      const visibleContainers = [...allContainers].filter(container => container.style.display !== 'none');
      const numberOfContainers = visibleContainers.length;
      const containersWithValue = visibleContainers.filter(container => {
        return container.querySelector('input').value?.length ||
          container.querySelector('input').dataset.fileUrl?.length;
      }).length;
      const container = link.closest('.file-upload-container-v2');
      container.querySelector('input').value = '';
      container.querySelector('input').dataset.fileUrl = '';
      const id = container.querySelector('input').id;
      container.querySelector(`#${id}Preview`).style.backgroundImage = 'none';
      container.querySelector(`#${id}PreviewUploading`).style.backgroundImage = 'none';
      if (numberOfContainers > 1 && containersWithValue !== (allContainers.length - 1)) {
        container.style.display = 'none';
      }
      // Move the now empty container to the end of the list, so that the add new image container
      // is always last
      const parent = container.parentElement;
      parent.appendChild(container);
    });
  });

  const extraRemoveLinks = document.querySelectorAll('.file-upload-container-edit-v2 .success-state .w-file-remove-link');
  [...extraRemoveLinks]?.forEach(link => {
    link.addEventListener('click', () => {
      const allContainers = document.querySelectorAll('.file-upload-container-edit-v2');
      const visibleContainers = [...allContainers].filter(container => container.style.display !== 'none');
      const numberOfContainers = visibleContainers.length;
      const containersWithValue = visibleContainers.filter(container => {
        return container.querySelector('input').value?.length ||
          container.querySelector('input').dataset.fileUrl?.length;
      }).length;
      const container = link.closest('.file-upload-container-edit-v2');
      container.querySelector('input').value = '';
      container.querySelector('input').dataset.fileUrl = '';
      const id = container.querySelector('input').id;
      container.querySelector(`#${id}Preview`).style.backgroundImage = 'none';
      container.querySelector(`#${id}PreviewUploading`).style.backgroundImage = 'none';
      if (numberOfContainers > 1 && containersWithValue !== (allContainers.length - 1)) {
        container.style.display = 'none';
      }
      // Move the now empty container to the end of the list, so that the add new image container
      // is always last
      const parent = container.parentElement;
      parent.appendChild(container);
    });
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

  cancelSaleButton.addEventListener('click', async () => {
    const itemId = params.id;
    const item = await callBackendApi(`/api/items/${itemId}`);
    const data = item.data;
    const hasBid = data.traderaBidExists || (data?.soldPlatform?.includes('Vestiaire') && data.soldDate && data.soldPrice) ? true : false;
    if (hasBid) {
      initiateCancelFlow(cancelHasBid)
      return
    }
    if (data.status === 'New') {
      cancelConfirmationText.innerHTML = 'Plagget har raderats';
      initiateCancelFlow(cancelReason)
      return
    }
    initiateCancelFlow(cancelGoodToKnow)
  });

  function initiateCancelFlow(flowStart) {
    [...flowStart.parentNode.children].forEach(sibling => {
      sibling.classList.add('card-hidden');
      sibling.style.display = 'none';
    });
    cancelFlow.style.display = 'flex';
    darkOverlay.style.display = 'block';
    crossFade(flowStart);
  }

  cancelGoodToKnowNextButton.addEventListener('click', () => {
    crossFade(cancelReason);
  });


  cancelConfirmButton.addEventListener('click', async () => {
    const itemId = params.id;
    let reason = '';
    const radioButtons = document.getElementsByName('cancelReason');
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        reason = radioButtons[i].value;
      }
    }
    if (reason) {
      // Show spinner
      cancelButtonSpinner.style.display = 'flex';
      cancelConfirmButton.style.display = 'none';
      // Call endpoint to remove item
      await callBackendApi(`/api/items/${itemId}/archive`,
        { method: 'PUT', data: { archivedReason: reason } });
      // Show confirmation
      if (reason === 'Seller sold elsewhere') { cancelSoldElsewhereWarning.style.display = 'flex'; }
      crossFade(cancelConfirmation);
    }
  });

  const cancelCloseButtons = document.querySelectorAll('.cancel-secondary-btn');
  cancelCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      darkOverlay.style.display = 'none';
      cancelFlow.style.display = 'none';
    });
  });

  const radioButtons = document.getElementsByName("cancelReason");
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', () => {
      cancelConfirmButton.style.backgroundColor = '#101010';
      cancelConfirmButton.style.color = '#ffffff';
    });
  }
}

function crossFade(showElm) {
  [...showElm.parentNode.children].forEach(sibling => {
    // Start the fade-out effect
    sibling.addEventListener('transitionend', () => {
      if (sibling.style.opacity === '0') {
        sibling.style.display = 'none'; // Hide element after transition to opacity 0 ends
      }
    }, { once: true });
    sibling.classList.remove('fade-in');
    sibling.classList.add('fade-out');
  });

  // Prepare and start the fade-in effect
  showElm.style.display = 'flex';
  setTimeout(() => {
    showElm.classList.add('fade-in'); // Add fade-in class to start transition
    showElm.classList.remove('card-hidden');
  }, 10); // Slight delay to ensure display change takes effect
}

let changedImages = [];
sessionStorage.removeItem('enhancedFrontImage');
setUpEventListeners();
console.log('edit item page loaded');
user.whenSet(async () => await fillForm(params.id));
autocomplete(document.getElementById("itemBrand"), brands); // Enable autocomplete

document.getElementById('cancelChatWithMai').addEventListener('click', () => {
  cancelFlow.style.display = 'none';
  darkOverlay.style.display = 'none';
  Intercom('showNewMessage', `Angående att avsluta försäljning för plagg ${params.id}:\n\n`);
})

window.intercomSettings = { app_id: "klyy0le5" };
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
Intercom('update', { 'hide_default_launcher': true });
