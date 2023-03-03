import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { createCard } from "./card.js";
import {
  getInitialCards,
  getInitialProfile,
  changeProfile,
  renderLoading,
  addCard,
  changeAvatar,
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
export const popupCardAddContent = cardPopup.querySelector(".popup__button");
const popupProfileOpenButton = document.querySelector(".profile-info__button");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const avararPopup = document.querySelector(".avatar-popup");
const avatarInput = avararPopup.querySelector("#avatar_imag");
const popupAvatareAddContent = avararPopup.querySelector(".popup__button");

popupProfileOpenButton.addEventListener("click", () => {
  openPopup(profilePopup);
  getInitialProfile().then((resalt) => {
    nameInput.value = resalt.name;
    jobInput.value = resalt.about;
  });
}); //open popup1
popupCardOpenButton.addEventListener("click", () => {
  openPopup(cardPopup);
}); //oprn popup2

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

/*сохранение в popup1*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupProfileAddContent, "Сохранить...");
  changeProfile(nameInput.value, jobInput.value)
    .then((resalt) => {
      profileName.textContent = resalt.name;
      profileJob.textContent = resalt.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupProfileAddContent, "Сохранить");
    });
}
/*сохранение в popup1*/
profilePopup.addEventListener("submit", handleProfileFormSubmit);
//добавление карточек из popup

function submitCardForm(evt) {
  evt.preventDefault();
  renderLoading(popupCardAddContent, "Создать...");
  addCard(cardPopupText.value, cardPopupImage.value)
    .then((card) => {
      const authorId = card.owner._id;
      elementContainer.prepend(createCard(card, authorId));
      evt.target.reset();
      popupCardAddContent.classList.add("popup__button_inactive");
      popupCardAddContent.setAttribute("disabled", "disabled");
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupCardAddContent, "Сохранить");
    });
}
cardPopup.addEventListener("submit", submitCardForm);

//валидация форм
enableValidation({
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});

document.querySelector(".profile__change").addEventListener("click", () => {
  openPopup(avararPopup);
});

/*сохранение в popup1*/
function submitChengeAvatar(evt) {
  evt.preventDefault();
  renderLoading(popupAvatareAddContent, "Сохранить...");
  changeAvatar(avatarInput.value)
    .then((resalt) => {
      avararProfile.src = resalt.avatar;
      closePopup(avararPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupAvatareAddContent, "Сохранить");
    });
}
avararPopup.addEventListener("submit", submitChengeAvatar);

getInitialProfile()
  .then((resalt) => {
    profileName.textContent = resalt.name;
    profileJob.textContent = resalt.about;
    avararProfile.src = resalt.avatar;
    return resalt;
  })
  .then((resalt) => {
    const authorId = resalt._id;
    getInitialCards()
      .then((cards) => {
        cards.forEach(function (card) {
          elementContainer.append(createCard(card, authorId));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
