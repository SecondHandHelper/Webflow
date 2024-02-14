import {itemCoverImage} from "./general";

function loadItem(itemId) {
  console.log(`loadItem(${itemId})`);
  db.collection("items").doc(itemId)
    .get().then((doc) => {
    if (doc.exists) {
      console.log("Item data:", doc.data());
      const data = doc.data();
      const brand = data.brand;
      let imgUrl = itemCoverImage(data);
      const category = data.category ? data.category : "";
      const postnordQrCode = data.postnordQrCode;
      const dhlBarcode = data.dhlLicensePlateBarcodeSrc;
      const dhlLicensePlate = data.dhlLicensePlate;
      const fn = data.buyer?.FirstName || data.buyerFirstName || '';
      const ln = data.buyer?.LastName || data.buyerLastName || '';
      const street = data.buyer?.StreetAddress || data.buyerAddressStreetAddress || '';
      const postalCode = data.buyer?.PostalCode || data.buyerAddressPostalCode || '';
      const city = data.buyer?.City || data.buyerAddressCity || '';
      const shippingMethod = data.shippingMethod;
      const shippingStatus = data.shippingStatus;
      const soldPlatform = data.soldPlatform;

      pageTitleText.innerHTML = `Skicka ${brand.trim()}-${category.trim().toLowerCase()}`;
      buyerAddressDiv.innerHTML = `${fn.trim()} ${ln.trim()}<br>${city.trim()}`; // Only show name and city
      itemImageDiv.style.backgroundImage = `url('${imgUrl}')`;

      if (shippingMethod) {
        if (shippingMethod === 'Service point') {
          if (postnordQrCode && !(soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed')) {
            qrCodeImage.style.backgroundImage = `url('${postnordQrCode}')`;
            postnordQrCodeDiv.style.display = 'flex';
            scanCodeDiv.style.display = 'block';
            howToShipQrDiv.style.display = 'block';
          } else if (dhlBarcode && soldPlatform === 'Vestiaire Collective') {
            barcodeImageContainer.innerHTML = `<img src="${dhlBarcode}" alt="barcode" class="image-98">`;
            dhlBarcodeDiv.style.display = 'flex';
            if (dhlLicensePlate) {
              dhlLicensePlateText.innerHTML = dhlLicensePlate;
              dhlLicensePlateText.style.display = 'block';
            }
            mainInstructionText.innerText = 'Lämna påsen till ett ombud och\nbe dem scanna streckkoden';
            findDhlServicePointLink.style.display = "flex";
            scanCodeDiv.style.display = "block";
            howToShipDhlBarcodeDiv.style.display = "block";
          } else {
            howToShipNoQrDiv.style.display = "block";
            dividerTop.style.display = "none";
          }
        } else if (shippingMethod === 'Pickup') {
          howToShipPickupDiv.style.display = "block";
          dividerTop.style.display = "none";
        }
      }

      pageTitleText.style.display = "block";
      // Show content, or error message
      if (shippingMethod && shippingStatus !== 'Sent') {
        contentDiv.style.display = "block";
      } else {
        if (!shippingMethod) {
          errorMessage.innerHTML = "Plagget saknar fraktmetod!";
        } else if (shippingStatus === 'Sent') {
          errorMessage.innerHTML = "Plagget har skickats!";
        }
        errorMessageDiv.style.display = "block";
      }
      loadingDiv.style.display = "none";
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    errorHandler.report(error);
    console.log("Error getting item document:", error);
  });
}

// Load item
const params = getParamsObject();
loadItem(params.id);
