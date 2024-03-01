import {itemCoverImage} from "./general";

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var domain = window.location.origin;
// Show desktop DIV if on desktop
if (!isMobile && !domain.includes("shh-test.page")) {
  desktopDiv.style.display = 'block';
  mobileContainer.style.display = 'none';
}

function loadRecentlySold() {
  const recentlySoldItems = firebase.app().functions('europe-west1').httpsCallable('recentlySoldItems');

  recentlySoldItems()
    .then((result) => {
      // Read result of the Cloud Function.
      const itemListRecentlySoldStartPage = document.getElementById('itemListRecentlySoldStartPage');
      itemListRecentlySoldStartPage.innerHTML = "";
      itemListRecentlySoldStartPageDesktop.innerHTML = "";

      for (const item of result.data) {
        const brand = item.brand;
        const soldPrice = item.soldPrice;
        const soldDate = new Date(item.soldDate);
        const publishedDate = new Date(item.publishedDate);
        const soldTimeText = new Date(item.soldDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? "Idag" : "Igår";
        const imageUrl = itemCoverImage(item);
        const daysToSold = Math.floor((soldDate.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24));
        if (soldPrice >= 180 || daysToSold <= 20) {
          const itemCardHTML = `<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div>
                        <div class="text-block-14">${soldPrice} kr</div>
                        <div class='text-block-34'>${brand}</div>`;
          //I cut out the "Idag / Igår" during summer, since so little is sold every day. Add this last to show it again: <div class='text-block-34'>${soldTimeText}</div></div>
          itemListRecentlySoldStartPage.innerHTML += itemCardHTML;
          itemListRecentlySoldStartPageDesktop.innerHTML += itemCardHTML;
        }
      }
    })
    .catch((error) => {
      errorHandler.report(error);
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      console.log('Error message: ', message, code);
    });
  // [END fb_functions_call_add_message_error]
}

async function fetchAndLoadRecentlyAddedItems() {
  try {
    const response = await firebase.app().functions("europe-west1").httpsCallable(
      'fetchMaiShopRecentlyAddedItems',
    )()
    const itemList = document.getElementById('ItemListRecentlyAddedItems')
    itemList.innerHTML = "";

    for (const item of response.data) {
      const itemCardHTML = `<div class="div-block-14-big"><a href="${item.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${item.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${item.brand}</div>
                            <div class="recent-added-items-subheader-category">${item.category}</div>
                            <div class="recently-added-price">${item.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;
      itemList.innerHTML += itemCardHTML;
    }
  } catch (e) {
    errorHandler.report(e);
    console.log('error', e)
  }
}

const trackHowItWorksInteractions = () => {
  const howItWorksDiv = document.getElementById('howItWorksDiv');
  new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    analytics.track("Element Viewed", { elementID: "howItWorksSlide1" });
    observer.disconnect();
  }, {rootMargin: '0px 0px -600px 0px'}).observe(howItWorksDiv);
  new MutationObserver((mutationList) => {
    const mutatedElement = mutationList.find(rec => rec.type === 'attributes' &&  rec.attributeName === 'aria-hidden');
    if (mutatedElement && mutatedElement.oldValue && !mutatedElement.target['aria-hidden']) {
      analytics.track("Element Viewed", { elementID: `howItWorksSlide${mutatedElement.target.ariaLabel.slice(0,1)}` });
    }
  }).observe(howItWorksDiv, { attributeFilter: ['aria-hidden'], attributeOldValue: true, subtree: true });
}

function showNoCommissionCampaign() {
  const noCommissionCampaignDiv = document.getElementById('noCommissionCampaign');
  analytics.track("Element Viewed", { elementID: "noCommissionCampaign" });
  noCommissionCampaignDiv.style.display = 'block';
  document.getElementById('noCommissionAd').style.display = 'block';
  new IntersectionObserver((entries, observer) => {
    if (entries.at(0).isIntersecting) {
      noCommissionCampaignDiv.style.top = noCommissionCampaignDiv.style.top === '0px' ? '-80px' : '0px';
    }
  }, {rootMargin: '0px 0px -100%'}).observe(document.getElementById('sellItemCtaButton'));
}

function noCommissionCampaign() {
  const cookieName = 'noCommissionCampaignCookie';
  const cookie = getCookie(cookieName);
  const random = Math.random();
  if (cookie === 'noCommission' || (!cookie.length && random > 0.5)) {
    showNoCommissionCampaign();
    setCookie(cookieName, 'noCommission', 7);
  } else if (!cookie.length && random <= 0.5) {
    setCookie(cookieName, 'commission', 7);
  }
}

authUser.whenSet(signedInNextStep);
loadRecentlySold();
fetchAndLoadRecentlyAddedItems();
trackHowItWorksInteractions();

noCommissionCampaign()

// Set attribution cookies (could be put on any campaign page)
checkCookie("utm_campaign");
checkCookie("utm_source");
checkCookie("utm_medium");
checkCookie("utm_term");
checkCookie("utm_content");

// Set invite code cookie
const inviteCode = checkCookie("invite");
if (inviteCode){
  referralCodeText.innerHTML = inviteCode;
  activeCode.style.display = 'flex';
}

window.intercomSettings = {
  app_id: "klyy0le5"
};
(function () {
  var w = window;
  var ic = w.Intercom;
  if (typeof ic === "function") {
    ic('reattach_activator');
    ic('update', w.intercomSettings);
  } else {
    var d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    w.Intercom = i;
    var l = function () {
      var s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.intercom.io/widget/klyy0le5';
      var x = d.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    };
    if (w.attachEvent) {
      w.attachEvent('onload', l);
    } else {
      w.addEventListener('load', l, false);
    }
  }
})();
