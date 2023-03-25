import "./index.css";
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
  cardTemplate,
  imagePopup,
  confimPopup,
  popups,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card.js";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section";


const profilePopupApi = new PopupWithForm(popups.profile, {
  submit: (data) => {
    profilePopupApi.setSubmitButton('Сохранение...');
    api
      .changeProfile(data)
      .then((data) => {
        profileInfo.setUserUnfo(data);
        profilePopupApi.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        profilePopupApi.setSubmitButton('Сохранить')
      })
  }
})

const profileInfo = new UserInfo({
  profileName, profileJob, avararProfile
})

api
  .getInitialProfile()
  .then((res) => {
    profileInfo.setUserInfo(res)
  })
  .catch((err) => {
    console.log(err)
  })


popupProfileOpenButton.addEventListener('click', () => {
  profilePopupApi.open();
  profilePopupApi.setInputValues(profileInfo.getUserInfo())
})




/*
popupProfileOpenButton.addEventListener("click", () => {
  profilePopupApi.open();
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
