import { itemCoverImage, shareCode, signOut, animateCloseToast } from "./general";
import { loadInfoRequests } from "./infoRequestsFunctions";
import { loadItemCards } from "./loadItemCards";
import QRCode from "qrcode";

var userId;
var email;
var phone;

// async function initAppDownloadBanner() {
//   const customToken = await callBackendApi('/api/users/token', { method: 'POST', requiresAuth: true });
//   document.getElementById('openAppAndSignIn').href = 'maiapp://?aat=' + encodeURIComponent(customToken.data.customToken);
// }

// initAppDownloadBanner();
// setInterval(initAppDownloadBanner, 10 * 60 * 1000);

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

export function prepareMenu(u) {
  let identifier;
  let signInMethodText;
  console.log("Prepare menu", u.signInMethod)
  if (u.signInMethod === 'phone' && u.phoneNumber) {
    identifier = u.phoneNumber;
    signInMethodText = 'Inloggad med SMS-kod';
  } else if (u.signInMethod === 'password' && u.email) {
    identifier = u.email;
    signInMethodText = 'Inloggad med email';
  } else if (u.signInMethod === 'google.com' && u.email) {
    identifier = u.email;
    signInMethodText = 'Inloggad med Google';
  }
  if (identifier) {
    account.innerHTML = identifier;
    account.style.display = 'block';
    accountSignInMethod.innerHTML = signInMethodText;
    accountSignInMethod.style.display = 'block';
  }
  if (u.addressFirstName && u.addressLastName) {
    accountName.innerHTML = u.addressFirstName + ' ' + u.addressLastName;
    accountName.style.display = 'block';
  }
  if (u?.referralData?.referralCode) {
    referralCodeText.innerHTML = u.referralData.referralCode;
    headerInviteButton.style.display = 'flex';
    menuInviteLink.style.display = 'block';
  }
}

// Make prepareMenu available globally for session cookie auto-login
window.prepareMenu = prepareMenu;

const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
if (sessionUser) {
  const referralCode = sessionUser?.referralData?.referralCode;
  prepareMenu(sessionUser);
}

async function showOrderBagsSection() {
  try {
    const maxBags = await callBackendApi('/api/bags/orders/allowed', { requiresAuth: true });
    if (maxBags?.data?.maxOrderBags > 0) {
      document.getElementById('orderBagsSection').style.display = 'block';
    }
  } catch (e) {
    console.log(e);
  }
}

