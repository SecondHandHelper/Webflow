import {autocomplete, brands} from "./autocomplete-brands";
import {checkBlockedOrLowShareSoldBrand, initializeCategorySelect, fieldLabelToggle} from "./sellItemHelpers";

function showPlatforms(platformsToBePublishedOn) {
  if (platformsToBePublishedOn?.length < 2) {
    document.getElementById('platformsToPublishOn').style.display = 'none';
    return;
  }
  const platformNode = document.getElementById('traderaPlatformText');
  platformsToBePublishedOn.forEach(platform => {
    if (platform.match(/Tradera/)) {
      return; // Tradera is set statically in Webflow and always displayed
    }
    const newNode = platformNode.cloneNode(true);
    newNode.id = platform;
    newNode.innerText = platform;
    platformNode.parentNode.appendChild(newNode);
  });
  document.getElementById('platformsLoadingDiv').style.display = 'none';
  document.getElementById('platformsToPublishOn').style.display = 'block';
}

async function quickValuationMain() {
  Webflow.push(function () {
    $('form').submit(function () {
      return false;
    });
  });
  autocomplete(document.getElementById("itemBrand"), brands);
  const itemBrand = document.getElementById("itemBrand");
  const itemCategory = document.getElementById('itemCategory');
  itemBrand.oninput = function () {
    checkBlockedOrLowShareSoldBrand(this.value, itemCategory.value);
  };
  initializeCategorySelect();
  itemBrand.addEventListener('input', fieldLabelToggle('itemBrandLabel'));
  document.getElementById('valuateButton').addEventListener("click", async () => {
    const brand = itemBrand.value ? itemBrand.value.trim() : "";
    const category = itemCategory.value;
    if (!brand) {
      itemBrand.setCustomValidity('Märke måste fyllas i');
      document.getElementById('valuateForm').reportValidity();
      return;
    } else {
      itemBrand.setCustomValidity('')
    }
    if (!category) {
      itemCategory.setCustomValidity('Kategori måste fyllas i');
      document.getElementById('valuateForm').reportValidity();
      return;
    } else {
      itemCategory.setCustomValidity('');
    }
    document.getElementById('valuateButton').style.display = 'none';
    document.getElementById('valuationLoadingButton').style.display = 'flex';
    document.getElementById('platformsLoadingDiv').style.display = 'block';
    try {
      const [valuationRes, platformsRes] = await Promise.all([
        firebase.app().functions("europe-west1").httpsCallable('partialMlValuation')({brand, category}),
        firebase.app().functions('europe-west1').httpsCallable('getPlatformsToBePublishedOn')({ brand })
      ]);
      const {minPrice, maxPrice, decline, humanCheckNeeded} = valuationRes.data || {};
      const { platformsToBePublishedOn } = platformsRes.data || {};
      document.getElementById('valuationResultDiv').style.display = 'block';
      document.getElementById('brandCategoryText').innerText = `${brand}-${category}`;
      if (decline) {
        document.getElementById('noValuationText').innerText = `Vi säljer generellt sett inte plagg från ${brand} på grund av för låg efterfråga på andrahandsmarknaden.`;
        document.getElementById('noValuationText').style.display = 'block';
        document.getElementById('valuationText').style.display = 'none';
        document.getElementById('valuationExplanation').style.display = 'none';
        document.getElementById('platformsToPublishOn').style.display = 'none';
      } else if (minPrice && maxPrice && !humanCheckNeeded) {
        showPlatforms(platformsToBePublishedOn)
        document.getElementById('noValuationText').style.display = 'none';
        document.getElementById('valuationText').style.display = 'block';
        document.getElementById('valuationExplanation').style.display = 'block';
        document.getElementById('valuationText').innerText = `${minPrice}-${maxPrice} kr`;
      } else {
        document.getElementById('noValuationText').style.display = 'block';
        document.getElementById('valuationExplanation').style.display = 'none';
        document.getElementById('valuationText').style.display = 'none';
        document.getElementById('platformsToPublishOn').style.display = 'none';
      }
    } catch (e) {
      console.log(e);
    }
    document.getElementById('valuateButton').style.display = 'block';
    document.getElementById('valuationLoadingButton').style.display = 'none';
  })
}

quickValuationMain();
