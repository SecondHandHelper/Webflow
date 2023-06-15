const defectsChoicesInSwedish = new Map().set("hole", "Hål").set("stain", "Fläck").set("lostFit", "Tappad passform").set("nopprig", "Nopprig").set("threadUp", "Trådsläpp").set("colorChange", "Färgändring").set("otherDefect", "Annat");
const imageElements = ["frontImage", "brandTagImage", "productImage", "defectImage", "materialTagImage", "extraImage"];

async function addItem() {
  const id = uuidv4();
  try {
    await addItemInner(id);

    // Track with segment 'User Activated'
    if (userItemsCount === 0) {
      analytics.track('User Activated');
    }

    await nextStep();
  } catch (e) {
    console.error('addItem failed', e);
  }
}

function collect() {
  let sex = "";
  const now = new Date();
  let status = "New";
  let shippingStatus = "Not sent";
  const size = itemSize.value;
  const material = itemMaterial.value ? itemMaterial.value.trim() : "";
  const brand = itemBrand.value ? itemBrand.value.trim() : "";
  const model = itemModel.value ? itemModel.value.trim() : "";
  const originalPrice = Number(itemOriginalPrice.value);
  const age = itemAge.value;
  const condition = itemCondition.value;
  const defectDescription = itemDefectDescription.value ? itemDefectDescription.value.trim() : "";
  const noAnimals = itemNoAnimals.checked;
  const noSmoke = itemNoSmoke.checked;
  const userComment = itemUserComment.value ? itemUserComment.value.trim() : "";
  const acceptPrice = Number(itemLowestAcceptPrice.value);
  const userValuationApproval = itemUserValuationApproval.checked;

  // Get defects list
  let defectElements = new Map().set("hole", hole.checked).set("stain", stain.checked).set("lostFit", lostFit.checked).set("nopprig", nopprig.checked).set("threadUp", threadUp.checked).set("colorChange", colorChange.checked).set("otherDefect", otherDefect.checked);
  let defects = [];
  defectElements.forEach((value, key) => {
    if (value) {
      let string = defectsChoicesInSwedish.get(key);
      defects.push(string);
    }
  });

  // Get radio buttons
  var sexRadioButtons = document.getElementsByName("Sex");
  for (var x = 0; x < sexRadioButtons.length; x++) {
    if (sexRadioButtons[x].checked) {
      sex = sexRadioButtons[x].id;
    }
  }

  const modelBoxFilled = document.getElementById('findModelBoxFilled');
  let modelVariantFields = {};
  if (modelBoxFilled.style.display === 'flex') {
    // There is a current model selected grab the cover image and id from it
    const modelData = JSON.parse(modelBoxFilled.getAttribute('data-model'));
    modelVariantFields = {
      modelCoverImageUrl: modelData['coverImage'],
      atModelVariantId: modelData['atVariantId'],
    }
  }

  return {
    user: authUser.current?.uid || null,
    createdAt: now,
    status,
    shippingStatus,
    sex,
    size,
    material,
    color: itemColor.value,
    category: itemCategory.value,
    brand,
    model,
    originalPrice,
    age,
    condition,
    defects,
    defectDescription,
    noAnimals,
    noSmoke,
    userComment,
    acceptPrice,
    preferences: { userValuationApproval },
    ...modelVariantFields,
  };
}

async function getShippingMethod() {
  // If first time: User chooses shipping method preference in sell item form
  let shippingMethod = 'Service point';
  if (!user.current?.preferences?.shippingMethod) {
    var radioButtons = document.getElementsByName("shippingMethod");
    for (var x = 0; x < radioButtons.length; x++) {
      if (radioButtons[x].checked) {
        const method = radioButtons[x].value; // "Service point" or "Pickup"
        if (method) {
          shippingMethod = method;
          if (authUser.current) {
            await firebase.app().functions("europe-west1").httpsCallable('updateFirebaseUser')({ preferences: { shippingMethod } });
          } else {
            sessionStorage.setItem('shippingMethod', shippingMethod);
          }
        }
      }
    }
  } else {
    shippingMethod = user.current?.preferences?.shippingMethod;
  }

  return shippingMethod;
}

