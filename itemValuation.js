window.itemValuationJsLoaded = true;
async function showDeclineValuation(item) {
  document.getElementById('valuationHeading').style.display = 'none';
  document.getElementById('sellProcessInfo').style.display = 'none';
  document.getElementById('valuationText').innerText = 'Säljer ej';
  document.getElementById('valuationText').style.display = 'block';
  document.getElementById('rejectButton').style.display = 'none';
  document.getElementById('confirmButton').style.display = 'none';
  document.getElementById('okejButton').style.display = 'flex';
  document.getElementById('newItemButton').style.display = 'flex';
  document.getElementById('declineExplanation').style.display = 'block';
  document.getElementById('valuationRange').style.display = 'none';
  document.getElementById('adjustIntervalButton').style.display = 'none';
  document.getElementById('valuationExplanation').style.display = 'none';
  document.getElementById('valuationExplanationHeader').style.display = 'none';
  document.getElementById('chatDiv').style.display = 'block';
  document.getElementById('newItemButton').addEventListener('click', () => {
    sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    localStorage.removeItem('newItem');
    sessionStorage.removeItem('newItemId');
    sessionStorage.removeItem('itemValuation');
    window.location.href = '/sell-item';
  });
  document.getElementById('okejButton').addEventListener('click', () => {
    sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    localStorage.removeItem('newItem');
    sessionStorage.removeItem('newItemId');
    sessionStorage.removeItem('itemValuation');
    window.location.href = '/private';
  });
  if (item.id) {
    await callBackendApi(`/api/valuation/${item.id}/reject`, { data: { userDecline: false } });
  }
}

const adjustmentOk = (minPrice) => {
  const adjustedMin = document.getElementById('minPrice').value;
  return !adjustmentRequiresReview(minPrice, Number(adjustedMin));
}

const priceTooHigh = (price, adjustedPrice) => {
  if (price < 500 && adjustedPrice > price * 1.5) {
    return true;
  } else if (price >= 500 && price < 1000 && adjustedPrice > price * 1.4) {
    return true;
  } else if (price >= 1000 && adjustedPrice > price * 1.3) {
    return true
  }
  return false;
}

const minPriceNotOk = (minPrice, maxPrice, adjustedMin) =>
  priceTooHigh(minPrice, adjustedMin) || adjustedMin > estimatedPrice(minPrice, maxPrice);

const adjustmentRequiresReview = (minPrice, adjustedtMin) => adjustedtMin >= 2 * minPrice;

const minTooHighWarning = (minPrice, adjustedMin) => adjustmentRequiresReview(minPrice, adjustedMin) ? 'Ovanligt högt lägsta pris' : null;

const adjustmentWarningText = (minPrice, adjustedMin) => minTooHighWarning(minPrice, adjustedMin);

