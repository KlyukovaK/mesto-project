import "./index.css";
import { openPopup, closePopup } from "../components/modal.js";
import { FormValidator } from "../components/validate.js";
import { createCard } from "../components/card.js";
import { api, renderLoading } from "../components/api.js";
import {
  profilePopup,
  cardPopup,
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
} from "../utils/constants.js";

api
  .getInitialProfile()
  .then((resalt) => {
    profileName.textContent = resalt.name;
    profileJob.textContent = resalt.about;
    avararProfile.src = resalt.avatar;
    return resalt;
  })
  .then((resalt) => {
    const authorId = resalt._id;
    api
      .getInitialCards()
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

popupProfileOpenButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
  api
    .changeProfile(nameInput.value, jobInput.value)
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
  api
    .addCard(cardPopupText.value, cardPopupImage.value)
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
const enableValidation = new FormValidator({
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});

enableValidation.enableValidation();

document.querySelector(".profile__change").addEventListener("click", () => {
  openPopup(avararPopup);
});

/*сохранение в popup1*/
function submitChengeAvatar(evt) {
  evt.preventDefault();
  renderLoading(popupAvatareAddContent, "Сохранить...");
  api
    .changeAvatar(avatarInput.value)
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