async function addItemInner(id) {

  const { modelCoverImageUrl, ...pageData } = collect();
  const shippingMethod = await getShippingMethod();
  const images = await uploadImagesFromForm(id);
  if (modelCoverImageUrl) {
    images['coverImage'] = modelCoverImageUrl;
    pageData['coverImageUpdatedAt'] = new Date();
  } else if (sessionStorage.getItem('coverImagePreviewUrl')) {
    images['coverImage'] = sessionStorage.getItem('coverImagePreviewUrl');
    pageData['coverImageUpdatedAt'] = new Date();
  }
  const createdFromItem = params.id ? { createdFromItem: params.id } : {};
  const item = { ...pageData, shippingMethod, images, ...createdFromItem, version: "2" };

  if (params.id && !authUser.current) {
    sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({ id, item }));
  } else {
    await firebase.app().functions("europe-west1").httpsCallable('createItem')({ id, item });
  }

  // If first time: User submitted their phone number
  const phoneNumber = itemPhoneNumber.value;
  if (phoneNumber) {
    const pn = formatPhoneNumber(phoneNumber);
    if (authUser.current) {
      await writePhoneNumberToFirestore(authUser.current.uid, pn);
    } else {
      sessionStorage.setItem('phoneNumber', pn);
    }
  }
}

async function createItemAfterSignIn() {
  const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
  await firebase.app().functions("europe-west1").httpsCallable('createItem')(itemFromStorage);
  sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
}

async function uploadImagesFromForm(itemId) {
  const imageData = imageElements.reduce((accumulator, current) => {
    const file = document.getElementById(current).files[0] || sessionStorage.getItem(`${current}PreviewUrl`);
    if (!file) return accumulator;
    return { ...accumulator, [current]: file }
  }, {}); // { frontImage: <file object>, ... }
  return await uploadUserImages(itemId, imageData);
}

async function uploadUserImages(itemId, imageData) {
  const storageRef = storage.ref();
  const promises = await Promise.all(Object.keys(imageData).map(async (key) => {
    if (typeof imageData[key] === 'string') {
      return { [key]: await Promise.resolve(imageData[key]) };
    }
    const imagePathReference = `images/${itemId}/${key}`;
    const file = imageData[key];
    let fileRef = storageRef.child(imagePathReference);
    await fileRef.put(file);
    return { [key]: await fileRef.getDownloadURL() };
  }));
  return Object.assign(...promises);
}

async function nextStep(options) {
  if (!authUser.current) {
    // If user isn't logged in they will be taken through these steps:
    // 1. Logg in or create account on the /sign-in page
    // 2. Get back to /sell-item and continue normal flow (show address if no address, show confirmation div)
    location.href = "/sign-in";
    return
  }
  await nextStepSignedIn(options);
}

async function nextStepSignedIn(options) {
  const firstNameSet = user.current.addressFirstName;
  // If first name not set, show address form. Else, go to private page.
  if (!firstNameSet) {
    if (options && options.itemCreatedFromPrefill) {
      document.getElementById('maiIntroForPrefillAddress').style.display = 'block';
    }
    addressFormDiv.style.display = 'block';
    addItemFormDiv.style.display = 'none';
    loadingDiv.style.display = 'none';
  } else {
    location.href = "/private";
  }
}

function fieldLabelToggle(labelId) {
  return (event) => {
    document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none'
  }
}

