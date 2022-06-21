function loadCardLists(userId) {
  itemListSelling.innerHTML = "";
  itemListSoldNotSent.innerHTML = "";
  itemListSold.innerHTML = "";
  itemListSoldByOthers.innerHTML = "";

  db.collection("items")
    .where("user", "==", userId)
    .where("createdAt", "!=", false)
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => {
      loadingDiv.style.display = "none";
      noItemsDiv.style.display = "block";
      soldByOthersDiv.style.display = "block";
      quickInfoDiv.style.display = "block";
      var youEarned = 0;

      querySnapshot.forEach((doc) => {
        var itemId = doc.id;
        var createdDate = doc.data().createdAt;
        var soldDate = doc.data().soldDate;
        var images = doc.data().images;
        var status = doc.data().status;
        var shippingStatus = doc.data().shippingStatus;
        var brand = doc.data().brand;
        var soldPrice = doc.data().soldPrice;
        var sellerGets = doc.data().sellerGets;
        var buyerFirstName = doc.data().buyerFirstName;
        var buyerAddressCity = doc.data().buyerAddressCity;
        var minPriceEstimate = doc.data().minPriceEstimate;
        var maxPriceEstimate = doc.data().maxPriceEstimate;
        var infoRequests = doc.data().infoRequests;
        var pickupDate = doc.data().pickupDate;
        var shippingMethod = doc.data().shippingMethod;
        var archived = doc.data().archived;
        var frontImageUrl = images.frontImage;
        if (images.frontImageSmall) {
          frontImageUrl = images.frontImageSmall;
        }
        let daysLeftText = "";
        let publishedDate = doc.data().publishedDate;
        if (publishedDate) {
          publishedDate = new Date(publishedDate);
          let nowDate = new Date();
          let timeDifference = nowDate.getTime() - publishedDate.getTime();
          let daysDifference = timeDifference / (1000 * 3600 * 24);
          let daysLeft = Math.round(30 - daysDifference);
          if (daysLeft <= 0) {
            daysLeftText = `0 dagar kvar`;
          } else {
            daysLeftText = `${daysLeft} dagar kvar`;
          }
        }
        if (archived == undefined && status != "Unsold") {
          displayItemCard();
        }

        function displayItemCard() {
          //Putting the items in the right list

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
              textDiv2 = `<div class='text-block-34'>${daysLeftText}</div>`;
            }

            let itemPageUrl = window.location.origin + `/item?id=${itemId}`;
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
            var buyerInfoTextHTML = '';
            if (buyerFirstName != null && buyerAddressCity != null) {
              buyerInfoTextHTML = `<div class="text-block-44">Till ${buyerFirstName} i ${buyerAddressCity}</div>`;
            }

            var bagReceivedCheckbox = '';
            var shippingInfoDiv = '';
            if (!shippingMethod && !pickupDate) {
              bagReceivedCheckbox = getBagReceivedCheckbox(itemId, soldDate);
            } else if (!shippingMethod && pickupDate) {
              shippingInfoDiv = getShippingInfoDiv(itemId, 'Pickup', soldDate, pickupDate); // För items under en övergångsperiod
            } else {
              shippingInfoDiv = getShippingInfoDiv(itemId, shippingMethod, soldDate, pickupDate);
            }

            //Create card
            var soldNotSentCardHTML = ``;
            soldNotSentCardHTML =
              `<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Såld för ${soldPrice} kr</div>${buyerInfoTextHTML}<div class="text-block-44">Du får ${sellerGets} kr</div>
                      ${bagReceivedCheckbox}
                      ${shippingInfoDiv}
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
            var soldItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>Du fick ${sellerGets} kr</div></div>`;
            itemListSold.innerHTML += soldItemCardHTML;

            // Display list, hide empty state
            soldItemsDiv.style.display = "block";
            itemListSoldContainer.style.display = "block";
            sellButtonText.innerHTML = "Sälj ett plagg";
            youEarned = youEarned + sellerGets;
            youEarnedDiv.innerHTML = `Du har tjänat ${youEarned} kr`;
          }
        }
      });
    });
}