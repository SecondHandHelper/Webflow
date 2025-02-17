export function signOut() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out');
        authUser.current = null;
        user.current = null;
        userId = null;
        localStorage.removeItem('sessionUser');
        localStorage.removeItem('idToken');
        localStorage.removeItem('authUserId');
        localStorage.removeItem('authUser');
        deleteCookie('maiAuth');
        location.href = '/';
    }).catch((error) => {
        errorHandler.report(error);
        console.log(error);
    });
}

export function setFormAddressFields(user) {
    document.getElementById("addressFirstName").value = user.addressFirstName || '';
    document.getElementById("addressFirstName").dispatchEvent(new Event('input'));
    document.getElementById("addressLastName").value = user.addressLastName || '';
    document.getElementById("addressLastName").dispatchEvent(new Event('input'));
    document.getElementById("addressStreetAddress").value = user.addressStreetAddress || '';
    document.getElementById("addressStreetAddress").dispatchEvent(new Event('input'));
    document.getElementById("addressCO").value = user.addressCO || '';
    document.getElementById("addressCO").dispatchEvent(new Event('input'));
    document.getElementById("addressPostalCode").value = user.addressPostalCode || '';
    document.getElementById("addressPostalCode").dispatchEvent(new Event('input'));
    document.getElementById("addressCity").value = user.addressCity || '';
    document.getElementById("addressCity").dispatchEvent(new Event('input'));
    document.getElementById("addressDoorCode").value = user.addressDoorCode || '';
    document.getElementById("addressDoorCode").dispatchEvent(new Event('input'));
}
export function getFormAddressFields() {
    let addressFirstName = document.getElementById("addressFirstName").value;
    let addressLastName = document.getElementById("addressLastName").value;
    let addressStreetAddress = document.getElementById("addressStreetAddress").value;
    let addressCO = document.getElementById("addressCO").value;
    let addressPostalCode = document.getElementById("addressPostalCode").value;
    let addressCity = document.getElementById("addressCity").value;
    let addressDoorCode = document.getElementById("addressDoorCode").value;

    addressFirstName = addressFirstName ? addressFirstName.trim().charAt(0).toUpperCase() + addressFirstName.trim().slice(1) : "";
    addressLastName = addressLastName ? addressLastName.trim().charAt(0).toUpperCase() + addressLastName.trim().slice(1) : "";
    addressStreetAddress = addressStreetAddress ? addressStreetAddress.trim().charAt(0).toUpperCase() + addressStreetAddress.trim().slice(1) : "";
    addressCO = addressCO ? addressCO.trim() : "";
    addressPostalCode = addressPostalCode ? addressPostalCode.trim().replace(/\D/g, '') : "";
    addressCity = addressCity ? addressCity.trim().charAt(0).toUpperCase() + addressCity.trim().slice(1) : "";
    addressDoorCode = addressDoorCode ? addressDoorCode.trim() : "";
    return { addressFirstName, addressLastName, addressStreetAddress, addressCO, addressPostalCode, addressCity, addressDoorCode };
}


// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
export function isValidSwedishSsn(ssn) {
    ssn = ssn
        .replace(/\D/g, "")     // strip out all but digits
        .split("")              // convert string to array
        .reverse()              // reverse order for Luhn
        .slice(0, 10);          // keep only 10 digits (i.e. 1977 becomes 77)

    // verify we got 10 digits, otherwise it is invalid
    if (ssn.length !== 10) {
        return false;
    }
    const sum = ssn.map((n) => Number(n))
        .reduce((previous, current, index) => {
            if (index % 2) current *= 2;
            if (current > 9) current -= 9;
            return previous + current;
        });
    return 0 === sum % 10;
}


export function formatPersonalId(personalIdInput) {
    let personalId = personalIdInput.replace('-', '');
    if (personalId.length !== 12 && (personalId.substring(0, 2) !== '19' || personalId.substring(0, 2) !== '20')) {
        if (Number(personalId.substring(0, 2)) <= 99 && Number(personalId.substring(0, 2)) > 25) {
            personalId = "19" + personalId;
        } else {
            personalId = "20" + personalId;
        }
    }
    if (personalId.length === 12) {
        return personalId;
    }
    return null;
}

export function itemCoverImage(item) {
    const images = item.images;
    if (images.modelImage) {
        return images.modelImageSmall || images.modelImage
    }
    if (images.coverImage) {
        return images.coverImageSmall || images.coverImage
    }
    if (images.enhancedFrontImage) {
        return images.enhancedFrontImageSmall || images.enhancedFrontImage
    }
    return images.frontImageSmall || images.frontImage
}

export function shareCode() {
    const code = user.current.referralData.referralCode;
    //const text = `Hej, jag vill tipsa om Mai för att rensa ur garderoben. Mai är en tjänst som hjälper dig att sälja dina kläder på ett enkelt sätt. Man tar bara bilder på sina plagg, sedan sköter Mai resten - såsom värdering, annonsering på flera plattformar, kontakt med köpare och frakt när det blir sålt. Man får själv behålla 80% av vinsten, och blir det inte sålt kostar det ingenting.\n\nOm du registrerar dig med min kod (följ länken) och provar sälja ett plagg inom 7 dagar får du behålla 100% av vinsten för det första plagget (istället för 80%). Min kod: ${code}\n\nLäs mer och använd min kod här:`;
    const text = `Hej! Följ min personliga länk så säljer Mai ditt första plagg kostnadsfritt! Mai sköter försäljningen av dina kläder, inklusive värdering, lägger ut på flera plattformar samtidigt, har kontakten med köpare och ordnar med frakt när det blir sålt. Man får själv behålla 80% av vinsten, och blir det inte sålt kostar det ingenting.\n\nOm du registrerar dig med min kod (följ länken) och provar sälja ett plagg inom 7 dagar får du behålla 100% av vinsten för det första plagget (istället för 80%). Min kod: ${code}`;
    if (navigator.share) {
        navigator.share({
            text: text,
            url: `https://maiapp.se/?invite=${code}`
        }).then(() => { console.log('Thanks for sharing!'); }).catch((e) => {
            console.error(e);
            errorHandler.report(e);
        });
    } else {
        console.log("Browser doesn't support navigator.share => Copy to clipboard!");
        const shareText = text + "\n" + `https://maiapp.se/?invite=${code}`;
        navigator.clipboard.writeText(shareText);
        linkCopiedBanner.style.display = 'flex';
        setTimeout(function () { linkCopiedBanner.style.display = 'none'; }, 1500);
    }
}

// Channel bottom sheet
export function channelRouter(webpath){
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    showChannelBottomSheet(webpath)
  } else {
    window.location.href = webpath;
  }
}

function showChannelBottomSheet(webpath){
  document.getElementById('continueOnWebBottomSheet').href = window.location.origin + webpath;
  document.getElementById('darkOverlay').classList.add('active');
  document.getElementById('channelBottomSheet').classList.add('active');
}

export function hideChannelBottomSheet(){
  document.getElementById('darkOverlay').classList.remove('active');
  document.getElementById('channelBottomSheet').classList.remove('active');
}
// End of channel bottom sheet
