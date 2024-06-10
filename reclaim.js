function initializeFields(item) {
    const itemTitle = (item.cleanedBrand || item.brand).trim() + "-" + item.category.toLowerCase();
    document.getElementById('itemTitle').innerText = itemTitle;
    document.getElementById('itemTitleBanner').innerText = itemTitle;
    const soldDate = new Date(item.soldDate);
    const formattedDate = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    const subtitleText = `${item.soldPrice} kr, ${formattedDate}`;
    document.getElementById('itemSubtitle').innerText = 'Köptes för ' + subtitleText;
    document.getElementById('itemSubtitleBanner').innerText = subtitleText;
    
    
    const imageUrl = window.innerWidth <= 400 ?
    item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImageSmall || item?.images?.frontImage :
    item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImage;
    document.getElementById('itemImage').src = imageUrl;
    document.getElementById('itemImageBanner').src = imageUrl;
}

const getItem = async (itemId) => {
    const res = await firebase.app().functions("europe-west1").httpsCallable('getItem')({ itemId });
    return { ...(res?.data || {}), id: itemId };
}

const main = async () => {
    console.log('does this run?');
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : '';
    if (!item) {
        console.error("Invalid item id param");
        location.href = '/';
    }
    initializeFields(item);
    triggerShowContent.click();
}

main();
