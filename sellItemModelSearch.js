const selectSize = (modelClicked) => (event) => {
  closeModelSelect();
  // Show selected model in search box
  document.getElementById('findModelBoxEmpty').style.display = 'none';
  const clonedModelElement = modelClicked.cloneNode(true);
  clonedModelElement.style.cursor = 'auto';
  const modelBoxCard = document.getElementById('findModelBoxCard');
  modelBoxCard.style.display = 'flex';
  clonedModelElement.style.height = `${modelBoxCard.parentElement.clientHeight}px`;

  // remove any previously selected model then add the new one
  if (modelBoxCard.lastElementChild?.tagName === 'DIV') {
    modelBoxCard.removeChild(modelBoxCard.lastChild);
  }
  const modelImg = clonedModelElement.getElementsByTagName('img')[0];
  modelImg.style.borderRadius = '0px';
  modelBoxCard.appendChild(clonedModelElement);
  // Fill form with attributes from selected model
  const model = JSON.parse(modelClicked.getAttribute("data-model"));
  document.getElementById(model['gender']).parentElement.click();
  document.getElementById('itemSize').value = event.target.innerText;
  document.getElementById('itemMaterial').value = model['material'];
  document.getElementById('itemModel').value = model['maiName'];
  document.getElementById('itemOriginalPrice').value = model['originalPriceSek']
  document.getElementById('findModelDescription').style.display = 'none';
  document.getElementById('findNewModel').style.display = 'flex';
}

const showModelSizes = (modelClicked) => {
  window.scrollTo({ top: 0 });
  const templateSize = document.getElementById('modelSizeTemplate');
  const modelSizeList = document.getElementById('modelSizeList');
  while (modelSizeList.firstChild) {
    modelSizeList.removeChild(modelSizeList.lastChild);
  }
  const model = JSON.parse(modelClicked.getAttribute("data-model"));
  for (const [idx, size] of model.sizes.entries()) {
    const newNode = templateSize.cloneNode(true);
    newNode.id = `${templateSize.id}_${idx}`;
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
    newNode.style.display = 'flex';
    newNode.style.cursor = 'pointer';
    newNode.setAttribute("data-model", JSON.stringify(model));
    newNode.addEventListener('click', selectModel);
    for (const child of Array.from(newNode.getElementsByTagName('*'))) {
      child.id = `${child.id}_${idx}`;
    }
    modelResultList.appendChild(newNode);
    document.getElementById(`modelImage_${idx}`).src = model['coverImage'];
    document.getElementById(`brandNameCategory_${idx}`).innerText = `${model['brand']}, ${model['category']}`;
    document.getElementById(`modelName_${idx}`).innerText = `${model['maiName']}`;
    document.getElementById(`modelColor_${idx}`).innerText = `${model['color']}`;
    document.getElementById(`modelGender_${idx}`).innerText = `${model['gender']}`;
  }
}

function showFindModelPage(alwaysShow) {
  return () => {
    if (!alwaysShow && document.getElementById('findModelBoxEmpty').style.display === 'none') {
      // A model is selected and shown, don't open the find model page on click inside the box
      return;
    }
    document.getElementById('addItemFormDiv').style.display = 'none';
    document.getElementById('modelSelectError').style.display = 'none';
    document.getElementById('modelSizeSelect').style.display = 'none';
    document.getElementById('modelSelectTitle').innerText = 'Välj modell';
    document.getElementById('modelSelectDiv').style.display = 'block';
    document.getElementById('modelList').style.display = 'block';
    let modelDb = sessionStorage.getItem('models');
    if (!modelDb) {
      document.getElementById('modelSpinner').style.display = 'block'
    } else {
      document.getElementById('modelSpinner').style.display = 'none';
      showModelItems(JSON.parse(modelDb).slice(0, 5));
    }
  }
}

document.getElementById('find-model-box').addEventListener('click', showFindModelPage(false))
document.getElementById('findNewModel').addEventListener('click', showFindModelPage(true))

const closeModelSelect = () => {
  document.getElementById('addItemFormDiv').style.display = 'block';
  document.getElementById('modelSelectDiv').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'none';
}

document.getElementById('modelSelectClose').addEventListener('click', () => {
  closeModelSelect();
})

document.getElementById('modelSearchInput').addEventListener('input', () => {
  const modelSearchString = document.getElementById('modelSearchInput').value;
  const modelDb = JSON.parse(sessionStorage.getItem('models'));
  if (modelSearchString && modelSearchString.length > 0) {
    const fuse = new Fuse(modelDb, {
      includeScore: true,
      keys: [
        { name: "name", weight: 2 },
        "category",
        "color",
      ]
    });
    const searchResult = fuse.search(modelSearchString.replace(', ', ' '), { limit: 5 });
    showModelItems(searchResult.map(r => r.item));
  } else {
    showModelItems(modelDb.slice(0, 5));
  }
})

document.getElementById('removeModelIcon').addEventListener('click', (event) => {
  document.getElementById('findModelBoxEmpty').style.display = 'flex';
  document.getElementById('findModelBoxCard').style.display = 'none';
  document.getElementById('findModelDescription').style.display = 'block';
  document.getElementById('findNewModel').style.display = 'none';
  event.stopPropagation();
});
