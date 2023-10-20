export async function uploadTempImage(input, fileName) {
    if (!sessionStorage.getItem('newItemId')) {
        sessionStorage.setItem('newItemId', await  requestUniqueId());
    }
    const tempId = sessionStorage.getItem('newItemId');
    let image = await scaleImageToMaxSize(input);
    if (!image) {
        throw 'Fel vid bearbetning av vald bild.';
    }
    const form = new FormData();
    form.append('itemId', tempId);
    form.append('fileName', fileName);
    form.append('file', image);
    form.append('temporary', 'true');
    form.append('generateSmallImage', 'true');
    const response = await fetch('https://uploaditemimagebinary-heypmjzjfq-ew.a.run.app', {
        method: 'POST',
        body: form
    });
    return await response.json();
}

async function scaleImageToMaxSize(input) {
    if (input.size < 9 * 1024 * 1024) {
        // Don't compress images < 9MB in size
        return Promise.resolve(input);
    }
    return new Promise((resolve, reject) => {
        const MAX_WIDTH = 1512;
        const MAX_HEIGHT = 2016;
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement("img");
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = width * (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(resolve, 'image/jpeg')
            }
            img.src = reader.result;
            reader.onerror = reject;
        }
        reader.readAsDataURL(input);
    });
}

export async function requestUniqueId() {
    const endpointUrl = 'https://generateuniqueid-heypmjzjfq-ew.a.run.app';
    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return null;
        }
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error(`Failed to fetch unique ID, generating uuidv4 id: ${error.message}`, error);
        return uuidv4();
    }
}

export async function enhanceFrontImage(imageUrl, saveState = true) {
    const enhancedImageUrls = await createEnhancedImage(imageUrl);
    if (enhancedImageUrls?.url) {
        if (saveState) {
            rememberNewItemImageField('enhancedFrontImage', enhancedImageUrls.url, enhancedImageUrls.urlSmall);
        }
        showImagePreview('frontImage', window.innerWidth <= 400 ? enhancedImageUrls.urlSmall : enhancedImageUrls.url);
    }
    showDeleteImageIcon('frontImage');
    return enhancedImageUrls;
}

async function createEnhancedImage(imageUrl) {
    try {
        const response = await firebase.app().functions("europe-west1").httpsCallable('enhanceFrontImage')({ imageUrl });
        sessionStorage.setItem('enhancedFrontImage', response.data.url)
        return response.data;
    } catch (ex) {
        errorHandler.report(ex);
        console.error(ex);
        return '';
    }
}

export function showDeleteImageIcon(imageName) {
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
    if (imageName === 'frontImage'){
        document.getElementById('enhancedAnimationDiv').style.display = 'none';
    }
}

export function rememberNewItemImageField(imageName, imageUrl, imageUrlSmall) {
    let newItem = JSON.parse(localStorage.getItem('newItem') || JSON.stringify({}));
    const images = newItem.images || {};
    images[imageName] = imageUrl;
    images[`${imageName}Small`] = imageUrlSmall;
    newItem.images = images;
    localStorage.setItem('newItem', JSON.stringify(newItem));
}

export function showImagePreview(imageName, url) {
    document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
    showDeleteImageIcon(imageName);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function uploadImageAndShowPreview(input, imageName) {
    try {
        hideImageError(imageName);
        let src = URL.createObjectURL(input);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = `url('${src}')`;
        document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${src}')`;
        showLoadingIcon(imageName)
        showImageState(imageName, 'success-state');
        const { url: imageUrl, urlSmall: imageUrlSmall } = await uploadTempImage(input, imageName);
        rememberNewItemImageField(imageName, imageUrl, imageUrlSmall);
        return imageUrl;
    } catch (ex) {
        console.error('Failed to upload image', ex);
        errorHandler.report(ex);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = '';
        document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
        document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        showImageState(imageName, 'default-state');
        if (input.size > 10 * 1024 * 1024) {
            showImageError(imageName, 'Error: Bilden är för stor. Max 10 MB.');
        } else {
            showImageError(imageName, 'Error: Något gick fel vid uppladdning, försök igen eller kontakt oss om felet kvarstår.');
        }
        document.getElementById(imageName).value = '';
    }
}

function showImageError(imageName, error) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector('.w-file-upload-error').style.display = 'block';
    parentNode.querySelector('.w-file-upload-error-msg').innerText = error;
}

function hideImageError(imageName) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector('.w-file-upload-error').style.display = 'none';
}

export function showImageState(imageName, state) {
    const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
        if (siblings[i].className.includes(state)) {
            siblings[i].style.display = 'block';
        } else {
            // Hide other states of file input field "empty-state" and "error-state"
            siblings[i].style.display = 'none';
        }
    }
}

function showLoadingIcon(imageName) {
    if (imageName === 'frontImage'){
        document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        document.getElementById('enhancedAnimationDiv').style.display = 'block';
        triggerEnhancingAnimation.click();
        return
    }
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
}
