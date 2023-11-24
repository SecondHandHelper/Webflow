!function(){var e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),t=window.location.origin;async function a(){try{let e=await firebase.app().functions("europe-west1").httpsCallable("fetchMaiShopRecentlyAddedItems")(),t=document.getElementById("ItemListRecentlyAddedItems");for(let a of(t.innerHTML="",e.data)){let e=`<div class="div-block-14-big"><a href="${a.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${a.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${a.brand}</div>
                            <div class="recent-added-items-subheader-category">${a.category}</div>
                            <div class="recently-added-price">${a.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;t.innerHTML+=e}}catch(e){errorHandler.report(e),console.log("error",e)}}e||t.includes("shh-test.page")||(desktopDiv.style.display="block",mobileContainer.style.display="none"),authUser.whenSet(signedInNextStep),function(){let e=firebase.app().functions("europe-west1").httpsCallable("recentlySoldItems");e().then(e=>{// Read result of the Cloud Function.
let t=document.getElementById("itemListRecentlySoldStartPage");for(let a of(t.innerHTML="",e.data)){let e=a.brand,i=a.soldPrice,n=new Date(a.soldDate),o=new Date(a.publishedDate);new Date(a.soldDate).toISOString().split("T")[0],new Date().toISOString().split("T")[0];let r=function(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}(a),c=Math.floor((n.getTime()-o.getTime())/864e5);if(i>=180||c<=20){let a=`<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${r}');"></div></div></div>
                        <div class="text-block-14">${i} kr</div>
                        <div class='text-block-34'>${e}</div>`;//I cut out the "Idag / Igår" during summer, since so little is sold every day. Add this last to show it again: <div class='text-block-34'>${soldTimeText}</div></div>
t.innerHTML+=a}}}).catch(e=>{errorHandler.report(e);// Getting the Error details.
var t=e.code;console.log("Error message: ",e.message,t)});// [END fb_functions_call_add_message_error]
}(),a(),// Set attribution cookies (could be put on any campaign page)
checkCookie("utm_campaign"),checkCookie("utm_source"),checkCookie("utm_medium"),checkCookie("utm_term"),checkCookie("utm_content");// Set invite code cookie
let i=checkCookie("invite");i&&(referralCodeText.innerHTML=i,activeCode.style.display="flex"),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var a=document,i=function(){i.c(arguments)};i.q=[],i.c=function(e){i.q.push(e)},e.Intercom=i;var n=function(){var e=a.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=a.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",n):e.addEventListener("load",n,!1)}}()}();//# sourceMappingURL=home.js.map

//# sourceMappingURL=home.js.map