function showInviteToast(items) {
  let nowDate = new Date();
  let daysSinceLatestSold = 10;
  let soldItemsCount = 0;
  let atLeastOneShippedItem = false;


  // Last viewed
  let inviteToastViews = user.current?.elementViews ? user.current.elementViews.filter(e => e.elementID === 'inviteToast') : [];
  const daysSinceToastViewsArray = inviteToastViews.length ? Array.from(inviteToastViews, (e) =>
    parseInt(Math.floor((nowDate.getTime() - (e.timestamp.seconds * 1000)) / (1000 * 3600 * 24)))) : [];
  const daysSinceToastLastViewed = daysSinceToastViewsArray.length ? Math.min(...daysSinceToastViewsArray) : null;
  let viewedToastBefore = !!inviteToastViews.length;

  if (items) {
    items.forEach(item => {
      let soldDate = item.soldDate;
      const status = item.status;
      const shippingStatus = item.shippingStatus;
      const archived = item.archived;

      if (!archived && status === 'Sold' && soldDate) {
        soldItemsCount++;
        if (soldDate) {
          soldDate = new Date(soldDate);
          let timeDifference = nowDate.getTime() - soldDate.getTime();
          let daysDiff = Math.floor(timeDifference / (1000 * 3600 * 24));
          if (daysDiff <= daysSinceLatestSold) { daysSinceLatestSold = daysDiff; }
        }
        if (shippingStatus === 'Sent') {
          atLeastOneShippedItem = true;
        }
      }
    });
  }
  if (!user.current?.referralData?.referralCode) { return }
  if (atLeastOneShippedItem && (!viewedToastBefore || daysSinceToastLastViewed > 45) && (daysSinceLatestSold <= 14 || (soldItemsCount >= 3 && daysSinceLatestSold <= 45))) {
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
  let oneItemNotPaidAndApproved = false;
  let oneItemNotSent = false;
  let pickupShippingMethod = false;
  let swishNotAvailableUserIds = ['l3FdLmp4CHU0tdmGXvVkjx1inr32'];

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
        const saleApprovalStatus = doc.data().saleApprovalStatus;
        if (shippingStatus === "Not sent") {
          oneItemNotSent = true;
        }
        if (payoutStatus !== "Payed") {
          oneItemNotPaid = true;
          if (saleApprovalStatus === 'Approved') {
            oneItemNotPaidAndApproved = true;
          }
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
  const userIsTrustedSeller = user.current?.trustedSellerStatus === 'Trusted';
  const userIsNotTrustedSeller = user.current?.trustedSellerStatus === 'Not Trusted';
  if (oneItemNotPaid && !personalIdExists && !swishNotAvailableUserIds.includes(userID) &&
    (userIsTrustedSeller || oneItemNotPaidAndApproved)) {
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
  if(user.current?.trustedSellerStatus === 'Trusted'){
    document.getElementById('trustedIconHeader').style.display = 'block';
  } else {
    document.getElementById('fullLogo').style.display = 'block';
    document.getElementById('onlyLogo').style.display = 'none';
  }
  if (user.current?.maiCircle) {
    document.getElementById('headerMaiCircleButton').style.display = 'flex';
    document.getElementById('cta-header-text').style.display = 'none';
    document.getElementById('cta-header').style.borderRadius = '9999px';
  }
  loadSoldByOthers(userId);
  setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId);

  //Yearly Summary
  /*
  yearlyDataExist(userId).then((result) => {
    if (result) {
      console.log('Yearly data exist!');
      document.getElementById('yearlySummaryDiv').style.display = 'block';
      document.getElementById('yearlySummaryDiv').addEventListener("click", function () {
        location.href = `/yearly-summary?id=${userId.substring(0, 10)}&year=2024`;
      });
    } else {
      console.log('No yearly summary exist!');
    }
  });
  */

  const items = (await callBackendApi('/api/items', { requiresAuth: true }))?.data;
  showInviteToast(items);

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
  setupBottomMenuPopupListeners();
  await Promise.all([
    showInYourWardrobeSection(),
    showOrderBagsSection(),
    showInactiveItemsSection(),
  ]);
  loadItemCards(items, user.current);
  showTrustedSellerWidget(items);
  console.log('user.current', user.current);

  if (window.location.href.endsWith('#wardrobe')) {
    setTimeout(() => {
      document.getElementById('wardrobeItemsDiv').scrollIntoView({ behavior: "smooth", block: "center" });
    }, 600);
  }

  showNpsSurvey(items);
  fetchAndShowRecommendedItems(items);
  showReferralSection();
  showBonusSection();
  showCommissionFreeBonus(items);
  prepareMenu(user.current);
  loadInfoRequests(items);
  showFreeSellBox(items);
  if (user.current?.trustedSellerStatus !== 'Pending' &&
    user.current?.trustedSellerStatusChange && !user.current.trustedSellerStatusChange.seen) {
    showTrustedSellerBottomSheet();
  }
  //showAppPromoSection();
  showDownloadAppInMenu();
  //showHolidayModeDiv(items);

  // Create refCode
  if (user.current && user.current.addressFirstName && user.current.addressLastName && !user.current?.referralData?.referralCode) {
    await createReferralCode();
  }
}

function showCommissionFreeBonus(items) {
  const cookieName = 'noCommissionCampaignCookie';
  const cookie = getCookie(cookieName);
  const dateNow = new Intl.DateTimeFormat('se-SV').format(new Date());
  const campaignDateOk = dateNow >= '2024-08-12' && dateNow <= '2024-08-18';
  const itemsCount = items.filter(i => i?.status !== 'Draft').length;
  if (cookie === 'noCommission' && campaignDateOk && itemsCount < 1 && (bonusActivatedState.style.display === 'none' || bonusActivatedState.style.display === '')) {
    if (document.getElementById("bonusSection")) {
      document.getElementById("bonusName").innerHTML = 'KAMPANJ - T.o.m sön 18/8';
      document.getElementById("bonusTitle").innerHTML = 'Sälj första gratis';
      document.getElementById("bonusText").innerHTML = 'Lägg upp ett plagg senast söndag 18 augusti så får du behålla 100% av vinsten för ditt första sålda plagg (istället för 80%).';
      document.getElementById("bonusActivatedState").style.display = 'block';
      document.getElementById("enterCodeState").style.display = 'none';
      bonusSection.style.display = 'block';
    }
  }
}

function showHolidayModeDiv(items) {
  if (items) {
    items.forEach((item) => {
      const status = item.status;
      const archived = item.archived;

      if (!archived && status === 'Published' && item.publishedDate) {
        const date = new Date(item.publishedDate);
        const nowDate = new Date();
        const daysDiff = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 3600 * 24));
        if (daysDiff <= 45) {
          document.getElementById('holidayModeDiv').style.display = 'block';
          document.getElementById('openHolidayChat').onclick = () => Intercom('showNewMessage', 'När reser du iväg, och när är du tillbaka?\n\n');
        }
      }
    });
  }
}

