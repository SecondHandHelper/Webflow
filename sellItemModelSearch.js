import { rememberUnsavedChanges } from "./sellItem";
import { capitalizeFirstLetter, colorName, swedishColorToEnglish } from "./sellItemHelpers";

export const setFieldValue = (fieldId, value) => {
  document.getElementById(fieldId).value = value || '';
  document.getElementById(fieldId).dispatchEvent(new Event('input'));
}

export const showModelSuggestion = (model) => {
  showSelectedModel(model, false);
  document.getElementById('findModelTitle').innerText = 'Är det denna modell?';
  document.getElementById('findNewModel').style.display = 'flex';
  document.getElementById('removeModelIcon').style.display = 'none';
  document.getElementById('modelSuggestButtons').style.display = 'flex'
  document.getElementById('rejectModel').style.opacity = '100';
  document.getElementById('confirmModel').style.opacity = '100';
}

export const showSelectedModel = (model) => {
  // Show selected model in search box
  document.getElementById('findModelDescription').style.display = 'none';
  document.getElementById('findNewModel').style.display = 'flex';
  document.getElementById('findModelBoxEmpty').style.display = 'none';
  document.getElementById('findModelBoxFilled').style.display = 'flex';

  document.getElementById('modelSuggestButtons').style.display = 'none';
  document.getElementById('findModelTitle').innerText = 'Modell';
  document.getElementById('removeModelIcon').style.display = 'flex';

  document.getElementById('findModelBoxFilled').setAttribute("data-model", JSON.stringify(model))
  document.getElementById('findModelBoxImage').style.backgroundImage = `url('${model["coverImageSmall"]}')`;
  document.getElementById('findModelBoxNameCategory').innerText = `${model['brand']}, ${model['category']}`;
  document.getElementById('findModelBoxName').innerText = `${model['maiName']}`;
  if (model['maiColor']) {
    document.getElementById('findModelBoxColor').style.display = 'block';
    document.getElementById('findModelBoxColor').innerText = `${colorName(capitalizeFirstLetter(model['maiColor']))}`;
  } else {
    document.getElementById('findModelBoxColor').style.display = 'none';
  }
  if (model.brand !== 'Eytys' && model.gender) {
    document.getElementById('findModelBoxGender').style.display = 'block';
    if (model.gender === 'Unisex' || model.multiGender || allModelsMatching(model).length === 2) {
      document.getElementById('findModelBoxGender').innerText = `Unisex`;
    } else {
      const genders = { 'Woman': 'Dam', 'Man': 'Herr' }
      document.getElementById('findModelBoxGender').innerText = `${genders[model.gender] || model.gender}`;
    }
  } else {
    document.getElementById('findModelBoxGender').style.display = 'none';
  }
}

const selectSize = (model) => (event) => {
  closeModelSelect();
  showSelectedModel(model);

  // Fill form with attributes from selected model
  setFormValuesFromModel(model, event.target.innerText);
}

export function selectFieldValue(field, value) {
  const selectIndex = Array.from(field.options)
    .map(elm => elm.attributes.value.value.toLowerCase())
    .indexOf(value?.toLowerCase());
  if (selectIndex > 0) {
    field.selectedIndex = selectIndex;
    field.style.color = "#333";
  } else {
    field.selectedIndex = 0;
    field.style.color = '#929292';
  }
  field.dispatchEvent(new Event('input'));
  field.dispatchEvent(new Event('change'));
}

export const setFormValuesFromModel = (model, size, optionalGender = false) => {
  if (optionalGender) {
    if (!model.multiGender && model.gender !== 'Unisex') {
      document.getElementById(model.gender)?.parentElement?.click();
    }
  } else {
    document.getElementById(model.gender)?.parentElement?.click();
  }
  if (size) {
    setFieldValue('itemSize', size);
  }
  setFieldValue('itemMaterial', model['material']);
  setFieldValue('itemModel', model['maiName']);
  setFieldValue('itemOriginalPrice', model['originalPriceSek']);
  if (model['collectionYear']) {
    const yearDiff = new Date().getFullYear() - model['collectionYear'];
    // Depending on yearDiff value we translate to a itemAge selectedIndex using this ageIndex array
    const ageIndex = [1, 1, 2, 3, 4, 4, 5, 5, 5];
    const ageField = document.getElementById('itemAge');
    ageField.selectedIndex = ageIndex[yearDiff] || 6;
    ageField.style.color = 'rgb(51, 51, 51)';
    ageField.dispatchEvent(new Event('input'));
    ageField.dispatchEvent(new Event('change'));
  }
  if (model['category']) {
    document.getElementById('itemCategory').value = model['category'];
    $('#itemCategory').trigger('change');
  }
  if (document.getElementById('itemColor').querySelector('[value="' + capitalizeFirstLetter(model['maiColor']) + '"]')) {
    selectFieldValue(document.getElementById('itemColor'), model['maiColor']);
  }
}

