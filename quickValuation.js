import {autocomplete, brands} from "./autocomplete-brands";
import {checkBlockedOrLowShareSoldBrand, initializeCategorySelect, fieldLabelToggle} from "./sellItemHelpers";

function showPlatforms(platformsToBePublishedOn) {
  if (platformsToBePublishedOn?.length < 2) {
    document.getElementById('platformsToPublishOn').style.display = 'none';
    return;
  }
  const platformContainer = document.getElementsByClassName('div-block-445').item(0);
  const platformNode = platformContainer.children.item(0);
  platformContainer.textContent = ''
  platformsToBePublishedOn.forEach(platform => {
    const newNode = platformNode.cloneNode(true);
    newNode.id = platform;
    newNode.innerText = platform;
    platformContainer.appendChild(newNode);
  });
  document.getElementById('platformsToPublishOn').style.display = 'block';
}

async function getValuation(itemBrand, itemCategory) {
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
  document.getElementById('valuationResultDiv').style.display = 'none';
  try {
    const [valuationRes, platformsRes] = await Promise.all([
      firebase.app().functions("europe-west1").httpsCallable('partialMlValuation')({brand, category}),
      firebase.app().functions('europe-west1').httpsCallable('getPlatformsToBePublishedOn')({brand})
    ]);
    const {
      minPrice, maxPrice, decline, humanCheckNeeded, newBrand, newBrandCategory, fewBrand, highPriceVarBrandCategory,
    } = valuationRes.data || {};
    const {platformsToBePublishedOn} = platformsRes.data || {};
    document.getElementById('valuationResultDiv').style.display = 'block';
    document.getElementById('brandCategoryText').innerText = `${brand}-${category}`;
    if (decline) {
      document.getElementById('noValuationText').innerText = `Vi säljer generellt sett inte plagg från ${brand} på grund av för låg efterfråga på andrahandsmarknaden.`;
      document.getElementById('noValuationText').style.display = 'block';
      document.getElementById('valuationText').style.display = 'none';
      document.getElementById('valuationExplanation').style.display = 'none';
      document.getElementById('platformsToPublishOn').style.display = 'none';
    } else if (fewBrand || !minPrice || !maxPrice) {
      document.getElementById('noValuationText').innerText = 'Vi kan inte ge en värdering för att vi inte har sålt från detta varumärke innan';
      document.getElementById('noValuationText').style.display = 'block';
      document.getElementById('valuationText').style.display = 'none';
      document.getElementById('valuationExplanation').style.display = 'none';
      document.getElementById('platformsToPublishOn').style.display = 'none';
    } else if (minPrice && maxPrice) {
      showPlatforms(platformsToBePublishedOn)
      document.getElementById('noValuationText').style.display = 'none';
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('valuationExplanation').style.display = 'block';
      if (humanCheckNeeded) {
        if (highPriceVarBrandCategory) {
          document.getElementById('noValuationText').innerText = 'Värderingen är mindre säker på grund av hög variation inom varumärket.';
          document.getElementById('noValuationText').style.display = 'block';
        } else if (fewBrand) {
          document.getElementById('noValuationText').innerText = 'Värderingen är mindre säker då vi inte har sålt så mycket av varumärket.';
          document.getElementById('noValuationText').style.display = 'block';
        }
      }
      document.getElementById('valuationText').innerText = `${minPrice}-${maxPrice} kr`;
    } else {
      document.getElementById('noValuationText').style.display = 'block';
      document.getElementById('valuationExplanation').style.display = 'none';
      document.getElementById('valuationText').style.display = 'none';
      document.getElementById('platformsToPublishOn').style.display = 'none';
    }
  } catch (e) {
    console.log(e);
    document.getElementById('noValuationText').style.display = 'block';
    document.getElementById('noValuationText').innerText = 'Något gick fel, försök igen eller kontakta oss om felet kvarstår.';
    document.getElementById('valuationExplanation').style.display = 'none';
    document.getElementById('valuationText').style.display = 'none';
    document.getElementById('platformsToPublishOn').style.display = 'none';
  }
  document.getElementById('valuateButton').style.display = 'block';
  document.getElementById('valuationLoadingButton').style.display = 'none';
  document.getElementById('clearButton').style.display = 'flex';
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
  document.getElementById('valuateButton').addEventListener("click", () => getValuation(itemBrand, itemCategory))
  document.getElementById('clearButton').addEventListener('click', () => {
    itemBrand.value = '';
    document.getElementById('itemBrand').dispatchEvent(new Event('input'));
    itemCategory.value = '';
    document.getElementById('valuationResultDiv').style.display = 'none';
    $('#itemCategory').trigger('change');
    document.getElementById('clearButton').style.display = 'none';
  })
}

quickValuationMain();