function inSeason(category) {
  if (!category) {
    return true;
  }
  const alwaysInSeason = [
    "Tröja", "Blus", "Topp", "Skjorta", "Linneskjorta", "T-shirt", "Kavaj", "Sweatshirt", "Hoodie", "Polotröja",
    "Tunika", "Väst", "Kofta", "Linne", "Träningströja", "Poncho", "Piké", "Långärmad T-shirt", "Kostymväst",
    "Kjol", "Byxor", "Jeans", "Chinos", "Fritidsbyxor", "Träningsbyxor", "Tights", "Strumpbyxor", "Mjukisbyxor",
    "Kostymbyxor", "Sarong", "Klänning", "Kaftan", "Kostym", "Set", "Jumpsuit", "Baddräkt", "Bikini",
    "Pyjamas", "Morgonrock", "Bröllopsklänning", "Balklänning", "Bodysuit", "Jacka", "Kappa", "Rock",
    "Fritidsjacka", "Trenchcoat", "Skinnjacka", "Regnjacka", "Sneakers", "Klackar",
    "Ballerinaskor", "Loafers", "Boots", "Kängor", "Skor", "Axelremsväska", "Handväska",
    "Kuvertväska", "Ryggsäck", "Träningsväska", "Resväska", "Datorväska", "Väska", "Solglasögon", "Glasögon", "Örhänge",
    "Halsband", "Armband", "Ring", "Brosch", "Keps", "Sjal", "Krage", "Bälte", "Plånbok", "Hatt",
    "Necessär", "Slips", "Handduk", "Klocka"];
  const winterCategories = ["Underställ", "Dunjacka", "Pälsjacka", "Vinterskor", "Halsduk", "Mössa", "Vantar"];
  const summerCategories = ["Shorts", "Sandaler", "Flip-flops"]
  if (alwaysInSeason.includes(category)) {
    return true;
  }
  const today = new Date();
  const winterStart = new Date(today.getFullYear(), 7, 15)
  const winterEnd = new Date(today.getFullYear(), 3, 15)
  if (winterCategories.includes(category) && (today <= winterEnd || today >= winterStart)) {
    return true;
  }
  return summerCategories.includes(category) && today >= winterEnd && today <= winterStart;
}