const adjustmentValidations = (minPrice, maxPrice, adjustedMinInput, adjustedMaxInput) => {
  console.log('adjustmentValidations');
  const adjustedMin = Number(adjustedMinInput.value);
  const adjustedMax = Number(adjustedMaxInput.value);
  adjustedMinInput.style.color = adjustmentRequiresReview(minPrice, adjustedMin) ? '#E20000' : '#333';
  console.log(`adjustedMin ${adjustedMin} ${minPrice}`);
  if (adjustmentRequiresReview(minPrice, adjustedMin)) {
    console.log(`adjustmentRequiresReview ${minPrice} ${adjustedMin}`);
    if (document.getElementById('requiresReviewDiv').style.display !== 'block') {
      document.getElementById('requiresReviewDiv').style.display = 'block';
      analytics.track("Element Viewed", { elementID: "requiresReviewDiv" });
    }
    document.getElementById('adjustmentWarningText').innerHTML = adjustmentWarningText(minPrice, maxPrice, adjustedMin, adjustmentMax);
    document.getElementById('noteDiv').style.display = 'none';
    document.getElementById('sendForReviewButton').style.display = 'flex';
    document.getElementById('confirmButton').style.display = 'none';
    document.getElementById('rejectButton').style.display = 'none';
  } else if (adjustedMax !== maxPrice || adjustedMin !== minPrice) {
    document.getElementById('confirmButton').style.display = 'flex';
    document.getElementById('sendForReviewButton').style.display = 'none';
    if (document.getElementById('resetButton').style.visibility !== 'visible') {
      document.getElementById('resetButton').style.visibility = 'visible';
      analytics.track("Element Viewed", { elementID: "resetButton" });
    }
    document.getElementById('requiresReviewDiv').style.display = 'none';
    const noteTextBefore = document.getElementById('noteText').innerText;
    let noteText = '';
    if (adjustmentMax > maxPrice) {
      noteText += 'Ett höjt startpris kan innebära att det tar längre tid för plagget att säljas.';
    }
    if (adjustedMin > minPrice) {
      noteText += `${noteText ? ' ' : ''}Ett höjt lägsta pris minskar sannolikheten att det blir sålt.`;
    }
    if (!noteText) {
      noteText = 'Bra att du kan tänka dig sänka priset! Det ökar sannolikheten att det blir sålt.';
    }
    document.getElementById('noteHeading').innerHTML = 'Notera!';
    document.getElementById('noteText').innerText = noteText;
    document.getElementById('noteDiv').style.display = 'block';
    if (noteText !== noteTextBefore) {
      document.getElementById('noteDiv').click(); // Animation trigger to get users attention
    }
    document.getElementById('confirmButton').innerText = 'Påbörja försäljning';
    document.getElementById('rejectButton').style.display = 'flex';
  } else {
    document.getElementById('resetButton').style.visibility = 'hidden';
    document.getElementById('noteHeading').innerHTML = 'Tips!';
    document.getElementById('noteText').innerText = 'Sänkta priser ger en säkrare och snabbare försäljning. Höjda priser kan ge mer pengar, men riskerar också att det blir osålt eller tar längre tid.';
    document.getElementById('noteDiv').style.display = 'block';
    document.getElementById('requiresReviewDiv').style.display = 'none';
    document.getElementById('confirmButton').style.display = 'flex';
    document.getElementById('sendForReviewButton').style.display = 'none';
    document.getElementById('rejectButton').style.display = 'flex';
  }
}

function validateInput() {
  const adjustmentMinInput = document.getElementById('minPrice');
  const adjustmentMaxInput = document.getElementById('maxPrice');
  const adjustmentMin = Number(adjustmentMinInput.value);
  const adjustmentMax = Number(adjustmentMaxInput.value);
  if (adjustmentMin < 100) {
    adjustmentMinInput.setCustomValidity('Vi försöker tyvärr aldrig sälja något under 100kr');
  } else if (adjustmentMin > adjustmentMax) {
    adjustmentMaxInput.setCustomValidity('Startpris måste vara högre än lägsta pris');
    adjustmentMinInput.setCustomValidity('Lägsta pris måste vara mindre än startpris');
  } else {
    adjustmentMinInput.setCustomValidity('');
    adjustmentMaxInput.setCustomValidity('');
  }
  return document.getElementById('wf-form-Valuation-form').reportValidity();
}

