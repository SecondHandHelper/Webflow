window.itemValuationJsLoaded = true;
async function showDeclineValuation(item) {
    document.getElementById('valuationText').innerText = 'Säljer ej';
    document.getElementById('valuationText').style.display = 'block';
    document.getElementById('rejectButton').style.display = 'none';
    document.getElementById('confirmButton').innerText = 'Okej'
    document.getElementById('newItemButton').style.display = 'flex';
    document.getElementById('declineExplanation').style.display = 'block';
    document.getElementById('valuationExplanation').style.display = 'none';
    document.getElementById('newItemButton').addEventListener('click', () => {
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
        localStorage.removeItem('newItem');
        sessionStorage.removeItem('newItemId');
        sessionStorage.removeItem('itemValuation');
        window.location.href = '/sell-item';
    });
    document.getElementById('confirmButton').addEventListener('click', () => {
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
    const minInput = document.getElementById('minPrice').value;
    const maxInput = document.getElementById('maxPrice').value;
    return minInput <= minPrice * 1.5 && maxInput <= maxPrice * 1.5 && minInput < maxInput && minInput >= 100;
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
const priceOutsideOkRange = (estimatedPrice, minOrMaxPrice, adjustedPrice) => {
    if (priceTooHigh(minOrMaxPrice, adjustedPrice)) {
        return true;
    } else if (minOrMaxPrice < estimatedPrice && adjustedPrice > estimatedPrice) {
        return true;
    }
    return false;
}

const adjustmentRequiresReview = (estimatedPrice, minPrice, maxPrice, adjustmentMin, adjustmentMax) => {
    return priceOutsideOkRange(estimatedPrice, minPrice, adjustmentMin) ||
        priceOutsideOkRange(estimatedPrice, maxPrice, adjustmentMax);
}

const adjustmentWarningText = (estimatedPrice, minPrice, maxPrice, adjustmentMin, adjustmentMax) => {
    const highPrice = [
        priceTooHigh(maxPrice, adjustmentMax) ? 'startpris' : null,
        priceTooHigh(minPrice, adjustmentMin) ? 'lägsta pris' : null
    ].filter(p => p).join(' och ');
    if (highPrice.length) {
        return `Ovanligt högt ${highPrice}, kräver granskning.`;
    } else if (adjustmentMin > estimatedPrice) {
        return 'Lägsta priset överstiger värdering, kräver granskning.'
    }
    return '';
}

const adjustmentValidations = (estimatedPrice, minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput) => {
    document.getElementById('resetButton').style.visibility = 'visible';
    const adjustmentMin = Number(adjustmentMinInput.value);
    const adjustmentMax = Number(adjustmentMaxInput.value);
    adjustmentMaxInput.style.color = priceOutsideOkRange(estimatedPrice, maxPrice, adjustmentMax) ? '#E20000' : '#333';
    adjustmentMinInput.style.color = priceOutsideOkRange(estimatedPrice, minPrice, adjustmentMin) ? '#E20000' : '#333';
    if (adjustmentRequiresReview(estimatedPrice, minPrice, maxPrice, adjustmentMin, adjustmentMax)) {
        document.getElementById('adjustmentMotivation').style.display = 'block';
        document.getElementById('adjustmentWarningText').innerText = adjustmentWarningText(estimatedPrice, minPrice, maxPrice, adjustmentMin, adjustmentMax);
        document.getElementById('adjustmentTips').style.display = 'none';
        document.getElementById('adjustmentNote').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Skicka för granskning';
    } else if (adjustmentMax !== maxPrice || adjustmentMin !== minPrice) {
        document.getElementById('adjustmentNote').style.display = 'block';
        document.getElementById('adjustmentTips').style.display = 'none';
        document.getElementById('adjustmentMotivation').style.display = 'none';
        if (adjustmentMax > maxPrice) {
            document.getElementById('higherMaxPriceText').style.display = 'block';
            document.getElementById('higherMinPriceText').style.display = 'none';
            document.getElementById('lowerMinOrMaxPriceText').style.display = 'none';
        } else if (adjustmentMin > minPrice) {
            document.getElementById('higherMaxPriceText').style.display = 'none';
            document.getElementById('higherMinPriceText').style.display = 'block';
            document.getElementById('lowerMinOrMaxPriceText').style.display = 'none';
        } else {
            document.getElementById('higherMaxPriceText').style.display = 'none';
            document.getElementById('higherMinPriceText').style.display = 'none';
            document.getElementById('lowerMinOrMaxPriceText').style.display = 'block';
        }
        document.getElementById('confirmButton').innerText = 'Påbörja försäljning';
    } else {
        document.getElementById('adjustmentTips').style.display = 'block';
        document.getElementById('adjustmentNote').style.display = 'none';
        document.getElementById('adjustmentMotivation').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Påbörja försäljning';
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

async function acceptValuation(itemId, minPrice, maxPrice) {
    if (!validateInput()) {
        return;
    }
    const minInput = Number(document.getElementById('minPrice').value);
    const maxInput = Number(document.getElementById('maxPrice').value);
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        const savedItem = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
        savedItem.item.infoRequests.price.status = 'Resolved';
        savedItem.item.infoRequests.price.response = 'Accepted';
        if (featureIsEnabled('adjustValuation') && (minInput?.value !== minPrice || maxInput?.value !== maxPrice)) {
            savedItem.item.infoRequests.price.userAdjustedMin = Number(minInput.value);
            savedItem.item.infoRequests.price.userAdjustedMax = Number(maxInput.value);
            if (!adjustmentOk(minPrice, maxPrice)) {
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
        await firebase.app().functions("europe-west1").httpsCallable('saveAcceptedValuation')({
            itemId, minPrice, maxPrice, adjustmentMin: Number(minInput.value), adjustmentMax: Number(maxInput.value),
            userProposalMotivation: document.getElementById('userProposalMotivation').value
        });
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
    document.getElementById('itemImage').src = window.innerWidth <= 400 ? item?.images?.enhancedFrontImageSmall : item?.images?.enhancedFrontImage;
    document.getElementById('chatLink').onclick = () => Intercom('showNewMessage',
        item.mlValuation?.decline ?
            `ID: ${item.id}\n\nGällande att ni tackade nej till ${item.brand.trim()}-${item.category.toLowerCase()}:\n\n` :
            `ID: ${item.id}\n\nGällande värderingen på ${item.mlValuation.minPriceEstimate}-${item.mlValuation.maxPriceEstimate} kr för ${item.brand.trim()}-${item.category.toLowerCase()}. Vad skulle du vilja ändra värderingen till och varför?\n\n`);
    document.getElementById('valuationClose').addEventListener('click', () => {
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
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
    if (!params.id) {
        localStorage.removeItem('newItem');
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
    const newValue = Math.floor(value/valPriceAdjustment)*valPriceAdjustment;
    input.value = Math.max(100, newValue === value ? value - valPriceAdjustment : newValue);
    input.dispatchEvent(new Event('input'));
}

const increasePrice = (input, origValue) => {
    const value = Number(input.value);
    const valPriceAdjustment = priceAdjustment(origValue);
    const newValue = Math.ceil(value/valPriceAdjustment)*valPriceAdjustment;
    input.value = newValue === value ? value + valPriceAdjustment : newValue;
    input.dispatchEvent(new Event('input'));
}

const showMlValuation = async (item) => {
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate, decline, adjustmentAllowed } = item.mlValuation || {};
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice =  item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
    const estimatedPrice = Math.round((minPrice+maxPrice)/20)*10;
    document.getElementById('valuationResultDiv').style.display = 'flex';
    triggerShowContent.click();
    document.getElementById('valuationText').innerText = `${minPrice}-${maxPrice} kr`;
    if (featureIsEnabled('adjustValuation') && adjustmentAllowed) {
        rangeSlider(minPrice, maxPrice, estimatedPrice);
        document.getElementById('oldButtons').style.display = 'none';
        document.getElementById('headerTitle').style.display = 'none';
        document.getElementById('chatDiv').style.display = 'none';
        document.getElementById('stickyButtons').style.display = 'block';
        document.getElementById('valuationText').innerText = `${estimatedPrice} kr`;
        document.getElementById('valuationHeading').style.display = 'block';
        document.getElementById('valuationMotivation').style.display = 'flex';
        document.getElementById('valuationMotivation').dataset.text = document.getElementById('valuationExplanation').innerText;
        document.getElementById('valuationMotivation').addEventListener('click', (e) => {
            const elements = document.getElementsByClassName('tooltip-motivation');
            const visible = elements[0]?.classList.contains('tooltip-show');
            for (const element of elements) {
                visible ? element.classList.remove('tooltip-show') : element.classList.add('tooltip-show');
            }
            e.stopPropagation();
        });
        document.body.addEventListener('click', hideTooltip);
        document.getElementById('valuationRange').style.display = 'flex';
        document.getElementById('minPrice').value = minPrice;
        document.getElementById('minPrice').disabled = true;
        document.getElementById('maxPrice').value = maxPrice;
        document.getElementById('maxPrice').disabled = true;
        document.getElementById('origMinPrice').innerText = minPrice;
        document.getElementById('origMinPrice').style.visibility = 'hidden';
        document.getElementById('origMaxPrice').innerText = maxPrice;
        document.getElementById('origMaxPrice').style.visibility = 'hidden';
        if (item.infoRequests?.price?.finalOffer === 'true') {
            document.getElementById('adjustInterval').style.display = 'none';
        }
        document.getElementById('adjustInterval').addEventListener('click', () => {
            document.getElementById('valuationExplanation').style.display = 'none';
            document.getElementById('minPrice').disabled = false;
            document.getElementById('maxPrice').disabled = false;
            document.getElementById('adjustInterval').style.display = 'none';
            document.getElementById('adjustmentTips').style.display = 'block';
            document.getElementById('adjustmentNote').style.display = 'none';
            document.getElementById('sliderDiv').style.display = 'block';
        })
        document.getElementById('resetButton').addEventListener('click', () => {
           document.getElementById('minPrice').value = minPrice;
           document.getElementById('maxPrice').value = maxPrice;
           document.getElementById('minPrice').dispatchEvent(new Event('input'));
           document.getElementById('maxPrice').dispatchEvent(new Event('input'));
           document.getElementById('adjustmentSlider').value = 3;
        });
        document.getElementById('minPrice').addEventListener('input', () => {
            const adjustmentMinInput = document.getElementById('minPrice');
            const adjustmentMaxInput = document.getElementById('maxPrice');
            const adjustmentMin = Number(adjustmentMinInput.value);
            if (adjustmentMin !== minPrice) {
                document.getElementById('origMinPrice').style.visibility = 'visible';
            } else {
                document.getElementById('origMinPrice').style.visibility = 'hidden';
            }
            adjustmentValidations(estimatedPrice, minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
        });
        document.getElementById('minIncrease').addEventListener('click', () =>
            increasePrice(document.getElementById('minPrice'), minPrice)
        );
        document.getElementById('minDecrease').addEventListener('click', () =>
            lowerPrice(document.getElementById('minPrice'), minPrice)
        );
        document.getElementById('maxPrice').addEventListener('input', () => {
            const adjustmentMaxInput = document.getElementById('maxPrice');
            const adjustmentMinInput = document.getElementById('minPrice');
            const adjustmentMax = Number(adjustmentMaxInput.value);
            if (adjustmentMax !== maxPrice) {
                document.getElementById('origMaxPrice').style.visibility = 'visible';
            } else {
                document.getElementById('origMaxPrice').style.visibility = 'hidden';
            }
            adjustmentValidations(estimatedPrice, minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
        });
        document.getElementById('maxIncrease').addEventListener('click', () =>
            increasePrice(document.getElementById('maxPrice'), maxPrice)
        );
        document.getElementById('maxDecrease').addEventListener('click', () =>
            lowerPrice(document.getElementById('maxPrice'), maxPrice)
        );
    }
    document.getElementById('valuationText').style.display = 'block';
    if (!sessionStorage.getItem('itemToBeCreatedAfterSignIn') && !(featureIsEnabled('adjustValuation') && adjustmentAllowed)) {
        document.getElementById('chatDiv').style.display = 'block';
    }
    if (decline) {
        await showDeclineValuation(item);
    } else {
        document.getElementById('confirmButton').addEventListener('click', () => acceptValuation(item.id, minPrice, maxPrice));
        document.getElementById('rejectButton').addEventListener('click', () => rejectValuation(item));
    }
}

const getItem = async (itemId) => {
    const res = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId })
    return { ...(res?.data || {}), id: itemId };
}

const maxIncrease = (price) => {
    if (price < 500) {
        return price * 1.5 - price;
    } else if (price < 1000) {
        return price * 1.4 - price;
    }
    return price * 1.3 - price;
}

const minPriceMaxIncrease = (minPrice, estimatedPrice) => Math.min(maxIncrease(minPrice), estimatedPrice-minPrice);

function rangeSlider(minPrice, maxPrice, estimatedPrice) {
    const range = document.getElementById('adjustmentSlider');
    range.addEventListener('touchend', () => range.value = Math.round(Number(range.value)) );
    range.addEventListener('mouseup', () => range.value = Math.round(Number(range.value)) );
    range.addEventListener('input', function() {
        let minInput = document.getElementById('minPrice');
        let maxInput = document.getElementById('maxPrice');
        const closestValue = Math.round(Number(range.value));
        switch(closestValue) {
            case 0: // -50%
                minInput.value = Math.max(100, Math.round((minPrice*0.5)/10)*10);
                maxInput.value = Math.max(100, Math.round((maxPrice*0.5)/10)*10);
                break;
            case 1: // -33%
                minInput.value = Math.max(100, Math.round((minPrice*0.66)/10)*10);
                maxInput.value = Math.max(100, Math.round((maxPrice*0.66)/10)*10);
                break;
            case 2: // -17%
                minInput.value = Math.max(100, Math.round((minPrice*0.83)/10)*10);
                maxInput.value = Math.max(100, Math.round((maxPrice*0.83)/10)*10);
                break;
            case 3:
                minInput.value = minPrice;
                maxInput.value = maxPrice;
                break;
            case 4:
                minInput.value = Math.round((minPrice+minPriceMaxIncrease(minPrice, estimatedPrice)*0.33)/10)*10;
                maxInput.value = Math.round((maxPrice+maxIncrease(maxPrice)*0.33)/10)*10;
                break;
            case 5:
                minInput.value = Math.round((minPrice+minPriceMaxIncrease(minPrice, estimatedPrice)*0.67)/10)*10;
                maxInput.value = Math.round((maxPrice+maxIncrease(maxPrice)*0.67)/10)*10;
                break;
            case 6:
                minInput.value = Math.round((minPrice+minPriceMaxIncrease(minPrice, estimatedPrice))/10)*10;
                maxInput.value = Math.round((maxPrice+maxIncrease(maxPrice))/10)*10;
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

    const item = params.id ? (await getItem(params.id)) :
        (JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn') || '{}')?.item || JSON.parse(localStorage.getItem('latestItemCreated') || '{}'));
    if (!item) {
        console.error('Invalid item id or no saved item to show valuation for');
        return location.href = '/private';
    }
    initialPageSetup(item);
    await user.whenSet(() => showMlValuation(item));
}

main();
