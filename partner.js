import { itemCoverImage } from "./general";

function loadRecentlySold() {
  const recentlySoldItems = callBackendApi('/api/items/recentlySold?highValue=true');
  recentlySoldItems
    .then((result) => {
      // Read result of the Cloud Function.
      const itemListRecentlySoldStartPage = document.getElementById('itemListRecentlySoldStartPage');
      itemListRecentlySoldStartPage.innerHTML = "";
      const itemListRecentlySoldStartPageDesktop = document.getElementById('itemListRecentlySoldStartPageDesktop');
      itemListRecentlySoldStartPageDesktop.innerHTML = "";

      for (const item of result.data) {
        const brand = item.brand;
        const soldPrice = item.soldPrice;
        const soldDate = new Date(item.soldDate);
        const publishedDate = new Date(item.publishedDate);
        const soldTimeText = new Date(item.soldDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? "Idag" : "Igår";
        const imageUrl = itemCoverImage(item);
        const daysToSold = Math.floor((soldDate.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24));
        if (soldPrice >= 180 || daysToSold <= 20) {
          const itemCardHTML = `<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div>
                        <div class="text-block-14">${brand}</div>
                        <div class='text-block-34'>Resold for ${soldPrice} kr</div>`;
          //I cut out the "Idag / Igår" during summer, since so little is sold every day. Add this last to show it again: <div class='text-block-34'>${soldTimeText}</div></div>
          itemListRecentlySoldStartPage.innerHTML += itemCardHTML;
          const desktopCardHTML = itemCardHTML.replace("14-big", "14-small-desktop");
          itemListRecentlySoldStartPageDesktop.innerHTML += desktopCardHTML;
        }
      }
    })
    .catch((error) => {
      errorHandler.report(error);
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      console.log('Error message: ', message, code);
    });
  // [END fb_functions_call_add_message_error]
}

loadRecentlySold();

// Set attribution cookies (could be put on any campaign page)
checkCookie("utm_campaign");
checkCookie("utm_source");
checkCookie("utm_medium");
checkCookie("utm_term");
checkCookie("utm_content");

async function submitForm() {
  if (!email.value && !phone.value) { return }
  contactForm.style.display = 'none';
  loadingFormSent.style.display = 'flex';
  const webhookUrl = 'https://hook.eu1.make.com/gy7flvqvrn72ofm61xah3hnhwbficinw';
  const data = {
    name: fullName.value || '',
    email: email.value || '',
    phone: phone.value || '',
    company: company.value || ''
  };
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(result => {
      console.log('Success:', result);
      loadingFormSent.style.display = 'none';
      contactConfirmation.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function fieldLabelToggle(field) {
  document.getElementById(`${field.id}Label`).style.display = field.value.length > 0 ? 'inline-block' : 'none'
}

function onLoadHandler() {
  closePartnerContactForm.addEventListener('click', function () {
    partnerContactForm.style.display = 'none';
  });
  const elements = document.querySelectorAll('[id*="partnerCtaBtn"]');
  elements.forEach(element => {
    element.addEventListener('click', function () {
      partnerContactForm.style.display = 'block';
    });
  });
  partnerContactDoneButton.addEventListener('click', async function () {
    await submitForm();
  });
  const inputFields = document.querySelectorAll('input');
  inputFields.forEach(field => {
    field.addEventListener('input', function () {
      fieldLabelToggle(this);
    });
  });
}

window.addEventListener('load', onLoadHandler);