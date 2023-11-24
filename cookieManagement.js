function getParamsObject() {
  // Get params
  const queryStr = window.location.search;
  const paramPairs = queryStr.substring(1).split('&');
  const params = {};
  for (let i = 0; i < paramPairs.length; i++) {
    const parts = paramPairs[i].split('=');
    params[parts[0]] = decodeURIComponent(parts[1]);
  }
  return params;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    cvalue = cvalue.replaceAll('+', ' ');
    cvalue = encodeURIComponent(cvalue);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    //console.log("Cookie set: ", cname + "=" + cvalue);
}

function deleteCookie(cname) {
  document.cookie = cname + '=; Max-Age=-99999999;';
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            c = c.substring(name.length, c.length);
            return decodeURIComponent(c);
        }
    }
    return "";
}

function checkCookie(cname) {
  const c = getCookie(cname);
  const params = getParamsObject();
  if (!c) {
    if (params[cname]) {
      setCookie(cname, params[cname], 7);
      return params[cname];
    }
  } if (c) {
    return c;
  }
  return "";
}

const preferredLoginMethodCookieName = 'preferredLoginMethod';

const getPreferredLogInMethod = () => getCookie(preferredLoginMethodCookieName);

function setPreferredLogInMethodCookie(providerId) {
    setCookie(preferredLoginMethodCookieName, providerId, 6000);
}
