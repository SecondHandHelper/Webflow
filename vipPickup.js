import { itemCoverImage } from "./general";
import QRCode from "qrcode";

function startAutoScroll(itemListElement) {
  if (!itemListElement) return;
  
  let autoScrollActive = true;
  let animationFrameId = null;
  let isProgrammaticScroll = false;
  let lastScrollLeft = itemListElement.scrollLeft;
  const scrollSpeed = 0.5; // pixels per frame (adjust for speed)
  
  // Check if there's content to scroll
  const maxScroll = itemListElement.scrollWidth - itemListElement.clientWidth;
  if (maxScroll <= 0) return; // No scrolling needed
  
  const autoScroll = () => {
    if (!autoScrollActive) return;
    
    const currentScroll = itemListElement.scrollLeft;
    const maxScroll = itemListElement.scrollWidth - itemListElement.clientWidth;
    
    // Stop if we've reached the end
    if (currentScroll >= maxScroll - 1) {
      return;
    }
    
    // Scroll to the right programmatically
    isProgrammaticScroll = true;
    itemListElement.scrollLeft += scrollSpeed;
    lastScrollLeft = itemListElement.scrollLeft;
    isProgrammaticScroll = false;
    animationFrameId = requestAnimationFrame(autoScroll);
  };
  
  // Pause auto-scroll on user interaction
  const pauseAutoScroll = () => {
    autoScrollActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
  
  // Detect user scroll (when scroll position changes without our programmatic scroll)
  const handleScroll = () => {
    if (isProgrammaticScroll) {
      lastScrollLeft = itemListElement.scrollLeft;
      return;
    }
    
    const currentScrollLeft = itemListElement.scrollLeft;
    // If scroll changed and it wasn't our programmatic scroll, user is interacting
    if (Math.abs(currentScrollLeft - lastScrollLeft) > scrollSpeed * 1.5) {
      pauseAutoScroll();
      itemListElement.removeEventListener('scroll', handleScroll);
    } else {
      lastScrollLeft = currentScrollLeft;
    }
  };
  
  // Listen for direct user interactions (these immediately pause)
  itemListElement.addEventListener('touchstart', pauseAutoScroll, { once: true });
  itemListElement.addEventListener('mousedown', pauseAutoScroll, { once: true });
  itemListElement.addEventListener('wheel', pauseAutoScroll, { once: true });
  itemListElement.addEventListener('scroll', handleScroll);
  
  // Start auto-scroll after a short delay to ensure content is rendered
  setTimeout(() => {
    if (autoScrollActive) {
      lastScrollLeft = itemListElement.scrollLeft;
      animationFrameId = requestAnimationFrame(autoScroll);
    }
  }, 500);
}

function loadRecentlySold() {
  const recentlySoldItems = callBackendApi("/api/items/recentlySold");

  recentlySoldItems
    .then((result) => {
      // Read result of the Cloud Function.
      const itemListRecentlySold1 = document.getElementById(
        "itemListRecentlySold1"
      );
      itemListRecentlySold1.innerHTML = "";

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
                        <div>
                        <div>${brand}</div>
                        <div>Såld för ${soldPrice} kr</div>
                        </div>
                        </div>`;
          itemListRecentlySold1.innerHTML += itemCardHTML;
        }
      });
      
      // Start auto-scroll after items are loaded
      startAutoScroll(itemListRecentlySold1);
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

function showDownloadAppLink() {
  const elm = document.getElementById("downloadAppLink");
  elm.style.display = "flex";
}

// Load recently sold items
loadRecentlySold();

// Show download app link for iOS devices
if (isIos) {
  showDownloadAppLink();
}

// Show intercom messenger
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

// Track VIP pickup button clicks with Intercom
function setupVipPickupHandler() {
  const buttonIds = [
    "bookVipPickupCtaButton",
    "stickyBookVipPickupButton",
    "centerBookVipPickupButton"
  ];

  buttonIds.forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        if (typeof Intercom === "function") {
          Intercom('startSurvey', 57206742)
        }
      });
    }
  });
}

// Setup tracking after Intercom is loaded
if (typeof Intercom === "function") {
  setupVipPickupHandler();
} else {
  // Wait for Intercom to load
  const checkIntercom = setInterval(() => {
    if (typeof Intercom === "function") {
      clearInterval(checkIntercom);
      setupVipPickupHandler();
    }
  }, 100);
  // Timeout after 5 seconds if Intercom doesn't load
  setTimeout(() => clearInterval(checkIntercom), 5000);
}

// Generate QR code for desktop users
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (!isMobile) {
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
}
