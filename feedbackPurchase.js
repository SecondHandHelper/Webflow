import {capitalizeFirstLetter, uploadTempImage} from "./sellItemHelpers";

function initializePage(item) {
    const itemTitle = (item.cleanedBrand || item.brand).trim() + "-" + item.category.toLowerCase();
    document.getElementById('itemTitle').innerText = itemTitle;
    const soldDate = new Date(item.soldDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    const subtitleText = `Köptes ${soldDate}${item.soldPlatform && item.soldPlatform !== 'Other'? ` via ${item.soldPlatform}`: ''}`;
    document.getElementById('itemSubtitle').innerText = subtitleText;
    const imageUrl = window.innerWidth <= 400 ?
        item?.images?.modelImage || item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.frontImageSmall || item?.images?.frontImage :
        item?.images?.modelImage || item?.images?.enhancedFrontImage || item?.images?.frontImage;
    document.getElementById('itemImage').src = imageUrl;
}

async function goToReclaim(itemId) {
  const res = await saveFeedback(itemId);
  window.location.href = `/reclaim/?id=${itemId}`;
}

function addEventListeners() {
    const params = getParamsObject();

    document.getElementById('doneButton').addEventListener('click', async function () {
        // Save reclaim
        const res = await saveFeedback(params.id);
        // Show confirmation
        if (res) {
            feedbackForm.style.display = 'none';
            hideAllButtons();
            toMaiButton.style.display = 'flex';
            introDiv.style.display = 'none';
            thankYouDiv.style.display = 'block';
            
            const lowRating = parseInt(document.querySelector('input[name="rating"]:checked').value) <= 2;
            reclaimLink.href = lowRating ? window.location.origin + `/reclaim/?id=${params.id}` : '#';
            reclaimText.style.display = lowRating ? 'block' : 'none';
        }
    });

    let inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Add an event listener to each input to clear validation message on input
        input.addEventListener('input', (input) => {
            input.setCustomValidity(''); // Clear validation message
        });

        if (input.tagName.toLowerCase() === 'select') {
            input.addEventListener('change', () => {
                input.setCustomValidity('');
            });
        }
    });

    const stars = document.querySelectorAll("input[type='radio'][name='rating']"); // Hämta radio-knapparna
    stars.forEach((star, index) => {
        star.addEventListener("change", function () {
            updateStars(stars, index); // Fyll i stjärnorna med färg
            stars.forEach(s => s.setCustomValidity(''));
            commentContainer.style.display = 'block';
            // Only show reclaimTextFeedbackFrom if rating is 3 or less
            const selectedRating = parseInt(star.value);
            if (selectedRating <= 3) {
                reclaimTextFeedbackFrom.style.display = 'block';
            } else {
                reclaimTextFeedbackFrom.style.display = 'none';
            }
        });
    });

    document.getElementById('reclaimLink2').addEventListener('click', async function () {
        await goToReclaim(params.id);
    });
}

function updateStars(stars, selectedIndex) {
  stars.forEach((star, index) => {
    let starContainer = star.closest("label").querySelector(".radio-button-star");
    if (index <= selectedIndex) {
        starContainer.classList.add("filled"); // Add class to fill stars
    } else {
        starContainer.classList.remove("filled"); // Remove filled class
    }
  });
}

function hideAllButtons() {
    doneButton.style.display = 'none';
}

async function validateInput() {
    document.getElementById('feedbackFormInner').reportValidity();
    return new Promise((resolve, reject) => {
        // Custom validation for stars
        const stars = document.querySelectorAll("input[type='radio'][name='rating']");
        const selectedStar = document.querySelector("input[type='radio'][name='rating']:checked");
        if (!selectedStar) {
            stars[2].setCustomValidity(`Välj ett betyg först`);
            document.getElementById('feedbackFormInner').reportValidity();
            return resolve(false);
        }
        return resolve(true)
    });
}

async function saveFeedback(itemId) {
    if (!(await validateInput())) { return false }
    const now = new Date();
    const comment = feedbackComment.value || '';
    const selectedRadio = document.querySelector('input[name="rating"]:checked');
    const rating = selectedRadio ? parseInt(selectedRadio.value) : 0;
    
    if (!rating) { return false }

    let buyerFeedback = {
        rating,
        comment,
    }

    // Spinner
    document.getElementById('doneButtonSpinner').style.display = 'block';
    document.getElementById('doneButtonText').style.display = 'none';
    // Save feedback
    console.log('Will update: ', { itemId, buyerFeedback });
    await callBackendApi(`/api/items/${itemId}/buyerFeedback`, {
      data: { buyerFeedback },
      requiresAuth: false,
    });
    return true
}

const getItem = async (itemId) => {
    const res = await callBackendApi(`/api/items/${itemId}`);
    return { ...(res?.data || {}), id: itemId };
}

const main = async () => {
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : '';
    if (!item) {
        console.error("Invalid item id param");
        location.href = '/';
    }
    initializePage(item);
    addEventListeners();
    triggerShowContent.click();
}

main();
