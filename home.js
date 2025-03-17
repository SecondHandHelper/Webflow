import { itemCoverImage } from "./general";

function loadRecentlySold() {
  const recentlySoldItems = callBackendApi("/api/items/recentlySold");

  recentlySoldItems
    .then((result) => {
      // Read result of the Cloud Function.
      const itemListRecentlySold1 = document.getElementById(
        "itemListRecentlySold1"
      );
      const itemListRecentlySold2 = document.getElementById(
        "itemListRecentlySold2"
      );
      itemListRecentlySold1.innerHTML = "";
      itemListRecentlySold2.innerHTML = "";
      const itemListRecentlySoldStartPageDesktop = document.getElementById(
        "itemListRecentlySoldStartPageDesktop"
      );
      itemListRecentlySoldStartPageDesktop.innerHTML = "";

      result.data.forEach((item, index) => {
        const brand = item.brand;
        const soldPrice = item.soldPrice;
        const soldDate = new Date(item.soldDate);
        const publishedDate = new Date(item.publishedDate);
        const imageUrl = itemCoverImage(item);
        const daysToSold = Math.floor(
          (soldDate.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24)
        );
        if (soldPrice >= 180 || daysToSold <= 20) {
          const itemCardHTML = `<div class="item-card-recently-sold"><div class="ratio-box _16-9"><div class="content-block with-image">
                        <div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div>
                        <div>${brand}\nSåld för ${soldPrice}kr</div>
                        </div>`;
          if (index % 2 === 0) {
            itemListRecentlySold1.innerHTML += itemCardHTML;
          } else {
            itemListRecentlySold2.innerHTML += itemCardHTML;
          }
          itemListRecentlySoldStartPageDesktop.innerHTML += itemCardHTML;
        }
      });
    })
    .catch((error) => {
      errorHandler.report(error);
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      console.log("Error message: ", message, code);
    });
  // [END fb_functions_call_add_message_error]
}

async function fetchAndLoadRecentlyAddedItems() {
  try {
    const response = await callBackendApi("/api/shopify/recentlyAddedItems");
    const itemList = document.getElementById("ItemListRecentlyAddedItems");
    const itemListDesktop = document.getElementById(
      "ItemListRecentlyAddedItemsDesktop"
    );
    itemList.innerHTML = "";
    itemListDesktop.innerHTML = "";

    for (const item of response.data) {
      const itemCardHTML = `<div class="div-block-14-big"><a href="${item.url}"/><div class="ratio-box _16-9"><div class="content-block with-image">
                        <div class="img-container" style="background-image: url('${item.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${item.brand}</div>
                            <div class="recent-added-items-subheader-category">${item.category}</div>
                            <div class="recently-added-price">${item.currentPrice} kr</div>
                        </div><a/></div>`;
      itemList.innerHTML += itemCardHTML;
      const desktopCardHTML = itemCardHTML.replace("14-big", "14-big-desktop");
      itemListDesktop.innerHTML += desktopCardHTML;
    }
  } catch (e) {
    errorHandler.report(e);
    console.log("error", e);
  }
}

function autoScrollList(element, speed) {
  if (!element) {
    console.error("Error: The list element is missing.");
    return;
  }

  let isUserInteracting = false;

  function scroll() {
      if (!isUserInteracting) {
        element.scrollLeft += speed; // Move the list
      }

      requestAnimationFrame(scroll);
  }

  // Pause when user interacts (hover or touch)
  element.addEventListener("mouseenter", () => (isUserInteracting = true));
  element.addEventListener("touchstart", () => (isUserInteracting = true));

  if (speed < 0) {
    console.log("scroll to end");
    setTimeout(() => {
      element.scrollLeft = element.scrollWidth; // Move to end
      setTimeout(() => {
        console.log("starting auto-scroll...");
        scroll(); // Start auto-scroll
      }, 500); // Give some time for layout to update
    }, 200);
  } else {
    scroll();
  }
}

window.onload = function () {
  autoScrollList(document.getElementById("itemListRecentlySold1"), 0.7); // Move left
  autoScrollList(document.getElementById("itemListRecentlySold2"), -0.4); // Move right
}

const trackHowItWorksInteractions = () => {
  const howItWorksDiv = document.getElementById("howItWorksDiv");
  new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      analytics.track("Element Viewed", { elementID: "howItWorksSlide1" });
      observer.disconnect();
    },
    { rootMargin: "0px 0px -600px 0px" }
  ).observe(howItWorksDiv);
  new MutationObserver((mutationList) => {
    const mutatedElement = mutationList.find(
      (rec) => rec.type === "attributes" && rec.attributeName === "aria-hidden"
    );
    if (
      mutatedElement &&
      mutatedElement.oldValue &&
      !mutatedElement.target["aria-hidden"]
    ) {
      analytics.track("Element Viewed", {
        elementID: `howItWorksSlide${mutatedElement.target.ariaLabel.slice(
          0,
          1
        )}`,
      });
    }
  }).observe(howItWorksDiv, {
    attributeFilter: ["aria-hidden"],
    attributeOldValue: true,
    subtree: true,
  });
};

