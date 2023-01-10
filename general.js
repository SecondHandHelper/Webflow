// Get params
var queryStr = window.location.search;
var paramPairs = queryStr.substring(1).split('&');
var params = {};
for (var i = 0; i < paramPairs.length; i++) {
    var parts = paramPairs[i].split('=');
    params[parts[0]] = decodeURIComponent(parts[1]);
}

// FUNCTIONS FOR PRIVATE PAGE
function updateIC(userId, em, ph) {
    let email = em;
    let phone = ph;

    if (email === null) {
        email = "";
    }
    if (phone === null) {
        phone = "";
    }

    window.intercomSettings = {
        app_id: "klyy0le5",
        user_id: `${userId}`
    };

    var docRef = db.collection("users").doc(userId);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            let name = "";
            let city = "";
            if (data.addressFirstName) {
                const fn = data.addressFirstName;
                const ln = data.addressLastName;
                name = fn + " " + ln;
                city = data.addressCity;
            }
            if (data.phoneNumber) {
                phone = data.phoneNumber;
            }

            // Update intercom
            var fields = {
                mai_user_id: `${userId}`,
                user_id: `${userId}`,
                phone: `${phone}`,
                email: `${email}`,
                name: `${name}`,
                city: `${city}`
            };

            Intercom('update', fields);
        } else {
            console.log("No such user document exist!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

async function updateFirestoreUserDocument(userId, email, phone) {
    let fields = {};
    if (email) { fields["email"] = email; }
    if (phone) { fields["phoneNumber"] = phone; }
    const signInMethod = authUser.providerData[0].providerId;
    if (signInMethod) { fields["signInMethod"] = signInMethod; }
    const docRef = db.collection("users").doc(userId);

    try {
        const doc = await docRef.get();
        if (doc.exists) {
            await docRef.update(fields);
            console.log(`User document ${userId} was successfully updated with these fields: `, fields);
        } else {
            // Get and set attribution utm parameters only when creating user doc
            const utm_campaign = checkCookie("utm_campaign");
            const utm_source = checkCookie("utm_source");
            const utm_medium = checkCookie("utm_medium");
            const utm_term = checkCookie("utm_term");
            const utm_content = checkCookie("utm_content");
            let a = {};
            if (utm_campaign) { a["utm_campaign"] = utm_campaign; }
            if (utm_source) { a["utm_source"] = utm_source; }
            if (utm_medium) { a["utm_medium"] = utm_medium; }
            if (utm_term) { a["utm_term"] = utm_term; }
            if (utm_content) { a["utm_content"] = utm_content; }
            if (Object.keys(a).length > 0) { fields["attribution"] = a }

            // Create User Document
            db.collection("users").doc(userId).set(fields)
                .then(() => {
                    console.log(`User document was created with id ${userId} and these fields: `, fields);
                    user = fields;
                    identify();

                    // Connect referral user from invite cookie only when creating user doc
                    const inputCode = checkCookie("invite");
                    if (inputCode) { connectReferralUsers(inputCode); }
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    } catch (e) {
        console.log("Something went wrong:", e);
    }
}

async function askForAdditionalUserDetails(userID) {
    let status = "";
    let shippingStatus = "";
    let addressFirstName = "";
    let personalId;
    let personalIdExists = true;
    let oneItemNotPaid = false
    let oneItemNotSent = false;

    // First, get items with status "Sold" and shippingStatus "Not sent"
    await db.collection("items")
        .where("user", "==", userID)
        .where("status", "==", "Sold")
        .orderBy("soldDate")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                status = doc.data().status;
                shippingStatus = doc.data().shippingStatus;
                payoutStatus = doc.data().payoutStatus;
                if (shippingStatus === "Not sent") {
                    oneItemNotSent = true;
                }
                if (payoutStatus !== "Payed") {
                    oneItemNotPaid = true;
                }
            });
        });

    // Second, check if user has no address or personal id added yet
    await db.collection("users").doc(userID).get().then((doc) => {
        addressFirstName = doc.data().addressFirstName;
        personalId = doc.data().personalId;
        if (personalId) {
            if (personalId === "") {
                personalIdExists = false;
            }
        } else {
            personalIdExists = false;
        }
    });

    // Redirect user if user has no address and at least one item that's sold but not shipped
    if (oneItemNotSent == true && addressFirstName == undefined) {
        window.location.href = window.location.origin + "/address-form";
    }

    // Redirect user to personalId form if they haven't added it yet
    if (oneItemNotPaid == true && personalIdExists == false) {
        window.location.href = window.location.origin + "/personal-id-form";
    }
}

function loadSoldByOthers(userID) {
    var itemListSoldByOthers = document.getElementById('itemListSoldByOthers');
    itemListSoldByOthers.innerHTML = "";

    // SOLD BY OTHERS QUERY + Add cards to list
    db.collection("items")
        .where("status", "==", "Sold")
        .orderBy('soldDate', 'desc')
        .limit(30)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var sellerId = doc.data().user;
                var brand = doc.data().brand;
                var soldPrice = doc.data().soldPrice;
                var images = doc.data().images;
                var imageUrl = images.frontImage;
                if (images.frontImageSmall) {
                    imageUrl = images.frontImageSmall;
                }

                // Add card to list if seller is other than myself
                if (sellerId != userID && soldPrice >= 200) {
                    var soldByOthersItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${brand}</div></div>`;
                    itemListSoldByOthers.innerHTML += soldByOthersItemCardHTML;
                }
            });
        });

    soldByOthersDiv.style.display = "block";
}

function getPickupTimeInfoDiv(pickupDate) {
    // Update the pickup time to display to user
    var date = new Date(pickupDate);
    var days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    var months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    var dateNumber = date.getDate();
    var monthName = months[date.getMonth()];
    var dayName = days[date.getDay()];
    var pickupTimeInfoText = dayName + ", " + dateNumber + " " + monthName + ", kl 9-16";
    const div = `<div id="pickupTimeInfoDiv" class="div-block-54">
                                        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="34" alt="" class="image-12">
                                        <div id="pickupTimeInfoText" class="next-step-text-small">${pickupTimeInfoText}</div>
                                    </div>`;
    return div;
}

function getBookPickupButton(itemId, soldDate, brand) {
    const div = `<a id="bookPickupButton" href="javascript:openPickupToast('${itemId}', '${soldDate}', '${brand}');" class="link-block-13 w-inline-block">
                                        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="30" alt="" class="image-4">
                                        <div class="text-pickup-small-button">Boka hämtning</div>
                                    </a>`;
    return div;
}

function closePickupToast() {
    document.getElementById('triggerPickupToastClose').click();
}

function closeFeedbackForm() {
    document.getElementById('triggerFeedbackFormClose').click();
    setTimeout(function () {
        location.reload();
    }, 400);
}

function getBagReceivedCheckbox(itemId, soldDate) {
    const div = `<div class="w-form">
        <form method="get" name="wf-form-" id="bagReceivedForm">
            <label class="w-checkbox checkbox-field-3">
                <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                <input type="checkbox" id="bagReceivedCheckbox-${itemId}" style="opacity:0;position:absolute;z-index:-1" onclick="javascript:bagReceivedAction(this, '${itemId}', '${soldDate}');">
                <span class="checkbox-label-3 w-form-label">Påsen har kommit</span>
            </label>
        </form>
    </div>`;
    return div;
}

// SHIPPING FUNCTIONS

function bagReceivedAction(checkbox, itemId, soldDate) {
    if (checkbox.checked == true) {
        db.collection('items').doc(itemId).update({ bagReceived: true }).then((docRef) => {
            console.log(`Stored in DB that bag is received for item with ID: `, itemId);
        });
        openShippingToast(itemId, soldDate);
    } else {
        db.collection('items').doc(itemId).update({ bagReceived: false }).then((docRef) => {
            console.log(`Stored in DB that bag is NOT received for item with ID: `, itemId);
        });
    }
}

function openShippingToast(itemId, soldDate) {
    console.log("openShippingToast");
    window.pickupFlowItemId = itemId;
    document.getElementById('shippingOptionsDiv').innerHTML = `<a href="javascript:storeShippingMethod('${itemId}', 'Service point');" class="link-block-22 w-inline-block"><div class="div-block-122">
        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/62436932a8d26f07254b45e2_parcel.png" loading="lazy" width="45" alt="" class="image-24">
        <div class="small-button-text">Lämna till ombud</div></div>
    </a>
    <a href="javascript:openPickupToast('${itemId}', '${soldDate}');" class="link-block-22 w-inline-block"><div class="div-block-122">
        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="45" alt="" class="image-24">
        <div class="small-button-text">Boka upphämtning</div></div>
    </a>`;
    document.getElementById('triggerShippingToastOpen').click();
}

function getShippingInfoDiv(itemId, method, soldDate, pickupDate) {
    console.log("getShippingInfoDiv is running");
    if (featureIsEnabled('C2C')) {
        // ### C2C CODE ###
        let uniquePart = ``;
        if (method == "Service point") {
            uniquePart += `
            <div class="div-block-189">
                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg" loading="lazy" width="22" alt="" class="image-38">
                <div class="next-step-text-small">Lämna till ombud</div>
            </div>
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
                uniquePart += `
                <div class="div-block-189">
                    <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" loading="lazy" width="24" alt="" class="image-38">
                    <div class="next-step-text-small">${pickupTimeInfoText}</div>
                </div>
                `;
            }
        }

        const div = `
        <div id="shippingInfoDiv" class="div-block-54">
            ${uniquePart}
            <a href="javascript:openShippingToast('${itemId}', '${soldDate}');">
                <div id="changeShippingMethod-${itemId}" class="change-shipping-method-text">Ändra fraktsätt</div>
            </a>
        </div>`;
        return div;
    } else {
        // ### LIVE CODE ###
        let uniquePart = ``;
        if (method == "Service point") {
            uniquePart += `
        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/62436932a8d26f07254b45e2_parcel.png" loading="lazy" width="26" alt="" class="image-12">
            <div class="next-step-text-small">Lämna till ombud</div>
        `;
        } else if (method == "Pickup") {
            if (pickupDate) {
                var date = new Date(pickupDate);
                var days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
                var months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
                var dateNumber = date.getDate();
                var monthName = months[date.getMonth()];
                var dayName = days[date.getDay()];
                var pickupTimeInfoText = dayName + ", " + dateNumber + " " + monthName + ", kl 9-16";
                uniquePart += `
            <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="28" alt="" class="image-12">
            <div class="next-step-text-small">${pickupTimeInfoText}</div>
            `;
            }
        }

        const div = `
        <div id="shippingInfoDiv" class="div-block-54">
            ${uniquePart}
            <a href="javascript:openShippingToast('${itemId}', '${soldDate}');">
                <div id="changeShippingMethod-${itemId}" class="change-shipping-method-text">Ändra fraktsätt</div>
            </a>
        </div>`;
        return div;
    }
}

