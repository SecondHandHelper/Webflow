import { getParamsObject } from "./general";

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    cvalue = cvalue.replaceAll('+', ' ');
    cvalue = encodeURIComponent(cvalue);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    //console.log("Cookie set: ", cname + "=" + cvalue);
}

export function deleteCookie(cname) {
  document.cookie = cname + '=; Max-Age=-99999999;';
}

export function getCookie(cname) {
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

const preferredLoginMethodCookieName = 'preferredLoginMethod';

export const getPreferredLogInMethod = () => getCookie(preferredLoginMethodCookieName);

export function setPreferredLogInMethodCookie(providerId) {
    setCookie(preferredLoginMethodCookieName, providerId, 6000);
}
