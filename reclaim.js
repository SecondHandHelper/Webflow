import { enhanceFrontImage, showImageState, uploadImageAndShowPreview, uploadTempImage, capitalizeFirstLetter } from "./sellItemHelpers";

function initializePage(item) {
    const itemTitle = (item.cleanedBrand || item.brand).trim() + "-" + item.category.toLowerCase();
    document.getElementById('itemTitle').innerText = itemTitle;
    document.getElementById('itemTitleBanner').innerText = itemTitle;
    console.log('item', item);
    console.log('soldDate', item.soldDate);
    const soldDate = new Date(item.soldDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    const subtitleText = `${item.soldPrice} kr, ${soldDate}`;
    document.getElementById('itemSubtitle').innerText = 'Köptes för ' + subtitleText;
    document.getElementById('itemSubtitleBanner').innerText = subtitleText;
    const imageUrl = window.innerWidth <= 400 ?
        item?.images?.modelImage || item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.frontImageSmall || item?.images?.frontImage :
        item?.images?.modelImage || item?.images?.enhancedFrontImage || item?.images?.frontImage;
    document.getElementById('itemImage').src = imageUrl;
    document.getElementById('itemImageBanner').src = imageUrl;
    document.getElementById('resellButton').href = `./sell-item?id=${item.id}`;
    let compensation = Math.round(item.soldPrice * 0.1)
    compensation = compensation < 60 ? 60 : compensation > 250 ? 250 : compensation;
    discount10PercentText.innerText = `Behålla plagget och få ${compensation} kr återbetalt`;
    const contact = item.buyer.Email || item.buyer.PhoneNumber;
    thankYouText.innerText = `Vi tittar på ärendet och skickar svar ${contact.includes('@') ? `till din email ${contact}` : `på SMS till ditt telefonnummer ${contact}`}`;
    // Om reclaim redan finns -> Gå direkt till Tack!
    /*
    if (item?.reclaim?.status){
        hideAllButtons();
        toMaiButton.style.display = 'flex';
        introDiv.style.display = 'none';
        thankYouDiv.style.display = 'block';
        itemBanner.style.display = 'block';
    }
    */
}

function addEventListeners() {
    document.getElementById('reclaimButton').addEventListener('click', function () {
        itemBanner.style.display = 'block';
        document.getElementById('reclaimForm').style.display = 'block';
        cancelButton.style.display = 'flex';
        doneButton.style.display = 'flex';
        resellButton.style.display = 'none';
        reclaimButton.style.display = 'none';
        document.getElementById('introDiv').style.display = 'none';
    });

    reclaimReason.onchange = function () {
        // Color and label
        let input = this.value;
        console.log('input', input);
        if (input === '') {
            reasonLabel.style.display = 'none';
            this.style.color = "#929292";
            return
        } else {
            reasonLabel.style.display = 'block';
            this.style.color = "#101010";
        }

        // Hide all fields
        const elements = document.querySelectorAll('.simple-input-container');
        elements.forEach(function (element) {
            if (!element.id.includes('Reason')) {
                element.style.display = 'none';
            }
        });
        reclaimImagesContainer.style.display = 'none';

        // Show the right fields
        if (input.includes('Defects')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
        } else if (input.includes('Listing')) {
            reclaimListingErrorContainer.style.display = 'block';
        } else if (input.includes('False')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
        } else if (input.includes('Dirty')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
        } else if (input.includes('Smelly')) {
            reclaimDescriptionContainer.style.display = 'block';
        } else {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
        }
        compensationPreferenceDiv.style.display = 'block';
    };

    reclaimListingError.onchange = function () {
        // Color and label
        let input = this.value;
        if (input === '') {
            listingErrorLabel.style.display = 'none';
            this.style.color = "#929292";
            return
        } else {
            listingErrorLabel.style.display = 'block';
            this.style.color = "#101010";
        }
        if (input === 'Other') {
            reclaimDescriptionContainer.style.display = 'block';
        }
    };

    document.getElementById('doneButton').addEventListener('click', async function () {
        //showSpinner();
        const params = getParamsObject();
        await saveReclaim(params.id);
        console.log('RECLAIM SAVED');
        reclaimForm.style.display = 'none';
        hideAllButtons();
        toMaiButton.style.display = 'flex';
        thankYouDiv.style.display = 'block';
    });

    let imageElementIds = ['reclaimImage1', 'reclaimImage2', 'reclaimImage3', 'reclaimImage4'];
    imageElementIds.forEach(function (id) {
        let elemUpload = document.getElementById(id);
        let elemPreviewUploading = document.getElementById(`${id}PreviewUploading`);
        let elemPreview = document.getElementById(`${id}Preview`);
        elemUpload.addEventListener("change", function () {
            let input = this.files[0];
            if (input) {
                let src = URL.createObjectURL(input);
                elemPreviewUploading.style.backgroundImage = `url('${src}')`;
                elemPreview.style.backgroundImage = `url('${src}')`;
                document.getElementById(`loading${capitalizeFirstLetter(id)}Icon`).style.display = 'none';
                document.getElementById(id).required = false;
            }
        });
    });
}

function hideAllButtons() {
    resellButton.style.display = 'none';
    reclaimButton.style.display = 'none';
    cancelButton.style.display = 'none';
    doneButton.style.display = 'none';
    toMaiButton.style.display = 'none';
}

async function validateInput() {
    document.getElementById('reclaimFormInner').reportValidity();
    return new Promise((resolve, reject) => {
        // Custom
        const reclaimReason = document.getElementById('reclaimReason');
        if (!reclaimReason.value) {
            reclaimReason.setCustomValidity(`Välj anledning till reklamationen`);
            document.getElementById('reclaimFormInner').reportValidity();
            return resolve(false);
        }
        return resolve(true)
    });
}

async function saveReclaim(itemId) {
    if (!(await validateInput())) { return; }
    const now = new Date();
    const reason = reclaimReason.value;
    const listingError = reclaimListingError.value || '';
    const description = reclaimDescription.value || '';
    let compensationPreference = '';
    const radios = document.getElementsByName('compensationPreference');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { compensationPreference = radios[i].value; }
    }
    const refundAmount = compensationPreference.includes('10 percent discount') ? parseInt(discount10PercentText.innerText.match(/\d+/g)) : null;

    let reclaim = {
        createdAt: now,
        status: 'Pending',
        reason,
        description,
        listingError,
        compensationPreference,
        ...(refundAmount ? { refundAmount } : {}),
    }

    console.log('Will update: ', { itemId, reclaim });

    await callFirebaseFunction("europe-west1", 'saveReclaim', { itemId, reclaim });
    await uploadAndSaveImages(itemId);
}

//IMAGE FUNCTIONS START
async function uploadAndSaveImages(itemId) {
    let elements = document.querySelectorAll("input").values();
    let images = new Map(); //Gather files from the form in a map "Images"
    elements.forEach(elem => {
        if (elem.id.includes("Image") && elem.files[0]) {
            let file = elem.files[0];
            images.set(elem, file);
        }
    });
    console.log('images', images);

    // Uploads files and add the new imageUrls to the changes object
    /*
    await Promise.all(Array.from(images).map(async ([imageName, value]) => {
        console.log(`${imageName}: ${value}`);
        const { url: imageUrl } = await uploadTempImage(value, imageName);
        await callFirebaseFunction("europe-west1", 'saveReclaimImage', {
            itemId,
            fileName: imageName,
            url: imageUrl
        });
    }));
    */
}
//IMAGE FUNCTIONS END


const getItem = async (itemId) => {
    const res = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId });
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

let changedImages = [];
main();