async function storeShippingMethod(itemId, method) {
    console.log(`storeShippingMethod(${itemId}, ${method}) is running`);
    await db.collection('items').doc(itemId).update({ shippingMethod: method }).then((docRef) => {
        console.log(`Shipping method '${method}' stored on item with ID: `, itemId);
        window.pickupFlowItemId = itemId; // Legacy from before. Bad way of doing it. Should clean up 'pickupFlowItemId' at some point.
        if (method == "Service point") {
            document.getElementById('feedbackFormTitle').innerHTML = 'Tack, då vet vi att paketet snart lämnas till ett ombud.';
            document.getElementById('triggerShippingToastClose').click();
        } else if (method == "Pickup") {
            closePickupToast();
        }
        happinessQuestionText.innerText = `Hur nöjd är du med försäljningen 
av ditt plagg?`;

        document.getElementById('triggerFeedbackFormOpen').click();
    });
}

function openPickupToast(itemId, soldDate) {
    console.log(`openPickupToast(${itemId}, ${soldDate}) is running`);
    triggerShippingToastClose.click();
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

async function bookPickup() {
    let pickupDate = "";
    var pickupRadioButtons = document.getElementsByName("Pickup");
    for (var x = 0; x < pickupRadioButtons.length; x++) {
        if (pickupRadioButtons[x].checked) {
            pickupDate = pickupRadioButtons[x].value; // yyyy--mm-dd
        }
    }

    const itemRef = db.collection('items').doc(pickupFlowItemId);
    const res = await itemRef.update({
        pickupDate: pickupDate
    }).then(function () {
        console.log(`pickupDate is now set on Firestore item`);
        storeShippingMethod(pickupFlowItemId, 'Pickup');
        happinessQuestionText.innerText = `Hur nöjd är du med försäljningen 
    av ditt plagg?`;
    });
}

async function setHappinessRate(value) {
    const itemRef = db.collection('items').doc(pickupFlowItemId);
    const res = await itemRef.update({
        happinessRate: value
    }).then(function () {
        console.log(`happinessRate is now set on Firestore item`);
        happinessQuestionDiv.style.display = 'none';
        openQuestionDiv.style.display = 'block';
        feedbackSubmitButton.style.display = 'block';
    });
}

async function storeFeedback() {
    const value = feedbackTextField.value;
    const itemRef = db.collection('items').doc(pickupFlowItemId);
    const res = await itemRef.update({
        feedbackText: value
    }).then(function () {
        console.log(`feedbackText is now set on Firestore item`);
        closeFeedbackForm();
    });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out');
        window.location.href = window.location.origin;
    }).catch((error) => {
        console.log(error);
    });
}

