import {rememberUnsavedChanges} from "./sellItem";
import {capitalizeFirstLetter, colorName} from "./sellItemHelpers";

export const setFieldValue = (fieldId, value) => {
  document.getElementById(fieldId).value = value || '';
  document.getElementById(fieldId).dispatchEvent(new Event('input'));
}

export const showSelectedModel = (model) => {
  // Show selected model in search box
  document.getElementById('findModelDescription').style.display = 'none';
  document.getElementById('findNewModel').style.display = 'flex';
  document.getElementById('findModelBoxEmpty').style.display = 'none';
  document.getElementById('findModelBoxFilled').style.display = 'flex';
  document.getElementById('findModelBoxFilled').setAttribute("data-model", JSON.stringify(model))
  document.getElementById('findModelBoxImage').style.backgroundImage = `url('${model["coverImageSmall"]}')`;
  document.getElementById('findModelBoxNameCategory').innerText = `${model['brand']}, ${model['category']}`;
  document.getElementById('findModelBoxName').innerText = `${model['maiName']}`;
  if (model['color']) {
    document.getElementById('findModelBoxColor').style.display = 'block';
    document.getElementById('findModelBoxColor').innerText = `${colorName(capitalizeFirstLetter(model['color']))}`;
  } else {
    document.getElementById('findModelBoxColor').style.display = 'none';
  }
  if (model['gender']) {
    document.getElementById('findModelBoxGender').style.display = 'block';
    const allGenderModels = allModelsMatching(model);
    if (allGenderModels.length === 2) {
      document.getElementById('findModelBoxGender').innerText = `Dam / Herr`;
    } else {
      const genders = { 'Woman': 'Dam', 'Man': 'Herr' }
      document.getElementById('findModelBoxGender').innerText = `${genders[model['gender']] || model['gender']}`;
    }
  } else {
    document.getElementById('findModelBoxGender').style.display = 'none';
  }
}