let modelDbModels;
const modelDb = () => {
  if (!modelDbModels) {
    const savedModels = sessionStorage.getItem('models');
    modelDbModels = JSON.parse(savedModels);
  }
  return modelDbModels;
};

const allModelsMatching = (model) => modelDb()?.filter(m => m.maiName === model.maiName && m.maiColor === model.maiColor &&
  m.category === model.category && m.color === model.color)

const showModelSizes = (modelClicked) => {
  window.scrollTo({ top: 0 });
  document.getElementById('chooseModelHeader').classList.add('stickyHeader');

  const templateSize = document.getElementById('modelSizeTemplate');
  const modelSizeList = document.getElementById('modelSizeList');
  const modelSizeList2 = document.getElementById('modelSizeList2');
  while (modelSizeList.firstChild) {
    modelSizeList.removeChild(modelSizeList.lastChild);
  }
  while (modelSizeList2.firstChild) {
    modelSizeList2.removeChild(modelSizeList2.lastChild);
  }
  const model = JSON.parse(modelClicked.getAttribute("data-model"));
  if (model.sizes.length === 1) {
    return selectSize(model)({ target: { innerText: model.sizes[0] } });
  }

  const genderModels = allModelsMatching(model);
  // genderModels should contain 1 or 2 models (Man / Woman or Man & Woman)
  const modelSizes = genderModels[0].sizes.slice()?.sort();
  const otherModelSizes = genderModels[1]?.sizes.slice()?.sort();
  const differentSizes = otherModelSizes && (otherModelSizes?.length !== modelSizes.length ||
    !modelSizes.every((size, index) => size === otherModelSizes[index]));
  document.getElementById('modelSizeListHeading').style.display = differentSizes ? 'block' : 'none';
  document.getElementById('modelSizeList2Heading').style.display = differentSizes ? 'block' : 'none';
  const createSizeNode = (idx, genderModel, sizeList, size) => {
    const newNode = templateSize.cloneNode(true);
    newNode.id = `${templateSize.id}_${idx}`;
    newNode.addEventListener('click', linkClickTracker);
    newNode.style.display = 'flex';
    newNode.addEventListener('click', function clickHandler(event) {
      selectSize(genderModel)(event);
      this.removeEventListener('click', clickHandler);
    });
    for (const child of Array.from(newNode.getElementsByTagName('*'))) {
      child.id = `${child.id}_${genderModel.gender}_${idx}`;
    }
    sizeList.appendChild(newNode);
    document.getElementById(`modelSize_${genderModel.gender}_${idx}`).innerText = size;
  }

  for (const genderModel of (differentSizes ? genderModels : genderModels.slice(0, 1))) {
    modelSizeList.parentElement.style.display = (!differentSizes && genderModel.gender !== 'Woman') ? 'none' : 'block';
    for (const [idx, size] of genderModel.sizes.sort(sizeCompare).entries()) {
      const sizeSplits = size.split("-");
      createSizeNode(idx, genderModel, genderModel.gender === 'Woman' ? modelSizeList : modelSizeList2, sizeSplits.pop());
      if (genderModel.gender === 'Unisex' && sizeSplits.length === 1) { // 1 left after pop() means size is a XXS-XS size
        // We have some models with Unisex and ['xxs-xs', 'xs-s', 's-m'] sizes, split them up and show as Woman-Man sizes
        document.getElementById('modelSizeListHeading').style.display = 'block';
        document.getElementById('modelSizeList2Heading').style.display = 'block';
        createSizeNode(`${idx}u`, genderModel, modelSizeList, sizeSplits[0]);
        modelSizeList.parentElement.style.display = 'block';
      }
    }
  }
  modelSizeList.parentElement.style.display = modelSizeList.children.length ? 'block' : 'none';
  modelSizeList2.parentElement.style.display = modelSizeList2.children.length ? 'block' : 'none';
}

const selectModel = (event) => {
  document.getElementById('modelList').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'block';
  document.getElementById('modelSelectTitle').innerText = 'Välj storlek';
  document.getElementById('modelSelectTitle').style.marginLeft = '42%';
  showModelSizes(event.currentTarget);
}

