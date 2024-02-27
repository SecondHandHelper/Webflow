import {autocomplete, brands} from "./autocomplete-brands";
import {fieldLabelToggle, initializeCategorySelect} from "./sellItemHelpers";

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
  document.getElementById('valuationResultDiv').style.display = 'none';
  document.getElementById('disclaimerDiv').style.display = 'none';
  document.getElementById('loadingValuationDiv').style.display = 'flex';
  document.getElementById('mainDivider').style.display = 'block';
  document.getElementById('howItWorksDiv').style.display = 'none';
  document.getElementById('valuationInfoButton').style.display = 'none';
  try {
    const valuationRes = await firebase.app().functions("europe-west1").httpsCallable('partialMlValuation')({ brand, category });
    const {
      minPrice, maxPrice, decline, newBrand, valuatedBrandItems, fewBrand, valuatedBrandCategoryItems,
      brandCategoryAccuracy, brandAccuracy, highPriceVarBrandCategory, brandShareSold, humanCheckExplanation,
      brandCategoryMeanMinPrice, brandCategoryMeanMaxPrice, brandCategoryMinSoldPrice, brandCategoryMaxSoldPrice,
      lowValueSegment
    } = valuationRes.data || {};
    document.getElementById('valuationResultDiv').style.display = 'block';
    document.getElementById('valuationResultDiv').classList.toggle('appear-animation', true);
    analytics.track("Element Viewed", { elementID: "valuationResultDiv", brand, category });
    document.getElementById('refreshValuationButton').style.display = 'none';
    document.getElementById('loadingValuationDiv').style.display = 'none';
    document.getElementById('howItWorksDiv').style.display = 'block';
    document.getElementById('disclaimerDiv').style.display = 'none';
    document.getElementById('brandCategoryText').innerText = `${brand}-${category.toLowerCase()}`;
    document.getElementById('valuatedItemHeader').style.display = 'flex';
    if (decline) {
      if (humanCheckExplanation?.match(/decline_blocked_brand/)) {
        document.getElementById('itemValuationText').innerText = `Vi säljer generellt inte plagg från ${brand} på grund av för låg efterfrågan.`;
      } else {
        document.getElementById('itemValuationText').innerText = `Vi säljer generellt inte ${category.toLowerCase()} från ${brand} på grund av för låg efterfrågan.`;
      }
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('valuationText').innerText = 'Säljer ej';
      document.getElementById('howItWorksDiv').style.display = 'none';
      document.getElementById('soldStatsDiv').style.display = 'none';
    } else if (newBrand || valuatedBrandItems === 0 || !minPrice || !maxPrice) {
      document.getElementById('valuationText').innerText = 'Okänt';
      const categoryText = valuatedBrandCategoryItems === 0 && valuatedBrandItems > 0 ? 'av denna kategori ' : '';
      document.getElementById('itemValuationText').innerText = `Vi har inte sålt så mycket ${categoryText}från detta varumärke tidigare, så detta plagg skulle vi behöva kika på manuellt för att kunna ge en värdering. Lägg upp ditt plagg till Mai så får du en värdering inom 2 dagar.`;
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('soldStatsDiv').style.display = 'none';
    } else if (minPrice && maxPrice) {
      document.getElementById('valuationInfoButton').style.display = 'flex';
      const soldBrandItems = Math.round(valuatedBrandItems * brandShareSold);
      if (!fewBrand) {
        const startCopy = highPriceVarBrandCategory || (brandCategoryAccuracy < 0.7 && brandAccuracy < 0.8) ?
          `Slutpriser för ${brand}-${category.toLowerCase()} kan variera mycket beroende på bl.a. modell och ålder. ` : '';
        const shareSoldInfo = brandShareSold >= 0.5 ? `${brand} är eftertraktat på andrahandsmarknaden, och mycket av det som läggs upp säljs.` :
          lowValueSegment ? `Efterfrågan på ${brand} är lite lägre än snittet, så det kan ta lite längre tid att sälja.` : '';
        const endCopy = highPriceVarBrandCategory && startCopy === '' ? ' Lägg upp ditt plagg till Mai för en mer exakt värdering, då tar vi också hänsyn till bl.a. material, skick och modell.' : '';
        document.getElementById('itemValuationText').innerText = `${startCopy}${shareSoldInfo}${endCopy}`;
      } else {
        document.getElementById('itemValuationText').innerText = `Vi har inte sålt så mycket av av denna kategori från ${brand} ännu, värderingen baseras på ${soldBrandItems} plagg från ${brand} som vi tidigare värderat. Lägg upp ditt plagg till Mai för en mer exakt värdering. Då tar vi också hänsyn till material, skick, säsong, modell och originalpris.`;
        document.getElementById('valuationText').style.display = 'none';
      }
      document.getElementById('valuationText').style.display = 'block';
      const fromPrice = round10(brandCategoryMeanMinPrice || minPrice);
      const toPrice = round10(brandCategoryMeanMaxPrice || maxPrice);
      document.getElementById('valuationText').innerText = `${fromPrice}-${toPrice} kr`;
      document.getElementById('spanBrandCategoryText').innerText = `${brand}-${category.toLowerCase()}`;
      if (brandCategoryMinSoldPrice <= 0 || brandCategoryMaxSoldPrice <= 100 || brandCategoryMinSoldPrice > brandCategoryMaxSoldPrice) {
        document.getElementById('soldStatsDiv').style.display = 'none';
      } else {
        document.getElementById('valuationSoldSpan').innerText = `${Math.max(100, brandCategoryMinSoldPrice)}-${brandCategoryMaxSoldPrice} kr`
        document.getElementById('soldBrandItems').innerText = `${soldBrandItems} st`;
        document.getElementById('soldBrandText').innerText = brand;
        document.getElementById('soldStatsDiv').style.display = 'block';
      }
    } else {
      document.getElementById('itemValuationText').innerText = 'Något gick fel, försök igen eller kontakta oss om felet kvarstår.';
      document.getElementById('valuationText').style.display = 'none';
    }
  } catch (e) {
    console.log(e);
    document.getElementById('itemValuationText').innerText = 'Något gick fel, försök igen eller kontakta oss om felet kvarstår.';
    document.getElementById('valuationText').style.display = 'none';
  }
}

