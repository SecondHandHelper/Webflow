import {itemCoverImage} from "./general";

function loadRecentlySold() {
  const recentlySoldItems = callBackendApi('/api/items/recentlySold');

  recentlySoldItems
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
          const desktopCardHTML = itemCardHTML.replace("14-big", "14-big-desktop");
          itemListRecentlySoldStartPageDesktop.innerHTML += desktopCardHTML;
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
    const response = await callBackendApi('/api/shopify/recentlyAddedItems');
    const itemList = document.getElementById('ItemListRecentlyAddedItems');
    const itemListDesktop = document.getElementById('ItemListRecentlyAddedItemsDesktop');
    itemList.innerHTML = "";
    itemListDesktop.innerHTML = "";

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
      const desktopCardHTML = itemCardHTML.replace("14-big", "14-big-desktop");
      itemListDesktop.innerHTML += desktopCardHTML;
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

loadRecentlySold();
//fetchAndLoadRecentlyAddedItems();
trackHowItWorksInteractions();

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