const showModelItems = (models) => {
  document.getElementById('modelSelectTitle').style.marginLeft = '0%';
  document.getElementById('chooseModelHeader').classList.remove('stickyHeader');

  window.scrollTo({ top: 0 });
  const templateCard = document.getElementById('modelCardTemplate');
  const modelResultList = document.getElementById('modelResultList');
  while (modelResultList.firstChild) {
    modelResultList.removeChild(modelResultList.lastChild);
  }
  const modelsToShow = models.filter(model => {
    const sameModelOtherGender = models.find(m => m.maiName === model.maiName && m.maiColor === model.maiColor &&
      m.category === model.category && m.gender !== model.gender);
    if (sameModelOtherGender) {
      model.multiGender = 'Unisex';
    }
    return !sameModelOtherGender || model.gender === 'Woman';
  })
  for (const [idx, model] of modelsToShow.entries()) {
    const newNode = templateCard.cloneNode(true);
    newNode.id = `${templateCard.id}_${idx}`;
    newNode.addEventListener('click', linkClickTracker);
    newNode.style.display = 'flex';
    newNode.style.cursor = 'pointer';
    newNode.setAttribute("data-model", JSON.stringify(model));
    newNode.addEventListener('click', selectModel);
    for (const child of Array.from(newNode.getElementsByTagName('*'))) {
      child.id = `${child.id}_${idx}`;
    }
    modelResultList.appendChild(newNode);
    document.getElementById(`modelImage_${idx}`).src = model['coverImageSmall'];
    document.getElementById(`brandNameCategory_${idx}`).innerText = `${[model['brand'], model['category']].filter(e => e).join(', ')}`;
    document.getElementById(`modelName_${idx}`).innerText = `${model['maiName']}`;
    if (model['maiColor']) {
      document.getElementById(`modelColor_${idx}`).innerText = `${colorName(capitalizeFirstLetter(model['maiColor']))}`;
    } else {
      document.getElementById(`modelColor_${idx}`).style.display = 'none';
    }
    if (model.brand !== 'Eytys' && (model['multiGender'] || model['gender'])) {
      const genders = { 'Woman': 'Dam', 'Man': 'Herr' };
      document.getElementById(`modelGender_${idx}`).innerText = `${model['multiGender'] || genders[model['gender']] || model['gender']}`;
    } else {
      document.getElementById(`modelGender_${idx}`).style.display = 'none';
    }
  }
}

const mostPopularEytysModels = ["mother ", "odessa ", "benz ", "doja ", "angel ",
  "fugu ", "naomi ", "cypress ", "titan ", "laguna ", "aphex ", "jet turbo ", "maze ", "ortega ", "raven ",
  "alexia ", "carmen ", "ferris ", "halo ", "jade ", "jet ", "michigan ", "olympia ", "sonic "];
const mostPopularFilippaKModels = ["alexa ", "mika yak funnelneck sweater", "sammy shirt",
   "terry cropped trousers", "karlie trousers"];
const popIdx = (popularModels, name) => popularModels.find(e => name.startsWith(e)) ? popularModels.findIndex(e => name.startsWith(e)) : 100

function modelCompare(a, b) {
  if (a.brand === 'Filippa K' && b.brand === 'Filippa K') {
    const nameA = a["maiName"].toLowerCase();
    const nameB = b["maiName"].toLowerCase();
    const nameAPopIdx = popIdx(mostPopularFilippaKModels, nameA);
    const nameBPopIdx = popIdx(mostPopularFilippaKModels, nameB);
    if (nameAPopIdx > nameBPopIdx) {
      return 1
    } else if (nameAPopIdx < nameBPopIdx) {
      return -1;
    }
  }
  // For Blankens, jewelry should come last
  if (a.brand === 'Blankens' && b.brand === 'Blankens') {
    const jewelryCategories = ['Armband', 'Örhänge', 'Halsband', 'Ring'];
    const isAJewelry = jewelryCategories.includes(a.category);
    const isBJewelry = jewelryCategories.includes(b.category);

    // If one is jewelry and the other isn't, put jewelry last
    if (isAJewelry && !isBJewelry) return 1;
    if (!isAJewelry && isBJewelry) return -1;
    
    // If both are jewelry or both are not, maintain their current order
    return 0;
  }
  if (a.brand === 'Eytys' && b.brand === 'Eytys') {
    const nameA = a["maiName"].toLowerCase();
    const nameB = b["maiName"].toLowerCase();
    const nameAPopIdx = popIdx(mostPopularEytysModels, nameA);
    const nameBPopIdx = popIdx(mostPopularEytysModels, nameB);
    if (nameAPopIdx < 100 || nameBPopIdx < 100) {
      if (nameAPopIdx > nameBPopIdx) {
        return 1
      } else if (nameAPopIdx < nameBPopIdx) {
        return -1;
      }
    }
    if (nameA > nameB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    }
  }
  return 0;
}

