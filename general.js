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
        } else {
            console.log("No such user document exist!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
};

function updateFirestoreUserDocument(userId, email, phone) {
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
            // Update document
            db.collection("users").doc(userId).update(fields)
                .then((docRef) => {
                    console.log(`User document ${userId} was successfully updated with these fields: `, fields);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.log("No such user document exists! Creating it now and adds user details.");
            // Add a new document in collection "users"
            db.collection("users").doc(userId).set(fields)
                .then((docRef) => {
                    console.log(`User document was created with id ${userId} and these fields: `, fields);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
};

async function askForAdditionalUserDetails(userID) {
    let status = "";
    let shippingStatus = "";
    let addressFirstName = "";
    let personalId;
    let personalIdExists = true;

    // First, get items with status "Sold" and shippingStatus "Not sent"
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
        if (personalId) {
            if (personalId === "") {
                personalIdExists = false;
            }
        } else {
            personalIdExists = false;
        }
    });

    // Redirect user if user has no address and at least one item that's sold but not shipped
    if (status == "Sold" && shippingStatus == "Not sent" && addressFirstName == undefined) {
        window.location.href = window.location.origin + "/address-form";
    }

    // Redirect user to personalId form if they haven't added it yet
    if (status == "Sold" && shippingStatus == "Not sent" && personalIdExists == false) {
        window.location.href = window.location.origin + "/personal-id-form";
    }
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
                                        <img src="https://global-uploads.webflow.com/6055e6b453114a22c1c345f0/608db91c363e28ae251e0998_delivery-truck%204.svg" loading="lazy" width="30" alt="" class="image-4">
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
var currentBrand = "";

function openPickupToast(itemId, soldDate, brand) {
    setDatesOfPickupToast(soldDate);
    window.pickupFlowItemId = itemId;
    currentBrand = brand;
    document.getElementById('triggerPickupAnimation').click();
}

function setDatesOfPickupToast(soldDate) {
    // Hide all options first, to later determine which ones to show
    radioFieldOne.style.display = 'none';
    radioFieldTwo.style.display = 'none';
    radioFieldThree.style.display = 'none';
    radioFieldFour.style.display = 'none';

    // Create the 4 first possible pickup dates, starting 4 b-days after soldDate
    var firstDate = new Date(soldDate);
    firstDate.setDate(firstDate.getDate() + 4);

    // Om helgdag, skjut på det så att man bara kan välja veckodagar
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
    if (firstDate > today) {
        $('#radioButtonOne').val(firstDate.toISOString().split('T')[0]); //yyyy-mm-dd
        pickupDateOne.innerHTML = days[firstDate.getDay()] + ", " + firstDate.getDate() + " " + months[firstDate.getMonth()] + ", kl 9-16";
        radioFieldOne.style.display = 'block';
        optionsDisplayed++;
    }
    if (secondDate > today) {
        $('#radioButtonTwo').val(secondDate.toISOString().split('T')[0]);
        pickupDateTwo.innerHTML = days[secondDate.getDay()] + ", " + secondDate.getDate() + " " + months[secondDate.getMonth()] + ", kl 9-16";
        radioFieldTwo.style.display = 'block';
        optionsDisplayed++;
    }
    if (thirdDate > today) {
        $('#radioButtonThree').val(thirdDate.toISOString().split('T')[0]);
        pickupDateThree.innerHTML = days[thirdDate.getDay()] + ", " + thirdDate.getDate() + " " + months[thirdDate.getMonth()] + ", kl 9-16";
        radioFieldThree.style.display = 'block';
        optionsDisplayed++;
    }
    if (forthDate > today) {
        $('#radioButtonFour').val(forthDate.toISOString().split('T')[0]);
        pickupDateFour.innerHTML = days[forthDate.getDay()] + ", " + forthDate.getDate() + " " + months[forthDate.getMonth()] + ", kl 9-16";
        radioFieldFour.style.display = 'block';
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
        radioFieldOne.style.display = 'block';

        // Show day after tomorrow as an option
        $('#radioButtonTwo').val(dayTwo.toISOString().split('T')[0]);
        pickupDateTwo.innerHTML = days[dayTwo.getDay()] + ", " + dayTwo.getDate() + " " + months[dayTwo.getMonth()] + ", kl 9-16";
        radioFieldTwo.style.display = 'block';
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
        bookPickupToast.style.display = 'none';
        feedbackForm.style.display = 'block';
        happinessQuestionText.innerText = `Hur nöjd är du med försäljningen 
    av ditt ${currentBrand}-plagg?`;
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