async function showInactiveItemsSection() {
  const unsoldItems = await callBackendApi('/api/items/unsold', { requiresAuth: true });
  if (!unsoldItems.data?.length) {
    return;
  }
  unsoldItems.data.sort((a, b) => {
    const aInSeason = inSeason(a.category);
    const bInSeason = inSeason(b.category);
    if (aInSeason && !bInSeason) {
      return -1;
    }
    if (bInSeason && !aInSeason) {
      return 1;
    }
    if (a.minPriceEstimate >= 100 && b.minPriceEstimate <= 100) {
      return -1
    }
    if (a.minPriceEstimate <= 100 && b.minPriceEstimate >= 100) {
      return 1
    }
    return 0;
  });
  const inactiveItemsDiv = document.querySelector('#inactiveItemsDiv');
  inactiveItemsDiv.style.display = 'block';
  const itemCard = inactiveItemsDiv.querySelector('#inactiveItemCard');
  const itemList = inactiveItemsDiv.querySelector('#inactiveItemList');
  itemList.innerHTML = '';
  const itemMoreMenu = document.querySelector('#itemMoreMenu');
  for (const item of unsoldItems.data) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.id = item.id;
    const frontImage = item.images?.modelImageLarge || item.images?.modelImage ||
      item.images?.enhancedFrontImageLarge || item.images?.enhancedFrontImage || item.images?.frontImageLarge || item.images?.frontImage;
    newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
    newItemCard.querySelector('.inactive-card-brand').innerText = `${item.cleanedBrand || item.brand?.trim()}`;
    newItemCard.querySelector('.inactive-card-category').innerText = `${item.category || ''}`;
    newItemCard.querySelector('.inactive-card-reason').innerText = 'Avslutad';
    if (inSeason(item.category)) {
      newItemCard.querySelector('.in-season-label').style.display = 'block';
      if (item.minPriceEstimate > 100) {
        newItemCard.querySelector('.restart-button').href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;
        newItemCard.querySelector('.restart-button').style.display = 'inline-block';
      }
    }
    newItemCard.querySelector('.inactive-dots-button').style.display = 'block';
    newItemCard.querySelector('.inactive-dots-button').addEventListener('click', async (e) => {
      itemMoreMenu.style.display = 'block';
      setTimeout(() => itemMoreMenu.classList.add('sticky-bottom-show'), 0);
      itemMoreMenu.dataset.itemId = item.id;
      itemMoreMenu.dataset.section = 'inactive';
      e.preventDefault();
      e.stopPropagation();
    });
    itemList.appendChild(newItemCard);
  }
  //Tracking
  itemList.querySelectorAll("a").forEach(link => link.addEventListener('click', linkClickTracker));
}

async function showInYourWardrobeSection() {
  const wardrobeItems = await callBackendApi('/api/items/wardrobe', { requiresAuth: true });
  if (!wardrobeItems.data?.length) {
    return;
  }
  document.getElementById('wardrobeItemsDiv').style.display = 'block'
  const itemCard = document.getElementById('wardrobeItemCard');
  const itemList = document.getElementById('wardrobeItemList');
  itemList.innerHTML = '';
  const itemMoreMenu = document.getElementById('itemMoreMenu');
  for (const item of wardrobeItems.data) {
    const newItemCard = itemCard.cloneNode(true);
    newItemCard.id = item.id;
    const frontImage = item.images?.modelImageLarge || item.images?.modelImage ||
      item.images?.enhancedFrontImageLarge || item.images?.enhancedFrontImage || item.images?.frontImageLarge || item.images?.frontImage;
    if (frontImage) {
      newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
      newItemCard.querySelector('.no-image-text').style.display = 'none';
    } else {
      newItemCard.querySelector('.img-container').style.display = 'none';
    }
    newItemCard.addEventListener('click', () => {
      location.href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;
    });
    newItemCard.querySelector('.resell-button').href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;

    newItemCard.querySelector('.resell-item-title').innerText = `${item.cleanedBrand || item.brand?.trim()}`;
    newItemCard.querySelector('.resell-subtext').innerText = `${[item.category, item.maiSize].filter(i => i).join(', ')}`;
    const draftSource = (item.soldPlatform || item.draftSource === 'Mai purchase') ? `Köpt via Mai` :
      (item.draftSource === 'Digital receipt' ? 'Från digitalt kvitto' : (item.draftSource === 'lwl' ? 'Från LWL' : ''));
    newItemCard.querySelector('.resell-sub-subtext').innerText = draftSource;
    const buttonId = (item.soldPlatform || item.draftSource === 'Mai purchase') ? 'resellPurchaseButton' :
      (item.draftSource === 'Digital receipt' ? 'resellDigitalReceiptButton' : (item.draftSource === 'lwl' ? 'resellLwlButton' : ''));
    newItemCard.querySelector('.resell-button').id = buttonId;
    newItemCard.querySelector('#wardrobeDotsButton').addEventListener('click', async (e) => {
      itemMoreMenu.style.display = 'block';
      setTimeout(() => itemMoreMenu.classList.add('sticky-bottom-show'), 0);
      itemMoreMenu.dataset.itemId = item.id;
      itemMoreMenu.dataset.section = 'wardrobe';
      e.preventDefault();
      e.stopPropagation();
    });
    itemList.appendChild(newItemCard);
  }

  //Tracking
  itemList.querySelectorAll("a").forEach(link => link.addEventListener('click', linkClickTracker));
}