async function saveValuationStatus(itemId, minPrice, maxPrice) {
  if (!validateInput()) {
    return;
  }
  const minInput = document.getElementById('minPrice');
  const adjustedMin = Number(minInput.value);
  const maxInput = document.getElementById('maxPrice');
  const adjustedMax = Number(maxInput.value);
  if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
    const savedItem = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
    savedItem.item.infoRequests.price.status = 'Resolved';
    savedItem.item.infoRequests.price.response = 'Accepted';
    if (adjustedMin !== minPrice || adjustedMax !== maxPrice) {
      savedItem.item.infoRequests.price.userAdjustedMin = adjustedMin;
      savedItem.item.infoRequests.price.userAdjustedMax = adjustedMax;
      if (adjustmentOk(minPrice)) {
        savedItem.item.minPriceEstimate = adjustedMin;
        savedItem.item.newMinPriceEstimate = adjustedMin;
        savedItem.item.maxPriceEstimate = adjustedMax;
        savedItem.item.newMaxPriceEstimate = adjustedMax
      } else {
        savedItem.item.infoRequests.price.response = 'User proposal';
        savedItem.item.infoRequests.price.userProposalMotivation = document.getElementById('userProposalMotivation').value;
      }
    } else {
      savedItem.item.minPriceEstimate = minPrice;
      savedItem.item.maxPriceEstimate = maxPrice;
    }
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify(savedItem));
    return window.location.href = '/sign-in';
  } else {
    await callBackendApi(`/api/valuation/${itemId}`, {
      method: 'PUT',
      data: {
        itemId, minPrice, maxPrice, adjustmentMin: adjustedMin, adjustmentMax: adjustedMax,
        userProposalMotivation: document.getElementById('userProposalMotivation').value,
        adjustmentRequiresReview: !adjustmentOk(minPrice)
      }
    });
    const params = getParamsObject();
    if (localStorage.getItem('latestItemCreated') && !params.id) {
      const latestItemCreated = JSON.parse(localStorage.getItem('latestItemCreated'));
      latestItemCreated.infoRequests.price.response = adjustmentOk(minPrice) ? 'Accepted' : 'User proposal';
      if (adjustmentOk(minPrice)) {
        latestItemCreated.minPriceEstimate = adjustedMin;
        latestItemCreated.maxPriceEstimate = adjustedMax;
      }
      localStorage.setItem('latestItemCreated', JSON.stringify(latestItemCreated));
    }
    if (!document.referrer.includes('/private')) {
      const userPhoneSet = user.current?.phoneNumber?.length;
      return window.location.href = userPhoneSet ? `/item-confirmation` :
        `/user-contact`;
    } else {
      return window.location.href = `/private`;
    }
  }
}

const initialPageSetup = (item) => {
  document.getElementById('itemImage').src = window.innerWidth <= 400 ?
    item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImageSmall || item?.images?.frontImage :
    item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImage;
  const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate } = item.mlValuation || item.estimatedValuation || {};
  const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
  const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;

  document.getElementById('chatLink').onclick = () => Intercom('showNewMessage',
    item.mlValuation?.decline || item.estimatedValuation?.decline ?
      `ID: ${item.id}\n\nGällande att ni tackat nej till ${item.brand.trim()}-${item.category.toLowerCase()}:\n\n` :
      `ID: ${item.id}\n\nGällande prisintervallet på ${minPrice}-${maxPrice} kr för ${item.brand.trim()}-${item.category.toLowerCase()}. Vad skulle du vilja ändra det till och varför?\n\n`);
  document.getElementById('valuationClose').addEventListener('click', () => {
    sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    const params = getParamsObject();
    if (!params.id) {
      localStorage.removeItem('newItem');
      sessionStorage.removeItem('newItemId');
    }
    return window.location.href = '/private';
  })
}

const rejectValuation = async (item) => {
  if (item.id) {
    await callBackendApi(`/api/valuation/${item.id}/reject`, { data: { userDecline: true } });
  }
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
  const params = getParamsObject();
  if (!params.id) {
    localStorage.removeItem('newItem');
    localStorage.removeItem('latestItemCreated');
    sessionStorage.removeItem('newItemId');
  }
  return window.location.href = '/private';
}

const hideTooltip = () => {
  for (const element of document.getElementsByClassName('tooltip-motivation')) {
    element.classList.remove('tooltip-show');
  }
}

const priceAdjustment = (inputValue) => {
  if (inputValue < 200) {
    return 20;
  } else if (inputValue < 500) {
    return 50;
  }
  return 100;
}
const lowerPrice = (input, origValue) => {
  const value = Number(input.value);
  const valPriceAdjustment = priceAdjustment(origValue);
  const newValue = Math.floor(value / valPriceAdjustment) * valPriceAdjustment;
  input.value = Math.max(0, newValue === value ? value - valPriceAdjustment : newValue);
  input.dispatchEvent(new Event('input'));
}

const increasePrice = (input, origValue) => {
  const value = Number(input.value);
  const valPriceAdjustment = priceAdjustment(origValue);
  const newValue = Math.ceil(value / valPriceAdjustment) * valPriceAdjustment;
  input.value = newValue === value ? value + valPriceAdjustment : newValue;
  input.dispatchEvent(new Event('input'));
}