async function fillForm(itemId, savedItem) {
  try {
    let item = { data: savedItem };
    if (!savedItem) {
      item = await firebase.app().functions("europe-west1").httpsCallable('getItem')({itemId});
    }
    const data = item.data;
    const size = data.size;
    const material = data.material;
    const brand = data.brand;
    const model = data.model;
    let originalPrice = data.originalPrice;
    if (originalPrice <= 0) {
      originalPrice = null;
    }
    const age = data.age;
    const condition = data.condition;
    const images = data.images;

    // Populate images
    function showPreview(imageName, url) {
      document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
      const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i].className.includes("success-state")) {
          siblings[i].style.display = 'block';
        } else {
          // Hide other states of file input field "empty-state" and "error-state"
          siblings[i].style.display = 'none';
        }
      }
    }

    imageElements.map(img => sessionStorage.removeItem(`${img}PreviewUrl`));
    for (const imageName in images) {
      const urlSmall = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[imageName] || images[`${imageName}Large`];
      const urlLarge = images[imageName] || images[`${imageName}Large`] || images[`${imageName}Medium`] || images[`${imageName}Small`];
      if (imageElements.includes(imageName)) {
        showPreview(imageName, urlSmall);
        sessionStorage.setItem(`${imageName}PreviewUrl`, urlLarge); // Store large preview url to create image from on submit
      }
    }

    // Show cover image preview
    const coverImageLarge = images.coverImageLarge || images.coverImage || null;
    const coverImageSmall = images.coverImage || images.coverImageLarge || null;
    if (coverImageLarge) {
      document.getElementById('coverImageContainer').style.backgroundImage = `url('${coverImageSmall}')`;
      document.getElementById('coverImagePreview').style.display = 'block';
      sessionStorage.setItem('coverImagePreviewUrl', coverImageLarge);
    }

    // Populate text input fields
    itemBrand.value = brand;
    // Don't use the setFieldValue for the brand since that triggers a dropdown to open
    document.getElementById('itemBrandLabel').style.display = 'inline-block'
    setFieldValue('itemSize', size);
    setFieldValue('itemMaterial', material);
    setFieldValue('itemModel', model);
    setFieldValue('itemOriginalPrice', originalPrice);
    //itemUserComment.value = userComment; //Textarea
    //itemDefectDescription.value = defectDescription; //Textarea

    // Populate select fields
    let options = itemAge.options;
    for (let i = 0; i < options.length; i++) {
      if (age == options[i].attributes.value.value) {
        itemAge.selectedIndex = i;
        if (age != "") {
          itemAge.style.color = "#333";
          itemAge.dispatchEvent(new Event('input'));
        }
      }
    }
    options = itemCondition.options;
    for (let i = 0; i < options.length; i++) {
      if (condition == options[i].innerText) {
        itemCondition.selectedIndex = i;
        itemCondition.style.color = "#333";
        itemCondition.dispatchEvent(new Event('input'));
        if (options[i].innerText == "Använd, tecken på slitage") {
          defectInfoDiv.style.display = 'block';
        }
      }
    }

    // Populate radio-buttons
    document.getElementById('Woman').previousElementSibling.classList.remove("w--redirected-checked"); // Unselect radio button 'Woman'
    document.getElementById('Woman').checked = false;
    document.getElementById(data.sex).previousElementSibling.classList.add("w--redirected-checked"); // Populate the right one
    document.getElementById(data.sex).checked = true;

    // Populate checkboxes
    defectsChoicesInSwedish.forEach((value, key) => {
      if (data.defects.includes(value)) {
        document.getElementById(key).previousElementSibling.classList.add("w--redirected-checked");
        document.getElementById(key).checked = true;
      }
    });
  } catch (error) {
      console.log("Error getting item document:", error);
  }
  document.getElementById('loadingDiv').style.display = 'none';
}

function checkBrand(value) {
  if (words.some(words => value.toLowerCase().includes(words.toLowerCase()))) {
    hardToSellText.innerHTML = `Vi säljer i regel inte ${value}-plagg på grund av för lågt andrahandsvärde. Undantag kan finnas.`;
    hardToSellDiv.style.display = 'block';
    return true;
  } else {
    hardToSellDiv.style.display = 'none';
  }
}

