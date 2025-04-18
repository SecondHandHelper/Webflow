import {shareCode} from "./general";

var npsId;
var npsScore;

async function addNpsScore() {
  let score = 11;
  var radioButtons = document.getElementsByName("nps");
  for (var x = 0; x < radioButtons.length; x++) {
    if (radioButtons[x].checked) {
      score = parseInt(radioButtons[x].value); // 0-10
      npsScore = score;
    }
  }

  // Validation
  if (!(score >= 0 && score <= 10)) {
    npsErrorMessage.style.display = 'block';
    return;
  }
  if (!authUser.current) {
    npsErrorMessage.innerHTML = 'Du måste vara inloggad för att svara';
    npsErrorMessage.style.display = 'block';
    return;
  }

  // Store score
  const docRef = await db.collection("nps").add({ score, answeredAt: new Date(), user: authUser.current.uid });
  npsId = docRef.id;
  console.log(`Score '${score}' stored in DB with npsId: `, npsId);

  // Show follow up question
  if (score >= 0 && score <= 6) {
    followUpQuestion.innerHTML = 'Tack för feedbacken! Vilka förändringar skulle Mai behöva göra för att få ett högre betyg?';
  }
  if (score >= 7 && score <= 8) {
    followUpQuestion.innerHTML = 'Tack för feedbacken! Vilka förändringar skulle göra Mai bättre?';
  }
  if (score >= 9 && score <= 10) {
    followUpQuestion.innerHTML = 'Kul att du gillar det! Vad är Mai riktigt bra på?';
  }

  triggerShowFollowUpQuestion.click();
}

async function addFollowUp() {
  const question = followUpQuestion.innerHTML;
  const answer = followUpAnswer.value;

  // Update latest NPS document with question and answer
  if (answer) {
    await db.collection('nps').doc(npsId).update({ followUpQuestion: question, followUpAnswer: answer });
    return true;
  }

  return false;
}

user.whenSet(async () => {
  const params = getParamsObject();
  if (!params.app) {
    // Store elementViews to be able to hinder it to show again
    db.collection('users').doc(authUser.current.uid).update({ elementViews: firebase.firestore.FieldValue.arrayUnion({ elementID: "npsSurvey", timestamp: new Date() }) });
    // Track with segment
    analytics.track("Element Viewed", { elementID: "npsSurvey" });
  }
});


npsSubmitButton.addEventListener("click", addNpsScore);
followUpSubmitButton.addEventListener("click", async function () {
  const followupWasSupplied = await addFollowUp();
  if (window.ReactNativeWebView?.postMessage && followupWasSupplied && npsScore && npsScore >= 10) {
    // In the app!
    const message = JSON.stringify({ type: 'nps-submitted', data: { score: npsScore } });
    thankYouForFeedbackDiv.style.display = 'block';
    thankYouInviteFriendsDiv.style.display = 'none';
    analytics.track("Element Viewed", { elementID: "askForAppReview" });
    window.ReactNativeWebView.postMessage(message);
  }
  else if (user.current?.referralData?.referralCode && npsScore >= 9 && npsScore <= 10){
    referralCodeText.innerHTML = user.current.referralData.referralCode;
    thankYouForFeedbackDiv.style.display = 'none';
    thankYouInviteFriendsDiv.style.display = 'block';
    analytics.track("Element Viewed", { elementID: "thankYouPromotorDiv" });
  }
  triggerShowThankYou.click();
});
closeThankYouButton.addEventListener("click", function () {
  if (authUser.current) { location.href = "/private"; }
  else { location.href = '/'; }
});
sharePersonalLinkFromNpsButton.addEventListener('click', shareCode);
