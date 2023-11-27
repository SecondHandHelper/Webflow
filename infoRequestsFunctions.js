import {itemCoverImage} from "./general";

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
    if(!itemId){return}
    console.log('is this happening?');
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

async function openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMax, currentMin) {
    console.log("openNewPriceToast", itemId, status, max, min, brand, description, category, type, currentMax, currentMin);
    previousMinPrice.style.display = 'none';
    previousMaxPrice.style.display = 'none';
    maxPriceDiv.style.display = 'block';
    minPriceDiv.style.display = 'block';

    // Set content of toast
    newPriceToastTitle.innerHTML = "Nytt lägsta pris";
    newPriceHeading.innerHTML = `${brand}-plagg`;
    const c = category.toLowerCase();
    if (c && c !== "null") { newPriceHeading.innerHTML = `${brand}-${c}`; }
    maxPrice.innerHTML = max;
    minPrice.innerHTML = min;
    if (currentMax && currentMax !== 'null' && currentMax !== '' && currentMax !== 'undefined' && max !== currentMax){
        previousMaxPrice.innerHTML = currentMax;
        previousMaxPrice.style.display = 'block';
    }
    if (currentMin && currentMin !== 'null' && currentMin !== '' && currentMin !== 'undefined' && min !== currentMin){
        previousMinPrice.innerHTML = currentMin;
        previousMinPrice.style.display = 'block';
    }
    acceptNewPriceButton.innerHTML = "Sälj med nytt pris";
    denyNewPriceButton.innerHTML = "Sänk ej";

    if (status === "New" && type === 'Valuation') {
        newPriceToastTitle.innerHTML = "Värdering";
        acceptNewPriceButton.innerHTML = "Sälj till värdering";
        denyNewPriceButton.innerHTML = "Avböj och avsluta";
    }
    if (type === 'Adjusted ML Valuation'){
        newPriceToastTitle.innerHTML = "Nytt prisintervall";

    }
    if (type !== 'Valuation' && type !== 'Adjusted ML Valuation'){ //Custom lowered price and automatic price dump cases
        minPrice.innerHTML = `${min} kr`;
        maxPriceDiv.style.display = 'none';
    }
    if (description && description !== 'undefined' && description !== '' && description !== 'null') {
        newPriceText.innerHTML = description;
        descriptionDiv.style.display = 'block';
    }
    acceptNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Accepted', '${status}');`;
    denyNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Denied', '${status}');`;

    // Open toast
    triggerNewPriceToastOpen.click();
}

export function loadInfoRequests(userId) {
    const measurementsClone = document.getElementById('infoRequestMeasurementsTemplate').cloneNode(true);
    const longerPeriodClone = document.getElementById('infoRequestLongerPeriodTemplate').cloneNode(true);
    const updateImagesClone = document.getElementById('infoRequestImagesTemplate').cloneNode(true);
    const valuationClone = document.getElementById('infoRequestValuationTemplate').cloneNode(true);
    const infoRequestsList = document.getElementById('infoRequestsList')
    infoRequestsList.replaceChildren();
    db.collection("items").where("user", "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const itemId = doc.id;
            const item = doc.data();
            const infoRequests = item.infoRequests;
            const status = item.status;
            const brand = item.brand.replace(/'/g, '');
            const currentMinPrice = item.minPriceEstimate;
            const currentMaxPrice = item.maxPriceEstimate;
            const deniedBefore = item?.infoRequests?.price?.response === "Denied" ? true : false;
            const archived = item.archived;
            const category = item.category;
            const frontImageUrl = itemCoverImage(item);
            if (archived == undefined && status !== "Unsold" && status !== "Sold" && infoRequests) {
                displayRequests();
            }

            function displayRequests() {
                for (const req in infoRequests) {
                    if (infoRequests[req]?.status === "Active") {
                        let description = infoRequests[req].description;
                        
                        if (description) { description = description.replace(/'/g, ''); }
                        // PRICE REQUEST
                        if (req === "price") {
                            const type = infoRequests[req].type;
                            const newRequest = valuationClone.cloneNode(true);
                            newRequest.id = `infoRequestPrice-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a .pricebuttontext').innerText = 'Se prisförslag';
                            newRequest.querySelector('.text-block-72').innerText = "Vill du sänka priset och få det sålt?";
                            infoRequestsList.appendChild(newRequest);
                            if (status === "New" && type !== 'Adjusted ML Valuation') {
                                newRequest.querySelector('a .pricebuttontext').innerText = 'Se värdering';
                                newRequest.querySelector('.text-block-72').innerText = 'Vill du sälja till vår värdering?'
                                newRequest.querySelector('a').href = `/item-valuation?id=${itemId}`;
                            } else {
                                setTimeout(() => {
                                    const max = infoRequests[req].maxPrice;
                                    const min = infoRequests[req].minPrice;
                                    document.querySelector(`#infoRequestPrice-${itemId} a`).addEventListener('click', async () => {
                                        await openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMaxPrice, currentMinPrice);
                                    })
                                }, 0);
                            }
                        }
                        // MEASUREMENTS REQUEST
                        if (req === "measurements") {
                            const newRequest = measurementsClone.cloneNode(true);
                            newRequest.id = `infoRequestMeasurements-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestMeasurements-${itemId} a`).addEventListener('click', async () => {
                                await openMeasurementsToast(itemId, description);
                              })
                            }, 0);
                        }
                        // IMAGES REQUEST
                        if (req === "images") {
                            const newRequest = updateImagesClone.cloneNode(true);
                            newRequest.id = `infoRequestImages-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a').href = `/edit-item?id=${itemId}`;
                            infoRequestsList.appendChild(newRequest);
                        }
                        // LONGER PERIOD REQUEST
                        if (req === "longerPeriod") {
                            const newRequest = longerPeriodClone.cloneNode(true);
                            newRequest.id = `infoRequestLongerPeriod-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestLongerPeriod-${itemId} a`).addEventListener('click', async () => {
                                await openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore);
                              })
                            }, 0);
                        }
                        infoRequestsDiv.style.display = "block";
                    }
                }
            }
        });
    });
}
