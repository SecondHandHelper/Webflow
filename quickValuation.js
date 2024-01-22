import {autocomplete, brands} from "./autocomplete-brands";
import {initializeCategorySelect, fieldLabelToggle} from "./sellItemHelpers";

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
  document.getElementById('howMaiSellsDiv').style.display = 'none';
  try {
    const valuationRes = await firebase.app().functions("europe-west1").httpsCallable('partialMlValuation')({brand, category});
    const {
      minPrice, maxPrice, decline, humanCheckNeeded, newBrand, valuatedBrandItems, fewBrand, brandMeanSold,
      brandCategoryAccuracy, brandAccuracy, highPriceVarBrandCategory, brandShareSold, brandCategoryMeanSold,
      brandCategoryMeanMinPrice, brandCategoryMeanMaxPrice, brandCategoryMinSoldPrice, brandCategoryMaxSoldPrice
    } = valuationRes.data || {};
    document.getElementById('valuationResultDiv').style.display = 'block';
    document.getElementById('howMaiSellsDiv').style.display = 'block';
    document.getElementById('maiSellBrandText').innerText = `${brand}-plagg`;
    document.getElementById('brandCategoryText').innerText = `${brand}-${category.toLowerCase()}`;
    document.getElementById('valuatedItemHeader').style.display = 'flex';
    if (decline) {
      document.getElementById('itemValuationText').innerText = `Vi säljer generellt inte plagg från ${brand} på grund av för låg efterfrågan.`;
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('valuationText').innerText = 'Säljer ej';
      document.getElementById('howMaiSellsDiv').style.display = 'none';
    } else if (newBrand || valuatedBrandItems === 0 || !minPrice || !maxPrice) {
      document.getElementById('itemValuationText').innerText = 'Vi har inte sålt så mycket av detta varumärke tidigare, så detta plagg skulle vi behöva kika på manuellt för att kunna ge en värdering. Lägg upp ditt plagg till Mai så får du en värdering inom 2 dagar.';
      document.getElementById('valuationText').style.display = 'none';
      document.getElementById('soldStatsDiv').style.display = 'none';
    } else if (minPrice && maxPrice) {
      const soldBrandItems = Math.round(valuatedBrandItems * brandShareSold);
      if (!fewBrand) {
        const startCopy = highPriceVarBrandCategory || (brandCategoryAccuracy < 0.7 && brandAccuracy < 0.8) ?
          `Slutpriser för ${brand}-${category.toLowerCase()} kan variera mycket beroende på bl.a. modell och ålder. ` : '';
        const shareSoldInfo = brandShareSold >= 0.5 ? `${brand} är eftertraktat på andrahandsmarknaden, och mycket av det som läggs upp säljs.` :
          `Efterfrågan på ${brand} är lite lägre än snittet, så det kan ta lite längre tid att sälja.`;
        const endCopy = highPriceVarBrandCategory && startCopy === '' ? ' Lägg upp ditt plagg till Mai för en mer exakt värdering, då tar vi också hänsyn till bl.a. material, skick och modell.' : '';
        document.getElementById('itemValuationText').innerText = `${startCopy}${shareSoldInfo}${endCopy}`;
      } else {
        document.getElementById('itemValuationText').innerText = `Vi har inte sålt så mycket av ${brand} ännu, värderingen baseras på ${soldBrandItems} plagg från ${brand} som vi tidigare värderat. Lägg upp ditt plagg till Mai för en mer exakt värdering. Då tar vi också hänsyn till material, skick, säsong, modell och originalpris.`;
        document.getElementById('valuationText').style.display = 'none';
      }
      document.getElementById('valuationText').style.display = 'block';
      const fromPrice = round10(brandCategoryMeanMinPrice || minPrice);
      const toPrice = round10(brandCategoryMeanMaxPrice || maxPrice);
      document.getElementById('valuationText').innerText = `${fromPrice}-${toPrice} kr`;
      document.getElementById('valuationSoldSpan').innerText = `${brandCategoryMinSoldPrice < 100 ? 100 : brandCategoryMinSoldPrice}-${brandCategoryMaxSoldPrice} kr`
      document.getElementById('spanBrandCategoryText').innerText = `${brand}-${category.toLowerCase()}`;
      document.getElementById('soldBrandItems').innerText = `${soldBrandItems} st`;
      document.getElementById('soldBrandText').innerText = brand;
      document.getElementById('soldStatsDiv').style.display = 'block';
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


async function quickValuationMain() {
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
    if (itemBrand.value?.trim()?.length && itemCategory.value?.trim()?.length) {
      getValuation(itemBrand, itemCategory);
    }
  });
  itemBrand.oninput = function () {
    if (itemBrand.value?.trim()?.length) {
      brandClearButton.style.display = 'block';
      document.getElementById('brandQuickSelectDiv').style.display = 'none';
    } else {
      brandClearButton.style.display = 'none';
      document.getElementById('brandQuickSelectDiv').style.display = 'flex';
    }
  };
  initializeCategorySelect('Skriv kategori här', () => {});
  itemBrand.addEventListener('input', fieldLabelToggle('itemBrandLabel'));
  brandClearButton.addEventListener('click', () => {
    itemBrand.value = '';
    document.getElementById('itemBrand').dispatchEvent(new Event('input'));
    brandClearButton.style.display = 'none';
  });

  const categoryClearButton = document.getElementById('categoryClearButton');
  itemCategory.addEventListener('change', () => {
    if (itemCategory.value?.trim()?.length) {
      document.getElementById('categoryQuickSelectDiv').style.display = 'none';
      categoryClearButton.style.display = 'block';
      if (itemBrand.value?.trim()?.length) {
        getValuation(itemBrand, itemCategory);
      }
    } else {
      document.getElementById('categoryQuickSelectDiv').style.display = 'flex';
    }
  })
  categoryClearButton.addEventListener('click', () => {
    itemCategory.value = '';
    document.getElementById('valuationResultDiv').style.display = 'none';
    document.getElementById('howMaiSellsDiv').style.display = 'none';
    document.getElementById('categoryQuickSelectDiv').style.display = 'flex';
    $('#itemCategory').trigger('change');
    categoryClearButton.style.display = 'none';
  });
  for (const element of document.querySelectorAll('#brandQuickSelectDiv .quickselectitem')) {
    element.addEventListener('click', (event) => {
      itemBrand.value = event.target.innerText;
      itemBrand.dispatchEvent(new Event('input'));
      document.getElementById('brandQuickSelectDiv').style.display = 'none';
    });
  }
  for (const element of document.querySelectorAll('#categoryQuickSelectDiv .quickselectitem')) {
    element.addEventListener('click', (event) => {
      itemCategory.value = event.target.innerText;
      itemCategory.dispatchEvent(new Event('change'));
      document.getElementById('categoryQuickSelectDiv').style.display = 'none';
    });
  }
  document.getElementById('sellItemButton').addEventListener('click', () => {
    localStorage.setItem('newItem', JSON.stringify({ brand: itemBrand.value, category: itemCategory.value }));
    window.location.href = '/sell-item';
  })
  document.getElementById('refreshValuationButton').addEventListener('click', () => {
    getValuation(itemBrand, itemCategory);
  })
}

quickValuationMain();
