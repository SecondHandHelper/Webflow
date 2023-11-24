import {itemCoverImage} from "./general";
import {closePickupToast} from "./private";

function getQrCodeButton(itemId) {
  let itemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;
  const div = `<a id="qrCodeButton" href="${itemPageUrl}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;
  return div;
}

function getBarcodeButton(itemId) {
  let itemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;
  const div = `<a id="barcodeButton" href="${itemPageUrl}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;
  return div;
}

// TODO: Show a "Boka hämtning" button when the user has pressed bagreceievd but still hasn't picked a pickup
function getBookPickupButton(itemId, soldDate) {
  const div = `<a id="bookPickupButton" href="javascript:openPickupToast('${itemId}', '${soldDate}');" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka hämtning</div>
                            </div>
                    </a>`;
  return div;
}

async function storeShippingMethod(itemId, method) {
  console.log(`storeShippingMethod(${itemId}, ${method}) is running`);
  await db.collection('items').doc(itemId).update({ shippingMethod: method }).then((docRef) => {
    console.log(`Shipping method '${method}' stored on item with ID: `, itemId);
    window.pickupFlowItemId = itemId; // Legacy from before. Bad way of doing it. Should clean up 'pickupFlowItemId' at some point.
    if (method == "Service point") {
      document.getElementById('feedbackFormTitle').innerHTML = 'Tack, då vet vi att paketet snart lämnas till ett ombud.';
      document.getElementById('triggerShippingToastClose').click();
    }
    closePickupToast();
    document.getElementById('triggerFeedbackFormOpen').click();
  });
}

function openShippingToast(itemId, soldDate) {
  console.log("openShippingToast");
  window.pickupFlowItemId = itemId;
  servicePointButton.href = `javascript:storeShippingMethod('${itemId}', 'Service point')`;
  bookPickupButton.href = `javascript:openPickupToast('${itemId}', '${soldDate}')`;
  triggerShippingToastOpen.click();
}

function openServicePointToast(itemId, soldDate) {
  console.log("openServicePointToast");
  changeToPickupButton.href = `javascript:openPickupToast('${itemId}', '${soldDate}')`;
  triggerServicePointToastOpen.click();
}

function openPickupToast(itemId, soldDate, servicePointButtonDisplay = 'none') {
  console.log(`openPickupToast(${itemId}, ${soldDate}) is running`);
  triggerShippingToastClose.click();
  triggerServicePointToastClose.click();
  changeToServicePointButton.href = `javascript:storeShippingMethod('${itemId}', 'Service point')`;
  changeToServicePointButton.style.display = servicePointButtonDisplay;
  setDatesOfPickupToast(soldDate);
  window.pickupFlowItemId = itemId;
  triggerPickupAnimation.click();
}

