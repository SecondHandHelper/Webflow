import {itemCoverImage} from "./general";

function loadItem(itemId) {
    db.collection("items").doc(itemId)
        .get().then((doc) => {
        if (doc.exists) {
            console.log("Item data:", doc.data());
            data = doc.data();
            const itemId = doc.id;
            const brand = data.brand;
            const infoRequests = data.infoRequests;
            let imgUrl = itemCoverImage(data);
            const status = data.status;
            const category = data.category ? data.category : "";
            const longerPeriodAcceptedDate = data.longerPeriodAcceptedDate;
            let statusText = ""
            let publishedDate = data.publishedDate;
            let daysLeftText = "";
            if (data.publishedDate) {
                publishedDate = new Date(publishedDate);
                let nowDate = new Date();
                let timeDifference = nowDate.getTime() - publishedDate.getTime();
                let daysDifference = timeDifference / (1000 * 3600 * 24);
                let sellingPeriodLength = longerPeriodAcceptedDate ? 60 : 30;
                let daysLeft = Math.round(sellingPeriodLength - daysDifference);
                if (daysLeft <= 0) {
                    daysLeftText = `0 dagar kvar`;
                } else {
                    daysLeftText = `${daysLeft} dagar kvar`;
                }
            }
            let min = data.minPriceEstimate;
            let max = data.maxPriceEstimate;
            const valuationText = min && max ? `${min}-${max} kr` : "";
            const soldPrice = data.soldPrice;
            const sellerGets = data.sellerGets;
            const payoutStatus = data.payoutStatus;
            const shippingStatus = data.shippingStatus;
            let text1 = "";
            let text2 = "";

            if (status === "New") {
                if (infoRequests?.price?.status === "Active") {
                    statusText = `Inväntar ditt svar`;
                    text1 = "På huvudsidan kan du se plaggets värdering och<br>välja om du vill sälja till värderingen eller inte.";
                } else if (min && max) {
                    statusText = `Förbereds`;
                    text1 = "Förbereder det sista inför publicering.<br>Du får ett SMS när försäljningen påbörjas.";
                    text2 = valuationText;
                } else {
                    statusText = `Värdering pågår`;
                    text1 = "Du får ett SMS när värderingen är klar.<br>Värderingen tar normalt 2 vardagar.";
                }
            }
            if (status === "Published" && min && max) {
                statusText = `Försäljning pågår`;
                text1 = daysLeftText;
                text2 = valuationText;
            }
            if (status === "Sold") {
                statusText = `Såld!`;
                itemStatusText.style.fontSize = "18px";
                itemStatusText.style.fontWeight = "500";
                text1 = payoutStatus === "Payed" ? "" : "Utbetalning kommer via Swish inom en dag";
                if (shippingStatus === "Not sent") {
                    text1 = "Utbetalning sker när du skickat plagget"
                    toShipItemLink.href = window.location.origin + `/ship-item?id=${itemId}`;
                    toShipItemLink.style.display = "flex";
                }
                sellerGetsTitle.innerHTML = payoutStatus === "Payed" ? "Du fick" : "Du får";
                sellerGetsText.innerHTML = `${sellerGets} kr`
                sellerGetsDiv.style.display = "flex";
            }

            itemBrandText.innerHTML = brand;
            itemCategoryText.innerHTML = category;
            pageTitleDiv.style.display = "flex";
            coverImageDiv.style.backgroundImage = `url('${imgUrl}')`;
            itemStatusText.innerHTML = statusText;
            itemText1.innerHTML = text1;
            itemText2.innerHTML = text2;

            itemDiv.style.display = "block";
            loadingDiv.style.display = "none";
        }
    }).catch((e) => {
        console.log("Error getting item document:", e);
        errorHandler.report(e);
    });
}

async function loadItemEvents(itemId) {
    itemEventsDiv.innerHTML = '';
    let response = await fetch(`https://europe-west3-second-hand-helper.cloudfunctions.net/itemEvents/${itemId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    const events = await response.json();
    console.log(events);
    itemAddedEventExists = false;

    if (events) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.type === 'itemAdded') {
                itemAddedEventExists = true;
            }

            // Build lists...
            let style = i === events.length - 1 ? 'highlighted' : '';
            const component = getEventComponent(event, style);
            if (component) {
                let content = itemEventsDiv.innerHTML;
                itemEventsDiv.innerHTML = component.concat(content);
            }
        }
        itemEventsDiv.style.display = 'block';
        itemEventsLoadingDiv.style.display = 'none';

        // Show list if itemAdded exists
        if (!itemAddedEventExists) {
            sellingProcessDiv.style.display = 'none';
        }
    }
}

function eventComponentHtml(displayLine, icon, className, text, time) {
    return `<div class="div-block-135"><div class="div-block-144"><div class="div-block-142">
                        <div class="div-block-139" style="display: ${displayLine};"></div>
                        </div>
                        <div class="div-block-138">${icon}</div>
                        </div>
                    <div class="div-block-136">
                        <div class="item-event-text ${className}">${text}</div>
                        <div class="text-block-82">${time}</div>
                    </div></div>`;
}

function getEventComponent(event, style) {
    let className = '';
    let icon = '<div class="div-block-143"></div>';
    // Highlighted event styling
    if (style === 'highlighted') {
        className = 'highlighted-event';
        icon = '<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/62c53fa9db6d0f383ee430f9_check-mark%202%20(1).svg" loading="lazy" width="auto" alt="">';
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
        const {platform, newPrice} = event.data
        const capPlatform = platform && platform.charAt(0).toUpperCase() + platform.slice(1).split(/(?=[A-Z])/).join(' ');
        return eventComponentHtml(displayLine, icon, className,
            `Pris sänktes till ${newPrice} kr ${platform && platform !== '' ? ' på ' + capPlatform : ''}`,
            time);
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
            .map(p => eventComponentHtml(displayLine, icon, className,
                `Publicerades på ${p}${p === 'Mai Shop' ? '<br>(Google Shopping, Instagram Shop, Facebook Shop)' : ''}`,
                time))
            .join('\n');
    }
    if (event.type === 'itemSold') {
        return eventComponentHtml(displayLine, icon, className,
            `Såld för ${event.data.soldPrice} kr till ${event.data.buyerFirstName} i ${event.data.buyerAddressCity}`,
            time);
    }
    if (event.type === 'bagSentToSeller') {
        return eventComponentHtml(displayLine, icon, className, `Fraktpåse skickades till dig`, time);
    }
    if (event.type === 'itemSent') {
        return eventComponentHtml(displayLine, icon, className, `Plagget skickades iväg`, time);
    }
    if (event.type === 'payoutCompleted') {
        return eventComponentHtml(displayLine, icon, className, `Du fick ${event.data.amount} kr utbetalt`, time);
    }
    if (event.type === 'valuationUserAdjusted') {
        return eventComponentHtml(displayLine, icon, className, `Du justerade värderingen till ${event.data.min}-${event.data.max} kr`, time);
    }
    return false;
}

editItemLink.addEventListener('click', function () {
    location.href = `/edit-item?id=${params.id}`;
});

// Load item
loadItem(params.id);
loadItemEvents(params.id);
