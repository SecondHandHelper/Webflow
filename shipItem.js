import { itemCoverImage } from "./general";
import QRCode from "qrcode";

const params = getParamsObject();
if (params.app) {
  const goBackButtons = document.querySelectorAll('.goback');
  goBackButtons.forEach(button => {
    button.style.visibility = 'hidden';
  });
}

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
        const postnordQrCodePage = data.postnordQrCodePage;
        const dhlBarcode = data.dhlLicensePlateBarcodeSrc;
        const dhlLicensePlate = data.dhlLicensePlate;
        const upsShipmentId = data.upsShipmentId;
        const vestiaireShippingLabel = data.vestiaireShippingLabel;
        const fn = data.buyer?.FirstName || data.buyerFirstName || '';
        const ln = data.buyer?.LastName || data.buyerLastName || '';
        const street = data.buyer?.StreetAddress || data.buyerAddressStreetAddress || '';
        const postalCode = data.buyer?.PostalCode || data.buyerAddressPostalCode || '';
        const city = data.buyer?.City || data.buyerAddressCity || '';
        const shippingMethod = data.shippingMethod;
        const shippingStatus = data.shippingStatus;
        const soldPlatform = data.soldPlatform;
        const soldDate = data.soldDate;
        let daysSinceSold;
        if (soldDate) {
          specificDate = new Date(soldDate);
          let nowDate = new Date();
          specificDate.setHours(0, 0, 0, 0);
          nowDate.setHours(0, 0, 0, 0);
          let timeDifference = nowDate - specificDate;
          daysSinceSold = Math.round(timeDifference / (1000 * 3600 * 24));
        }

        pageTitleText.innerHTML = `Skicka ${brand.trim()}-${category.trim().toLowerCase()}`;
        buyerAddressDiv.innerHTML = `${fn.trim()} ${ln.trim()}<br>${city.trim()}`; // Only show name and city
        itemImageDiv.style.backgroundImage = `url('${imgUrl}')`;

        if (shippingMethod) {
          if (shippingMethod === 'Service point') {
            console.log('postnordQrCode', postnordQrCode, typeof postnordQrCode);
            if (postnordQrCode && !(soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed')) {
              qrCodeImage.style.backgroundImage = `url('${postnordQrCode}')`;
              postnordQrCodeDiv.href = postnordQrCodePage;
              postnordQrCodeDiv.style.display = 'flex';
              mainInstructionDiv.style.display = 'block';
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
              mainInstructionDiv.style.display = "block";
              howToShipDhlBarcodeDiv.style.display = "block";
            } else if (upsShipmentId && soldPlatform === 'Vestiaire Collective') {
              upsIconDiv.style.display = 'block';
              findUpsServicePointLink.style.display = "flex";
              mainInstructionText.innerText = 'Sätt på fraktsedeln vi skickat dig på påsen och lämna till ombud';
              bullet3TitleNoQr.innerText = 'Lämna till UPS-ombud';
              howToShipNoQrDiv.style.display = "block";
              mainInstructionDiv.style.display = "block";
              if (vestiaireShippingLabel && daysSinceSold >= 4) {
                openShippingLabelButton.href = vestiaireShippingLabel;
                openShippingLabelButton.style.display = 'block';
              }
            } else if (soldPlatform === 'Grailed') {
              mainInstructionText.innerText = 'Sätt på fraktsedeln vi skickat dig på påsen och lämna till ombud';
              howToShipNoQrDiv.style.display = "block";
              mainInstructionDiv.style.display = "block";
            } else if (!postnordQrCode && !(soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed')) {
              howToShipQrDiv.style.display = 'block';
              postnordQrCodeMissingDiv.style.display = 'flex';
              mainInstructionText.innerText = 'Skriv gärna till oss,\nså hjälper vi dig.';
              mainInstructionDiv.style.display = 'block';
            } else {
              mainInstructionText.innerText = 'Något har gått fel! Skriv till oss, så hjälper vi dig.';
              mainInstructionDiv.style.display = 'block';
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

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  // Load item
  authUser.whenSet(() => {
    loadItem(params.id);
  });
  console.log('DO I GET HERE? user.current', user.current);
  if (!user.current && !params.app) {
    console.log('TOBIAS redirecting to sign-in');
    location.href = './sign-in' + window.location.search;
  }
} else {
  const qrCanvas = document.getElementById('qrCanvas')
  if (qrCanvas) {
    QRCode.toCanvas(qrCanvas, window.location.href, function (error) {
      if (error) console.error(error)
      console.log('success!');
    });
  }
}

