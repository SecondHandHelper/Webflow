// FUNCTIONS FOR PRIVATE PAGE

function setInitialStylePrivatePage() {
    noItemsDiv.style.display = "none";
    myItemsDiv.style.display = "none";
    soldNotSentDiv.style.display = "none";
    soldItemsDiv.style.display = "none";
    soldByOthersDiv.style.display = "none";
    itemListSoldContainer.style.display = "none";
    headerSellItemButton.style.display = "none";
    header.style.backgroundColor = "transparent";
    quickInfoDiv.style.display = "none";
    bookPickupToast.style.display = "none";
    openQuestionDiv.style.display = "none";
    feedbackForm.style.display = "none";
    feedbackSubmitButton.style.display = "none";
}

function updateIC(userId, em, ph) {
    let email = em;
    let phone = ph;

    console.log("Updates Intercom");

    if (email === null) {
        email = "";
    }
    if (phone == null) {
        phone = "";
    }

    console.log(`Email: ${email}, Phone: ${phone}`);

    var fields = {};
    if (email) {
        fields["email"] = email;
    }
    if (phone) {
        fields["phone"] = phone;
    }

    console.log(`Fields to update:`,  fields);
    Intercom('update', fields);
};

function updateFirestoreUserDocument(userId, email, phone) {
    console.log("updateFirestoreUserDocument function is running!");
    var fields = {};
    if (email) {
        fields["email"] = email;
    }
    if (phone) {
        fields["phoneNumber"] = phone;
    }
    console.log(fields);

    var docRef = db.collection("users").doc(userId);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log("Now updating the user document with missed information");
            // Update document
            db.collection("users").doc(userId).update(fields)
                .then(() => {
                    console.log("User document successfully updated!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.log("No such user document exists! Creating it now and adds user details.");
            // Add a new document in collection "users"
            db.collection("users").doc(userId).set(fields)
                .then(() => {
                    console.log("User document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
};

async function ifSoldItemAskForAddress(userID) {
    let status = "";
    let shippingStatus = "";
    let addressFirstName = "";
    let personalId = "";

    // First, ge items with status "Sold" and shippingStatus "Not sent"
    await db.collection("items")
        .where("user", "==", userID)
        .where("status", "==", "Sold")
        .where("shippingStatus", "==", "Not sent")
        .orderBy("soldDate")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                status = doc.data().status;
                shippingStatus = doc.data().shippingStatus;
            });
        });

    // Second, check if user has no address or personal id added yet
    await db.collection("users").doc(userID).get().then((doc) => {
        addressFirstName = doc.data().addressFirstName;
        personalId = doc.data().personalId;
    });

    // Third, redirect user if user has no address and at least one item that's sold but not shipped
    if (status == "Sold" && shippingStatus == "Not sent" && addressFirstName == undefined) {
        window.location.href = window.location.origin + "/address-form";
    }

    // Ugly placement of this, BUT, here I check if the user haven't added their personalId yet, and redirect to form
    /*
    if (status == "Sold" && shippingStatus == "Not sent" && personalId == undefined) {
        window.location.href = window.location.origin + "/personal-id-form";
    }
    */
}

function loadSoldByOthers(userID) {
    var itemListSoldByOthers = document.getElementById('itemListSoldByOthers');

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

                // Add card to list if seller is other than myself
                if (sellerId != userID && soldPrice >= 200) {
                    if ("productImage" in images) {
                        imageUrl = images.productImage;
                    }
                    var soldByOthersItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${brand}</div></div>`;
                    itemListSoldByOthers.innerHTML += soldByOthersItemCardHTML;
                }
            });
        });
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
                                        <div class="text-pickup-small">Hämtas upp</div>
                                        <div id="pickupTimeInfoText" class="text-pickup-small">${pickupTimeInfoText}</div>
                                    </div>`;
    return div;
}

function getBookPickupButton(itemId, soldDate, brand) {
    const div = `<a id="bookPickupButton" href="javascript:openPickupToast('${itemId}', '${soldDate}', '${brand}');" class="link-block-13 w-inline-block">
                                        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="34" alt="" class="image-4">
                                        <div class="text-pickup-small">Boka hämtning</div>
                                    </a>`;
    return div;
}

function closePickupToast() {
    bookPickupToast.style.display = 'none';
}

function closeFeedbackForm() {
    feedbackForm.style.display = 'none';
}

function emptyListsInnerHTML() {
    itemListSelling.innerHTML = "";
    itemListSoldNotSent.innerHTML = "";
    itemListSold.innerHTML = "";
    itemListSoldByOthers.innerHTML = "";
}

// PICKUP RELATED FUNCTIONS
var currentItem = "";
var currentBrand = "";

function openPickupToast(itemId, soldDate, brand) {
    setDatesOfPickupToast(soldDate);
    currentItem = itemId;
    currentBrand = brand;
    document.getElementById('triggerPickupAnimation').click();
}

function setDatesOfPickupToast(soldDate) {
    // Get the 4 first business days, 3 days after soldDate
    var firstDate = new Date(soldDate);
    firstDate.setDate(firstDate.getDate() + 4);

    // Om helgdag, skjut på det så att man bara kan välja veckodagar
    if (firstDate.getDay() == 0) {
        firstDate.setDate(firstDate.getDate() + 1);
    } else if (firstDate.getDay() == 6) {
        firstDate.setDate(firstDate.getDate() + 2);
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

    /*
    var dateNumber1 = firstDate.getDate();
    var dateNumber2 = secondDate.getDate();
    var monthName1 = months[firstDate.getMonth()];
    var monthName2 = months[secondDate.getMonth()];
    var dayName1 = days[firstDate.getDay()];
    var dayName2 = days[secondDate.getDay()];
    */

    // Change value of radio buttons
    $('#radioButtonOne').val(firstDate.toISOString().split('T')[0]); //yyyy-mm-dd
    $('#radioButtonTwo').val(secondDate.toISOString().split('T')[0]); //yyyy-mm-dd
    $('#radioButtonThree').val(thirdDate.toISOString().split('T')[0]); //yyyy-mm-dd
    $('#radioButtonFour').val(forthDate.toISOString().split('T')[0]); //yyyy-mm-dd

    // Show dates
    pickupDateOne.innerHTML = days[firstDate.getDay()] + ", " + firstDate.getDate() + " " + months[firstDate.getMonth()] + ", kl 9-16";
    pickupDateTwo.innerHTML = days[secondDate.getDay()] + ", " + secondDate.getDate() + " " + months[secondDate.getMonth()] + ", kl 9-16";
    pickupDateThree.innerHTML = days[thirdDate.getDay()] + ", " + thirdDate.getDate() + " " + months[thirdDate.getMonth()] + ", kl 9-16";
    pickupDateFour.innerHTML = days[forthDate.getDay()] + ", " + forthDate.getDate() + " " + months[forthDate.getMonth()] + ", kl 9-16";

    /*
    pickupDateOne.innerHTML = dayName1 + ", " + dateNumber1 + " " + monthName1 + ", kl 9-16";
    pickupDateTwo.innerHTML = dayName2 + ", " + dateNumber2 + " " + monthName2 + ", kl 9-16";
    */
}

async function bookPickup() {
    let pickupDate = "";
    var pickupRadioButtons = document.getElementsByName("Pickup");
    for (var x = 0; x < pickupRadioButtons.length; x++) {
        if (pickupRadioButtons[x].checked) {
            pickupDate = pickupRadioButtons[x].value; // yyyy--mm-dd
        }
    }

    const itemRef = db.collection('items').doc(currentItem);
    const res = await itemRef.update({
        pickupDate: pickupDate
    }).then(function () {
        console.log(`pickupDate is now set on Firestore item`);
        bookPickupToast.style.display = 'none';
        feedbackForm.style.display = 'block';
        happinessQuestionText.innerText = `Hur nöjd är du med försäljningen 
    av ditt ${currentBrand}-plagg?`;
    });
}

async function setHappinessRate(value) {
    const itemRef = db.collection('items').doc(currentItem);
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
    const itemRef = db.collection('items').doc(currentItem);
    const res = await itemRef.update({
        feedbackText: value
    }).then(function () {
        console.log(`feedbackText is now set on Firestore item`);
        feedbackForm.style.display = 'none';
        location.reload();
    });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out');
    }).catch((error) => {

    });
}