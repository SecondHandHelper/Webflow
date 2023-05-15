function nextStep() {
    // User is signed in
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    console.log('document.referrer', document.referrer);
    console.log(`sessionStorage.getItem('itemToBeCreatedAfterSignIn')`, sessionStorage.getItem('itemToBeCreatedAfterSignIn'));

    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sell-item')) {
        console.log(`window.location.replace('./sell-item');`);
        //window.location.replace('./sell-item');
    } else {
        console.log(`window.location.replace('./private');`);
        //window.location.replace('./private');
    }
}