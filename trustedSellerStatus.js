
function updateContentForUser(user) {
  document.getElementById('trustedSellerLink').addEventListener('click', function() {
    Intercom('showArticle', 10805226);
  });
  if (user.current?.trustedSellerStatus === 'Trusted') {
  } else if (user.current?.trustedSellerStatus === 'Untrusted') {
    document.getElementById('trustedSellerIcon').style.opacity = 0.2;
    document.getElementById('trustedSellerHeading').innerText = 'Du har inte uppnåt statusen Pålitlig Säljare ännu';
    document.getElementById('trustedSellerBody').innerText = 'Eftersom du är en ny användare så har du inte uppnåt statusen Pålitlig Säljare ännu. Vi utvärderar din säljarstatus efter att du sålt dina första 3 plagg.'
  } else {
    document.getElementById('trustedSellerIcon').style.display = 'none';
    document.getElementById('untrustedSellerIcon').style.display = 'block';
    document.getElementById('trustedSellerHeading').innerText = 'För tillfället har du inte statusen Pålitlig Säljare';
    document.getElementById('trustedSellerBody').innerText = 'Eftersom dina försäljningar har reklamerats eller inte skickats i tid så uppfyller du just nu inte kriterierna för att bli en Pålitlig Säljare. Du kan fortfarande sälja, och får utbetalt när köparen mottagit och godkänt varan. Reklamationer skickas tillbaka till dig. Vi utvärderar din säljarstatus månadsvis.'
  }
}

window.intercomSettings = { app_id: "klyy0le5" };
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
Intercom('update', { 'hide_default_launcher': true });

user.whenSet(updateContentForUser);
