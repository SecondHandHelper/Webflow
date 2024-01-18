import { itemCoverImage, shareCode, signOut } from "./general";
import { loadInfoRequests } from "./infoRequestsFunctions";
import { loadItemCards } from "./loadItemCards";

var userId;
var email;
var phone;

export function updateIC(userId, em, ph) {
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
    errorHandler.report(error);
    console.log("Error getting document:", error);
  });
}

function showAccountInfo() {
  let identifier;
  if (authUser.current.phoneNumber) {
    identifier = authUser.current.phoneNumber;
  } else if (authUser.current.email) {
    identifier = authUser.current.email;
  }
  if (identifier) {
    account.innerHTML = identifier;
    account.style.display = 'block'
  }
  if (user.current.addressFirstName && user.current.addressLastName) {
    accountName.innerHTML = user.current.addressFirstName + ' ' + user.current.addressLastName;
    accountName.style.display = 'block';
  }
}

async function showOrderBagsSection() {
  const maxBags = await firebase.app().functions("europe-west1").httpsCallable('maxNumBags')();
  if (maxBags?.data?.maxOrderBags > 0) {
    document.getElementById('orderBagsSection').style.display = 'block';
  }
}

function showInviteToast(items) {
  let nowDate = new Date();
  let daysSinceLatestSold = 10;
  let soldItemsCount = 0;
  let oneSoldNotSentItemExist = false;
  

  // Last viewed
  let inviteToastViews = user.current?.elementViews ? user.current.elementViews.filter(e => e.elementID === 'inviteToast') : [];
  const daysSinceToastViewsArray = inviteToastViews.length ? Array.from(inviteToastViews, (e) => parseInt(Math.floor((nowDate.getTime() - e.timestamp.toDate().getTime()) / (1000 * 3600 * 24)))) : [] ;
  const daysSinceToastLastViewed = daysSinceToastViewsArray.length ? Math.min(...daysSinceToastViewsArray) : null ;
  let viewedToastBefore = inviteToastViews.length ? true : false;

  if (items) {
    items.forEach((doc) => { // Items is a global variable that equals to querySnapshot from loadCardLists.js
      var itemId = doc.id;
      var i = doc.data();
      let soldDate = i.soldDate;
      const status = i.status;
      const shippingStatus = i.shippingStatus;
      const archived = i.archived;

      if (!archived && status === 'Sold' && soldDate) {
        soldItemsCount++;
        if (soldDate) {
          soldDate = new Date(soldDate);
          let timeDifference = nowDate.getTime() - soldDate.getTime();
          let daysDiff = Math.floor(timeDifference / (1000 * 3600 * 24));
          if (daysDiff <= daysSinceLatestSold) { daysSinceLatestSold = daysDiff; }
        }
        if (shippingStatus !== 'Sent') {
          oneSoldNotSentItemExist = true;
        }
      }
    });
  }
  if (!user.current?.referralData?.referralCode) { return }
  if ((!viewedToastBefore || daysSinceToastLastViewed > 45) && (daysSinceLatestSold <= 7 || (soldItemsCount >= 3 && daysSinceLatestSold <= 45))) {
    referralCodeText.innerHTML = user.current.referralData.referralCode;
    triggerInviteToastOpen.click();

    // Store elementViews to be able to not show it again
    db.collection('users').doc(authUser.current.uid).update({ elementViews: firebase.firestore.FieldValue.arrayUnion({ elementID: "inviteToast", timestamp: new Date() }) });
    // Track with segment
    analytics.track("Element Viewed", { elementID: "inviteToast" });
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
        var imageUrl = itemCoverImage(doc.data());

        // Add card to list if seller is other than myself
        if (sellerId != userID && soldPrice >= 200) {
          var soldByOthersItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${brand}</div></div>`;
          itemListSoldByOthers.innerHTML += soldByOthersItemCardHTML;
        }
      });
    });

  soldByOthersDiv.style.display = "block";
}

async function askForAdditionalUserDetails(userID) {
  let status = "";
  let shippingStatus = "";
  let addressFirstName = "";
  let personalId;
  let personalIdExists = true;
  let oneItemNotPaid = false;
  let oneItemNotSent = false;
  let pickupShippingMethod = false;

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
        const payoutStatus = doc.data().payoutStatus;
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
    const shippingMethod = doc.data()?.preferences?.shippingMethod;
    if (personalId) {
      if (personalId === "") {
        personalIdExists = false;
      }
    } else {
      personalIdExists = false;
    }
    if (shippingMethod == 'Pickup') {
      pickupShippingMethod = true;
    }
  });

  // Redirect user if user has no address and at least one item that's sold but not shipped (only if shippingMethod is pickup)
  if (oneItemNotSent == true && addressFirstName == undefined && pickupShippingMethod) {
    location.href = "/address-form";
  }

  // Redirect user to personalId form if they haven't added it yet
  if (oneItemNotPaid == true && personalIdExists == false) {
    location.href = "/personal-id-form";
  }
}

checkCookie("invite");
localStorage.removeItem('latestItemCreated');
sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
console.log(`user ${user.current}`);
user.whenSet(privateMain);
async function privateMain() {
  console.log('privateMain running')
  if (!user.current) {
    return;
  }
  userId = authUser.current.uid;
  email = authUser.current.email || sessionStorage.getItem("email");
  phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");

  updateIC(userId, email, phone);
  askForAdditionalUserDetails(userId);
  loadSoldByOthers(userId);
  setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId);

  //For testing purposes only - To see what a certain user sees
  if (userId === "3OkW5av20HP8ScpUDS8ip9fBEZr1" && window.location.origin.includes("shh-test")) {
    userId = "Cc4y5YYg03TgezoLFkD7QSoKKe73";
  }
  //Yearly Summary
  yearlyDataExist(userId).then((result) => {
    if (result) {
      console.log('Yearly data exist!');
      document.getElementById('yearlySummaryDiv').style.display = 'block';
      document.getElementById('yearlySummaryDiv').addEventListener("click", function () {
        location.href = `/2023withmai?id=${userId.substring(0, 10)}`;
      });
    } else {
      console.log('No yearly summary exist!');
    }
  });

  const items = await getItems(userId);
  showNpsSurvey(items);
  showInviteToast(items);
  if (user.current?.referralData?.referralCode) {
    referralCodeText.innerHTML = user.current.referralData.referralCode;
    headerInviteButton.style.display = 'flex';
    menuInviteLink.style.display = 'block';
  }

  const inviteCode = checkCookie("invite");
  if (inviteCode) {
    await connectReferralUsers(inviteCode);
  }
  // Set invite code cookie
  const photoInvite = checkCookie("photo_invite");
  if (photoInvite && !localStorage.getItem('photoShootBooked')) {
    photoShootOffer.style.display = 'block';
    bonusSection.style.display = 'block';
  }
  showBonusSection();
  showAccountInfo();
  loadItemCards(items);
  loadInfoRequests(userId);
  showOrderBagsSection();
  showReferralSection();
  fetchAndShowRecommendedItems(items);
  //showHolidayModeDiv(items);

  // Create refCode
  if (user.current && user.current.addressFirstName && user.current.addressLastName && !user.current?.referralData?.referralCode) {
    await createReferralCode();
  }
}

function showHolidayModeDiv(items) {
  if (items) {
    items.forEach((doc) => { // Items is a global variable that equals to querySnapshot from loadCardLists.js
      var itemId = doc.id;
      var i = doc.data();
      let publishedDate = i.publishedDate;
      const status = i.status;
      const archived = i.archived;

      if (!archived && status === 'Published' && publishedDate) {
        if (publishedDate) {
          publishedDate = new Date(publishedDate);
          let nowDate = new Date();
          const daysDiff = Math.floor((nowDate.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24));
          if (daysDiff <= 45) {
            document.getElementById('holidayModeDiv').style.display = 'block';
          }
        }
      }
    });
  }
}

async function yearlyDataExist(userId) {
  //Get data
  const url = 'https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: userId })
  };
  const yearlyDataResponse = await fetch(url, options);
  if (!yearlyDataResponse.ok) { throw new Error('Network response was not ok.'); }
  const yearlyDataJson = await yearlyDataResponse.json();
  const yearlyData = yearlyDataJson.data;
  return yearlyData.sold ? true : false
}

async function showNpsSurvey(items) {
  if (!user) { return; }
  const nowDate = new Date();
  let daysSinceFirstPublished = 0;
  let daysSinceLastPublished = 0;

  // Last viewed
  const x = user.current?.elementViews ? user.current.elementViews.reverse().find(e => e.elementID === 'npsSurvey') : null;
  const surveyLastViewed = x ? x.timestamp.toDate() : null;
  const daysSinceSurveyLastViewed = surveyLastViewed ? Math.floor((nowDate.getTime() - surveyLastViewed.getTime()) / (1000 * 3600 * 24)) : null;

  if (items) {
    items.forEach((doc) => {
      const i = doc.data();
      if (i.publishedDate && !i.archived) {
        const publishedDate = new Date(i.publishedDate);
        const daysDiff = Math.floor((nowDate.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24));
        if (daysDiff > daysSinceFirstPublished) {
          daysSinceFirstPublished = daysDiff;
        }
        if (daysDiff < daysSinceLastPublished || (daysSinceLastPublished === 0 && daysDiff > 0)) {
          daysSinceLastPublished = daysDiff;
        }
      }
    });
  }

  //console.log("IF all true -> Show NPS: ", `daysSinceFirstPublished(${daysSinceFirstPublished}) >= 25 && daysSinceLastPublished(${daysSinceLastPublished}) <= 60 && (!surveyLastViewed(${surveyLastViewed}) || daysSinceSurveyLastViewed(${daysSinceSurveyLastViewed}) > 90)`);
  if (daysSinceFirstPublished >= 25 && daysSinceLastPublished <= 60 && (!surveyLastViewed || daysSinceSurveyLastViewed > 90) && !document.referrer.includes('feedback-nps')) {
    location.href = "/feedback-nps";
  }
}
//Disable webflow form submissions
Webflow.push(function () {
  $('form').submit(function () {
    return false;
  });
});

async function fetchAndShowRecommendedItems(items) {
  try {
    const ids = [];
    items.forEach(doc => ids.push(doc.id));
    const response = await firebase.app().functions("europe-west1").httpsCallable('itemRecommendations')({ items: ids.slice(0, 10) });
    document.getElementById('recommendedItemsDiv').style.display = 'block';
    const itemList = document.getElementById('recommendedItemsList');
    itemList.innerHTML = "";

    for (const item of response.data) {
      const image = item.images.modelImageLarge || item.images.modelImage || item.images.enhancedFrontImageLarge || item.images.enhancedFrontImage;
      const itemCardHTML = `<div class="div-block-14-big"><a href="${item.platformListings.maiShop.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${item.cleanedBrand}</div>
                            <div class="recent-added-items-subheader-category">${item.category}${item.maiSize ? `, ${item.maiSize}` : ''}</div>
                            <div class="recently-added-price">${item.platformListings.maiShop.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;
      itemList.innerHTML += itemCardHTML;
    }
  } catch (e) {
    errorHandler.report(e);
    console.log('error', e)
  }
}


export function closePickupToast() {
  document.getElementById('triggerPickupToastClose').click();
}

function closeFeedbackForm() {
  document.getElementById('triggerFeedbackFormClose').click();
  setTimeout(function () {
    location.reload();
  }, 400);
}

async function bookPickup() {
  let pickupDate = "";
  var pickupRadioButtons = document.getElementsByName("Pickup");
  for (var x = 0; x < pickupRadioButtons.length; x++) {
    if (pickupRadioButtons[x].checked) {
      pickupDate = pickupRadioButtons[x].value; // yyyy--mm-dd
    }
  }

  db.collection('items').doc(pickupFlowItemId).update({
    pickupDate,
    shippingMethod: 'Pickup'
  }).then((docRef) => {
    console.log(`pickupDate '${pickupDate}' and shippingMethod 'Pickup' is now updated on Firestore item`);
    closePickupToast();
    document.getElementById('triggerFeedbackFormOpen').click();
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
let loadHandlerHasRun = false;

function onLoadHandler() {
  console.log('onLoadHandler running');
  menuSignoutButton.addEventListener('click', signOut);
  bookPickupForm.addEventListener("submit", bookPickup);
  closePickupToastIcon.addEventListener("click", closePickupToast);
  closeFeedbackFormButton.addEventListener("click", closeFeedbackForm);
  happySmileyButton.addEventListener("click", function () { setHappinessRate(3); }, false);
  neutralSmileyButton.addEventListener("click", function () { setHappinessRate(2); }, false);
  angrySmileyButton.addEventListener("click", function () { setHappinessRate(1); }, false);
  feedbackSubmitButton.addEventListener("click", storeFeedback);
  saveReferralCodeButton.addEventListener("click", async function () {
    saveRefCodeLoadingDiv.style.display = 'flex';
    saveReferralCodeButton.style.display = 'none';
    const inputCode = referralCodeInput.value;
    await connectReferralUsers(inputCode);
  });

  closeMeasurementsToastButton.addEventListener("click", function () { triggerMeasurementsToastClose.click(); });
  closeNewPriceToastButton.addEventListener("click", function () { triggerNewPriceToastClose.click(); });
  closeInviteToastButton.addEventListener("click", function () { triggerInviteToastClose.click(); });
  closeServicePointToastButton.addEventListener("click", function () { triggerServicePointToastClose.click(); });
  confirmServicePointButton.addEventListener("click", function () {
    document.getElementById('feedbackFormTitle').innerHTML = '';
    triggerServicePointToastClose.click();
    triggerFeedbackFormOpen.click();
  });
  closeLongerPeriodToastButton.addEventListener("click", function () { triggerLongerPeriodToastClose.click(); });
  shareCodeButton.addEventListener('click', shareCode);
  sharePersonalLinkButton.addEventListener('click', shareCode);
  loadHandlerHasRun = true;
  menuButton.addEventListener("click", function () {
    Intercom('update', {
      "hide_default_launcher": true
    });
  });
  closeMenuButton.addEventListener("click", function () {
    Intercom('update', {
      "hide_default_launcher": false
    });
  });
  document.getElementById('christmasHolidayDiv').onclick = () => Intercom('showNewMessage', 'När reser du iväg, och när är du tillbaka?\n\n');
}
window.addEventListener('load', onLoadHandler);
console.log(`document.readyState ${document.readyState}`);
if (document.readyState === "complete" && !loadHandlerHasRun) {
  console.log("Running it since event listener did not")
  onLoadHandler();
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the bfcache.');
    if (menu.style.display !== 'none') { menu.style.display = 'none' }
  } else {
    console.log('This page was loaded normally.');
  }
});

window.intercomSettings = {
  app_id: "klyy0le5"
};
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
