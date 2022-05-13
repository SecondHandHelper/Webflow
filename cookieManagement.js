// Get params (Move to a more general file since not only cookies uses params)
var queryStr = window.location.search;
var paramPairs = queryStr.substr(1).split('&');
var params = {};
for (var i = 0; i < paramPairs.length; i++) {
    var parts = paramPairs[i].split('=');
    params[parts[0]] = parts[1];
}

function setCookie(cname, cvalue, exdays) {
    console.log("setCookie", cname);
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("New cookie set: ", cname + "=" + cvalue);
}

function getCookie(cname) {
    console.log("getCookie: ", cname);
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    console.log("checkCookie: ", cname);
    const c = getCookie(cname);
    if (!c) {
        console.log("No such cookie set: ", cname);
        if (params[cname]) {
            setCookie(cname, params[cname], 7);
            return params[cname];
        }
    }
    if (c) {
        console.log("Cookie exist: ", cname + "=" + c);
        return c;
    }
    return "";
}