function setDatesOfPickupToast(soldDate) {
  console.log(`setDatesOfPickupToast(${soldDate}) is running`);
  // Hide all options first, to later determine which ones to show
  radioFieldOne.style.display = 'none';
  radioFieldTwo.style.display = 'none';
  radioFieldThree.style.display = 'none';
  radioFieldFour.style.display = 'none';

  // Create the 4 first possible pickup dates, starting 4 b-days after soldDate
  var firstDate = new Date(soldDate);
  firstDate.setTime(firstDate.getTime() + (1 * 60 * 60 * 1000)); // With soldDate on format "yyyy-m-dd" (note one m) the time is set to 00 which resulted in bug, had to add 1 hour, or fix the format.
  firstDate.setDate(firstDate.getDate() + 4);
  if (firstDate.getDay() == 6 || firstDate.getDay() == 0 || firstDate.getDay() == 1 || firstDate.getDay() == 2) {
    firstDate.setDate(firstDate.getDate() + 2); // If sat, sun, mon, tue => compensate for weekend with 2 days
  } else if (firstDate.getDay() == 3) {
    firstDate.setDate(firstDate.getDate() + 1); // If wednesday, add 1 days to compensate for sunday
  }

  var secondDate = new Date(firstDate);
  secondDate.setDate(secondDate.getDate() + 1);
  if (secondDate.getDay() == 6) {
    secondDate.setDate(secondDate.getDate() + 2);
  }

  var thirdDate = new Date(secondDate);
  thirdDate.setDate(thirdDate.getDate() + 1);
  if (thirdDate.getDay() == 6) {
    thirdDate.setDate(thirdDate.getDate() + 2);
  }

  var forthDate = new Date(thirdDate);
  forthDate.setDate(forthDate.getDate() + 1);
  if (forthDate.getDay() == 6) {
    forthDate.setDate(forthDate.getDate() + 2);
  }

  var days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  var months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

  // Change value of radio buttons and display to user
  let today = new Date();
  let optionsDisplayed = 0;
  console.log("Today", today);

  console.log("firstDate > today", (firstDate > today));
  console.log("secondDate > today", (secondDate > today));
  console.log("thirdDate > today", (thirdDate > today));
  console.log("forthDate > today", (forthDate > today));

  const pickupDateOne = document.getElementById('pickupDateOne');
  const pickupDateTwo = document.getElementById('pickupDateTwo');
  const pickupDateThree = document.getElementById('pickupDateThree');
  const pickupDateFour = document.getElementById('pickupDateFour');

  if (firstDate > today) {
    $('#radioButtonOne').val(firstDate.toISOString().split('T')[0]); //yyyy-mm-dd
    pickupDateOne.innerHTML = days[firstDate.getDay()] + ", " + firstDate.getDate() + " " + months[firstDate.getMonth()] + ", kl 9-16";
    radioFieldOne.style.display = 'flex';
    optionsDisplayed++;
  }
  if (secondDate > today) {
    $('#radioButtonTwo').val(secondDate.toISOString().split('T')[0]);
    pickupDateTwo.innerHTML = days[secondDate.getDay()] + ", " + secondDate.getDate() + " " + months[secondDate.getMonth()] + ", kl 9-16";
    radioFieldTwo.style.display = 'flex';
    optionsDisplayed++;
  }
  if (thirdDate > today) {
    $('#radioButtonThree').val(thirdDate.toISOString().split('T')[0]);
    pickupDateThree.innerHTML = days[thirdDate.getDay()] + ", " + thirdDate.getDate() + " " + months[thirdDate.getMonth()] + ", kl 9-16";
    radioFieldThree.style.display = 'flex';
    optionsDisplayed++;
  }
  if (forthDate > today) {
    $('#radioButtonFour').val(forthDate.toISOString().split('T')[0]);
    pickupDateFour.innerHTML = days[forthDate.getDay()] + ", " + forthDate.getDate() + " " + months[forthDate.getMonth()] + ", kl 9-16";
    radioFieldFour.style.display = 'flex';
    optionsDisplayed++;
  }

  // If less than two options displayed, add at least two options
  if (optionsDisplayed < 2) {
    radioFieldOne.style.display = 'none';
    radioFieldTwo.style.display = 'none';
    radioFieldThree.style.display = 'none';
    radioFieldFour.style.display = 'none';

    var dayOne = new Date();
    dayOne.setDate(today.getDate() + 1);
    if (dayOne.getDay() == 0) {
      dayOne.setDate(dayOne.getDate() + 1);
    } else if (dayOne.getDay() == 6) {
      dayOne.setDate(dayOne.getDate() + 2);
    }
    var dayTwo = new Date(dayOne);
    dayTwo.setDate(dayTwo.getDate() + 1);
    if (dayTwo.getDay() == 6) {
      dayTwo.setDate(dayTwo.getDate() + 2);
    }
    console.log("dayOne: ", dayOne);
    console.log("dayTwo: ", dayTwo);
    // Show tomorrow as an option
    $('#radioButtonOne').val(dayOne.toISOString().split('T')[0]);
    pickupDateOne.innerHTML = days[dayOne.getDay()] + ", " + dayOne.getDate() + " " + months[dayOne.getMonth()] + ", kl 9-16";
    radioFieldOne.style.display = 'flex';

    // Show day after tomorrow as an option
    $('#radioButtonTwo').val(dayTwo.toISOString().split('T')[0]);
    pickupDateTwo.innerHTML = days[dayTwo.getDay()] + ", " + dayTwo.getDate() + " " + months[dayTwo.getMonth()] + ", kl 9-16";
    radioFieldTwo.style.display = 'flex';
  }
}

function bagReceivedAction(checkbox, itemId, soldDate, shippingMethod) {
  if (checkbox.checked) {
    db.collection('items').doc(itemId).update({ bagReceived: true }).then((docRef) => {
      console.log(`Stored in DB that bag is received for item with ID: `, itemId);
    });
    if (shippingMethod === 'Pickup') {
      openPickupToast(itemId, soldDate, 'flex');
    } else if (shippingMethod === 'Service point') {
      openServicePointToast(itemId, soldDate);
    } else {
      openShippingToast(itemId, soldDate);
    }
  } else {
    db.collection('items').doc(itemId).update({ bagReceived: false }).then((docRef) => {
      console.log(`Stored in DB that bag is NOT received for item with ID: `, itemId);
    });
  }
}