function setupBottomMenuPopupListeners() {
  document.getElementById('stickyBottomClose').addEventListener('click', () => {
    itemMoreMenu.classList.remove('sticky-bottom-show');
    setTimeout(() => itemMoreMenu.style.display = 'none', 500);
  });
  document.getElementById('stickyBottomDelete').addEventListener('click', async () => {
    itemMoreMenu.classList.remove('sticky-bottom-show');
    setTimeout(() => itemMoreMenu.style.display = 'none', 500);
    if (itemMoreMenu.dataset.section === 'inactive') {
      document.getElementById(itemMoreMenu.dataset.itemId).style.display = 'none';
      const itemList = document.getElementById('inactiveItemList');
      const visibleChildren = Array.from(itemList.children).find(it => it.style.display !== 'none')
      if (!visibleChildren) {
        document.getElementById('inactiveItemsDiv').style.display = 'none';
      }
      await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`, {
        method: 'DELETE',
        data: { itemId: itemMoreMenu.dataset.itemId }
      });
    } if (itemMoreMenu.dataset.section === 'sold-not-sent') {
      await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`, {
        method: 'DELETE',
        data: { itemId: itemMoreMenu.dataset.itemId }
      });
      // hide the element from the list
      const removeButton = document.getElementById(`removeItemButton-${itemMoreMenu.dataset.itemId}`);
      let parent = removeButton.parentElement;
      while (parent && !parent.classList.contains('div-block-45')) {
        parent = parent.parentElement;
      }
      if (parent) {
        parent.style.display = 'none';
      }
      // Also hide the full 'Sold - to be sent' list if this was the only item in it
      const soldNotSentItems = document.querySelectorAll('#itemListSoldNotSent .div-block-45')
      const visibleChildren = Array.from(soldNotSentItems).filter(child => child.style.display !== 'none');
      if (visibleChildren.length === 0) {
        document.getElementById('soldNotSentDiv').style.display = 'none';
      }
    } else {
      document.getElementById(itemMoreMenu.dataset.itemId).style.display = 'none';
      const itemList = document.getElementById('wardrobeItemList');
      const visibleChildren = Array.from(itemList.children).find(it => it.style.display !== 'none')
      if (!visibleChildren) {
        document.getElementById('wardrobeItemsDiv').style.display = 'none';
      }
      await callBackendApi(`/api/items/wardrobe/${itemMoreMenu.dataset.itemId}`, {
        method: 'DELETE',
        data: { itemId: itemMoreMenu.dataset.itemId }
      });
    }
  });
}

async function yearlyDataExist(userId) {
  //Get data
  const url = 'https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: userId, year: '2024' })
  };
  const yearlyDataResponse = await fetch(url, options);
  if (!yearlyDataResponse.ok) { throw new Error('Network response was not ok.'); }
  const yearlyDataJson = await yearlyDataResponse.json();
  const yearlyData = yearlyDataJson.data;
  return yearlyData.sold ? true : false
}

