import { enhanceFrontImage, uploadImageAndShowPreview, uploadTempImage } from "./sellItemHelpers";
import {autocomplete, brands} from "./autocomplete-brands";

async function updateItem(itemId, changedImages) {
    console.log("updateItem()");
    $('.goback').data('disabled', true);
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
      userComment: userComment
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
          photoDirectionsText.style.display = 'block';
          infoRequestImagesDiv.style.display = 'none';
          const { url: imageUrl } = await uploadTempImage(value, imageName);
          await firebase.app().functions("europe-west1").httpsCallable('saveItemImage')({ itemId, fileName: imageName, url: imageUrl });
        }));
        if (changedImages.indexOf('frontImage') > -1) {
          // Front image was changed, also save the enhancedFrontImage in the right place
          const item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId})
          const itemData = item.data;
          await firebase.app().functions("europe-west1").httpsCallable('saveItemImage')({ itemId, fileName: `enhancedFrontImage`,
            url: `${sessionStorage.getItem('enhancedFrontImage')}` });
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
          saveChangesButtonText.style.color = "#7a7575";
          saveChangesButtonText.innerHTML = "Sparat";
        })
        .catch((error) => {
          errorHandler.report(error);
          console.error("Error adding document: ", error);
        });
    }
  
    await uploadImages(itemId);
    $('.goback').data('disabled', false);
}

async function fillForm(itemId) {
    try {
        const userId = authUser.current.uid;
        const item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId})
        const data = item.data;
        if (userId === data.user || userId === '3OkW5av20HP8ScpUDS8ip9fBEZr1') {
            console.log("Item data:", data);
            const sex = data.sex;
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
            const defects = data.defects;
            const defectDescription = data.defectDescription;
            const noSmoke = data.noSmoke;
            const noAnimals = data.noAnimals;
            const userComment = data.userComment;
            const infoRequests = data.infoRequests;
            const images = data.images;
            const status = data.status;
            let category = "";
            if (data.category) {
                category = data.category;
            }

            // Populate images
            function showImageAndHideSiblings(x, url) {
                document.getElementById(`${x}Preview`).style.backgroundImage = `url('${url}')`;
                const siblings = document.getElementById(x).parentNode.parentNode.childNodes;
                for (let i = 0; i < siblings.length; i++) {
                    if (siblings[i].className.includes("success-state")) {
                        siblings[i].style.display = 'block';
                    } else {
                        siblings[i].style.display = 'none';
                    }
                }
            }

            for (const x in images) {
                const possibleElmts = ["brandTagImage", "materialTagImage", "defectImage", "productImage", "extraImage"];
                const url = images[`${x}Small`] || images[`${x}Medium`] || images[`${x}Large`] || images[x];
                if (possibleElmts.includes(x)) {
                    showImageAndHideSiblings(x, url);
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

            // Populate checkboxes and readio-buttons is harder to do with Webflow, so not allowing users to change defects right now

            // If "info request" for images exist, show the directions
            if (infoRequests?.images?.status === "Active" && infoRequests?.images?.description) {
                photoDirectionsText.style.display = 'none';
                infoRequestImagesText.innerHTML = infoRequests.images.description;
                infoRequestImagesDiv.style.display = 'flex';
            }

            // Show form
            updateItemFormDiv.style.display = "block";
            pageTitleDiv.style.display = "flex";
            loadingDiv.style.display = "none";
        }
    } catch (error) {
        errorHandler.report(error);
        console.log("Error getting item document:", error);
    }
}

async function saveChanges() {
    saveChangesButtonText.style.color = "#e2dede";
    console.log("changedImages: ", changedImages);
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

    let elementsArray = document.querySelectorAll("input");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("input", function () {
            saveChangesButtonText.style.color = "#c24700";
            saveChangesButtonText.innerHTML = "Spara";
            if (elem.id.includes("Image")) {
                changedImages.push(elem.id);
            }
        });
    });

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

    itemAge.onchange = function () {
        let input = this.value;
        if (input != "") {
            itemAge.style.color = "#333";
        } else {
            itemAge.style.color = "#929292";
        }
    };

    saveChangesButton.addEventListener('click', saveChanges);
}

let changedImages = [];
sessionStorage.removeItem('enhancedFrontImage');
setUpEventListeners();
user.whenSet(async () => await fillForm(params.id));
autocomplete(document.getElementById("itemBrand"), brands); // Enable autocomplete
