import {itemCoverImage} from "./general";

const params = getParamsObject();
if (params.app) {
  const goBackButtons = document.querySelectorAll('.goback');
  goBackButtons.forEach(button => {
    button.style.visibility = 'hidden';
  });
}

async function loadItem(itemId) {
  const item = await callBackendApi(`/api/items/${itemId}`);
  if (!item.data) { 
    return null;
  }
  const data = item.data;
  console.log("Item data:", data);
  const infoRequests = data.infoRequests;
  const category = data.category ? data.category : "";
  let statusText = ""
  let publishedDate = data.publishedDate;
  let daysLeftText = "";
  if (data.publishedDate) {
    publishedDate = new Date(publishedDate);
    const nowDate = new Date();
    const timeDifference = nowDate.getTime() - publishedDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const sellingPeriodLength = data.longerPeriodAcceptedDate ? 60 : 30;
    const daysLeft = Math.max(0, Math.round(sellingPeriodLength - daysDifference));
    daysLeftText = `${daysLeft} ${daysLeft === 1 ? 'dag' : 'dagar'} kvar`;
  }
  const min = data.minPriceEstimate;
  const max = data.maxPriceEstimate;
  const valuationText = min && max ? `${min}-${max} kr` : "";
  let text1 = "";
  let text2 = "";

  if (data.status === "New") {
    if (infoRequests?.price?.status === "Active") {
      statusText = `Inväntar ditt svar`;
      text1 = "På huvudsidan kan du se plaggets värdering och<br>välja om du vill sälja till värderingen eller inte.";
    } else if (min && max) {
      statusText = `Förbereds`;
      text1 = "Förbereder det sista inför publicering.<br>Försäljningen påbörjas inom kort.";
      text2 = valuationText;
    } else {
      statusText = `Värdering pågår`;
      text1 = "Du får ett SMS när värderingen är klar.<br>Värderingen tar normalt 2 vardagar.";
    }
    editItemLink.style.display = 'block';
  }
  if (data.status === "Published" && min && max) {
    statusText = `Försäljning pågår`;
    text1 = daysLeftText;
    text2 = valuationText;
    if (data.currentPrice) {
      document.getElementById('itemCurrentPrice').innerText = Math.min(data.userSetCurrentPrice || data.currentPrice, data.currentPrice);
      document.getElementById('itemCurrentPriceDiv').style.display = 'flex';
    }
    editItemLink.style.display = 'block';

    const totalViews = (data.platformListings?.maiShop?.views || 0) + (data.platformListings?.tradera?.views || 0);
    const totalLikes = (data.platformListings?.maiShop?.likes || 0) + (data.platformListings?.tradera?.likes || 0);
    if (totalViews > 0 || totalLikes > 0) {
      viewsCount.innerHTML = totalViews;
      likesCount.innerHTML = totalLikes;
      viewsAndLikesDiv.style.display = 'flex';
    }
  }
  if (data.status === "Sold") {
    const notTrustedSeller = user.current.trustedSellerStatus !== 'Trusted';
    statusText = `Såld!`;

    // Happy case
    if (notTrustedSeller) {
      text1 = "Du får betalt 5 dagar efter att köparen hämtat ut plagget, och ingen reklamation har skett."
    } else if (data.payoutStatus !== "Payed") {
      text1 = data.payoutType === 'Brand Gift Card'
        ? `Ditt presentkort på ${data.cleanedBrand} skapas inom en dag`
        : (data.payoutType === 'Mai Resale Gift Card'
            ? "Dina Mai Shop Credits betalas ut inom en dag"
            : "Utbetalning kommer via Swish inom en dag"
          );
    }

    if (data.shippingStatus === "Not sent") {
      toShipItemLink.href = window.location.origin + `/ship-item?id=${itemId}`;
      toShipItemLink.style.display = "flex";
    } else {
      console.log('data.saleApprovalStatus', data.saleApprovalStatus);
      if (notTrustedSeller) {
        if (!data.saleApprovalStatus || data.saleApprovalStatus === 'Pending') {
          statusText = 'Inväntar godkännande';
          toTrustedSellerArticleLink.style.display = "flex";
        // Return case
        } else if (data?.reclaim?.status === 'Approved' && data.refundResponsible === 'Seller') {
          if (data.returnShippingStatus === 'Collected') {
            statusText = 'Returnerat';
            text1 = 'Plagget har returnerats till dig.';
          } else if (data.returnPostnordShipmentId) {
            statusText = 'På väg tillbaka till dig';
            text1 = 'Plagget reklamerades och är nu på väg tillbaka till dig';
            toTrackReturnLink.href = `https://tracking.postnord.com/se/tracking?id=${data.returnPostnordShipmentId}`;
            toTrackReturnLink.style.display = "flex";
          }
        }
      }
    }

    if (statusText.includes('Såld')){
      sellerGetsTitle.innerHTML = data.payoutStatus === "Payed" ? "Du fick" : "Du får";
      sellerGetsText.innerHTML = `${data.payoutType === 'Brand Gift Card' ? data.soldPrice : data.sellerGets} kr`
      sellerGetsDiv.style.display = "flex";
      itemStatusText.style.fontSize = "18px";
      itemStatusText.style.fontWeight = "500";
    }
  }

  itemBrandText.innerHTML = data.brand;
  itemCategoryText.innerHTML = category;
  pageTitleDiv.style.display = "flex";
  coverImageDiv.style.backgroundImage = `url('${(itemCoverImage(data))}')`;
  itemStatusText.innerHTML = statusText;
  itemText1.innerHTML = text1;
  itemText2.innerHTML = text2;

  itemDiv.style.display = "block";
  loadingDiv.style.display = "none";
  return data;
}