async function showFreeSellBox(items) {
  const noItems = items.length === 0;
  const noSoldItems = !items.some(item => item.status === "Sold");
  const doc = await db.collection("users").doc(authUser.current.uid).get();
  const hasActiveCoupon = doc.data()?.oneTimeCommissionFreeCoupon === "Active";
  if (hasActiveCoupon) {
    if (!noItems && noSoldItems) {
      document.getElementById('freeSellBoxTitle').innerHTML = 'Nästa försäljning är fri';
      document.getElementById('freeSellBoxSubText').innerHTML = 'Du har fått en fri försäljning av Mai';
    }
    document.getElementById('freeSellBox').style.display = 'block';
  }
  console.log('user.current?.referralData?.vipInviteDiscountsUsed', user.current?.referralData?.vipInviteDiscountsUsed);
  const vipInviteDiscountsUsed = user.current?.referralData?.vipInviteDiscountsUsed || 0;
  console.log('vipInviteDiscountsUsed', vipInviteDiscountsUsed);
  console.log('user.current?.vipInvite && vipInviteDiscountsUsed < 3', (user.current?.vipInvite && vipInviteDiscountsUsed < 3));
  if (user.current?.vipInvite && vipInviteDiscountsUsed < 3) {
    document.getElementById('freeSellBoxTitle').innerHTML = 'Tre kostnadsfria försäljningar';
    document.getElementById('freeSellBoxSubText').innerHTML = 'Exklusiv inbjudan av vän';
    document.getElementById('freeSellBox').style.display = 'block';
  }
}

async function closeAppPromoSection() {
  document.getElementById('appPromoSection').style.display = 'none';
  if (authUser.current) {
    db.collection('users').doc(authUser.current.uid).update({
      elementViews: firebase.firestore.FieldValue.arrayUnion({
        elementID: "appPromoSection",
        timestamp: new Date()
      })
    });
  }
}

async function showAppPromoSection() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isIOS) return;
  const hasViewedElement = user.current?.elementViews?.some(view =>
    view.elementID === "appPromoSection"
  );
  if (!hasViewedElement) {
    document.getElementById('appPromoSection').style.display = 'block';
  }
}

async function showDownloadAppInMenu() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isIOS) return;
  document.getElementById('menuDownloadApp').style.display = 'block';
}

