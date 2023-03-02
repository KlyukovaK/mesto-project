import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { createCard } from "./card.js";
import { initialCards } from "./initialCards.js";
import {
  getInitialCards,
  getInitialProfile,
  changeProfile,
  renderLoading,
  addCard,
} from "./api.js";
const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const nameInput = profilePopup.querySelector("#name");
const jobInput = profilePopup.querySelector("#profession");
const avararProfile = document.querySelector(".profile__avatar");
const cardPopupText = cardPopup.querySelector("#nameplace");
const cardPopupImage = cardPopup.querySelector("#images");
const elementContainer = document.querySelector(".elements");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__subtitle");
const popupProfileAddContent = profilePopup.querySelector(".popup__button");
const popupCardAddContent = cardPopup.querySelector(".popup__button");
const popupProfileOpenButton = document.querySelector(".profile-info__button");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

popupProfileOpenButton.addEventListener("click", () => {
  openPopup(profilePopup);
}); //open popup1
popupCardOpenButton.addEventListener("click", () => {
  openPopup(cardPopup);
}); //oprn popup2

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

getInitialProfile()
.then((resalt) => {
  profileName.textContent = resalt.name;
  profileJob.textContent = resalt.about;
  nameInput.value = resalt.name;
  jobInput.value = resalt.about;
})
.catch((err) => {
  console.log(err);
})

/*сохранение в popup1*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeProfile(nameInput.value, jobInput.value);
  renderLoading(popupProfileAddContent,true);
  getInitialProfile()
    .then((resalt) => {
      profileName.textContent = resalt.name;
      profileJob.textContent = resalt.about;
      avararProfile.src = resalt.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {renderLoading(popupProfileAddContent,false)})
  closePopup(profilePopup);
}
/*сохранение в popup1*/
profilePopup.addEventListener("submit", handleProfileFormSubmit);
//добавление карточек из popup
function submitCardForm(evt) {
  evt.preventDefault();
  elementContainer.prepend(
    createCard(cardPopupImage.value, cardPopupText.value)
  );
  evt.target.reset();
  popupCardAddContent.classList.add("popup__button_inactive");
  popupCardAddContent.setAttribute("disabled", "disabled");
  closePopup(cardPopup);
}
cardPopup.addEventListener("submit", submitCardForm);
// добавление карточек из массива
// initialCards.forEach((item) => {
//   elementContainer.append(createCard(item.link, item.name));
// });

//валидация форм
enableValidation({
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});
export { nameInput, jobInput, cardPopupText, cardPopupImage };

//добавление карточек
getInitialCards()
  .then((cards) => {
    cards.forEach((card) => {
      elementContainer.append(createCard(card.link, card.name));
    });
  })
  .catch((err) => {
    console.log(err);
  });
