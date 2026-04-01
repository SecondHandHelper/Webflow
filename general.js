export async function signOut() {
    try {
        try {
          // Delete session cookie
          await callBackendApi('/api/users/session', {
            method: "DELETE",
            fetchInit: { credentials: "include" },
          });
        } catch (error) {
          console.warn("[SSO] Error clearing session cookie:", error);
          errorHandler.report(error);
        }
        await firebase.auth().signOut();
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
    } catch (error) {
        errorHandler.report(error);
        console.log(error);
    }
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
  if (item.images) {
    const images = item.images;
    return images.modelImageSmall || images.modelImage || images.coverImageSmall || images.coverImage || images.enhancedFrontImageSmall || images.enhancedFrontImage || images.frontImageSmall || images.frontImage;
  } else if (item.imagesv2) {
    const priorityOrder = ['modelImage', 'enhancedFrontImage', 'frontImage'];
    for (const name of priorityOrder) {
      const image = item.imagesv2.find(img => img.name === name);
      if (image) {
        if (image?.versions?.small) return image.versions.small;
        if (image?.versions?.medium) return image.versions.medium;
        if (image?.versions?.large) return image.versions.large;
        if (image.url) return image.url;
      }
    }
  }
  return null;
}

export function shareCode() {
    const code = user.current.referralData.referralCode;
    let text;
    if (user.current?.maiCircle) {
        text = "Här får du en exklusiv inbjudan till Mai, som ger en extra fin start med tre kommissionsfria försäljningar.";
    } else {
        text = "Jag bjuder in dig till Mai för att sälja dina kläder! Gå genom min länk för att få en extra kommissionsfri försäljning.";
    }
    if (navigator.share) {
        navigator.share({
            text: text,
            url: `https://invite.mairesale.com/refer?invite=${code}`
        }).then(() => { console.log('Thanks for sharing!'); }).catch((e) => {
            console.error(e);
            errorHandler.report(e);
        });
    } else {
        console.log("Browser doesn't support navigator.share => Copy to clipboard!");
        const shareText = text + "\n" + `https://invite.mairesale.com/refer?invite=${code}`;
        navigator.clipboard.writeText(shareText);
        linkCopiedBanner.style.display = 'flex';
        setTimeout(function () { linkCopiedBanner.style.display = 'none'; }, 1500);
    }
}

// Channel bottom sheet
export function channelRouter(webpath){
  if (isIos) {
    showChannelBottomSheet(webpath)
  } else if (window.location.href !== webpath) {
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

function getActiveMenuElement() {
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (sessionUser) {
    return document.getElementById('menu') || document.getElementById('menu-logged-out');
  }
  return document.getElementById('menu-logged-out') || document.getElementById('menu');
}

export function closeMenuWithAnimation(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const menu = getActiveMenuElement();
  if (menu) {
    menu.style.display = 'block';
    menu.style.transition = 'opacity 0.3s ease-in-out';
    menu.offsetHeight;
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300);
  }
}

export function prepareMenu(u) {
  let identifier;
  let signInMethodText;
  console.log("Prepare menu", u.signInMethod);
  if (u.signInMethod === 'phone' && u.phoneNumber) {
    identifier = u.phoneNumber;
    signInMethodText = 'Inloggad med SMS-kod';
  } else if (u.signInMethod === 'password' && u.email) {
    identifier = u.email;
    signInMethodText = 'Inloggad med email';
  } else if (u.signInMethod === 'google.com' && u.email) {
    identifier = u.email;
    signInMethodText = 'Inloggad med Google';
  }
  if (identifier) {
    account.innerHTML = identifier;
    account.style.display = 'block';
    accountSignInMethod.innerHTML = signInMethodText;
    accountSignInMethod.style.display = 'block';
  }
  if (u.addressFirstName && u.addressLastName) {
    accountName.innerHTML = `${u.addressFirstName} ${u.addressLastName}`;
    accountName.style.display = 'block';
  }
  if (u?.referralData?.referralCode) {
    referralCodeText.innerHTML = u.referralData.referralCode;
    headerInviteButton.style.display = 'flex';
    menuInviteLink.style.display = 'block';
  }
}

// Make prepareMenu available globally for session cookie auto-login
window.prepareMenu = prepareMenu;

export function setupMenuHandlers() {
  const menuLoginButton = document.getElementById("menuLoginButton");
  if (menuLoginButton) {
    menuLoginButton.addEventListener("click", () => {
      closeMenuWithAnimation();
      channelRouter("/sign-in");
    });
  }

  const menuSellItemButton = document.getElementById("menuSellItemButton");
  if (menuSellItemButton) {
    menuSellItemButton.addEventListener("click", () => {
      closeMenuWithAnimation();
      channelRouter("/sell-item");
    });
  }

  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      const menu = getActiveMenuElement();
      if (menu) {
        menu.style.display = 'block';
        menu.style.opacity = '0';
        menu.style.transition = 'opacity 0.3s ease-in-out';
        menu.offsetHeight;
        menu.style.opacity = '1';
      }
    });
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", closeMenuWithAnimation);
  }

  const menuSignoutButton = document.getElementById('menuSignoutButton');
  if (menuSignoutButton && !menuSignoutButton.dataset.signoutBound) {
    menuSignoutButton.addEventListener('click', async function () {
      await signOut();
    });
    menuSignoutButton.dataset.signoutBound = 'true';
  }

  const menuChatButton = document.getElementById("menuChatButton");
  if (menuChatButton) {
    menuChatButton.addEventListener("click", () => {
      closeMenuWithAnimation();
      Intercom('show');
    });
  }

  const menuFaqButton = document.getElementById("menuFaqButton");
  if (menuFaqButton) {
    menuFaqButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenuWithAnimation();
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          const elementPosition = faqSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 50;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    });
  }
}

// Toast animation functions
export function animateOpenToast(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    // Set initial position below screen
    element.style.transform = 'translateY(100%)';
    element.style.transition = 'transform 0.3s ease-out';
    element.style.display = 'block';

    // Animate to visible position
    setTimeout(() => {
      element.style.transform = 'translateY(0%)';
    }, 10);
    document.getElementById("darkOverlay").classList.add("active");
  }
}

export function animateCloseToast(elementId) {
  const element = document.getElementById(elementId);

  // Add the visibility check here
  if (!element || element.style.display === 'none') {
    return;
  }

  // Animate down and hide
  element.style.transform = 'translateY(100%)';
  element.style.transition = 'transform 0.3s ease-in';

  // Hide after animation completes
  setTimeout(() => {
    element.style.display = 'none';
  }, 300);

  document.getElementById("darkOverlay").classList.remove("active");
}

export function hideInfoRequestCard(elementId) {
  const bidRequestElement = document.getElementById(elementId);
  if (bidRequestElement) {
    bidRequestElement.style.display = 'none';

    // Check if there are any remaining visible cards
    const infoRequestsList = document.getElementById('infoRequestsList');
    if (infoRequestsList) {
      const visibleCards = infoRequestsList.querySelectorAll('[id^="infoRequest"]:not([style*="display: none"])');
      if (visibleCards.length === 0) {
        const infoRequestsDiv = document.getElementById('infoRequestsDiv');
        if (infoRequestsDiv) {
          infoRequestsDiv.style.display = 'none';
        }
      }
    }
  }
}