const estimatedPrice = (minPrice, maxPrice) => Math.round((minPrice + maxPrice) / 20) * 10;
const showValuation = async (item) => {
  const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate, decline } = item.mlValuation || item.estimatedValuation || {};
  const params = getParamsObject();
  if (!params.id && decline) { // Don't show decline screen based on valuation if the user come from a infoRequest on private page
    await showDeclineValuation(item);
    document.getElementById('valuationResultDiv').style.display = 'flex';
    return;
  }
  const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
  const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
  document.getElementById('valuationText').innerText = `${estimatedPrice(minPrice, maxPrice)} kr`;
  document.getElementById('valuationResultDiv').style.display = 'flex';
  document.body.addEventListener('click', hideTooltip);
  document.getElementById('valuationRange').style.display = 'flex';
  document.getElementById('minPrice').value = minPrice;
  document.getElementById('minPrice').disabled = true;
  document.getElementById('maxPrice').value = maxPrice;
  document.getElementById('maxPrice').disabled = true;
  console.log(item.infoRequests?.price?.type)
  if (item.infoRequests?.price?.type) {
    document.getElementById('valuationExplanation').innerText = item.infoRequests.price.description;
    if (item.infoRequests?.price?.type === 'Final Offer') {
      document.getElementById('valuationExplanationHeader').innerText = 'Motivering';
      document.getElementById('valuationExplanationHeader').style.display = 'block';
    }
  } else if (item.mlValuation) {
    document.getElementById('valuationExplanation').innerText = getMlValuationExplanation(item)
  } else if (item.estimatedValuation) {
    console.log(`item  has estimatedValuation ${!!item.estimatedValuation}`);
    document.getElementById('valuationExplanation').innerText = getEstimatedPriceExplanation(item)
  }

  document.getElementById('valuationText').style.display = 'block';
  if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
    document.getElementById('chatDiv').style.display = 'none';
  }

  await showAdjustValuation(item);
  showSellToMaiOption(item);
  document.getElementById('confirmButton').addEventListener('click', () => saveValuationStatus(item.id, minPrice, maxPrice));
  document.getElementById('sendForReviewButton').addEventListener('click', () => saveValuationStatus(item.id, minPrice, maxPrice));
  document.getElementById('rejectButton').addEventListener('click', () => rejectValuation(item));
}

const shortCondition = (condition) => {
  return {
    'Helt ny, med prislapp kvar': 'Helt ny',
    'Helt ny, men utan prislapp': 'Helt ny',
    'Använd, men utan anmärkning': 'Nyskick',
    'Använd, tecken på slitage': 'Fint skick',
    'Använd, tydligt slitage': 'Defekter',
  }[condition] || '';
};

const getAttributeDisplayValue = (item, attribute) => {
  switch (attribute) {
    case 'cleanedBrand':
      return item.cleanedBrand || item.brand || '';
    case 'category':
      return item.category || '';
    case 'model_group':
      return item.estimatedValuation?.modelGroup || '';
    case 'cleanedModel':
      return item.cleanedModel || item.model || '';
    case 'condition':
      return shortCondition(item.condition || '');
    case 'maiMaterial':
      return item.maiMaterial || item.material || '';
    default:
      return '';
  }
};

const getAttributeDisplayName = (attribute) => {
  switch (attribute) {
    case 'cleanedBrand':
      return 'varumärke';
    case 'category':
      return 'kategori';
    case 'model_group':
    case 'cleanedModel':
      return 'modell';
    case 'condition':
      return 'skick';
    case 'maiMaterial':
      return 'material';
    default:
      return attribute;
  }
};

