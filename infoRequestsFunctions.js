async function openMeasurementsToast(itemId, description) {
    measurementDescriptionText.innerHTML = description;
    measurementsSubmitButton.addEventListener('click', async function () {
        const input = measurementsIput.value;
        if (input.length > 0) {
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

async function storePriceResponse(itemId, max, min, response) {
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
        await db.collection('items').doc(itemId).update({
            "infoRequests.price.status": "Resolved",
            "infoRequests.price.response": "Denied"
        }).then(function () {
            triggerNewPriceToastClose.click();
            setTimeout(function () { location.reload(); }, 300);
        });
    }
}

async function openNewPriceToast(itemId, status, max, min, brand, motivation) {
    console.log("openNewPriceToast", itemId, status, max, min, brand, motivation);
    // Set content of toast
    motivationDiv.style.display = 'none';
    newPriceToastTitle.innerHTML = "Nytt pris";
    let text = `Vi tror att sannolikheten att få ditt ${brand}-plagg sålt under sista dagarna ökar om du kan tänka dig att sänka priset något?`;
    newPriceHeading.innerHTML = "Nytt prisförslag";
    newPrice.innerHTML = `${min} kr`;
    acceptNewPriceButton.innerHTML = "Acceptera nytt pris";
    denyNewPriceButton.innerHTML = "Sänk ej";
    if (status === "New") {
        newPriceToastTitle.innerHTML = "Pris";
        newPriceHeading.innerHTML = "Prissättning från Mai";
        newPrice.innerHTML = `${min}-${max} kr`;
        acceptNewPriceButton.innerHTML = "Acceptera pris";
        denyNewPriceButton.innerHTML = "Avböj och avsluta";
        text = `Ditt ${brand}-plagg har värderats till något under ditt lägsta accepterade pris. Vill du acceptera värderingen, eller avsluta försäljningen?`;
    }
    newPriceText.innerHTML = text;
    if (motivation !== 'undefined') {
        motivationText.innerHTML = motivation;
        motivationDiv.style.display = 'block';
    }
    acceptNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Accepted');`;
    denyNewPriceButton.href = `javascript:storePriceResponse('${itemId}', ${max}, ${min}, 'Denied');`;

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
            var brand = item.brand;
            var archived = item.archived;
            var frontImageUrl = images.frontImage;
            if (images.frontImageSmall) {
                frontImageUrl = images.frontImageSmall;
            }
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
                        if (req === "price") {
                            title = "Nytt pris";
                            buttonClass = "acceptnewpricebutton";
                            buttonTextClass = "text-block-69-copy-copy";
                            buttonText = "Se pris";
                            subText = "Accepterar du den nya prissättningen?";
                            const max = infoRequests[req].maxPrice;
                            const min = infoRequests[req].minPrice;
                            if (status === "New") {
                                title = "Pris";
                                buttonClass = "acceptnewpricebutton";
                                buttonTextClass = "text-block-69-copy-copy";
                                buttonText = "Se pris";
                                subText = "Accepterar du prissättningen?";
                            }
                            href = `javascript:openNewPriceToast('${itemId}', '${status}', ${max}, ${min}, '${brand}', '${description}');`;
                        }
                        if (req === "measurements") {
                            title = "Mått";
                            subText = "Vi behöver mått för detta plagg";
                            buttonText = "Ange mått";
                            href = `javascript:openMeasurementsToast('${itemId}', '${description}');`;
                        }
                        if (req === "images") {
                            title = "Bilder";
                            subText = "Bilderna behöver kompletteras";
                            buttonText = "Ändra bilder";
                            href = window.location.origin + `/edit-item?id=${itemId}`;
                        }
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