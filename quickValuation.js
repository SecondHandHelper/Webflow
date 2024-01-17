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
      brandCategoryAccuracy, brandAccuracy, highPriceVarBrandCategory, brandShareSold, brandCategoryMeanSold
    } = valuationRes.data || {};
    document.getElementById('valuationResultDiv').style.display = 'block';
    document.getElementById('howMaiSellsDiv').style.display = 'block';
    document.getElementById('maiSellBrandText').innerText = `${brand}-plagg`;
    document.getElementById('brandCategoryText').innerText = `Värdering ${brand}-${category.toLowerCase()}`;
    document.getElementById('valuatedItemHeader').style.display = 'flex';
    if (decline) {
      document.getElementById('itemValuationText').innerText = `Vi säljer generellt sett inte plagg från ${brand} på grund av för låg efterfråga på andrahandsmarknaden.`;
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('valuationText').innerText = 'Säljer ej';
      document.getElementById('howMaiSellsDiv').style.display = 'none';
    } else if (newBrand || valuatedBrandItems === 0 || !minPrice || !maxPrice) {
      document.getElementById('itemValuationText').innerText = 'Vi verkar inte ha sålt så mycket av detta varumärke innan, så detta plagg skulle vi vilja kika på manuellt för att kunna ge en värdering.';
      document.getElementById('valuationText').style.display = 'none';
    } else if (minPrice && maxPrice) {
      const bestMeanPrice = brandCategoryAccuracy >= 0.7 && brandCategoryMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket i denna kategori är ${brandCategoryMeanSold} kr.` :
        brandMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket är ${brandMeanSold} kr.` : '';
      const shareSoldInfo = brandShareSold >= 0.5 ? ', och det är hög efterfrågan på varumärket på andrahandsmarknaden.' :
        '. Bra att veta är att efterfrågan på varumärket på andrahandsmarknaden lägre än snittet, så det kan ta lite längre tid att sälja.';
      if (!fewBrand) {
        if (brandCategoryAccuracy >= 0.7 || brandAccuracy >= 0.8) {
          document.getElementById('itemValuationText').innerText = `${bestMeanPrice} Värderingen baseras på ${valuatedBrandItems} plagg${shareSoldInfo}`;
        } else {
          document.getElementById('itemValuationText').innerText = `${bestMeanPrice} Värderingen baseras på ${valuatedBrandItems} plagg. Värderingen är lite mer osäker då det ofta är hög variation inom varumärket.`;
        }
      } else {
        document.getElementById('itemValuationText').innerText = `Vi har inte sålt så mycket av detta varumärke ännu, AI-värderingen baseras på ${valuatedBrandItems} plagg från ${brand} som vi tidigare värderat.`;
        document.getElementById('valuationText').style.display = 'none';
      }
      document.getElementById('valuationText').style.display = 'block';
      document.getElementById('valuationText').innerText = `${minPrice}-${maxPrice} kr`;
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