const buildGroupingDescription = (item, grouping) => {
  const attributeNames = grouping.map(attr =>
    getAttributeDisplayName(attr),
  );
  const attributeValues = grouping.map(attr =>
    getAttributeDisplayValue(item, attr),
  );

  // Filter out empty values
  const validAttributes = attributeNames
    .map((name, index) => ({ name, value: attributeValues[index] }))
    .filter(pair => pair.value && pair.value.trim() !== '');

  if (validAttributes.length === 0) {
    return '';
  }

  // Separate brand from other attributes
  const brandAttribute = validAttributes.find(
    attr => attr.name === 'varumärke',
  );
  const otherAttributes = validAttributes.filter(
    attr => attr.name !== 'varumärke',
  );

  // Build brand part (optional)
  let brandPart = '';
  if (brandAttribute) {
    brandPart = `från ${brandAttribute.value} `;
  }

  // Build attribute types part
  let attributeTypes = '';
  if (otherAttributes.length === 0) {
    attributeTypes = 'kategori';
  } else if (otherAttributes.length === 1) {
    attributeTypes = otherAttributes[0].name;
  } else if (otherAttributes.length === 2) {
    attributeTypes = `${otherAttributes[0].name} och ${otherAttributes[1].name}`;
  } else {
    const allButLast = otherAttributes.slice(0, -1).map(attr => attr.name);
    const last = otherAttributes[otherAttributes.length - 1].name;
    attributeTypes = `${allButLast.join(', ')} och ${last}`;
  }

  const groupAvgPrice = Math.round(item.estimatedValuation?.groupAvgPrice || 0);

  return `Prisspannet är baserat på liknande sålda ${brandPart} i samma ${attributeTypes}. Snittpriset för dessa försäljningar ligger på ${groupAvgPrice} kr.`;
};

const isUnknownModel = (item) => {
  const includedBrandSegments = [ '1A', '1B', '1C', '2A', '2B', '2C', '3', '4', '5A', '7', '9' ];
  const isIncludedBrandSegment = item?.brandSegment && includedBrandSegments.includes(item.brandSegment);
  const hasModel = !!item?.model;
  const grouping = item?.estimatedValuation?.grouping || [];
  const groupingHasModel = grouping.some(g => g.toLowerCase().includes('model'));
  return !!(isIncludedBrandSegment && hasModel && !groupingHasModel);
};

const getEstimatedPriceExplanation = (item) => {
  if (!item.estimatedValuation) {
    return '';
  }

  let groupingText = '';
  if (
    item.estimatedValuation.grouping &&
    item.estimatedValuation.grouping.length > 0
  ) {
    groupingText = buildGroupingDescription(item, item.estimatedValuation.grouping);
  }

  if (isUnknownModel(item)) {
    return `Vi hittar ingen exakt modell-match för detta plagg, så värderingen är något mer osäker. ${groupingText}`.trim();
  }

  if (item.estimatedValuation.highUncertaintyFlag) {
    return `${groupingText} Spannet vi presenterat har större osäkerhet pga hög variation av slutpriser bland liknande sålda.`.trim();
  }

  return groupingText;
}