const selectSize = (model) => (event) => {
  closeModelSelect();
  showSelectedModel(model);

  // Fill form with attributes from selected model
  document.getElementById(model['gender'])?.parentElement?.click();
  setFieldValue('itemSize', event.target.innerText);
  setFieldValue('itemMaterial', model['material']);
  setFieldValue('itemModel', model['maiName']);
  setFieldValue('itemOriginalPrice', model['originalPriceSek']);
  if (model['collectionYear'] + 1 >= new Date().getFullYear()) {
    document.getElementById('itemAge').selectedIndex = 1;
    document.getElementById('itemAge').style.color = 'rgb(51, 51, 51)';
    document.getElementById('itemAge').dispatchEvent(new Event('input'));
  }
  if (model['category']) {
    document.getElementById('itemCategory').value = model['category'];
    $('#itemCategory').trigger('change');
  }
  if (document.getElementById('itemColor').querySelector('[value="' + capitalizeFirstLetter(model['color']) + '"]')) {
    document.getElementById('itemColor').value = model['color'];
    $('#itemColor').trigger('change');
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

const allModelsMatching = (model) => modelDb().filter(m => m.maiName === model.maiName && m.color === model.color &&
    m.category === model.category)

const showModelSizes = (modelClicked) => {
  window.scrollTo({ top: 0 });
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
    return selectSize(model)({ target: { innerText: model.sizes[0] }});
  }

  const genderModels = allModelsMatching(model);
  // genderModels should contain 1 or 2 models (Man / Woman or Man & Woman)
  const modelSizes = genderModels[0].sizes.slice()?.sort();
  const otherModelSizes = genderModels[1]?.sizes.slice()?.sort();
  const differentSizes = otherModelSizes && (otherModelSizes?.length !== modelSizes.length ||
    !modelSizes.every((size, index) => size === otherModelSizes[index]));
  if (differentSizes) {
    document.getElementById('modelSizeListHeading').style.display = 'block';
    document.getElementById('modelSizeList2Heading').style.display = 'block';
  } else {
    document.getElementById('modelSizeListHeading').style.display = 'none';
    document.getElementById('modelSizeList2Heading').style.display = 'none';
  }
  for (const genderModel of (differentSizes ? genderModels : genderModels.slice(0, 1))) {
    for (const [idx, size] of genderModel.sizes.sort(sizeCompare).entries()) {
      const newNode = templateSize.cloneNode(true);
      newNode.id = `${templateSize.id}_${idx}`;
      newNode.addEventListener('click', linkClickTracker);
      newNode.style.display = 'block';
      newNode.addEventListener('click', function clickHandler(event) {
        selectSize(genderModel)(event);
        this.removeEventListener('click', clickHandler);
      });
      for (const child of Array.from(newNode.getElementsByTagName('*'))) {
        child.id = `${child.id}_${genderModel.gender}_${idx}`;
      }
      (genderModel.gender === 'Woman' ? modelSizeList : modelSizeList2).appendChild(newNode);
      document.getElementById(`modelSize_${genderModel.gender}_${idx}`).innerText = size;
    }
  }
}

const selectModel = (event) => {
  document.getElementById('modelList').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'block';
  document.getElementById('modelSelectTitle').innerText = 'Välj storlek';
  showModelSizes(event.currentTarget);
}

const showModelItems = (models) => {
  window.scrollTo({ top: 0 });
  const templateCard = document.getElementById('modelCardTemplate');
  const modelResultList = document.getElementById('modelResultList');
  while (modelResultList.firstChild) {
    modelResultList.removeChild(modelResultList.lastChild);
  }
  const modelsToShow = models.filter(model => {
    const sameModelOtherGender = models.find(m => m.maiName === model.maiName && m.color === model.color &&
      m.category === model.category && m.gender !== model.gender);
    if (sameModelOtherGender) {
      model.multiGender = 'Dam / Herr';
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
    if (model['color']) {
      document.getElementById(`modelColor_${idx}`).innerText = `${colorName(capitalizeFirstLetter(model['color']))}`;
    } else {
      document.getElementById(`modelColor_${idx}`).style.display = 'none';
    }
    if (model['multiGender'] || model['gender']) {
      const genders = { 'Woman': 'Dam', 'Man': 'Herr' };
      document.getElementById(`modelGender_${idx}`).innerText = `${model['multiGender'] || genders[model['gender']] || model['gender']}`;
    } else {
      document.getElementById(`modelGender_${idx}`).style.display = 'none';
    }
  }
}

function modelCompare(a, b) {
  const nameA = a["maiName"].toLowerCase();
  const nameB = b["maiName"].toLowerCase();
  if (nameA > nameB) {
    return 1;
  }
  if (nameA < nameB) {
    return -1;
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
        showModelItems(JSON.parse(modelDb).sort(modelCompare));
      }
    }, 1000);
  } else {
    document.getElementById('modelSpinner').style.display = 'none';
    showModelItems(JSON.parse(modelDb).sort(modelCompare));
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
    if (modelSearchString && modelSearchString.length > 0) {
      const fuse = new Fuse(modelDb, {
        includeScore: true,
        keys: ["maiName", "category", "color", "maiColor", "articleNumber", "name"]
      });
      const searchResult = fuse.search(modelSearchString.replace(', ', ' '));
      showModelItems(searchResult.map(r => r.item));
    } else {
      showModelItems(modelDb.sort(modelCompare));
    }
  })

  document.getElementById('removeModelIcon').addEventListener('click', (event) => {
    document.getElementById('findModelBoxEmpty').style.display = 'flex';
    document.getElementById('findModelBoxFilled').style.display = 'none';
    document.getElementById('findModelDescription').style.display = 'block';
    document.getElementById('findNewModel').style.display = 'none';
    event.stopPropagation();
    event.preventDefault();
    rememberUnsavedChanges();
  });
}

export const displayFindModelDiv = async (value) => {
  if (featureIsEnabled('modelDB')) {
    if (value === 'Eytys') {
      findModelDiv.style.display = 'block';
      let models = sessionStorage.getItem('models') ? JSON.parse(sessionStorage.getItem('models')) : undefined;
      if (!models) {
        let response = await fetch('https://getbrandmodels-heypmjzjfq-ew.a.run.app?brand=Eytys', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        models = await response.json();
        sessionStorage.setItem('models', JSON.stringify(models));
      }
    } else {
      findModelDiv.style.display = 'none';
    }
  }
}
