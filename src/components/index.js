const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const imagePopup = document.querySelector(".image-popup");
const nameInput = profilePopup.querySelector("#name");
const jobInput = profilePopup.querySelector("#profession");
const cardPopupText = cardPopup.querySelector("#nameplace");
const cardPopupImage = cardPopup.querySelector("#images");
const editButton = document.querySelector(".profile-info__button");
const addButton = document.querySelector(".profile__button");
const closeButtons = document.querySelectorAll(".popup__close");
const openImage = imagePopup.querySelector(".popup__img");
const nameImage = imagePopup.querySelector(".popup__img-name");
const popupList = document.querySelectorAll(".popup");
const elementContainer = document.querySelector(".elements");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import "../../pages/index.css";
import {openPopup, closePopup} from "./utils.js";
import {handleProfileFormSubmit} from "./modal.js";
import {enableValidation} from "./validate.js";
import {addImage} from "./card.js";

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
}); //open popup1
addButton.addEventListener("click", () => {
  openPopup(cardPopup);
}); //oprn popup2

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
// закрыте popup Esc
popupList.forEach((popupElement) => {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popupElement);
    }
  });
  document.addEventListener("click", function (evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

/*сохранение в popup1*/
profilePopup.addEventListener("submit", handleProfileFormSubmit);

//добавление карточек из popup
function createCard(evt) {
  evt.preventDefault();
  elementContainer.prepend(addImage(cardPopupImage.value, cardPopupText.value));
  evt.target.reset();
  closePopup(cardPopup);
}
cardPopup.addEventListener("submit", createCard);
// добавление карточек из массива
initialCards.forEach((item) => {
  elementContainer.append(addImage(item.link, item.name));
});


//валидация форм
enableValidation({
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});
export {profilePopup, nameInput, jobInput, imagePopup, cardPopupText, cardPopupImage, openImage, nameImage};
