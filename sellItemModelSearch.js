export const setFieldValue = (fieldId, value) => {
  document.getElementById(fieldId).value = value || '';
  document.getElementById(fieldId).dispatchEvent(new Event('input'));
}

export const showSelectedModel = (modelJson) => {
  // Show selected model in search box
  const model = JSON.parse(modelJson);
  document.getElementById('findModelBoxEmpty').style.display = 'none';
  document.getElementById('findModelBoxFilled').style.display = 'flex';
  document.getElementById('findModelBoxFilled').setAttribute("data-model", modelJson)
  document.getElementById('findModelBoxImage').style.backgroundImage = `url('${model["coverImageSmall"]}')`;
  document.getElementById('findModelBoxNameCategory').innerText = `${model['brand']}, ${model['category']}`;
  document.getElementById('findModelBoxName').innerText = `${model['maiName']}`;
  document.getElementById('findModelBoxColor').innerText = `${model['color']}`;
  document.getElementById('findModelBoxGender').innerText = `${model['gender']}`;
}

const selectSize = (modelClicked) => (event) => {
  closeModelSelect();
  const modelJson = modelClicked.getAttribute("data-model");
  const model = JSON.parse(modelJson);
  showSelectedModel(modelJson);

  // Fill form with attributes from selected model
  document.getElementById(model['gender']).parentElement.click();
  setFieldValue('itemSize', event.target.innerText);
  setFieldValue('itemMaterial', model['material']);
  setFieldValue('itemModel', model['maiName']);
  setFieldValue('itemOriginalPrice', model['originalPriceSek']);
  document.getElementById('findModelDescription').style.display = 'none';
  document.getElementById('findNewModel').style.display = 'flex';
  if (model['collectionYear'] + 1 >= new Date().getFullYear()) {
    document.getElementById('itemAge').selectedIndex = 1;
    document.getElementById('itemAge').style.color = 'rgb(51, 51, 51)';
    document.getElementById('itemAge').dispatchEvent(new Event('input'));
  }
  document.getElementById('itemCategory').value = model['category'];
  $('#itemCategory').trigger('change');
  document.getElementById('itemColor').value = model['color'];
  $('#itemColor').trigger('change');
  document.getElementById('findModelDiv').scrollIntoView(true);
}

const showModelSizes = (modelClicked) => {
  window.scrollTo({ top: 0 });
  const templateSize = document.getElementById('modelSizeTemplate');
  const modelSizeList = document.getElementById('modelSizeList');
  while (modelSizeList.firstChild) {
    modelSizeList.removeChild(modelSizeList.lastChild);
  }
  const model = JSON.parse(modelClicked.getAttribute("data-model"));
  if (model.sizes.length === 1) {
    return selectSize(modelClicked)({target: { innerText: model.sizes[0] }});
  }
  for (const [idx, size] of model.sizes.sort(sizeCompare).entries()) {
    const newNode = templateSize.cloneNode(true);
    newNode.id = `${templateSize.id}_${idx}`;
    newNode.addEventListener('click', linkClickTracker);
    newNode.style.display = 'block';
    newNode.addEventListener('click', function clickHandler(event) {
      selectSize(modelClicked)(event);
      this.removeEventListener('click', clickHandler);
    });
    for (const child of Array.from(newNode.getElementsByTagName('*'))) {
      child.id = `${child.id}_${idx}`;
    }
    modelSizeList.appendChild(newNode);
    document.getElementById(`modelSize_${idx}`).innerText = size;
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
  for (const [idx, model] of models.entries()) {
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
    document.getElementById(`brandNameCategory_${idx}`).innerText = `${model['brand']}, ${model['category']}`;
    document.getElementById(`modelName_${idx}`).innerText = `${model['maiName']}`;
    document.getElementById(`modelColor_${idx}`).innerText = `${model['color']}`;
    document.getElementById(`modelGender_${idx}`).innerText = `${model['gender']}`;
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

function showFindModelPage() {
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
