// REDIRECTS
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var path = window.location.pathname;
var domain = window.location.origin;

// Redirect to Home Desktop if on desktop
if (!isMobile && !(path == "/home-desktop" || path == "/privacy-policy" || path == "/end-user-agreement" || path == "/private" || path == "/user-management") && !domain.includes("shh-test")) {
  window.location.replace('./home-desktop');
}