function getBagReceivedCheckbox(itemId, soldDate, shippingMethod) {
  const div = `<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${itemId}" style="opacity:0;position:absolute;z-index:-1" onclick="javascript:bagReceivedAction(this, '${itemId}', '${soldDate}', '${shippingMethod}');">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;
  return div;
}

function getShippingInfoDiv(itemId, method, soldDate, pickupDate, bagReceived, shipper) {
  let shippingInfo = ``;
  const infoIcon = !bagReceived || (bagReceived && method == "Pickup" && !pickupDate) ? `<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">` : '';
  const shipItemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;

  if (method == "Service point") {
    let shipperIcon = '6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg';
    if (shipper === 'postnord'){
      shipperIcon = '6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg';
    }
    if (shipper === 'dhl'){
      shipperIcon = '6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg';
    }
    shippingInfo += `
                        <img src="https://global-uploads.webflow.com/${shipperIcon}" class="shipper-icon">
                        <div class="next-step-text-small">Lämnas till ombud</div>
                        ${infoIcon}
                    `;
  } else if (method == "Pickup") {
    if (pickupDate) {
      var date = new Date(pickupDate);
      var days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];
      var months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
      var dateNumber = date.getDate();
      var monthName = months[date.getMonth()];
      var dayName = days[date.getDay()];
      var pickupTimeInfoText = dayName + ", " + dateNumber + " " + monthName + ", kl 9-16";
      shippingInfo += `
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${pickupTimeInfoText}</div>`;
    } else {
      shippingInfo += `
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upphämtning</div>
                            ${infoIcon}
                        `;
    }
  }

  // Turn shipping info into a link to ship item page
  const div = `
                        <a id="shipItemPageLink" href="${shipItemPageUrl}" class="link-block-40">
                                ${shippingInfo}
                        </a>`;
  return div;
}

