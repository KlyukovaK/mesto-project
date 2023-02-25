/*сохранение в popup1*/
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__subtitle");
import {nameInput, jobInput, profilePopup} from "./index.js";
import {closePopup} from "./utils.js";

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
export {handleProfileFormSubmit}