// FUNCTIONS FOR START PAGE (Logged out)
function loadRecentlySold() {
    var data = {};

    // [START fb_functions_call_add_message_error]
    var addMessage = firebase.functions().httpsCallable('addMessage');

    addMessage()
        .then((result) => {
            // Read result of the Cloud Function.
            console.log('Cloud Function är klar! Nu gör vi något med resultatet!');

            var itemListRecentlySoldStartPage = document.getElementById('itemListRecentlySoldStartPage');
            itemListRecentlySoldStartPage.innerHTML = "";

            data = result.data;

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var brand = data[key].brand;
                    var soldPrice = data[key].soldPrice;
                    var images = data[key].images;
                    var imageUrl = images.frontImage;
                    if (images.frontImageSmall) {
                        imageUrl = images.frontImageSmall;
                    }

                    if (soldPrice >= 240) {
                        var itemCardHTML = `<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${brand}</div></div>`;
                        var itemListRecentlySoldStartPage = document.getElementById('itemListRecentlySoldStartPage');
                        itemListRecentlySoldStartPage.innerHTML += itemCardHTML;
                    }
                }
            }
        })
        .catch((error) => {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            console.log('Error message: ', message, code);
        });
    // [END fb_functions_call_add_message_error]
}

// FUNCTIONS FOR ADDING USER DETAILS
async function addUserDetails() {
    // Grab values from form
    let addressFirstName = document.getElementById("addressFirstName").value;
    let addressLastName = document.getElementById("addressLastName").value;
    let addressStreetAddress = document.getElementById("addressStreetAddress").value;
    let addressCO = document.getElementById("addressCO").value;
    let addressPostalCode = document.getElementById("addressPostalCode").value;
    let addressCity = document.getElementById("addressCity").value;
    let addressDoorCode = document.getElementById("addressDoorCode").value;

    addressFirstName = addressFirstName ? addressFirstName.charAt(0).toUpperCase() + addressFirstName.slice(1).toLowerCase().trim() : "";
    addressLastName = addressLastName ? addressLastName.charAt(0).toUpperCase() + addressLastName.slice(1).toLowerCase().trim() : "";
    addressStreetAddress = addressStreetAddress ? addressStreetAddress.charAt(0).toUpperCase() + addressStreetAddress.slice(1).trim() : "";
    addressCO = addressCO ? addressCO.trim() : "";
    addressPostalCode = addressPostalCode ? addressPostalCode.trim() : "";
    addressCity = addressCity ? addressCity.charAt(0).toUpperCase() + addressCity.slice(1).toLowerCase().trim() : "";
    addressDoorCode = addressDoorCode ? addressDoorCode.trim() : "";

    let personalId = document.getElementById("personalId").value;
    personalId = personalId ? await formatPersonalId(personalId) : null;

    // Write to Firestore
    const itemRef = db.collection('users').doc(authUser.uid);
    itemRef.update({
        addressFirstName,
        addressLastName,
        addressStreetAddress,
        addressCO,
        addressPostalCode,
        addressCity,
        addressDoorCode,
        personalId: personalId
    })
        .then(() => {
            console.log(`User address of ${authUser.uid} is now updated`);
            itemConfirmationDiv.style.display = 'block';
            addressFormDiv.style.display = 'none';
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

async function addUserAddress() {
    // Grab values from form
    let addressFirstName = document.getElementById("addressFirstName").value;
    let addressLastName = document.getElementById("addressLastName").value;
    let addressStreetAddress = document.getElementById("addressStreetAddress").value;
    let addressCO = document.getElementById("addressCO").value;
    let addressPostalCode = document.getElementById("addressPostalCode").value;
    let addressCity = document.getElementById("addressCity").value;
    let addressDoorCode = document.getElementById("addressDoorCode").value;

    addressFirstName = addressFirstName ? addressFirstName.charAt(0).toUpperCase() + addressFirstName.slice(1).toLowerCase().trim() : "";
    addressLastName = addressLastName ? addressLastName.charAt(0).toUpperCase() + addressLastName.slice(1).toLowerCase().trim() : "";
    addressStreetAddress = addressStreetAddress ? addressStreetAddress.charAt(0).toUpperCase() + addressStreetAddress.slice(1).trim() : "";
    addressCO = addressCO ? addressCO.trim() : "";
    addressPostalCode = addressPostalCode ? addressPostalCode.trim() : "";
    addressCity = addressCity ? addressCity.charAt(0).toUpperCase() + addressCity.slice(1).toLowerCase().trim() : "";
    addressDoorCode = addressDoorCode ? addressDoorCode.trim() : "";

    // Write to Firestore
    const itemRef = db.collection('users').doc(authUser.uid);
    itemRef.update({
        addressFirstName,
        addressLastName,
        addressStreetAddress,
        addressCO,
        addressPostalCode,
        addressCity,
        addressDoorCode
    })
        .then(() => {
            console.log(`User address of ${authUser.uid} is now updated`);
            window.location.href = window.location.origin + "/private";
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

async function addPersonalId() {
    // Grab values from form
    let personalId = document.getElementById("personalId").value;
    personalId = await formatPersonalId(personalId);

    // Write to Firestore
    if (personalId) {
        const itemRef = db.collection('users').doc(authUser.uid);
        itemRef.update({
            personalId: personalId
        })
            .then(() => {
                console.log(`PersonalId of ${authUser.uid} is now updated`);
                personalIdConfirmationDiv.style.display = 'block';
                personalIdFormDiv.style.display = 'none';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        window.location.href = window.location.origin + "/private";
    }
}

async function formatPersonalId(personalId) {
    if (personalId.length !== 12 && (personalId.substring(0, 2) !== '19' || personalId.substring(0, 2) !== '20')) {
        console.log("Number(personalId.substring(0, 2)", Number(personalId.substring(0, 2)));
        if (Number(personalId.substring(0, 2)) <= 99 && Number(personalId.substring(0, 2)) > 25) {
            personalId = "19" + personalId;
        } else {
            personalId = "20" + personalId;
        }
    }
    console.log(personalId);
    if (personalId.length === 12) {
        console.log("return ", personalId);
        return personalId;
    }
}

// FUNCTIONS FOR SELL ITEM PAGE
async function writePhoneNumberToFirestore(userID, phoneNumber) {
    var docRef = db.collection("users").doc(userID);
    console.log("writePhoneNumberToFirestore function is running!");

    var formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    var doc = await docRef.get();
    if (doc.exists) {
        console.log("Now adding the phone number to the user document");
        // Update document
        try {
            await db.collection("users").doc(userID).update({
                phoneNumber: formattedPhoneNumber
            });
            console.log("User document successfully updated with phone number: ", formattedPhoneNumber);
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document! Creating it and adding phone number!");
        // Add a new document in collection "users"
        try {
            await db.collection("users").doc(userID).set({
                phoneNumber: formattedPhoneNumber
            });
            console.log("User document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    }
}

function calculateSellerGets(value, elementId, feeElementId) {

    let div = document.getElementById(elementId);
    let feeDiv = document.getElementById(feeElementId);
    const price = parseFloat(value);
    let sellerGets = 0;

    if (price < 250) {
        sellerGets = Math.ceil(price - 50);
        if (sellerGets < 0) {
            sellerGets = 0;
        }
        feeDiv.innerText = `Minst 50kr kommission`;
    } else {
        sellerGets = Math.ceil(price * 0.8);
        feeDiv.innerText = `20% kommission`;
    }

    if (sellerGets >= 0) {
        div.innerText = `Du får ${sellerGets} kr`;
        div.style.display = 'block';

    } else {
        div.style.display = 'none';
    }
}
