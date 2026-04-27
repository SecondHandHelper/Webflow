import { channelRouter } from "./general";

auth.onAuthStateChanged(function (user) {
  const urlParams = new URLSearchParams(window.location.search);
  const appParam = urlParams.has('app');

  if (appParam){
    const goBackButtons = document.querySelectorAll('.goback');
    goBackButtons.forEach(button => {
      button.style.visibility = 'hidden';
    });
  }

  if (document.referrer.includes("mairesale.com")) {
    // show neither
  } else if (document.referrer.includes(window.location.origin) || user) {
    loggedInHeader.style.display = "flex";
  } else {
    if (!appParam) {
      loggedOutHeader.style.display = "flex";
    }
  }
  placeholderHeader.style.display = "none";
});

if (document.referrer.includes("mairesale.com")) {
  document.getElementById("sellItemButton").style.display = "none";
  document.getElementById("startSellingButton").style.display = "block";
}

document
  .getElementById("sellItemButton")
  .addEventListener("click", () => channelRouter("/sell-item"));
