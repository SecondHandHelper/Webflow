import {colorName} from "./sellItemHelpers";

console.log('TEST 2');

function initializeFields(item) {
  console.log('INIT FIELDS');
    const { humanCheckNeeded, maxPriceEstimate: mlMaxPriceEstimate, newMinMaxLog } = item.mlValuation || {};
    if (item.infoRequests?.price?.response === 'User proposal') {
        document.getElementById('nextStepTitle').style.display = 'block';
        document.getElementById('nextStepTitle').innerText = 'Granskar prisändringar';
        document.getElementById('nextStepText').innerText = 'Vi kikar på dina prisändringar, och om det ser bra ut så påbörjar vi försäljningen. Vi tar sedan hand om säljprocessen och hör av oss på SMS när plagget är sålt.';
    } else if (humanCheckNeeded || (!mlMaxPriceEstimate && !item.infoRequests?.price?.maxPrice) || newMinMaxLog) {
        document.getElementById('nextStepTitle').style.display = 'block';
        document.getElementById('nextStepText').innerText = `Ditt ${item.cleanedBrand || item.brand}-plagg behöver värderas manuellt, då AI-värderingen har lägre träffsäkerhet på detta varumärke. Du kommer få ett SMS när vi värderat plagget som du kan ta ställning till.`;
    }
    document.getElementById('itemTitle').innerText = (item.cleanedBrand || item.brand).trim() + "-" + item.category.toLowerCase();
    document.getElementById('itemPrice').innerText = item.maxPriceEstimate && !humanCheckNeeded && !newMinMaxLog ? `${item.maxPriceEstimate || mlMaxPriceEstimate} SEK` : '';
    document.getElementById('itemPrice').style.display = 'block';
    document.getElementById('itemSubtitle').innerText = item.model ? `${item.model}, ${colorName(item.color)}` : colorName(item.color);
    document.getElementById('itemSize').innerText = item.size;
    document.getElementById('itemMaterial').innerText = item.material;
    document.getElementById('itemCondition').innerText = item.condition = itemConditionText(item);
    if (item.originalPrice) {
        itemOriginalPrice.innerText = item.originalPrice + ' SEK';
        originalPriceDiv.style.display = 'flex';
    }
    if (item.userComment) {
        document.getElementById('itemComment').innerText = item.userComment;
        document.getElementById('itemCommentDiv').style.display = 'block';
    }
    if (item?.platformsToBePublishedOn?.length) {
        initializePlatforms(item);
    } else {
        document.getElementById('platformsSection').style.display = 'none';
    }
    console.log('INIT DONE');
}

function initializePlatforms(item) {
    if (item?.platformsToBePublishedOn?.length < 2) {
        document.getElementById('platformsSection').style.display = 'none';
        return;
    }
    const platformNode = document.getElementById('platformTradera');
    item.platformsToBePublishedOn.forEach(platform => {
        if (platform.match(/Tradera/)) {
            return; // Tradera is set statically in Webflow and always displayed
        }
        const newNode = platformNode.cloneNode(true);
        newNode.id = platform;
        newNode.innerText = platform;
        platformNode.parentNode.appendChild(newNode);
    });
    document.getElementById('platformsLoadingDiv').style.display = 'none';
    document.getElementById('platformsDiv').style.display = 'block';
}

function itemConditionText(item) {
    let conditionText = '';
    if (item.condition === 'Använd, tecken på slitage' && (item.defects.length || item.defectDescription)) {
        let defects = [];
        if (item.defectDescription) {
            conditionText = item.defectDescription;
        }
        else if (item.defects && item.defects.length > 0) {
            defects = item.defects.filter((defect) => { return defect !== 'Annat'; });
            conditionText = 'Anmärkning: ' + defects.join(', ');
        } else {
            conditionText = item.condition;
        }
    } else {
        conditionText = item.condition;
    }
    conditionText = (conditionText + '.').replace('..', '.');

    return conditionText;
}


const getItem = async (itemId) => {
    const res = await callBackendApi(`/api/items/${itemId}`);
    return { ...(res?.data || {}), id: itemId };
}

const main = async () => {
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : JSON.parse(localStorage.getItem('latestItemCreated'));
    if (!item) {
        console.error("Invalid item id param or no recently created item");
        location.href = '/private';
    }
    initializeFields(item);
    triggerShowContent.click();
}

main();

    // We have to keep this code outside the itemConfirmation.js file so that it's run before the webflow code is loaded
    // otherwise the slider does not work.
    function initializeSlider(item) {
      const images = item?.images;
      document.getElementById('slider').style.display = 'block';

      const slide = document.getElementById('frontImageSlide');
      const cloneSlide = slide.cloneNode(true);
      const sliderMask = document.getElementById('sliderMask');
      sliderMask.innerHTML = '';

      for (const imageName of ['modelImage', 'frontImage', 'enhancedFrontImage', 'brandTagImage', 'materialTagImage', 'extraImage', 'defectImage']) {
          if (images[imageName]) {
              if (imageName === 'frontImage' && images['enhancedFrontImage']) {
                  continue;
              }
              const newSlide = cloneSlide.cloneNode(true);
              newSlide.id = imageName;
              newSlide.firstChild.src = window.innerWidth <= 350 ? (images[`${imageName}Small`] || images[imageName]): images[imageName];
              sliderMask.appendChild(newSlide);
          }
      }
      console.log('SLIDER 4');
  }
  const params = getParamsObject();
  if (params.id) {
      getItem(params.id).then(initializeSlider)
          .catch(e => location.href = '/private');
  } else {
      item = JSON.parse(localStorage.getItem('latestItemCreated'));
      if (!item) {
          console.error("No recently created item found");
          location.href = '/private';
      }
      initializeSlider(item);
  }
