import {formatPersonalId, isValidSwedishSsn} from "./general";

async function addPersonalId() {
  // Grab values from form
  let personalId = document.getElementById("personalId").value;
  personalId = formatPersonalId(personalId);

  // Write to Firestore
  if (personalId) {
    const itemRef = db.collection('users').doc(authUser.current.uid);
    itemRef.update({
      personalId: personalId
    })
      .then(() => {
        console.log(`PersonalId of ${authUser.current.uid} is now updated`);
        personalIdConfirmationDiv.style.display = 'block';
        personalIdFormDiv.style.display = 'none';
      })
      .catch((error) => {
        errorHandler.report(error);
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  } else {
    location.href = "/private";
  }
}

document.getElementById('userPersonalIdForm').addEventListener("submit", addPersonalId);
document.getElementById('personalId').addEventListener("input", () => {
  const error = isValidSwedishSsn(document.getElementById('personalId').value) ? '' : 'Ogiltigt personnummer';
  document.getElementById("personalId").setCustomValidity(error);
})