async function loadItemEvents(itemId, item) {
    itemEventsDiv.innerHTML = '';
    let response = await fetch(`https://europe-west3-second-hand-helper.cloudfunctions.net/itemEvents/${itemId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    const events = await response.json();
    console.log(events);
    let itemAddedEventExists = false;

    if (events) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.type === 'itemAdded') {
                itemAddedEventExists = true;
            }

            // Build lists...
            let style = i === events.length - 1 ? 'highlighted' : '';
            const component = getEventComponent(event, style, item);
            if (component) {
                let content = itemEventsDiv.innerHTML;
                itemEventsDiv.innerHTML = component.concat(content);
            }
        }
        itemEventsDiv.style.display = 'block';
        itemEventsLoadingDiv.style.display = 'none';

        // Add event listeners for info icons
        const infoIcons = itemEventsDiv.querySelectorAll('.event-info-icon');
        infoIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showEventInfoModal();
            });
        });

        // Show list if itemAdded exists
        if (!itemAddedEventExists) {
            sellingProcessDiv.style.display = 'none';
        }
    }
}

function eventComponentHtml(displayLine, icon, className, text, time, displayInfoIcon = false) {
    const infoIconHtml = displayInfoIcon ? 
        `<img class="event-info-icon" src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/64a5c2b2484c893d82cdd2d4_info-icon-grey.svg" loading="lazy" alt="">` : '';
    
    return `<div class="div-block-135"><div class="div-block-144"><div class="div-block-142">
                        <div class="div-block-139" style="display: ${displayLine};"></div>
                        </div>
                        <div class="div-block-138">${icon}</div>
                        </div>
                    <div class="div-block-136">
                        <div class="item-event-text ${className}">${text}${displayInfoIcon ? infoIconHtml : ''}</div>
                        <div class="text-block-82">${time}</div>
                    </div></div>`;
}

function getEventComponent(event, style, item) {
    console.log('event', event);
    let className = '';
    let icon = '<div class="div-block-143"></div>';
    // Highlighted event styling
    if (style === 'highlighted') {
        className = 'highlighted-event';
        icon = '<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/62c53fa9db6d0f383ee430f9_check-mark%202%20(1).svg" loading="lazy" width="auto" alt="">';
    }
    if (event.type === 'buyerFeedback') {
        icon = '<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/67e417040dc69683fcf4b4c5_star-solid-yellow.svg" loading="lazy" width="auto" alt="">';
    }
    const displayLine = 'block';
    const weekdays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
    const date = new Date(event.timestamp);
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let time = weekdays[date.getDay()] + " " + hours + ":" + minutes;
    let now = new Date();
    let daysDiff = Math.round((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (daysDiff > 6) {
        time = date.getDate() + " " + months[date.getMonth()] + " " + hours + ":" + minutes;
    }

    if (event.type === 'itemAdded') {
        return eventComponentHtml('none', icon, className, 'Plagg lades upp på Mai', time);
    }
    if (event.type === 'valuationCompleted') {
        return eventComponentHtml(displayLine, icon, className, `Värderades till ${event.data.min}-${event.data.max} kr`, time);
    }
    if (event.type === 'valuationAccepted') {
        return eventComponentHtml(displayLine, icon, className, `Du accepterade värderingen`, time);
    }
    if (event.type === 'valuationFinalOffer') {
        return eventComponentHtml(displayLine, icon, className, `Omvärderades till ${event.data.min}-${event.data.max} kr`, time);
    }
    if (event.type === 'itemPublished') {
        return eventComponentHtml(displayLine, icon, className, `Försäljning påbörjades`, time);
    }
    if (event.type === 'priceAdjusted') {
        const {platform, newPrice, isEarlyPriceDrop} = event.data
        let capPlatform = platform && platform.charAt(0).toUpperCase() + platform.slice(1).split(/(?=[A-Z])/).join(' ');
        if (item?.status === 'Published' && capPlatform === 'Mai Shop' && item?.platformListings?.maiShop?.url) {
          console.log('item price', item.platformListings.maiShop, newPrice)
          capPlatform = `<a href="${item?.platformListings?.maiShop?.url}" style="text-decoration: underline;" id="maiShopItemEventLink" target="_blank">${capPlatform}</a>`
        }
        return eventComponentHtml(displayLine, icon, className,
            `Pris sänktes till ${newPrice} kr ${platform && platform !== '' ? ' på ' + capPlatform : ''}`,
            time, isEarlyPriceDrop);
    }
    if (event.type === 'priceRequestSent') {
        return eventComponentHtml(displayLine, icon, className, `Nytt prisförslag på ${event.data.min}-${event.data.max} kr`, time);
    }
    if (event.type === 'priceRequestResponse') {
        if (event.data.response === 'Accepted') {
            return eventComponentHtml(displayLine, icon, className, `Du accepterade prisförslaget`, time);
        } else if (event.data.response === 'Denied') {
            return eventComponentHtml(displayLine, icon, className, `Du avböjde prisförslaget`, time);
        }
    }
    if (event.type === 'listingRenewal') {
        return eventComponentHtml(displayLine, icon, className, `Annonser förnyades`, time);
    }
    if (event.type === 'platformAdded') {
        return (event.data.platforms || [])
            .filter(p => p !== 'Google Shopping' && p !== 'Instagram Shop' && p !== 'Facebook Shop')
            .map(p => {
              let shopText = p;
              if (shopText === 'Mai Shop') {
                if (item?.status === 'Published' && item?.platformListings?.maiShop?.url) {
                  shopText = `<a href="${item?.platformListings?.maiShop?.url}" style="text-decoration: underline;" id="maiShopItemEventLink" target="_blank">${shopText}</a>`
                }
                shopText += '<br>(Google Shopping, Instagram Shop, Facebook Shop)'
              }
              return eventComponentHtml(displayLine, icon, className, `Publicerades på ${shopText}`, time);
            })
            .join('\n');
    }
    if (event.type === 'itemSold') {
        return eventComponentHtml(displayLine, icon, className,
            `Såld för ${event.data.soldPrice} kr till ${event.data.buyerFirstName} i ${event.data.buyerAddressCity}`,
            time);
    }
    if (event.type === 'bagSentToSeller') {
        return eventComponentHtml(displayLine, icon, className, `Fraktetikett skickades till dig`, time);
    }
    if (event.type === 'itemSent') {
        return eventComponentHtml(displayLine, icon, className, `Du skickade plagget`, time);
    }
    if (event.type === 'payoutCompleted') {
        return eventComponentHtml(displayLine, icon, className, `Du fick ${event.data.amount} kr utbetalt`, time);
    }
    if (event.type === 'valuationUserAdjusted') {
        return eventComponentHtml(displayLine, icon, className, `Du justerade värderingen till ${event.data.min}-${event.data.max} kr`, time);
    }
    if (event.type === 'itemDelivered') {
        return eventComponentHtml(displayLine, icon, className, `Levererad till köparens ombud`, time);
    }
    if (event.type === 'itemCollected') {
        return eventComponentHtml(displayLine, icon, className, `Upphämtat av köparen`, time);
    }
    if (event.type === 'saleApproved') {
      return eventComponentHtml(displayLine, icon, className, `Försäljning godkänd`, time);
    }
    if (event.type === 'saleDeclined') {
      return eventComponentHtml(displayLine, icon, className, `Försäljningen godkändes inte`, time);
    }
    if (event.type === 'buyerFeedback') {
      return eventComponentHtml(displayLine, icon, className, `Kommentar från köparen:\n"${event.data.comment}"`, time);
    }
    return false;
}

function toEditItem () {
  const params = getParamsObject();
  location.href = `/edit-item?id=${params.id}`;
}

editItemLink.addEventListener('click', toEditItem);
coverImageDiv.addEventListener('click', toEditItem);
itemText2.addEventListener('click', toEditItem);
itemCurrentPrice.addEventListener('click', toEditItem);

authUser.whenSet(async () => {
  const item = await loadItem(params.id);
  loadItemEvents(params.id, item);
});

function showEventInfoModal() {
    const modal = document.querySelector('.event-info-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEventInfoModal();
            }
        });
        
        // Close on close button click
        const closeBtn = modal.querySelector('.close-modal-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEventInfoModal);
        }
    }
}

function closeEventInfoModal() {
    const modal = document.querySelector('.event-info-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