function round10(val) {
  return Math.round((val || 0) / 10) * 10;
}

function showMenu(sessionUser) {
  let identifier = '';
  if (sessionUser.signInMethod.includes('google') || sessionUser.signInMethod.includes('password')) {
    identifier = sessionUser.email;
  } else if (sessionUser.signInMethod.includes('phone')) {
    identifier = sessionUser.phoneNumber;
  }
  if (identifier) {
    account.innerHTML = identifier;
    account.style.display = 'block'
  }
  if (sessionUser.addressFirstName && sessionUser.addressLastName) {
    accountName.innerHTML = sessionUser.addressFirstName + ' ' + sessionUser.addressLastName;
    accountName.style.display = 'block';
  }
  if(sessionUser?.referralData?.referralCode){
    menuInviteLink.style.display = 'block';
  }
  menuButton.style.display = 'flex';
}

async function quickValuationMain() {
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (sessionUser) {
    showMenu(sessionUser);
    document.getElementById("sellItemButton").value = 'Sälj plagget';
  } else {
    document.getElementById("headerLogo").style.display = 'block';
  }
  Webflow.push(function () {
    $('form').submit(function () {
      return false;
    });
  });
  autocomplete(document.getElementById("itemBrand"), brands);
  const itemBrand = document.getElementById("itemBrand");
  const itemCategory = document.getElementById('itemCategory');
  const brandClearButton = document.getElementById('brandClearButton');
  itemBrand.addEventListener('blur', () => {
    setTimeout(function () {
      if (itemBrand.value?.trim()?.length && itemCategory.value?.trim()?.length) {
        getValuation(itemBrand, itemCategory);
      }
    }, 50);
  });
  itemBrand.oninput = function () {
    if (itemBrand.value?.trim()?.length) {
      toggleRefreshButton();
      brandClearButton.style.display = 'block';
      collapse(document.getElementById('brandQuickSelectDiv'));
    } else {
      brandClearButton.style.display = 'none';
      unfold(document.getElementById('brandQuickSelectDiv'));
    }
  };
  initializeCategorySelect('Skriv kategori här', () => { });
  itemBrand.addEventListener('input', fieldLabelToggle('itemBrandLabel'));
  brandClearButton.addEventListener('click', () => {
    itemBrand.value = '';
    document.getElementById('valuationResultDiv').style.display = 'none';
    document.getElementById('mainDivider').style.display = 'none';
    document.getElementById('howItWorksDiv').style.display = 'none';
    document.getElementById('disclaimerDiv').style.display = 'block';
    document.getElementById('itemBrand').dispatchEvent(new Event('input'));
    brandClearButton.style.display = 'none';
  });

  const categoryClearButton = document.getElementById('categoryClearButton');
  itemCategory.addEventListener('change', () => {
    if (itemCategory.value?.trim()?.length) {
      collapse(document.getElementById('categoryQuickSelectDiv'));
      categoryClearButton.style.display = 'block';
      if (itemBrand.value?.trim()?.length) {
        getValuation(itemBrand, itemCategory);
      }
    } else {
      unfold(document.getElementById('categoryQuickSelectDiv'));
    }
  })
  categoryClearButton.addEventListener('click', () => {
    itemCategory.value = '';
    document.getElementById('valuationResultDiv').style.display = 'none';
    document.getElementById('mainDivider').style.display = 'none';
    document.getElementById('howItWorksDiv').style.display = 'none';
    document.getElementById('disclaimerDiv').style.display = 'block';
    unfold(document.getElementById('categoryQuickSelectDiv'));
    $('#itemCategory').trigger('change');
    categoryClearButton.style.display = 'none';
  });
  for (const element of document.querySelectorAll('#brandQuickSelectDiv .quickselectitem')) {
    element.addEventListener('click', (event) => {
      itemBrand.value = event.target.innerText;
      itemBrand.dispatchEvent(new Event('input'));
      analytics.track("Click", { elementID: "quickSelectItemBrand", value: event.target.innerText });
      if (itemBrand.value?.trim()?.length && itemCategory.value?.trim()?.length) {
        getValuation(itemBrand, itemCategory);
      }
      collapse(document.getElementById('brandQuickSelectDiv'));
    });
  }
  for (const element of document.querySelectorAll('#categoryQuickSelectDiv .quickselectitem')) {
    element.addEventListener('click', (event) => {
      itemCategory.value = event.target.classList.contains('quickselectitem') ? event.target.innerText.trim() : event.currentTarget.innerText.trim();
      console.log(event.target.innerText)
      console.log(event.currentTarget.innerText)
      analytics.track("Click", { elementID: "quickSelectItemCategory", value: event.target.innerText });
      if (itemCategory.value?.length) {
        itemCategory.dispatchEvent(new Event('change'));
        collapse(document.getElementById('categoryQuickSelectDiv'));
      }
    });
  }
  document.getElementById('sellItemButton').addEventListener('click', () => {
    localStorage.removeItem('newItem');
    localStorage.setItem('newItem', JSON.stringify({ brand: itemBrand.value, category: itemCategory.value }));
    window.location.href = '/sell-item';
  })
  document.getElementById('refreshValuationButton').addEventListener('click', () => {
    getValuation(itemBrand, itemCategory);
  })
  document.getElementById('valuationInfoButton').addEventListener('click', (e) => {
    document.getElementById('darkOverlay').style.display = 'block';
    document.getElementById('valuationInfoBox').style.display = 'block';
  });
  document.getElementById('darkOverlay').addEventListener('click', closeInfoBox);
  document.getElementById('closeValuationInfoBox').addEventListener('click', closeInfoBox);
}

function toggleRefreshButton() {
    setTimeout(function () {
      const itemBrand = document.getElementById('itemBrand');
      const itemCategory = document.getElementById('itemCategory');
      const loadingValuationDiv = document.getElementById('itemCategory');
      if (itemBrand.value?.trim()?.length && itemCategory.value?.trim()?.length && loadingValuationDiv.style.display !== 'block') {
        document.getElementById('refreshValuationButton').style.display = 'block';
      } else {
        document.getElementById('refreshValuationButton').style.display = 'none';
      }
    }, 50);
}

function closeInfoBox() {
  document.getElementById('darkOverlay').style.display = 'none';
  document.getElementById('valuationInfoBox').style.display = 'none';
}

// Function to toggle collapse animation
function collapse(element) {
  element.classList.toggle('collapsed', true);
  element.classList.toggle('unfolded', false);
}

// Function to toggle unfold animation
function unfold(element) {
  element.classList.toggle('unfolded', true);
  element.classList.toggle('collapsed', false);
}

quickValuationMain();