async function checkAndDisplayShareSold(value) {
  const response = await firebase.app().functions("europe-west1").httpsCallable(
    'fetchBrandShareSoldInfo',
  )({ cleanedBrandName: value });

  if (response.data && response.data.cleanedBrand) {
    if (response.data.shareSold > '95%') {
      shareSoldText.innerHTML = `95% av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }

    if (response.data.shareSold > '55%') {
      shareSoldText.innerHTML = `${response.data.shareSold} av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }
    if (response.data.shareSold >= '45%') {
      shareSoldText.innerHTML = `Hälften av plaggen från ${response.data.cleanedBrand} säljs`
      shareSoldDiv.style.display = 'block';
      return;
    }

    shareSoldText.innerHTML = `Mindre än hälften av plaggen från ${response.data.cleanedBrand} säljs`
    shareSoldDiv.style.display = 'block';
    demandLevelText.innerHTML = `Låg efterfrågan`;
    demandLevelText.style.display = 'block';
  } else {
    demandLevelText.innerHTML = '';
    shareSoldText.innerHTML = ''
    shareSoldDiv.style.display = 'none'
  }
}

function initializeSelectColor() {
  const itemColor = document.getElementById("itemColor");
  itemColor.onchange = function () {
    let input = this.value;
    if (input !== "") {
      itemColor.style.color = "#333";
    } else {
      itemColor.style.color = "#929292";
    }
  };
  // Change font color of dropdown itemAge when user selects a value
  const itemAge = document.getElementById("itemAge");
  itemAge.onchange = function () {
    let input = this.value;
    if (input !== "") {
      itemAge.style.color = "#333";
    } else {
      itemAge.style.color = "#929292";
    }
  };
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

async function frontImageUploadChangeHandler() {
  let input = this.files[0];
  if (input) {
    let src = URL.createObjectURL(input);
    frontImagePreviewUploading.style.backgroundImage = `url('${src}')`;
    frontImagePreview.style.backgroundImage = `url('${src}')`;
    try {
      const fileAsBase64 = await toBase64(input);
      const response = await firebase.app().functions("europe-west1").httpsCallable('detectItemColor')({ base64Img: fileAsBase64 });
      console.log(response); // TODO: prefill itemColor
      document.querySelectorAll('#itemColor option').forEach(opt => {
        if (response.data.colors?.['color_names']?.[0].indexOf(opt.value) >= 0) {
          itemColor.value = opt.value;
          $('#itemColor').trigger('change');
        }}
      );

      response.result?.['color_names']?.[0]
    } catch (e) {
      console.log('Error calling detectItemColor', e);
    }
  }
}

async function initializeCategorySelect() {
  let openOptgroup = '';
  $('#itemCategory').select2({ selectionCssClass: 'form-field', placeholder: 'Kategori', data: itemCategories });

  $("body").on('click', '.select2-container--open .select2-results__group', function() {
    $(this).siblings().toggle();
    if (openOptgroup) {
      openOptgroup.siblings().hide();
    }
    openOptgroup = $(this).siblings()[0].hidden ? '' : $(this);
  });

  let headerAdded = false;

  $('#itemCategory').on('select2:close', () => document.querySelector('body').style.overflow = 'auto');
  $('#itemCategory').on('select2:open', function() {
    document.querySelector('body').style.overflow =  'hidden';
    const searchField = document.querySelector('.select2-search__field');
    searchField.addEventListener('input', (e) => {
      if (e.target.value.length === 0) {
        let groups = $('.select2-container--open .select2-results__group');
        $.each(groups, (index, v) => $(v).siblings().hide() );
      }
    });
    searchField.placeholder = 'Sök... (t.ex. Klänning, Sneakers)';
    if (!headerAdded) {
      const header = document.getElementById('categoryPopUpHeader');
      const container = document.querySelector('.select2-dropdown');
      container.insertBefore(header, container.firstChild);
      header.style.display = 'block';
      header.querySelector('#categorySelectClose').onclick = () => $('#itemCategory').select2('close');
      headerAdded = true;
    }
    $('.select2-dropdown').css('opacity', 0);
    setTimeout(() => {
      let groups = $('.select2-container--open .select2-results__group');
      $.each(groups, (index, v) => $(v).siblings().hide() );
      $('.select2-dropdown').css('opacity', 1);
    }, 0);
    document.querySelector('.select2-results__options').addEventListener('scroll', () => document.activeElement.blur());
  });

  $('#itemCategory').on('change', fieldLabelToggle('itemCategoryLabel'));

  // From https://github.com/select2/select2/issues/3015#issuecomment-570171720
  $("#itemCategory").on("select2:open", function(){
    $(".select2-results").css("visibility", "hidden");
  });
  $("#itemCategory").on('select2:opening', function(){
    setTimeout(function(){
      $(".select2-results").css("visibility", "visible");
    },50);
  });
}

const itemCategories = [
  {
    "id": "",
    "text": "",
  },
  {
    "text": "Ytterkläder",
    "children" : [
      {
        "id": "Jacka",
        "text": "Jacka",
      },
      {
        "id": "Kappa",
        "text": "Kappa",
      }, {
        "id": "Rock",
        "text": "Rock",
      }, {
        "id": "Fritidsjacka",
        "text": "Fritidsjacka",
      }, {
        "id": "Trenchcoat",
        "text": "Trenchcoat",
      }, {
        "id": "Skinnjacka",
        "text": "Skinnjacka",
      }, {
        "id": "Dunjacka",
        "text": "Dunjacka",
      }, {
        "id": "Regnjacka",
        "text": "Regnjacka",
      }, {
        "id": "Pälsjacka",
        "text": "Pälsjacka",
      }
    ]
  },
  {
    "text": "Överdelar",
    "children" : [
      {
        "id": "Tröja",
        "text": "Tröja",
      }, {
        "id": "Blus",
        "text": "Blus",
      }, {
        "id": "Skjorta",
        "text": "Skjorta",
      }, {
        "id": "T-shirt",
        "text": "T-shirt",
      }, {
        "id": "Kavaj",
        "text": "Kavaj",
      }, {
        "id": "Hoodie",
        "text": "Hoodie",
      }, {
        "id": "Topp",
        "text": "Topp",
      }, {
        "id": "Väst",
        "text": "Väst",
      }, {
        "id": "Polotröja",
        "text": "Polotröja",
      }, {
        "id": "Tunika",
        "text": "Tunika",
      }, {
        "id": "Kofta",
        "text": "Kofta",
      }, {
        "id": "Linne",
        "text": "Linne",
      }, {
        "id": "Träningströja",
        "text": "Träningströja",
      }, {
        "id": "Poncho",
        "text": "Poncho",
      }, {
        "id": "Sweatshirt",
        "text": "Sweatshirt",
      }, {
        "id": "Piké",
        "text": "Piké",
      }, {
        "id": "Långärmad T-shirt",
        "text": "Långärmad T-shirt",
      }, {
        "id": "Kostymväst",
        "text": "Kostymväst",
      }, {
        "id": "Linneskjorta",
        "text": "Linneskjorta",
      }
    ]
  },
  {
    "text": "Underdelar",
    "children" : [
      {
        "id": "Byxor",
        "text": "Byxor",
      }, {
        "id": "Shorts",
        "text": "Shorts",
      }, {
        "id": "Kjol",
        "text": "Kjol",
      }, {
        "id": "Jeans",
        "text": "Jeans",
      }, {
        "id": "Fritidsbyxor",
        "text": "Fritidsbyxor",
      }, {
        "id": "Träningsbyxor",
        "text": "Träningsbyxor",
      }, {
        "id": "Tights",
        "text": "Tights",
      }, {
        "id": "Strumpbyxor",
        "text": "Strumpbyxor",
      }, {
        "id": "Mjukisbyxor",
        "text": "Mjukisbyxor",
      }, {
        "id": "Kostymbyxor",
        "text": "Kostymbyxor",
      }, {
        "id": "Chinos",
        "text": "Chinos",
      }, {
        "id": "Sarong",
        "text": "Sarong",
      }
    ]
  },
  {
    "text": "Helkropp",
    "children" : [
      {
        "id": "Jumpsuit",
        "text": "Jumpsuit",
      }, {
        "id": "Klänning",
        "text": "Klänning",
      }, {
        "id": "Kostym",
        "text": "Kostym",
      }, {
        "id": "Set",
        "text": "Set",
      }, {
        "id": "Pyjamas",
        "text": "Pyjamas",
      }, {
        "id": "Baddräkt",
        "text": "Baddräkt",
      }, {
        "id": "Bikini",
        "text": "Bikini",
      }, {
        "id": "Morgonrock",
        "text": "Morgonrock",
      }, {
        "id": "Bröllopsklänning",
        "text": "Bröllopsklänning",
      }, {
        "id": "Balklänning",
        "text": "Balklänning",
      }, {
        "id": "Bodysuit",
        "text": "Bodysuit",
      }, {
        "id": "Underställ",
        "text": "Underställ",
      }, {
        "id": "Kaftan",
        "text": "Kaftan",
      }
    ]
  },
  {
    "text": "Skor",
    "children" : [
      {
        "id": "Ballerinaskor",
        "text": "Ballerinaskor",
      }, {
        "id": "Sneakers",
        "text": "Sneakers",
      }, {
        "id": "Sandaler",
        "text": "Sandaler",
      }, {
        "id": "Klackar",
        "text": "Klackar",
      }, {
        "id": "Boots",
        "text": "Boots",
      }, {
        "id": "Kängor",
        "text": "Kängor",
      }, {
        "id": "Vinterskor",
        "text": "Vinterskor",
      }, {
        "id": "Flip-flops",
        "text": "Flip-flops",
      }, {
        "id": "Loafers",
        "text": "Loafers",
      }, {
        "id": "Annat (Skor)",
        "text": "Annat (Skor)",
      }
    ]
  },
  {
    "text": "Väskor",
    "children" : [
      {
        "id": "Ryggsäck",
        "text": "Ryggsäck",
      }, {
        "id": "Kuvertväska",
        "text": "Kuvertväska",
      }, {
        "id": "Träningsväska",
        "text": "Träningsväska",
      }, {
        "id": "Resväska",
        "text": "Resväska",
      }, {
        "id": "Datorväska",
        "text": "Datorväska",
      }, {
        "id": "Axelremsväska",
        "text": "Axelremsväska",
      }, {
        "id": "Handväska",
        "text": "Handväska",
      }, {
        "id": "Annat (Väska)",
        "text": "Annat (Väska)",
      }
    ]
  },
  {
    "text": "Accessoarer",
    "children" : [
      {
        "id": "Halsduk",
        "text": "Halsduk",
      }, {
        "id": "Hatt",
        "text": "Hatt",
      }, {
        "id": "Mössa",
        "text": "Mössa",
      }, {
        "id": "Vantar",
        "text": "Vantar",
      }, {
        "id": "Örhänge",
        "text": "Örhänge",
      }, {
        "id": "Halsband",
        "text": "Halsband",
      }, {
        "id": "Armband",
        "text": "Armband",
      }, {
        "id": "Glasögon",
        "text": "Glasögon",
      }, {
        "id": "Solglasögon",
        "text": "Solglasögon",
      }, {
        "id": "Keps",
        "text": "Keps",
      }, {
        "id": "Krage",
        "text": "Krage",
      }, {
        "id": "Sjal",
        "text": "Sjal",
      }, {
        "id": "Bälte",
        "text": "Bälte",
      }, {
        "id": "Plånbok",
        "text": "Plånbok",
      }, {
        "id": "Ring",
        "text": "Ring",
      }, {
        "id": "Brosch",
        "text": "Brosch",
      }, {
        "id": "Necessär",
        "text": "Necessär",
      }, {
        "id": "Slips",
        "text": "Slips",
      }, {
        "id": "Handduk",
        "text": "Handduk",
      }, {
        "id": "Klocka",
        "text": "Klocka",
      }
    ]
  }
]