function showNoCommissionCampaign() {
  const noCommissionCampaignDiv = document.getElementById(
    "noCommissionCampaign"
  );
  analytics.track("Element Viewed", { elementID: "noCommissionCampaign" });
  noCommissionCampaignDiv.style.display = "block";
  document.getElementById("noCommissionAd").style.display = "block";
  let sellItemCtaButton = document.getElementById("sellItemCtaButton");
  if (sellItemCtaButton.getBoundingClientRect().y < -47) {
    noCommissionCampaignDiv.style.top = "0px";
  }
  new IntersectionObserver(
    (entries, observer) => {
      noCommissionCampaignDiv.style.top =
        document.getElementById("sellItemCtaButton").getBoundingClientRect().y >
        -47
          ? "-80px"
          : "0px";
    },
    { rootMargin: "0px 0px -100%", root: null }
  ).observe(document.getElementById("ctaSection"));
  new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      analytics.track("Element Viewed", {
        elementID: "noCommissionCampaignAd",
      });
      observer.disconnect();
    },
    { rootMargin: "0px 0px -370px 0px" }
  ).observe(document.getElementById("noCommissionAd"));
}

function noCommissionCampaign() {
  const cookieName = "noCommissionCampaignCookie";
  const cookie = getCookie(cookieName);
  const random = Math.random();
  const dateNow = new Intl.DateTimeFormat("se-SV").format(new Date());
  const campaignDateOk = dateNow >= "2024-08-12" && dateNow <= "2024-08-18";
  if (campaignDateOk) {
    showNoCommissionCampaign();
    setCookie(cookieName, "noCommission", 7);
  }
  /*
  //A/B test code
  if (campaignDateOk && (cookie === 'noCommission' || (!cookie.length && random > 0.5))) {
    showNoCommissionCampaign();
    setCookie(cookieName, 'noCommission', 7);
  } else if (campaignDateOk && !cookie.length && random <= 0.5) {
    setCookie(cookieName, 'commission', 7);
  }
  */
}

// Channel bottom sheet
function showChannelBottomSheet(webpath) {
  document.getElementById("continueOnWebBottomSheet").href =
    window.location.origin + webpath;
  document.getElementById("darkOverlay").classList.add("active");
  document.getElementById("channelBottomSheet").classList.add("active");
}

function channelRouter(webpath) {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    showChannelBottomSheet(webpath);
  } else {
    window.location.href = webpath;
  }
}

document
  .getElementById("sellItemCtaButton")
  .addEventListener("click", () => channelRouter("/sell-item"));
document
  .getElementById("stickySellItemButton")
  .addEventListener("click", () => channelRouter("/sell-item"));
document
  .getElementById("headerLoginButton")
  .addEventListener("click", () => channelRouter("/sign-in"));

function hideChannelBottomSheet() {
  document.getElementById("darkOverlay").classList.remove("active");
  document.getElementById("channelBottomSheet").classList.remove("active");
}

document
  .getElementById("darkOverlay")
  .addEventListener("click", hideChannelBottomSheet);
document
  .getElementById("closeChannelBottomSheet")
  .addEventListener("click", hideChannelBottomSheet);
// End of channel bottom sheet

authUser.whenSet(signedInNextStep);
loadRecentlySold();
fetchAndLoadRecentlyAddedItems();
trackHowItWorksInteractions();
noCommissionCampaign();

// Set attribution cookies (could be put on any campaign page)
checkCookie("utm_campaign");
checkCookie("utm_source");
checkCookie("utm_medium");
checkCookie("utm_term");
checkCookie("utm_content");

// Set invite code cookie
const inviteCode = checkCookie("invite");
if (inviteCode) {
  referralCodeText.innerHTML = inviteCode;
  activeCode.style.display = "flex";
}

window.intercomSettings = {
  app_id: "klyy0le5",
};
(function () {
  var w = window;
  var ic = w.Intercom;
  if (typeof ic === "function") {
    ic("reattach_activator");
    ic("update", w.intercomSettings);
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
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.intercom.io/widget/klyy0le5";
      var x = d.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    };
    if (w.attachEvent) {
      w.attachEvent("onload", l);
    } else {
      w.addEventListener("load", l, false);
    }
  }
})();
