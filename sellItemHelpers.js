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
    const response = await fetch(`${BACKEND_API_URL}/api/items/${tempId}/uploadImage`, {
        method: 'POST',
        body: form
    });
    return await response.json();
}

async function scaleImageToMaxSize(input) {
    if (input.size < 5 * 1024 * 1024) {
        // Don't compress images < 5MB in size
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
    try {
        const response = await callBackendApi('/api/id', { method: 'POST', requiresAuth: false });
        return response.data.id;
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
        showImagePreview('frontImage', window.innerWidth <= 370 ? enhancedImageUrls.urlSmall : enhancedImageUrls.url);
    }
    showDeleteImageIcon('frontImage');
    return enhancedImageUrls;
}

async function createEnhancedImage(imageUrl) {
  try {
    const response = await callBackendApi('/api/images/enhance', {
      data: { imageUrl },
      requiresAuth: false,
      timeoutSec: 30
    });
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

export async function uploadImageAndShowPreview(input, imageName, saveState = true) {
    try {
        hideImageError(imageName);
        let src = URL.createObjectURL(input);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = `url('${src}')`;
        document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${src}')`;
        showLoadingIcon(imageName)
        showImageState(imageName, 'success-state');
        const { url: imageUrl, urlSmall: imageUrlSmall } = await uploadTempImage(input, imageName);
        if (saveState) {
            rememberNewItemImageField(imageName, imageUrl, imageUrlSmall);
        }
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

export function showLoadingIcon(imageName) {
    if (imageName === 'frontImage'){
        document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        if(!localStorage.getItem('sessionUser')){
          document.getElementById('photoroomDiv').style.display = 'flex';
        };
        document.getElementById('enhancedAnimationDiv').style.display = 'block';
        triggerEnhancingAnimation.click();
        return
    }
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
}

export function checkBlockedOrLowShareSoldBrand(brand, category) {
  const BLOCKED_BRANDS = ['shein', 'lager 157', 'divided', 'brandy melville', 'cubus', 'bubbleroom', 'bondelid', 'nelly',
    'dobber', 'åhléns', 'kappahl', 'primark', 'jack & jones', 'sisters point', 'missguided', 'topman',
    'bik bok', 'cubus', 'happy holly', 'zign', 'glamorous', 'hollister', 'river island',
    'light before dark', 'bohoo', 'crocker', 'forever 21', 'maze', 'mint&berry', 'chiara forthi',
    'zalando', 'din sko', 'pull & bear', 'svea', 'zoul', 'boohoo', 'gap', 'topshop', 'ellos', 'lager 157',
    'stradivarius', 'studio total', 'indiska', 'bershka', 'shein', 'riley', 'vero moda', 'vila',
    'don donna', 'aldo', 'new look denim']

  const BLOCK_ONLY_LOW_VALUE_CATEGORY = ['karl kani', 'rieker', 'uniqlo', 'carin wester', 'stockh lm', 'weekday', 'mango',
    'wera', 'ichi', 'lindex', 'h&m', 'zara', 'mng', 'mq', 'cheap monday', 'h&m premium',
    'na-kd', 'clarks', 'gant', 'hackett', 'hugo boss', 'la chemise', 'lacoste',
    'lyle & scott', 'marc o\'polo', 'melvin & hamilton', 'ray-ban', 'reebok', 'sebago',
    'stenströms', 'the shirt factory', 'hampton republic', 'quicksilver',
    'banana republic', 'pieces', 'sprit', 'denim', 'east west', 'xit', 'jacqueline de yong',
    'mexx', 'fb sister', 'okänt', 'bodyflirt', 'dorothy perkins', 'fransa', 'laurel',
    'rut&circle', 'soc', 'junkyard', 'soyaconcept', 'amisu', 'u.s. polo assn.',
    'line of oslo', 'gossip', 'i say', 'jascha stockholm', 'noisy may', 'six ames',
    'velour by nostalgi', 'house of lola', 'fiveunits', 'miss me', 'flash', 'champion',
    'under armour', 'oasis', 'fornarina', 'isolde', 'rosebud', 'chiquelle', 'kaffe',
    'mckinley', 'cream', 'abercrombie & fitch', 'modström', 'ecco', 'esprit',
    'alice bizous', 'craft', 'ellesse', 'wesc', 'dry lake', 'röhnisch', 'acqua limone',
    'anna field', 'le', 'ax paris', 'burton', 'hansen & jacob', 'lou in love', 'mad lady',
    'selected homme', 'tenson', 'whistles', 'zizzi', 'gerry weber']

  const BLOCK_NON_HIGH_VALUE_CATEGORY = ['tom tailor', 'monki', 'dressmann', 'urban outfitters', 'asos', 'holly & white',
    'only', 'gina tricot']

  const HIGH_VALUE_CATEGORY = ['boots', 'dunjacka', 'jacka', 'kängor', 'kappa', 'kavaj', 'kostym', 'pälsjacka', 'regnjacka',
    'rock', 'skinnjacka', 'vinterskor']

  const LOW_VALUE_CATEGORY = ['baddräkt', 'bikini', 'bodysuit', 'chinos', 'flip-flops', 'halsduk', 'handduk', 'hatt', 'jeans',
    'keps', 'långärmad t-shirt', 'linne', 'mjukisbyxor', 'morgonrock', 'mössa', 'necessär', 'piké',
    'pyjamas', 'sandaler', 'sarong', 'shorts', 'slips', 'sport-bh', 'strumpbyxor', 't-shirt',
    'tights', 'topp', 'träningsbyxor', 'träningströja', 'underställ', 'vantar']

  let hardToSellDiv = document.getElementById("hardToSellDiv");
  let wordsToWarnOn = ["H&M", "HM", "Zara", "ASOS", "Nelly", "Gina Tricot", "BikBok", "Bik Bok", "Lindex", "Kappahl", "Cubus", "NA-KD", "NAKD", "Mango", "Ellos", "Primark", "Shein", "Vila", "Forever 21", "Pull & Bear", "Bershka", "Stradivarius"];
  document.getElementById("itemBrand").setCustomValidity('');
  const params = getParamsObject();;
  if ( !params.id && (
      BLOCKED_BRANDS.includes(brand.toLowerCase()) ||
      (!HIGH_VALUE_CATEGORY.includes(category?.toLowerCase()) && BLOCK_NON_HIGH_VALUE_CATEGORY.includes(brand.toLowerCase())) ||
      (LOW_VALUE_CATEGORY.includes(category?.toLowerCase()) && BLOCK_ONLY_LOW_VALUE_CATEGORY.includes(brand.toLowerCase()))
    )
  ) {
    hardToSellText.innerHTML = BLOCKED_BRANDS.includes(brand.toLowerCase()) ?
      `Vi säljer tyvärr inte ${brand}-plagg på grund av för låg efterfrågan.` :
      `Vi säljer tyvärr inte kategorin ${category} från ${brand} på grund av för låg efterfrågan.`;
    stopIcon.style.display = 'flex';
    warningIcon.style.display = 'none';
    hardToSellDiv.style.display = 'block';
    document.getElementById("itemBrand").setCustomValidity(BLOCKED_BRANDS.includes(brand.toLowerCase()) ?
      `Vi säljer inte plagg från ${brand}` : `Vi säljer inte kategorin '${category}' från ${brand}`);
    return true;
  } else if (wordsToWarnOn.some(words => brand.toLowerCase().includes(words.toLowerCase()))) {
    hardToSellText.innerHTML = `Vi säljer i regel inte ${brand}-plagg på grund av för lågt andrahandsvärde. Undantag kan finnas.`;
    stopIcon.style.display = 'none';
    warningIcon.style.display = 'block';
    hardToSellDiv.style.display = 'block';
    return true;
  } else {
    hardToSellDiv.style.display = 'none';
  }
}

export function initializeCategorySelect(placeholderText = 'Kategori', onChangeCallback = checkBlockedOrLowShareSoldBrand) {
  const itemCategories = [
    { "id": "", "text": "", },
    {
      "text": "Överdelar", "children": [
        { "id": "Tröja", "text": "Tröja", }, { "id": "Blus", "text": "Blus", }, { "id": "Topp", "text": "Topp", }, { "id": "Skjorta", "text": "Skjorta", }, { "id": "Linneskjorta", "text": "Linneskjorta", }, { "id": "T-shirt", "text": "T-shirt", }, { "id": "Kavaj", "text": "Kavaj", }, { "id": "Sweatshirt", "text": "Sweatshirt", }, { "id": "Hoodie", "text": "Hoodie", }, { "id": "Polotröja", "text": "Polotröja", }, { "id": "Tunika", "text": "Tunika", }, { "id": "Väst", "text": "Väst", }, { "id": "Kofta", "text": "Kofta", }, { "id": "Linne", "text": "Linne", }, { "id": "Träningströja", "text": "Träningströja", }, { "id": "Poncho", "text": "Poncho", }, { "id": "Piké", "text": "Piké", }, { "id": "Långärmad T-shirt", "text": "Långärmad T-shirt", }, { "id": "Kostymväst", "text": "Kostymväst", }
      ]
    },
    {
      "text": "Underdelar", "children": [
        { "id": "Kjol", "text": "Kjol", }, { "id": "Byxor", "text": "Byxor", }, { "id": "Jeans", "text": "Jeans", }, { "id": "Chinos", "text": "Chinos", }, { "id": "Fritidsbyxor", "text": "Fritidsbyxor", }, { "id": "Träningsbyxor", "text": "Träningsbyxor", }, { "id": "Tights", "text": "Tights", }, { "id": "Strumpbyxor", "text": "Strumpbyxor", }, { "id": "Mjukisbyxor", "text": "Mjukisbyxor", }, { "id": "Kostymbyxor", "text": "Kostymbyxor", }, { "id": "Shorts", "text": "Shorts", }, { "id": "Sarong", "text": "Sarong", }
      ]
    },
    {
      "text": "Helkropp", "children": [
        { "id": "Klänning", "text": "Klänning", }, { "id": "Kaftan", "text": "Kaftan", }, { "id": "Kostym", "text": "Kostym", }, { "id": "Set", "text": "Set", }, { "id": "Jumpsuit", "text": "Jumpsuit", }, { "id": "Baddräkt", "text": "Baddräkt", }, { "id": "Bikini", "text": "Bikini", }, { "id": "Pyjamas", "text": "Pyjamas", }, { "id": "Morgonrock", "text": "Morgonrock", }, { "id": "Bröllopsklänning", "text": "Bröllopsklänning", }, { "id": "Balklänning", "text": "Balklänning", }, { "id": "Bodysuit", "text": "Bodysuit", }, { "id": "Underställ", "text": "Underställ", }
      ]
    },
    {
      "text": "Ytterkläder", "children": [
        { "id": "Jacka", "text": "Jacka", }, { "id": "Kappa", "text": "Kappa", }, { "id": "Rock", "text": "Rock", }, { "id": "Fritidsjacka", "text": "Fritidsjacka", }, { "id": "Trenchcoat", "text": "Trenchcoat", }, { "id": "Skinnjacka", "text": "Skinnjacka", }, { "id": "Dunjacka", "text": "Dunjacka", }, { "id": "Regnjacka", "text": "Regnjacka", }, { "id": "Pälsjacka", "text": "Pälsjacka", }
      ]
    },
    {
      "text": "Skor", "children": [
        { "id": "Sneakers", "text": "Sneakers", }, { "id": "Sandaler", "text": "Sandaler", }, { "id": "Klackar", "text": "Klackar", }, { "id": "Ballerinaskor", "text": "Ballerinaskor", }, { "id": "Loafers", "text": "Loafers", }, { "id": "Flip-flops", "text": "Flip-flops", }, { "id": "Boots", "text": "Boots", }, { "id": "Kängor", "text": "Kängor", }, { "id": "Vinterskor", "text": "Vinterskor", }, { "id": "Skor", "text": "Annat (Skor)", }
      ]
    },
    {
      "text": "Väskor", "children": [
        { "id": "Axelremsväska", "text": "Axelremsväska", }, { "id": "Handväska", "text": "Handväska", }, { "id": "Kuvertväska", "text": "Kuvertväska", }, { "id": "Ryggsäck", "text": "Ryggsäck", }, { "id": "Träningsväska", "text": "Träningsväska", }, { "id": "Resväska", "text": "Resväska", }, { "id": "Datorväska", "text": "Datorväska", }, { "id": "Väska", "text": "Annat (Väska)", }
      ]
    },
    {
      "text": "Accessoarer", "children": [
        { "id": "Solglasögon", "text": "Solglasögon", }, { "id": "Glasögon", "text": "Glasögon", }, { "id": "Örhänge", "text": "Örhänge", }, { "id": "Halsband", "text": "Halsband", }, { "id": "Armband", "text": "Armband", }, { "id": "Ring", "text": "Ring", }, { "id": "Brosch", "text": "Brosch", }, { "id": "Keps", "text": "Keps", }, { "id": "Sjal", "text": "Sjal", }, { "id": "Krage", "text": "Krage", }, { "id": "Bälte", "text": "Bälte", }, { "id": "Plånbok", "text": "Plånbok", }, { "id": "Halsduk", "text": "Halsduk", }, { "id": "Hatt", "text": "Hatt", }, { "id": "Mössa", "text": "Mössa", }, { "id": "Vantar", "text": "Vantar", }, { "id": "Necessär", "text": "Necessär", }, { "id": "Slips", "text": "Slips", }, { "id": "Handduk", "text": "Handduk", }, { "id": "Klocka", "text": "Klocka", }
      ]
    }
  ];
  $('#itemCategory').select2({ selectionCssClass: 'form-field', placeholder: placeholderText || 'Kategori', data: itemCategories });
  $("body").on('click', '.select2-container--open .select2-results__group', function () {
    if ($(this).parent().attr('class').match(/expanded-group/)) {
      $(this).parent().removeClass('expanded-group');
    } else {
      $('.expanded-group').first().removeClass('expanded-group');
      $(this).parent().addClass('expanded-group');
    }
  });

  let headerAdded = false;
  $('#itemCategory').on('select2:select', () => {
    analytics.track('Click', { elementID: 'itemCategoryValue' });
    document.querySelector('#itemCategory').dispatchEvent(new Event('change'));
  });
  let searchClickTracked = false;
  $('#itemCategory').on('select2:open', () => {
    if (!searchClickTracked) {
      searchClickTracked = true;
      $('input.select2-search__field').on('click', () => {
        analytics.track('Click', { elementID: 'itemCategorySearch' });
      });
    }
  });

  $('#itemCategory').on('select2:close', () => {
    document.querySelector('body').style.overflow = 'auto'
    document.querySelector('body').style.position = 'static';
    document.querySelector('html').style.overflow = 'static';
  });
  $('#itemCategory').on('select2:open', function () {
    analytics.track("Element Viewed", { elementID: "itemCategoryContainer" });
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.position = 'fixed';
    document.querySelector('html').style.overflow = 'fixed';
    const searchField = document.querySelector('.select2-search__field');
    searchField.placeholder = 'Sök... (t.ex. Klänning/Sneakers/Blus)';
    $('.select2-search__field').on('input', (e) => {
      if (e.target.value.length > 0) {
        $('.select2-results__option[role=group]').each((idx, elm) => $(elm).addClass('expanded-group'));
      } else {
        $('.expanded-group').each((idx, elm) => $(elm).removeClass('expanded-group'));
      }
    });
    if (!headerAdded) {
      const header = document.getElementById('categoryPopUpHeader');
      const container = document.querySelector('.select2-dropdown');
      container.insertBefore(header, container.firstChild);
      header.style.display = 'block';
      header.querySelector('#categorySelectClose').onclick = () => $('#itemCategory').select2('close');
      headerAdded = true;
    }
    document.querySelector('.select2-results__options').addEventListener('scroll', () => document.activeElement.blur());
  });

  $('#itemCategory').on('change', (event) => {
    fieldLabelToggle('itemCategoryLabel')(event);
    const category = document.getElementById('itemCategory');
    const brand = document.getElementById("itemBrand");
    onChangeCallback(brand.value, category.value);
  });

  // From https://github.com/select2/select2/issues/3015#issuecomment-570171720
  $("#itemCategory").on("select2:open", function () {
    $(".select2-results").css("visibility", "hidden");
  });
  $("#itemCategory").on('select2:opening', function () {
    setTimeout(function () {
      $(".select2-results").css("visibility", "visible");
    }, 50);
  });
}

export function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

export function colorName(color) {
  const mapping = {
    Beige: 'Beige', Blue: 'Blå', Brown: 'Brun', Green: 'Grön', Grey: 'Grå', Yellow: 'Gul', Gold: 'Guld',
    Purple: 'Lila', Navy: 'Navy', Orange: 'Orange', Pink: 'Rosa', Red: 'Röd', Silver: 'Silver', Black: 'Svart',
    Turquoise: 'Turkos', Burgundy: 'Vinröd', White: 'Vit', Multicolour: 'Flerfärgad'
  };
  return mapping[color] || color;
}