export async function loadItemCards(items) {
  itemListSelling.innerHTML = "";
  itemListSoldNotSent.innerHTML = "";
  itemListSold.innerHTML = "";
  var youEarned = 0;

  items.forEach((doc) => {
    var itemId = doc.id;
    var createdDate = doc.data().createdAt;
    var soldDate = doc.data().soldDate;
    var status = doc.data().status;
    var shippingStatus = doc.data().shippingStatus;
    var brand = doc.data().brand;
    var soldPrice = doc.data().soldPrice;
    var sellerGets = doc.data().sellerGets ? Math.ceil(doc.data().sellerGets) : doc.data().sellerGets;
    var buyerFirstName = doc.data().buyer?.FirstName || doc.data().buyerFirstName;
    var buyerAddressCity = doc.data().buyer?.City || doc.data().buyerAddressCity;
    var minPriceEstimate = doc.data().minPriceEstimate;
    var maxPriceEstimate = doc.data().maxPriceEstimate;
    var infoRequests = doc.data().infoRequests;
    var pickupDate = doc.data().pickupDate;
    var shippingMethod = doc.data().shippingMethod;
    var postnordQrCode = doc.data().postnordQrCode;
    var dhlBarcode = doc.data().dhlLicensePlateBarcodeSrc;
    var bagReceived = doc.data().bagReceived;
    var soldPlatform = doc.data().soldPlatform;
    var archived = doc.data().archived;
    var holidayMode = doc.data().holidayMode;
    var longerPeriodAcceptedDate = doc.data().longerPeriodAcceptedDate;
    const images = doc.data().images;
    var frontImageUrl = itemCoverImage(doc.data());
    let daysLeftText = "";
    let publishedDate = doc.data().publishedDate;
    if (publishedDate) {
      publishedDate = new Date(publishedDate);
      let nowDate = new Date();
      let timeDifference = nowDate.getTime() - publishedDate.getTime();
      let daysDifference = timeDifference / (1000 * 3600 * 24);
      let sellingPeriodLength = longerPeriodAcceptedDate ? 60 : 30;
      let daysLeft = Math.round(sellingPeriodLength - daysDifference);
      if (daysLeft <= 0) {
        daysLeftText = `0 dagar kvar`;
      } else {
        daysLeftText = `${daysLeft} dagar kvar`;
      }
    }
    if (archived == undefined && status != "Unsold") { displayItemCard(); }

    function displayItemCard() {
      //Putting the items in the right list
      let itemPageUrl = window.location.origin + `/item?id=${itemId}`;

      // WE SELL RIGHT NOW
      if (status != "Sold") {
        let textDiv1 = "";
        let textDiv2 = "";

        if (status === "New") {
          if (infoRequests?.price?.status === "Active") {
            textDiv1 = `<div class='text-block-34'>Inväntar ditt svar</div>`;
          } else if (minPriceEstimate && maxPriceEstimate) {
            textDiv1 = `<div class='text-block-34'>${minPriceEstimate} - ${maxPriceEstimate} kr</div>`;
            textDiv2 = `<div class='text-block-34'>Förbereds</div>`;
          } else {
            textDiv1 = `<div class='text-block-34'>Värdering pågår</div>`;
          }
        }
        if (status === "Published" && minPriceEstimate && maxPriceEstimate) {
          textDiv1 = `<div class='text-block-34'>${minPriceEstimate} - ${maxPriceEstimate} kr</div>`;
          const text2 = holidayMode ? "Pausad" : daysLeftText;
          textDiv2 = `<div class='text-block-34'>${text2}</div>`;
        }

        let sellingItemCardHTML = `<div class="div-block-14"><a id="itemLinkBlock" href="${itemPageUrl}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></div></div><div class="text-block-14">${brand}</div>${textDiv1}${textDiv2}</a></div>`;
        itemListSelling.innerHTML += sellingItemCardHTML;

        //Display list
        myItemsDiv.style.display = "block";
        //Hide empty state
        noItemsDiv.style.display = "none";
        headerSellItemButton.style.display = "block";
        sellButtonText.innerHTML = "Sälj ett plagg";

        // SOLD - NOT SENT
      } else if (status == "Sold" && shippingStatus != "Sent") {
        // Prepare card
        var buyerInfoTextHTML = '';
        if (buyerFirstName != null && buyerAddressCity != null && soldPrice) {
          const str = `Såld till ${buyerFirstName} i ${buyerAddressCity} för ${soldPrice} kr`;

          // Split sentence into two equally long rows
          let output = '';
          const words = str.split(' ');
          words.forEach(function (word) {
            if (output.trim().length > str.length / 2 && !output.includes('<br>')) {
              output += '<br>';
            }
            output += word + ' ';
          });
          output = output.trim();
          buyerInfoTextHTML = `<div class="text-block-44">${output}</div>`;
        }
        var userActionDiv = '';
        var shippingInfoDiv = '';
        let changeShippingMethod = '';
        let shipper = '';

        // Add a user action, such as 'show QR button', 'show barcode' or 'bag received checkbox'
        if (shippingMethod === 'Service point') {
          if (dhlBarcode) {
            userActionDiv = getBarcodeButton(itemId);
            shipper = 'dhl';
          } else if (soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed') {
            if (!bagReceived) {
              userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
            }
          }
          else if (postnordQrCode) {
            shipper = 'postnord';
            userActionDiv = getQrCodeButton(itemId);
          }
        }
        if (shippingMethod === 'Pickup') {
          if (!bagReceived) {
            userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
          } else if (bagReceived && !pickupDate) {
            userActionDiv = getBookPickupButton(itemId, soldDate);
          }
        }

        // Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
        shippingInfoDiv = getShippingInfoDiv(itemId, shippingMethod, soldDate, pickupDate, bagReceived, shipper);

        // Add "change shipping method" when applicable and some spacing
        if (bagReceived && (shippingMethod === "Service point" || (shippingMethod === "Pickup" && pickupDate))) {
          shippingInfoDiv = '<div class="spacing-15-px"></div>' + shippingInfoDiv;
          changeShippingMethod += `
          <a href="javascript:openShippingToast('${itemId}', '${soldDate}');">
              <div id="changeShippingMethod-${itemId}" class="change-shipping-method-text">Ändra fraktsätt</div>
          </a>`;
        }

        //Create card
        var soldNotSentCardHTML = ``;
        soldNotSentCardHTML =
          `<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${itemPageUrl}"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></a></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Du får ${sellerGets} kr</div>${buyerInfoTextHTML}
                      ${userActionDiv}
                      ${shippingInfoDiv}
                      ${changeShippingMethod}
                  </div></div></div></div>`;
        itemListSoldNotSent.innerHTML += soldNotSentCardHTML;

        // Display list
        soldNotSentDiv.style.display = "block";
        // Hide empty state
        noItemsDiv.style.display = "none";
        headerSellItemButton.style.display = "block";
        sellButtonText.innerHTML = "Sälj ett plagg";

        // SOLD BEFORE
      } else {
        var soldItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${itemPageUrl}"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></a></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>Du fick ${sellerGets} kr</div></div>`;
        itemListSold.innerHTML += soldItemCardHTML;

        // Display list, hide empty state
        soldItemsDiv.style.display = "block";
        itemListSoldContainer.style.display = "block";
        sellButtonText.innerHTML = "Sälj ett plagg";
        youEarned = youEarned + sellerGets;
        youEarnedDiv.innerHTML = `Du har tjänat ${Math.round(youEarned)} kr`;
      }
    }
  });

  loadingDiv.style.display = "none";
  sectionsDiv.style.display = "block";
  quickInfoDiv.style.display = "block";
}
