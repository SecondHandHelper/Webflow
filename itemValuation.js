window.itemValuationJsLoaded = true;
async function showDeclineValuation(item) {
    document.getElementById('valuationHeading').style.display = 'none';
    document.getElementById('valuationMotivation').style.display = 'none';
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
        await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({
            itemId: item.id, userDecline: false
        });
    }
}

const adjustmentOk = (minPrice, maxPrice) => {
    const adjustedMin = document.getElementById('minPrice').value;
    const adjustedMax = document.getElementById('maxPrice').value;
    return !adjustmentRequiresReview(minPrice, maxPrice, Number(adjustedMin), Number(adjustedMax));
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

const adjustmentRequiresReview = (minPrice, maxPrice, adjustmentMin, adjustmentMax) =>
    minPriceNotOk(minPrice, maxPrice, adjustmentMin) || priceTooHigh(maxPrice, adjustmentMax);

const maxTooHighWarning = (maxPrice, adjustmentMax) => priceTooHigh(maxPrice, adjustmentMax) ? 'Ovanligt högt startpris' : null;
const minTooHighWarning = (minPrice, adjustmentMin) => priceTooHigh(minPrice, adjustmentMin) ? 'Ovanligt högt lägsta pris' : null;
const minAboveValuationWarning = (adjustmentMin, estimatedPrice) => adjustmentMin > estimatedPrice ? 'Lägsta priset överstiger vår värdering' : null;

const adjustmentWarningText = (minPrice, maxPrice, adjustmentMin, adjustmentMax) => [
    maxTooHighWarning(maxPrice, adjustmentMax),
    minTooHighWarning(minPrice, adjustmentMin),
    minAboveValuationWarning(adjustmentMin, estimatedPrice(minPrice, maxPrice))
].filter(p => p).join('<br>');

const adjustmentValidations = (minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput) => {
    const adjustmentMin = Number(adjustmentMinInput.value);
    const adjustmentMax = Number(adjustmentMaxInput.value);
    adjustmentMaxInput.style.color = priceTooHigh(maxPrice, adjustmentMax) ? '#E20000' : '#333';
    adjustmentMinInput.style.color = minPriceNotOk(minPrice, maxPrice, adjustmentMin) ? '#E20000' : '#333';
    if (adjustmentRequiresReview(minPrice, maxPrice, adjustmentMin, adjustmentMax)) {
        if (document.getElementById('requiresReviewDiv').style.display !== 'block') {
            document.getElementById('requiresReviewDiv').style.display = 'block';
            analytics.track("Element Viewed", { elementID: "requiresReviewDiv" });
        }
        document.getElementById('adjustmentWarningText').innerHTML = adjustmentWarningText(minPrice, maxPrice, adjustmentMin, adjustmentMax);
        document.getElementById('noteDiv').style.display = 'none';
        document.getElementById('sendForReviewButton').style.display = 'flex';
        document.getElementById('confirmButton').style.display = 'none';
        document.getElementById('rejectButton').style.display = 'none';
    } else if (adjustmentMax !== maxPrice || adjustmentMin !== minPrice) {
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
        if (adjustmentMin > minPrice) {
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
            if (adjustmentOk(minPrice, maxPrice)) {
                savedItem.item.minPriceEstimate = minPrice;
                savedItem.item.maxPriceEstimate = maxPrice;
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
        await firebase.app().functions("europe-west1").httpsCallable('saveValuationStatus')({
            itemId, minPrice, maxPrice, adjustmentMin: adjustedMin, adjustmentMax: adjustedMax,
            userProposalMotivation: document.getElementById('userProposalMotivation').value,
            adjustmentRequiresReview: !adjustmentOk(minPrice, maxPrice)
        });
        const params = getParamsObject();
        if (localStorage.getItem('latestItemCreated') && !params.id) {
            const latestItemCreated = JSON.parse(localStorage.getItem('latestItemCreated'));
            latestItemCreated.infoRequests.price.response = adjustmentOk(minPrice, maxPrice) ? 'Accepted' : 'User proposal';
            if (adjustmentOk(minPrice, maxPrice)) {
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
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate } = item.mlValuation || {};
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;

    document.getElementById('chatLink').onclick = () => Intercom('showNewMessage',
        item.mlValuation?.decline ?
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
        await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({
            itemId: item.id, userDecline: true
        });
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
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate, decline, newBrand,
      newBrandCategory } = item.mlValuation || {};
    const params = getParamsObject();
    const version = params.version || item.mlValuation.modelVersion;
    if (!params.id && decline) { // Don't show decline screen based on mlValuation if the user come from a infoRequest on private page
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
    if (item.infoRequests?.price?.type) {
        document.getElementById('valuationExplanation').innerText = item.infoRequests.price.description;
        if (item.infoRequests?.price?.type === 'Final Offer') {
            document.getElementById('valuationExplanationHeader').innerText = 'Motivering';
            document.getElementById('valuationExplanationHeader').style.display = 'block';
        }
    } else if (version === '1.76') {
      // TODO 1.76: remove the if around this code and remove the next if when version 1.76 is released
      document.getElementById('valuationExplanation').innerText = getValuationExplanation(item)
    } else if (newBrand || newBrandCategory) {
        document.getElementById('valuationExplanationHeader').style.display = 'block';
        document.getElementById('valuationExplanation').innerText = newBrand ?
            'Vi har inte sålt så mycket av detta varumärke tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar.' :
            'Vi har inte sålt så mycket av denna kategori från varumärket tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar.';
    }
    document.getElementById('valuationText').style.display = 'block';
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        document.getElementById('chatDiv').style.display = 'none';
    }

    await showAdjustValuation(item);
    document.getElementById('confirmButton').addEventListener('click', () => saveValuationStatus(item.id, minPrice, maxPrice));
    document.getElementById('sendForReviewButton').addEventListener('click', () => saveValuationStatus(item.id, minPrice, maxPrice));
    document.getElementById('rejectButton').addEventListener('click', () => rejectValuation(item));
}

const getParamsOrItemMlFlags = (mlValuation) => {
  const params = getParamsObject();
  params.valuatedBrandItems = parseInt(params.valuatedBrandItems || `${mlValuation.valuatedBrandItems}`)
  params.brandMeanMax = parseInt(params.brandMeanMax || `${mlValuation.brandMeanMax}`)
  params.brandAccuracy = parseFloat(params.brandAccuracy || `${mlValuation.brandAccuracy}`)
  params.brandCategoryAccuracy = parseFloat(params.brandCategoryAccuracy || `${mlValuation.brandCategoryAccuracy}`)
  params.fewBrand = params.fewBrand ? params.fewBrand === 'true' : mlValuation.fewBrand;
  params.brandMeanSold = parseInt(params.brandMeanSold || `${mlValuation.brandMeanSold}`)
  return params;
}

const getValuationExplanation = (item) => {
  const { mlValuation: { valuatedBrandItems, brandMeanMax, brandAccuracy, brandCategoryAccuracy, fewBrand,
    brandMeanSold, brandCategoryMeanSold } , cleanedBrand, brand } = { ...item, mlValuation: { ...getParamsOrItemMlFlags(item.mlValuation) }};
  const brandName = cleanedBrand || brand;
  const bestMeanPrice = brandAccuracy > 0.8 && brandMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket är ${brandMeanSold} kr.` :
    brandCategoryAccuracy > 0.7 && brandCategoryMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket i denna kategori är ${brandCategoryMeanSold} kr.` : '';
  if (brandMeanMax <= 400) {
    return `Värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat. ${bestMeanPrice}`;
  }
  if (brandMeanMax <= 800 && fewBrand) {
    return 'Värderingen är mer osäker då vi har sålt relativt lite av detta varumärke. Efterfrågan på mer okända och små varumärken är ofta lägre. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset';
  }
  if (brandAccuracy >= 0.8 && !fewBrand) {
    return `AI-värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat, och vi brukar ha hög träffsäkerhet på detta varumärke. Om du mot förmodan ändå vill justera kan du göra det, men tänk på att det påverkar sannolikheten att få det sålt. ${bestMeanPrice}`;
  }
  if (brandAccuracy < 0.8 && brandCategoryAccuracy >= 0.7 && !fewBrand) {
    return `AI-värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat, och för just denna kategori från varumärket brukar vi ha hög träffsäkerhet. Om du mot förmodan ändå vill justera kan du göra det, men tänk på att det påverkar sannolikheten att få det sålt. ${bestMeanPrice}`;
  }
  return `Värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat. ${bestMeanPrice}`;

}

const showAdjustValuation = async (item) => {
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate, adjustmentAllowed, version } = item.mlValuation || {};
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
    const showAdjustPrice = version === '1.76' ||
      adjustmentAllowed ||
      ['1A', '1B', '1C', '2A', '3', '5A', '7', '8'].includes(item.brandSegment) ||
      item.infoRequests?.price?.adjustmentAllowed

    if (showAdjustPrice) {
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
    }
    if (item.infoRequests?.price?.type === 'Final Offer') {
        document.getElementById('adjustIntervalButton').style.display = 'none';
        document.getElementById('chatDiv').style.display = 'none';
    }

    rangeSlider(minPrice, maxPrice, item);
    document.getElementById('valuationMotivation').addEventListener('click', (e) => {
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

    if (item.infoRequests?.price?.type === 'Final Offer' || item.infoRequests?.price?.type === 'Valuation') {
        document.getElementById('valuationMotivation').style.display = 'none';
    }
}

const getItem = async (itemId) => {
    const res = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId })
    return { ...(res?.data || {}), id: itemId };
}

const maxIncrease = (price, adjustFlags) => {
    const { fewBrand, newBrand, brandAccuracy, brandCategoryAccuracy, highPriceVarBrandCategory } = getParamsOrItemMlFlags(adjustFlags);
    const uncertainValuationAdjustment = fewBrand || newBrand || highPriceVarBrandCategory ||
        brandAccuracy < 0.8 || brandCategoryAccuracy < 0.7 ? 0.1 : 0;
    if (price <= 400) {
        return price * (0.3 + uncertainValuationAdjustment);
    } else if (price <= 800) {
        return price * (0.25 + uncertainValuationAdjustment);
    }
    return price * (0.2 + uncertainValuationAdjustment);
}

const minPriceMaxIncrease = (minPrice, maxPrice, adjustFlags) =>
    Math.min(maxIncrease(minPrice, adjustFlags), estimatedPrice(minPrice, maxPrice) - minPrice);

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
                minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation) * 0.33) / 10) * 10;
                maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice, item.mlValuation) * 0.33) / 10) * 10;
                break;
            case 5:
                minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation) * 0.67) / 10) * 10;
                maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice, item.mlValuation) * 0.67) / 10) * 10;
                break;
            case 6:
                minInput.value = Math.floor((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation)) / 10) * 10;
                maxInput.value = Math.floor((maxPrice + maxIncrease(maxPrice, item.mlValuation)) / 10) * 10;
                break;
        }
        minInput.dispatchEvent(new Event('input'));
        maxInput.dispatchEvent(new Event('input'));
    });
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
    triggerShowContent.click();
}

main();
