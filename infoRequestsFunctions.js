async function openMeasurementsToast(itemId, description) {
    measurementDescriptionText.innerHTML = description;
    measurementsSubmitButton.addEventListener('click', async function () {
        const input = measurementsInput.value;
        if (input.length > 0 && input !== " ") {
            await db.collection('items').doc(itemId).update({
                measurements: input,
                "infoRequests.measurements.status": "Resolved"
            });
        }
        triggerMeasurementsToastClose.click();
        setTimeout(function () { location.reload(); }, 400);
    });
    triggerMeasurementsToastOpen.click();
}

async function openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore) {
    // If user is qualified to get the discount question -> Show it to the user
    const price = currentMinPrice;
    const priceWithDiscount30 = Math.ceil((price * 0.7) / 10) * 10;
    const priceWithDiscount20 = Math.ceil((price * 0.8) / 10) * 10;
    priceAfterDiscount30.innerHTML = `(Priset blir ${priceWithDiscount30} kr)`;
    priceAfterDiscount20.innerHTML = `(Priset blir ${priceWithDiscount20} kr)`;
    priceNoDiscount.innerHTML = `(${price} kr)`;
    if (price >= 140 && !deniedBefore) {
        longerPeriodDescriptionText.innerHTML = `Säljperioden för ditt ${brand}-plagg har nått sitt slut. Välj om du vill förlänga säljperioden med ytterligare 30 dagar och om du vill sänka priset för att öka chansen att få det sålt.`;
        discountFormDiv.style.display = 'block';
    } else {
        longerPeriodDescriptionText.innerHTML = `Säljperioden för ditt ${brand}-plagg har nått sitt slut. Vill du förlänga säljperioden med ytterligare 30 dagar eller avsluta försäljningen?`;
        discountFormDiv.style.display = 'none';
    }

    // Accept longer selling window and store chosen discount
    longerPeriodAcceptButton.addEventListener('click', async function () {
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0];
        let newPrice = price;
        let discount = 0
        var discountRadioButtons = document.getElementsByName("Discount");
        for (var x = 0; x < discountRadioButtons.length; x++) {
            if (discountRadioButtons[x].checked) {
                const input = discountRadioButtons[x].value;
                if (input === '30') {
                    newPrice = priceWithDiscount30;
                    discount = 30;
                }
                if (input === '20') {
                    newPrice = priceWithDiscount20;
                    discount = 20;
                }
            }
        }
        await db.collection('items').doc(itemId).update({
            longerPeriodAcceptedDate: todayDate,
            "infoRequests.longerPeriod.status": "Resolved",
            "infoRequests.longerPeriod.response": "Accepted",
            longerPeriodAcceptedDiscount: discount,
            minPriceEstimate: newPrice
        });
        triggerLongerPeriodToastClose.click();
        setTimeout(function () { location.reload(); }, 300);
    });
    // Decline longer selling period and quit sales
    longerPeriodDenyButton.addEventListener('click', async function () {
        await db.collection('items').doc(itemId).update({
            "infoRequests.longerPeriod.status": "Resolved",
            "infoRequests.longerPeriod.response": "Denied",
            "status": "Unsold" // This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
        });
        triggerLongerPeriodToastClose.click();
        setTimeout(function () { location.reload(); }, 300);
    });
    triggerLongerPeriodToastOpen.click();
}

async function storePriceResponse(itemId, max, min, response, status) {
    console.log("storePriceResponse", itemId, max, min, response);
    // Accept price
    if (response === "Accepted") {
        await db.collection('items').doc(itemId).update({
            "infoRequests.price.status": "Resolved",
            "infoRequests.price.response": "Accepted",
            "maxPriceEstimate": max,
            "minPriceEstimate": min
        }).then(function () {
            triggerNewPriceToastClose.click();
            setTimeout(function () { location.reload(); }, 300);
        });
    }
    // Deny price
    if (response === "Denied") {
        let fields = {
            "infoRequests.price.status": "Resolved",
            "infoRequests.price.response": "Denied"
        };
        if (status === "New") {
            fields["archived"] = true;
            fields["willNotSell"] = true;
        }
        await db.collection('items').doc(itemId).update(fields).then(function () {
            triggerNewPriceToastClose.click();
            setTimeout(function () { location.reload(); }, 300);
        });
    }
}

