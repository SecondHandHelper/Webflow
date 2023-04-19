const selectSize = (modelClicked) => (event) => {
  closeModelSelect();
  // Show selected model in search box
  document.getElementById('findModelBoxEmpty').style.display = 'none';
  document.getElementById('findModelBoxFilled').style.display = 'flex';
  const modelJson = modelClicked.getAttribute("data-model");
  document.getElementById('findModelBoxFilled').setAttribute("data-model", modelJson)
  const model = JSON.parse(modelJson);
  document.getElementById('findModelBoxImage').style.backgroundImage = `url('${model["coverImageSmall"]}')`;
  document.getElementById('findModelBoxNameCategory').innerText = `${model['brand']}, ${model['category']}`;
  document.getElementById('findModelBoxName').innerText = `${model['maiName']}`;
  document.getElementById('findModelBoxColor').innerText = `${model['color']}`;
  document.getElementById('findModelBoxGender').innerText = `${model['gender']}`;

  // Fill form with attributes from selected model
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

function showFindModelPage() {
  document.getElementById('addItemFormDiv').style.display = 'none';
  document.getElementById('modelSelectError').style.display = 'none';
  document.getElementById('modelSizeSelect').style.display = 'none';
  document.getElementById('modelSelectTitle').innerText = 'Välj modell';
  document.getElementById('modelSelectDiv').style.display = 'block';
  document.getElementById('modelList').style.display = 'block';
  document.getElementById('modelSearchInput').value = '';
  let modelDb = sessionStorage.getItem('models');
  if (!modelDb) {
    document.getElementById('modelSpinner').style.display = 'block'
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

document.getElementById('findModelBoxEmpty').addEventListener('click', showFindModelPage)
document.getElementById('findNewModel').addEventListener('click', showFindModelPage)

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
