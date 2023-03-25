import "./index.css";
import { Popup } from "../components/Popup.js";
import { FormValidator } from "../components/FormValidator.js";
import { createCard } from "../components/card.js";
import { api, renderLoading } from "../components/API.js";
import {
  nameInput,
  jobInput,
  avararProfile,
  cardPopupText,
  cardPopupImage,
  elementContainer,
  profileName,
  profileJob,
  popupProfileAddContent,
  popupCardAddContent,
  popupProfileOpenButton,
  popupCardOpenButton,
  popupCloseButtons,
  avararPopup,
  avatarInput,
  popupAvatareAddContent,
  cardTemplate,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";
import Card from "../components/card.js";


let currentCard = null;


const renderProfileForm = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
}

const userInfo = new UserInfo({
  profileName, profileJob, avararProfile
})

const createCard = data => {
  const card = new Card(data, userInfo.userId, cardTemplate)
}






const profilePopup = new Popup ('.profile-popup');
popupProfileOpenButton.addEventListener("click", () => {
  profilePopup.openPopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}); //open popup1
const cardPopup = new Popup ('.card-popup');
popupCardOpenButton.addEventListener("click", () => {
  cardPopup.openPopup();
}); //oprn popup2
profilePopup.setEventListeners();
cardPopup.setEventListeners();

/*сохранение в popup1*/
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   renderLoading(popupProfileAddContent, "Сохранить...");
//   api
//     .changeProfile(nameInput.value, jobInput.value)
//     .then((resalt) => {
//       profileName.textContent = resalt.name;
//       profileJob.textContent = resalt.about;
//       profilePopup.closePopup();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(popupProfileAddContent, "Сохранить");
//     });
// }
/*сохранение в popup1*/
// profilePopup.addEventListener("submit", handleProfileFormSubmit);
//добавление карточек из popup
// function submitCardForm(evt) {
//   evt.preventDefault();
//   renderLoading(popupCardAddContent, "Создать...");
//   api
//     .addCard(cardPopupText.value, cardPopupImage.value)
//     .then((card) => {
//       const authorId = card.owner._id;
//       elementContainer.prepend(createCard(card, authorId));
//       evt.target.reset();
//       popupCardAddContent.classList.add("popup__button_inactive");
//       popupCardAddContent.setAttribute("disabled", "disabled");
//       cardPopup.closePopup();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(popupCardAddContent, "Сохранить");
//     });
// }
// cardPopup.addEventListener("submit", submitCardForm);

//валидация форм
const enableValidation = new FormValidator({
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});

enableValidation.enableValidation();

// document.querySelector(".profile__change").addEventListener("click", () => {
//   openPopup(avararPopup);
// });

// /*сохранение avatar*/
// function submitChengeAvatar(evt) {
//   evt.preventDefault();
//   renderLoading(popupAvatareAddContent, "Сохранить...");
//   api
//     .changeAvatar(avatarInput.value)
//     .then((resalt) => {
//       avararProfile.src = resalt.avatar;
//       closePopup(avararPopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(popupAvatareAddContent, "Сохранить");
//     });
// }
// avararPopup.addEventListener("submit", submitChengeAvatar);
