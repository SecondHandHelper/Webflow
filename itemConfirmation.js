import {colorName} from "./sellItemHelpers";

function initializeFields(item) {
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


//SLIDER INITIALIZATION AND FUNCTIONALITY
const wrapper = document.querySelector('.carousel-wrapper');
let track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.previous-button');
let totalSlides = 0;
let currentSlide = 0;

const updateCarousel = () => {
  const slideWidth = wrapper.offsetWidth;
  totalSlides = document.querySelectorAll('.carousel-slide').length;

  // Hide/show arrows based on position
  prevButton.style.display = currentSlide === 0 ? 'none' : 'flex';
  nextButton.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';

  // Update carousel position
  track.style.transition = 'transform 0.3s ease-in-out';
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
};

const handleNextClick = () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
};

const handlePrevClick = () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
};

function initializeSlider(item) {
  currentSlide = 0;  // Reset at initialization
  console.log('After initialization:', currentSlide);

  const images = item?.images;
  track.innerHTML = '';
  console.log('images', images)

  for (const imageName of ['modelImage', 'frontImage', 'enhancedFrontImage', 'brandTagImage', 'materialTagImage', 'extraImage', 'defectImage']) {
      if (images[imageName]) {
          if (imageName === 'frontImage' && images['enhancedFrontImage']) {
              continue;
          }
          console.log('imageName', imageName);
          const imageUrl = window.innerWidth <= 350 
            ? (images[`${imageName}Small`] || images[imageName])
            : images[imageName];

          const newSlideHtml = `
            <div class='carousel-slide'>
              <img class='slider-image' src='${imageUrl}' id='${imageName}' />
            </div>
          `;
          track.innerHTML += newSlideHtml;
          console.log(track);
      }
  }
  const slides = document.querySelectorAll('.carousel-slide');

  // Next button functionality
  nextButton.removeEventListener('click', handleNextClick);
  prevButton.removeEventListener('click', handlePrevClick);
  nextButton.addEventListener('click', handleNextClick);
  prevButton.addEventListener('click', handlePrevClick);

  // Swipe functionality
  let startX = null;
  let currentX = null;
  let isDragging = false;

  wrapper.addEventListener('touchstart', (e) => {
    if (!e.touches) return;
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
  });

  wrapper.addEventListener('touchmove', (e) => {
    if (!e.touches || !isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    // Move the track temporarily for feedback
    const slideWidth = slides[0].offsetWidth;
    const offset = -currentSlide * slideWidth + deltaX;
    track.style.transform = `translateX(${offset}px)`;
  });

  wrapper.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    // Determine if the swipe is significant enough to change slides
    if (startX !== null && currentX !== null) {
      const deltaX = currentX - startX;
  
      if (Math.abs(deltaX) > 50) {  // Only process if it's a significant swipe
        if (deltaX > 50) {
          currentSlide = Math.max(currentSlide - 1, 0);
        } else if (deltaX < -50) {
          currentSlide = Math.min(currentSlide + 1, slides.length - 1);
        }
      }
    }
    
    // Reset the coordinates
    startX = null;
    currentX = null;
  
    updateCarousel();
  });

  // Initialize carousel
  updateCarousel();
}

const params = getParamsObject();
if (params.id) {
  getItem(params.id).then(initializeSlider)
      .catch(e => //location.href = '/private' 
        console.log('failed')  
      );
} else {
  item = JSON.parse(localStorage.getItem('latestItemCreated'));
  if (!item) {
      console.error("No recently created item found");
      location.href = '/private';
  }
  initializeSlider(item);
}
