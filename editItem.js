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
        await Promise.all(Array.from(images).map(async ([key, value]) => {
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
          changes[`images.${key}Small`] = "";
          changes[`images.${key}Medium`] = "";
          changes[`images.${key}Large`] = "";
        }));
        if (changedImages.indexOf('frontImage') > -1) {
          // Front image was changed, also save the enhancedFrontImage
          await firebase.app().functions("europe-west1").httpsCallable('saveItemImage')({ itemId, fileName: 'enhancedFrontImage',
            url: sessionStorage.getItem('enhancedFrontImage') });
        }
      }
      await updateItemDoc(itemId, changes);
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
