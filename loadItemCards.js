async function loadItemCards(items) {
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
    var sellerGets = doc.data().sellerGets;
    var buyerFirstName = doc.data().buyer?.FirstName || doc.data().buyerFirstName;
    var buyerAddressCity = doc.data().buyer?.City || doc.data().buyerAddressCity;
    var minPriceEstimate = doc.data().minPriceEstimate;
    var maxPriceEstimate = doc.data().maxPriceEstimate;
    var infoRequests = doc.data().infoRequests;
    var pickupDate = doc.data().pickupDate;
    var shippingMethod = doc.data().shippingMethod;
    var postnordQrCode = doc.data().postnordQrCode;
    var bagReceived = doc.data().bagReceived;
    var soldPlatform = doc.data().soldPlatform;
    var archived = doc.data().archived;
    var holidayMode = doc.data().holidayMode;
    var longerPeriodAcceptedDate = doc.data().longerPeriodAcceptedDate;
    const images = doc.data().images;
    var frontImageUrl = images.coverImage ? (images.coverImageSmall || images.coverImage) :
      (images.enhancedFrontImage ? (images.enhancedFrontImageSmall || images.enhancedFrontImage) : (images.frontImageSmall || images.frontImage));
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

        // Add a user action, such as 'show QR button' or 'bag received checkbox'
        if (shippingMethod === 'Service point') {
          if (soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed') {
            if (!bagReceived) {
              userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
            }
          }
          else if (postnordQrCode) {
            userActionDiv = getQrCodeButton(itemId);
          }
        } else if (shippingMethod === 'Pickup') {
          if (!bagReceived) {
            userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
          } else if (bagReceived && !pickupDate) {
            userActionDiv = getBookPickupButton(itemId, soldDate);
          }
        } else if (!shippingMethod && !pickupDate) { // Temporary for items that have been sold but not sent before this release and therefor have no shippingMethod
          // ...
          userActionDiv = getBagReceivedCheckbox(itemId, soldDate); //TODO: Rename bagReceived to labelReceived everywhere
        }

        // Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
        shippingInfoDiv = getShippingInfoDiv(itemId, shippingMethod, soldDate, pickupDate, bagReceived);

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