const getMlValuationExplanation = (item) => {
  if (!item || !item.mlValuation) {
    return 'Värderingen baseras på plagg från liknande varumärken som vi värderat tidigare. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset.';
  }
  const {
    mlValuation: {
      valuatedBrandItems, brandMeanMax, brandAccuracy, brandCategoryAccuracy, fewBrand,
      brandMeanSold, brandCategoryMeanSold, newMinMaxLog, brandShareSold, lowValueSegment
    }, cleanedBrand, brand
  } = item;
  const soldBrandItems = Math.round(valuatedBrandItems * brandShareSold);
  const brandName = cleanedBrand || brand;
  const bestMeanPrice = brandAccuracy > 0.8 && brandMeanSold > 0 ? `Plagg från ${brandName} har i genomsnitt sålts för ${brandMeanSold} kr baserat på ${soldBrandItems} sålda plagg. ` :
    (brandCategoryAccuracy > 0.7 && brandCategoryMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket i denna kategori är ${brandCategoryMeanSold} kr. ` : '');
  const acceptPriceNotice = newMinMaxLog.match(/accept price is above max/i) ? 'Plagget har värderat till under ditt lägsta accepterade pris. ' : '';
  const adjustPriceLowShareSoldNotice = brandShareSold < 0.5 && !lowValueSegment ? `Notera att efterfrågan på ${brandName} på andrahandsmarknaden är lägre än snittet, så vill du öka sannolikheten att få det sålt kan du sänka det lägsta priset.` : '';
  const adjustPriceNotice = 'Ibland träffar den dock inte rätt, så känn dig fri att justera priset om du tycker värderingen verkar konstig.'

  if (fewBrand || valuatedBrandItems === 0) {
    return `${acceptPriceNotice}Värderingen är mer osäker då vi har sålt relativt lite av detta varumärke. Efterfrågan på mer okända och små varumärken är ofta lägre. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset`;
  }
  if (brandAccuracy >= 0.8 && !fewBrand) {
    return `${acceptPriceNotice}${bestMeanPrice}AI-värderingen tar hänsyn till material, modell, skick och originalpris och brukar ha hög träffsäkerhet för detta varumärke. ${adjustPriceLowShareSoldNotice || adjustPriceNotice}`;
  }
  if (brandAccuracy < 0.8 && brandCategoryAccuracy >= 0.7 && !fewBrand) {
    return `${acceptPriceNotice}${bestMeanPrice}AI-värderingen tar hänsyn till material, modell, skick och originalpris och brukar ha hög träffsäkerhet för denna kategori och varumärke. ${adjustPriceLowShareSoldNotice || adjustPriceNotice}`;
  }
  if (brandMeanMax <= 400) {
    return `${acceptPriceNotice}Värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat. ${[adjustPriceLowShareSoldNotice, bestMeanPrice].join(' ')}`;
  }
  return `${acceptPriceNotice}Värderingen baseras på plagg från liknande varumärken som vi värderat tidigare. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset.`;
}

const showAdjustValuation = async (item) => {
  const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate } = item.mlValuation || item.estimatedValuation || {};
  const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
  const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;

  document.getElementById('adjustIntervalButton').style.display = 'flex';
  analytics.track("Element Viewed", { elementID: "adjustIntervalButton" });
  document.getElementById('chatDiv').style.display = 'none';
  document.getElementById('adjustIntervalButton').addEventListener('click', () => {
    document.getElementById('valuationExplanation').style.display = 'none';
    document.getElementById('valuationExplanationHeader').style.display = 'none';
    document.getElementById('minPrice').disabled = false;
    document.getElementById('maxPrice').disabled = false;
    document.getElementById('adjustIntervalButton').style.display = 'none';
    document.getElementById('noteDiv').style.display = 'block';
    document.getElementById('origMinPrice').style.display = 'block';
    document.getElementById('origMaxPrice').style.display = 'block';

    document.getElementById('sliderDiv').style.display = 'block';
    document.querySelectorAll(".field-underline").forEach(x => x.style.visibility = 'visible');
  })
  if (item.infoRequests?.price?.type === 'Final Offer') {
    document.getElementById('adjustIntervalButton').style.display = 'none';
    document.getElementById('chatDiv').style.display = 'none';
  }

  rangeSlider(minPrice, maxPrice, item);
  document.getElementById('sellProcessInfo').addEventListener('click', (e) => {
    const elements = document.getElementsByClassName('tooltip-motivation');
    const visible = elements[0]?.classList.contains('tooltip-show');
    for (const element of elements) {
      visible ? element.classList.remove('tooltip-show') : element.classList.add('tooltip-show');
    }
    e.stopPropagation();
  });
  document.getElementById('origMinPrice').innerText = minPrice;
  document.getElementById('origMinPrice').style.visibility = 'hidden';
  document.getElementById('origMaxPrice').innerText = maxPrice;
  document.getElementById('origMaxPrice').style.visibility = 'hidden';
  document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('minPrice').value = minPrice;
    document.getElementById('maxPrice').value = maxPrice;
    document.getElementById('minPrice').dispatchEvent(new Event('input'));
    document.getElementById('maxPrice').dispatchEvent(new Event('input'));
    document.getElementById('adjustmentSlider').value = 3;
    document.getElementById('resetButton').style.visibility = 'hidden';
    validateInput();
  });
  document.getElementById('minPrice').addEventListener('blur', () => validateInput());
  document.getElementById('minPrice').addEventListener('input', () => {
    const adjustmentMinInput = document.getElementById('minPrice');
    const adjustmentMaxInput = document.getElementById('maxPrice');
    const adjustmentMin = Number(adjustmentMinInput.value);
    console.log(`adjustmentMin ${adjustmentMin} ${minPrice}`);
    if (adjustmentMin !== minPrice) {
      document.getElementById('origMinPrice').style.visibility = 'visible';
    } else {
      document.getElementById('origMinPrice').style.visibility = 'hidden';
    }
    adjustmentValidations(minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
  });
  document.getElementById('minIncrease').addEventListener('click', () => {
    increasePrice(document.getElementById('minPrice'), minPrice);
    analytics.track('Click', { elementID: 'minIncrease' });
    validateInput();
  });
  document.getElementById('minDecrease').addEventListener('click', () => {
    lowerPrice(document.getElementById('minPrice'), minPrice);
    analytics.track('Click', { elementID: 'minDecrease' });
    validateInput();
  });
  document.getElementById('maxPrice').addEventListener('blur', () => validateInput());
  document.getElementById('maxPrice').addEventListener('input', () => {
    const adjustmentMaxInput = document.getElementById('maxPrice');
    const adjustmentMinInput = document.getElementById('minPrice');
    const adjustmentMax = Number(adjustmentMaxInput.value);
    if (adjustmentMax !== maxPrice) {
      document.getElementById('origMaxPrice').style.visibility = 'visible';
    } else {
      document.getElementById('origMaxPrice').style.visibility = 'hidden';
    }
    adjustmentValidations(minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
  });
  document.getElementById('maxIncrease').addEventListener('click', () => {
    increasePrice(document.getElementById('maxPrice'), maxPrice);
    analytics.track('Click', { elementID: 'maxIncrease' });
    validateInput();
  });
  document.getElementById('maxDecrease').addEventListener('click', () => {
    lowerPrice(document.getElementById('maxPrice'), maxPrice);
    analytics.track('Click', { elementID: 'maxDecrease' });
    validateInput();
  });
}

const getItem = async (itemId) => {
  const res = await callBackendApi(`/api/items/${itemId}`);
  return { ...(res?.data || {}), id: itemId };
}

const maxIncrease = (price) => {
  if (price <= 400) {
    return price * 0.3;
  } else if (price <= 800) {
    return price * 0.25;
  }
  return price * 0.2;
}

export const minPriceMaxIncrease = (minPrice, maxPrice) =>
  Math.min(
    maxIncrease(minPrice),
    estimatedPrice(minPrice, maxPrice) - minPrice,
  );

function rangeSlider(minPrice, maxPrice, item) {
  const range = document.getElementById('adjustmentSlider');
  range.addEventListener('touchend', () => {
    range.value = Math.round(Number(range.value));
    analytics.track('Click', { elementID: 'adjustmentSlider' });
    validateInput();
  });
  range.addEventListener('mouseup', () => {
    range.value = Math.round(Number(range.value));
    analytics.track('Click', { elementID: 'adjustmentSlider' });
    validateInput();
  });
  range.addEventListener('input', function () {
    let minInput = document.getElementById('minPrice');
    let maxInput = document.getElementById('maxPrice');
    const closestValue = Math.round(Number(range.value));
    switch (closestValue) {
      case 0: // -50%
        minInput.value = Math.max(100, Math.round((minPrice * 0.5) / 10) * 10);
        maxInput.value = Math.max(100, Math.round((maxPrice * 0.5) / 10) * 10);
        break;
      case 1: // -33%
        minInput.value = Math.max(100, Math.round((minPrice * 0.66) / 10) * 10);
        maxInput.value = Math.max(100, Math.round((maxPrice * 0.66) / 10) * 10);
        break;
      case 2: // -17%
        minInput.value = Math.max(100, Math.round((minPrice * 0.83) / 10) * 10);
        maxInput.value = Math.max(100, Math.round((maxPrice * 0.83) / 10) * 10);
        break;
      case 3:
        minInput.value = minPrice;
        maxInput.value = maxPrice;
        break;
      case 4:
        console.log(`4 ${minPrice} ${maxPrice} ${minPriceMaxIncrease(minPrice, maxPrice)} ${maxIncrease(maxPrice)}`);
        minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice) * 0.33) / 10) * 10;
        maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice) * 0.33) / 10) * 10;
        break;
      case 5:
        minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice) * 0.67) / 10) * 10;
        maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice) * 0.67) / 10) * 10;
        break;
      case 6:
        minInput.value = Math.floor((minPrice + minPriceMaxIncrease(minPrice, maxPrice)) / 10) * 10;
        maxInput.value = Math.floor((maxPrice + maxIncrease(maxPrice)) / 10) * 10;
        break;
    }
    minInput.dispatchEvent(new Event('input'));
    maxInput.dispatchEvent(new Event('input'));
  });
}

async function sellToMai(item) {
  console.log('Sell item to Mai: ', item.id)

  /* Show spinner and call endpoint */
  document.getElementById('sellToMaiBtnSpinner').style.display = 'block';
  document.getElementById('popupButtonText').style.display = 'none';

  const response = await callBackendApi(`/api/items/${item.id}`, {
    data: { soldToMai: true },
    method: 'PUT'
  });

  /* When successful, show confirmation screen */
  if (response?.data?.status === 'ok') {
    console.log('Item successfully sold to Mai:', item.id);
    document.getElementById('sellToMaiPopUpTitle').innerText = 'Såld till Mai!';
    document.getElementById('sellToMaiPopUpText').innerText = 'Om några minuter kommer du att få ett SMS att plagget blivit sålt med länk till QR-kod för att skicka plagget till oss. Har du flera plagg du sålt till Mai så kan du skicka i samma påse.';
    document.getElementById('sellNowPriceDiv').style.display = 'none';
    document.getElementById('sellToMaiButton').style.display = 'none';
    document.getElementById('closeSellToMaiPopup').style.display = 'none';
    document.getElementById('sellToMaiOkejButton').style.display = 'flex';
  } else {
    throw new Error('Could not save soldToMai');
  }
}

function showSellToMaiOption(item) {
  const minPrice = item.infoRequests?.price?.minPrice;
  const sellToMaiOffer = item.infoRequests?.price?.sellToMaiOffer;
  if (!(sellToMaiOffer && minPrice)) {return}

  /* Show sell to Mai option */
  const sellNowPrice = Math.round(0.7 * minPrice);
  document.getElementById('sellToMaiDiv').style.display = 'flex';
  document.getElementById('openSellToMaiBtnText').innerText = `Sälj nu för ${sellNowPrice} kr`;

  /* Setup sell to Mai modal and buttons */
  document.getElementById('sellNowPrice').innerText = `${sellNowPrice} kr`;
  document.getElementById('popupButtonText').innerText = `Ja, sälj till Mai för ${sellNowPrice} kr`;
  document.getElementById('openSellToMaiPopupBtn').addEventListener('click', () => {
    document.getElementById('sellToMaiPopup').style.display = 'flex';
  });
  document.getElementById('sellToMaiButton').addEventListener('click', (event) => {
    event.stopPropagation();
    sellToMai(item);
  });
  document.getElementById('closeSellToMaiPopup').addEventListener('click', () => {
    document.getElementById('sellToMaiPopup').style.display = 'none';
  });
  document.getElementById('sellToMaiOkejButton').addEventListener('click', () => {
    window.location.href = '/private';
  });
  const image = item.images?.enhancedFrontImageSmall || item.images?.enhancedFrontImage || item.images?.frontImage;
  if (image) {
    document.getElementById('popUpImage').src = image;
  }
}

const main = async () => {
  window.intercomSettings = {
    app_id: "klyy0le5"
  };
  (function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
  Intercom('update', { 'hide_default_launcher': true });
  const params = getParamsObject();
  const item = params.id ? (await getItem(params.id)) :
    (JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn') || '{}')?.item || JSON.parse(localStorage.getItem('latestItemCreated') || '{}'));
  if (!item) {
    console.error('Invalid item id or no saved item to show valuation for');
    return location.href = '/private';
  }
  initialPageSetup(item);
  await showValuation(item);
  showSellToMaiOption(item);
  triggerShowContent.click();
}

main();