async function openNewPriceToast(itemId, status, max, min, brand, description, category) {
    console.log("openNewPriceToast", itemId, status, max, min, brand, description, category);
    // Set content of toast
    newPriceToastTitle.innerHTML = "Nytt lägsta pris";
    newPriceHeading.innerHTML = `${brand}-plagg`;
    const c = category.toLowerCase();
    if (c && c !== "null") { newPriceHeading.innerHTML = `${brand}-${c}`; }
    newPrice.innerHTML = `${min} kr`;
    acceptNewPriceButton.innerHTML = "Sälj med nytt pris";
    denyNewPriceButton.innerHTML = "Sänk ej";
    if (status === "New") {
        newPriceToastTitle.innerHTML = "Värdering";
        newPrice.innerHTML = `${min}-${max} kr`;
        acceptNewPriceButton.innerHTML = "Sälj till värdering";
        denyNewPriceButton.innerHTML = "Avböj och avsluta";
        extraInfoText.style.display = 'block';
    }
    if (description !== 'undefined' && description !== '' && description !== 'null') {
        newPriceText.innerHTML = description;
        descriptionDiv.style.display = 'block';
    }
    acceptNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Accepted', '${status}');`;
    denyNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Denied', '${status}');`;

    // Open toast
    triggerNewPriceToastOpen.click();
}

function loadInfoRequests(userId) {
    infoRequestsList.innerHTML = "";
    db.collection("items").where("user", "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var itemId = doc.id;
            var item = doc.data();
            var infoRequests = item.infoRequests;
            var images = item.images;
            var status = item.status;
            var brand = item.brand.replace(/'/g, '');
            var currentMinPrice = item.minPriceEstimate;
            var deniedBefore = item?.infoRequests?.price?.response === "Denied" ? true : false;
            var archived = item.archived;
            var category = item.category;
            var frontImageUrl = images.coverImage ?  (images.coverImageSmall || images.coverImage) : (images.frontImageSmall | images.frontImage);
            if (archived == undefined && status !== "Unsold" && status !== "Sold" && infoRequests) {
                displayRequests();
            }

            function displayRequests() {
                for (const req in infoRequests) {
                    if (infoRequests[req]?.status === "Active") {
                        let title = "";
                        let subText = "";
                        let href = "";
                        let buttonText = `Komplettera`;
                        let buttonClass = "completerequestbutton";
                        let buttonTextClass = "text-block-69";
                        let description = infoRequests[req].description;
                        if (description) { description = description.replace(/'/g, ''); }
                        // PRICE REQUEST
                        if (req === "price") {
                            title = "Lägre pris";
                            buttonClass = "acceptnewpricebutton";
                            buttonTextClass = "text-block-69-copy-copy";
                            buttonText = "Se prisförslag";
                            subText = "Vill du sänka priset och få det sålt?";
                            const max = infoRequests[req].maxPrice;
                            const min = infoRequests[req].minPrice;
                            if (status === "New") {
                                title = "Värdering";
                                buttonClass = "acceptnewpricebutton";
                                buttonTextClass = "text-block-69-copy-copy";
                                buttonText = "Se värdering";
                                subText = "Vill du sälja till vår värdering?";
                            }
                            href = `javascript:openNewPriceToast('${itemId}', '${status}', ${max}, ${min}, '${brand}', '${description}', '${category}');`;
                        }
                        // MEASUREMENTS REQUEST
                        if (req === "measurements") {
                            title = "Mått";
                            subText = "Vi behöver mått för detta plagg";
                            buttonText = "Se mer";
                            href = `javascript:openMeasurementsToast('${itemId}', '${description}');`;
                        }
                        // IMAGES REQUEST
                        if (req === "images") {
                            title = "Bilder";
                            subText = "Bilderna behöver kompletteras";
                            buttonText = "Ändra bilder";
                            href = window.location.origin + `/edit-item?id=${itemId}`;
                        }
                        // LONGER PERIOD REQUEST
                        if (req === "longerPeriod") {
                            title = "Förläng";
                            subText = "Vill du förlänga med 30 dagar till?";
                            buttonText = "Svara";
                            href = `javascript:openLongerPeriodToast('${itemId}', '${brand}', ${currentMinPrice}, ${deniedBefore});`;
                        }
                        // CARD
                        let card = `<div class="div-block-126">
                                                <div class="ratio-box _16-9">
                                                    <div class="content-block with-image">
                                                        <div class="img-container" style="background-image: url('${frontImageUrl}');"></div>
                                                    </div>
                                                </div>
                                                <div class="text-block-73">${title}</div>
                                                <div class="text-block-72">${subText}</div>
                                                <a href="${href}" id="" class="link-block-23 w-inline-block">
                                                    <div class="${buttonClass}">
                                                        <div class="${buttonTextClass}">${buttonText}</div>
                                                    </div>
                                                </a>
                                            </div>`;
                        infoRequestsList.innerHTML += card;
                        infoRequestsDiv.style.display = "block";
                    }
                }
            }
        });
    });
}