async function showNpsSurvey(items) {
  if (!user) { return; }
  const nowDate = new Date();
  let daysSinceFirstPublished = 0;
  let daysSinceLastPublished = 0;

  // Last viewed
  const timestamp = user.current?.elementViews ? user.current.elementViews.reverse().find(e => e.elementID === 'npsSurvey') : null;
  const surveyLastViewed = timestamp
      ? typeof timestamp !== 'string'
        ? new Date(timestamp.seconds * 1000)
        : new Date(timestamp)
      : null;
  const daysSinceSurveyLastViewed = surveyLastViewed ? Math.floor((nowDate.getTime() - surveyLastViewed.getTime()) / (1000 * 3600 * 24)) : null;

  if (items) {
    items.forEach(item => {
      if (item.publishedDate && !item.archived) {
        const publishedDate = new Date(item.publishedDate);
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
  if (!items || !items.length) {
    return;
  }
  try {
    const ids = [];
    items.forEach(item => ids.push(item.id));
    const query = ids.slice(0, 10).map(id => `items=${id}`).join('&') + '&number=20';
    const response = await callBackendApi(`/api/items/recommendations?${query}`, { requiresAuth: true });
    if (!response.data.length) {
      return;
    }
    document.getElementById('recommendedItemsDiv').style.display = 'block';
    const itemList = document.getElementById('recommendedItemsList');
    itemList.innerHTML = "";
    let itemSizes = [];
    let idx = 0;
    for (const item of response.data) {
      if (!itemSizes.includes(item.maiSize)) { itemSizes.push(item.maiSize) }
      const image = item.images.modelImageLarge || item.images.modelImage || item.images.enhancedFrontImageLarge || item.images.enhancedFrontImage;
      const itemCardHTML = `<div class="div-block-14-big"><a id="recommendedItemCard${idx++}" href="${item.platformListings.maiShop.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${item.cleanedBrand}</div>
                            <div class="recent-added-items-subheader-category">${item.category}, ${item.maiSize}</div>
                            <div class="recently-added-price">${item.platformListings.maiShop.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;
      itemList.innerHTML += itemCardHTML;
    }
    itemList.querySelectorAll("a").forEach(link => link.addEventListener('click', linkClickTracker));

    document.getElementById('goToMaiShopLinkRecommendations').setAttribute("href",
      `https://mairesale.com/collections/damklader/${response.data[0].sex || 'Woman'}?sort_by=created-descending&filter.p.m.global.size=${itemSizes.join('&filter.p.m.global.size=')}`);
    const observer = new IntersectionObserver((entries, opts) => {
      const rect = itemList.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      if (isVisible) {
        console.log("Recommendations viewed");
        analytics.track("Element Viewed", { elementID: "recommendedItems" });
        observer.disconnect();
      }
    }, { threshold: 1, root: null })
    observer.observe(itemList);
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

function showTrustedSellerBottomSheet() {
  document.getElementById("darkOverlay").classList.add("active");
  const change = user.current?.trustedSellerStatusChange.type;
  if (change === 'pendingToTrusted') {
    document.getElementById('trustedSellerTitle').innerText = 'Du har uppnåt statusen\nPålitlig Säljare!';
    document.getElementById('trustedSellerText').innerText = 'Tack vare en hög andel godkända försäljningar har du nu blivit Pålitlig Säljare! Från och med nu får du utbetalt direkt när du skickar dina plagg och täcks av Mais säljarskydd vid eventuella reklamationer.';
  } else if (change === 'untrustedToTrusted') {
    document.getElementById('trustedSellerTitle').innerText = 'Du har uppnåt statusen\nPålitlig Säljare!';
    document.getElementById('trustedSellerText').innerText = `Tack${user.current?.addressFirstName ? ' ' + user.current.addressFirstName : ''}, för att du gör det enkelt för köpare att handla tryggt i andra hand! Från och med nu får du utbetalt direkt när du skickar dina plagg och täcks av Mais säljarskydd vid eventuella reklamationer.`;
  } else if (change === 'pendingToUntrusted') {
    document.getElementById('trustedSellerButton').innerText = 'Okej';
    document.getElementById('trustedSellerIcon').style.opacity = '0.2';
    document.getElementById('trustedSellerLink').innerText = 'Hur blir jag Pålitlig Säljare?'
    document.getElementById('trustedSellerTitle').innerText = 'Just nu uppfyller du inte kriterierna för Pålitlig Säljare';
    document.getElementById('trustedSellerText').innerHTML = `Eftersom en av dina första försäljningar antingen reklamerades eller inte skickades i tid, så uppfyller du just nu inte kriterierna för statusen Pålitlig Säljare. Du kan fortfarande sälja, men har ännu inte kvalificerat dig för snabbare utbetalningar eller Mais säljarskydd.`;
  } else if (change === 'trustedToUntrusted') {
    document.getElementById('trustedSellerButton').innerText = 'Okej';
    document.getElementById('trustedSellerIcon').style.opacity = '0.2';
    document.getElementById('trustedSellerLink').innerText = 'Hur blir jag Pålitlig Säljare igen?'
    document.getElementById('trustedSellerTitle').innerText = 'Du har inte längre statusen Pålitlig Säljare';
    document.getElementById('trustedSellerText').innerText = `På grund av upprepade reklamationer eller försäljningar som inte skickats i tid, så uppfyller du för närvarande inte kriterierna för säljarstatusen Pålitlig Säljare. Du kan fortfarande sälja, men utbetalning sker först när köparen mottagit varan och eventuella reklamationer skickas tillbaka till dig.`;
  }
  document.getElementById("trustedSellerBottomSheet").classList.add("active");
}

function showTrustedSellerWidget(items) {
  if (!user.current?.trustedSellerStatus || user.current?.trustedSellerStatus === 'Pending') {
    const trustedSellerWidget = document.getElementById('trustedSellerWidget');
    const hasItems = items?.data?.length > 0;

    // If no items, move widget after soldByOthersDiv
    if (!hasItems) {
      console.log('No items, moving widget after soldByOthersDiv');
      const soldByOthersDiv = document.getElementById('soldByOthersDiv');
      soldByOthersDiv.parentNode.insertBefore(trustedSellerWidget, soldByOthersDiv.nextSibling);
    }

    if (user.current?.approvedSalesCount) {
      document.getElementById('widgetNumApprovedSales').innerText = Math.max(0, 3 - Number(user.current?.approvedSalesCount));
    }
    if (user.current?.approvedSalesCount === 2) {
      document.getElementById('approvedSalesText').innerText = 'godkänd försäljning kvar';
    }
    if (user.current?.approvedSalesCount >= 1) {
      document.getElementById('widgetFirstSaleBar').style.backgroundColor = '#02AC08';
    }
    if (user.current?.approvedSalesCount >= 2) {
      document.getElementById('widgetSecondSaleBar').style.backgroundColor = '#02AC08';
    }
    if (user.current?.approvedSalesCount >= 3) {
      document.getElementById('widgetThirdSaleBar').style.backgroundColor = '#02AC08';
    }
    trustedSellerWidget.style.display = 'block';
  }
}

async function hideApprovedSaleInfoBox() {
  document.getElementById('approvedSaleInfoBox').style.display = 'none';
  document.getElementById('darkOverlay').classList.remove('active');
}

async function hideTrustedSellerBottomSheet() {
  document.getElementById("darkOverlay").classList.remove("active");
  document.getElementById("trustedSellerBottomSheet").classList.remove("active");
  try {
    await callBackendApi('/api/users', {
      data: {
         data: {
           trustedSellerStatusChange: {
             type: user.current?.trustedSellerStatusChange?.type,
             timestamp: new Date(),
             seen: true
           }
         }
      },
      method: 'PUT'
    })
  } catch (e) {
    errorHandler.report(e);
    console.log('Error updating user', e)
  }
}

let loadHandlerHasRun = false;

function onLoadHandler() {
  console.log('onLoadHandler running');
  menuSignoutButton.addEventListener('click', async function () {
    await signOut();
  });
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

  closeBidToastButton.addEventListener("click", function () { animateCloseToast('bidToast'); });
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
  document.getElementById("closeAppPromo").addEventListener("click", function (event) {
    console.log("Close button clicked!");
    closeAppPromoSection();
  });


  document
    .getElementById("darkOverlay")
    .addEventListener("click", function() {
      hideTrustedSellerBottomSheet();
      hideApprovedSaleInfoBox();
      animateCloseToast('bidToast');
    });
  document
    .getElementById("closeTrustedSellerBottomSheet")
    .addEventListener("click", hideTrustedSellerBottomSheet);
  document
    .getElementById("trustedSellerButton")
    .addEventListener("click", hideTrustedSellerBottomSheet);
  document.getElementById('approvedSalesLines').addEventListener('click', function () {
    document.getElementById('approvedSaleInfoBox').style.display = 'block';
    document.getElementById('darkOverlay').classList.add('active');
  });
  document.getElementById('closeApprovedSaleInfoBox').addEventListener('click', hideApprovedSaleInfoBox);
}
if (localStorage.getItem('lwlItemDrafts')) {
  location.href = '/lwl?createDrafts=true';
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

// Generate QR code and show blurryOverlay/onlyMobileBox for desktop users on sell.mairesale.com
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (!isMobile && window.location.hostname === 'sell.mairesale.com') {
  // Generate QR code
  const qrCanvas = document.getElementById('qrCanvas');
  if (qrCanvas) {
    QRCode.toCanvas(qrCanvas, window.location.href, function (error) {
      if (error) {
        console.error('QR code generation error:', error);
        errorHandler.report(error);
      } else {
        console.log('QR code generated successfully');
      }
    });
  }
  
  // Show blurryOverlay and onlyMobileBox on sell.mairesale.com (desktop only)
  const blurryOverlay = document.getElementById('blurryOverlay');
  if (blurryOverlay) {
    blurryOverlay.style.display = 'block';
  }
  const onlyMobileBox = document.getElementById('onlyMobileBox');
  if (onlyMobileBox) {
    onlyMobileBox.style.display = 'block';
  }
}