function sizeCompare(a, b) {
  const sizeOrdering = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
  if (sizeOrdering.indexOf(a) > -1 && sizeOrdering.indexOf(b) > -1) {
    return sizeOrdering.indexOf(a) - sizeOrdering.indexOf(b)
  }
  return a - b;
}

let scrollY;

function showFindModelPage() {
  scrollY = window.scrollY;
  document.getElementById('header').style.display = 'none';
  document.getElementById('addItemFormDiv').style.display = 'none';
  document.getElementById('modelSelectError').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'none';
  document.getElementById('modelSelectTitle').innerText = 'Välj modell';
  document.getElementById('modelSelectDiv').style.display = 'block';
  document.getElementById('modelList').style.display = 'block';
  document.getElementById('modelSearchInput').value = '';
  window.scrollTo({ top: 0 });
  let modelDb = sessionStorage.getItem('models');
  if (!modelDb) {
    document.getElementById('modelSpinner').style.display = 'flex'
    const timerId = setInterval(() => {
      modelDb = sessionStorage.getItem('models');
      if (modelDb) {
        clearInterval(timerId);
        document.getElementById('modelSpinner').style.display = 'none';
        showModelItems(JSON.parse(modelDb).sort(modelCompare).slice(0, 500));
      }
    }, 1000);
  } else {
    document.getElementById('modelSpinner').style.display = 'none';
    showModelItems(JSON.parse(modelDb).sort(modelCompare).slice(0, 500));
  }
}

const closeModelSelect = () => {
  document.getElementById('addItemFormDiv').style.display = 'block';
  document.getElementById('modelSelectDiv').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'none';
  document.getElementById('header').style.display = 'block';
  window.scrollTo({ top: scrollY });
}

export const setupModelSearchEventListeners = () => {
  document.getElementById('findModelBoxEmpty').addEventListener('click', showFindModelPage)
  document.getElementById('findNewModel').addEventListener('click', showFindModelPage)
  document.getElementById('modelSelectClose').addEventListener('click', () => {
    closeModelSelect();
  })

  document.getElementById('modelSearchInput').addEventListener('input', () => {
    const modelSearchString = document.getElementById('modelSearchInput').value;
    const modelDb = JSON.parse(sessionStorage.getItem('models'));
    if (modelSearchString && modelSearchString.length > 1) {
      const keys = ["maiName", "category", "color", "maiColor", "articleNumber", "name", "gender"];
      const fuse = new Fuse(modelDb, {
        includeScore: true,
        minMatchCharLength: 2,
        keys
      });
      const searchTerms = modelSearchString.replace(', ', ' ').split(' ')
        .map(swedishColorToEnglish).map(swedishGenderToEnglish);
      const searchObjects = searchTerms.flatMap(str => 
          keys.map(key => ({ [key]: str }))
      );
      const searchResult = fuse.search({ $or: searchObjects });
      showModelItems(searchResult.map(r => r.item));
    } else {
      showModelItems(modelDb.sort(modelCompare).slice(0, 500));
    }
  })

  const swedishGenderToEnglish = (gender) => {
    const genders = { 'dam': 'woman', 'herr': 'man' };
    return genders[gender?.toLowerCase()] || gender;
  }

  document.getElementById('removeModelIcon').addEventListener('click', (event) => {
    removeSelectedModel()
    event.stopPropagation();
    event.preventDefault();
    rememberUnsavedChanges();
  });
}

export const removeSelectedModel = () => {
  document.getElementById('itemModel').value = '';
  document.getElementById('findModelBoxEmpty').style.display = 'flex';
  document.getElementById('findModelBoxFilled').style.display = 'none';
  document.getElementById('findModelDescription').style.display = 'block';
  document.getElementById('findNewModel').style.display = 'none';
}

export const displayFindModelDiv = async (value) => {
  if (isBrandPartner(value)) {
    findModelDiv.style.display = 'block';
    if (localStorage.getItem('detectedModel')) {
      let detectedModel = JSON.parse(localStorage.getItem('detectedModel'));
      if (detectedModel.brand === itemBrand.value) {
        showModelSuggestion(detectedModel);
      }
      localStorage.removeItem('detectedModel');
    }
    let models = sessionStorage.getItem('models') ? JSON.parse(sessionStorage.getItem('models')) : undefined;
    if (!models || models[0]?.brand !== value) {
      sessionStorage.removeItem('models');
      callBackendApi(`/api/models?brand=${value}`).then(response => {
        console.log(`Got model response ${response.data.length}`);
        sessionStorage.setItem('models', JSON.stringify(response.data));
      });
    }
    return true;
  } else {
    findModelDiv.style.display = 'none';
  }
}
