import "./index.css";
import { api } from "../components/Api.js";
import {
  nameInput,
  jobInput,
  avararProfile,
  cardPopupText,
  cardPopupImage,
  profileName,
  profileJob,
  popupCardAddContent,
  popupProfileOpenButton,
  popupCardOpenButton,
  avatarInput,
  popupAvatareAddContent,
  cardTemplate,
  popups,
  cardContainer,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

let userId;

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

const profileInfo = new UserInfo(profileName, profileJob, avararProfile);

const profilePopupApi = new PopupWithForm(popups.profile, {
  submit: () => {
    profilePopupApi.setSubmitButton("Сохранение...");
    api
      .changeProfile(nameInput.value, jobInput.value)
      .then((data) => {
        profileInfo.setUserInfo(data);
        profilePopupApi.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopupApi.setSubmitButton("Сохранить");
      });
  },
});
profilePopupApi.setEventListeners();

popupProfileOpenButton.addEventListener("click", () => {
  profilePopupApi.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
// open popup2
const cardPopup = new PopupWithForm(popups.card, {
  submit: () => {
    cardPopup.setSubmitButton("Создать...");
    api
      .addCard(cardPopupText.value, cardPopupImage.value)
      .then((data) => {
        newCards.addItem(data);
        popupCardAddContent.classList.add("popup__button_inactive");
        popupCardAddContent.setAttribute("disabled", "disabled");
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardPopup.setSubmitButton("Сохранить");
      });
  },
});
cardPopup.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  cardPopup.open();
});

//open popup avatar
const avararPopup = new PopupWithForm(popups.avatar, {
  submit: () => {
    avararPopup.setSubmitButton("Сохранить...");
    api
      .changeAvatar(avatarInput.value)
      .then((data) => {
        profileInfo.setUserInfo(data);
        popupAvatareAddContent.classList.add("popup__button_inactive");
        popupAvatareAddContent.setAttribute("disabled", "disabled");
        avararPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avararPopup.setSubmitButton("Сохранить");
      });
  },
});
avararPopup.setEventListeners();
document.querySelector(".profile__change").addEventListener("click", () => {
  avararPopup.open();
});

function handleLikeCard(card) {
  if (card.isLiked()) {
    api
      .deleteLikeServer(card._id)
      .then((data) => {
        card.removeLike();
        card.setCount(data.likes)
      })
      .catch((err) => {
        `Ошибка в лайке:${err}`
      })
  }
  else {
    api
      .addLikeServer(card._id)
      .then((data) => {
        card.addLike();
        card.setCount(data.likes)
      })
      .catch((err) => {
        `Ошибка в дизлайке: ${err}`
      })
  }
}
const newCards = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        userId,
        cardTemplate,
        {
          handleCardClick: (item) => {
            const popupWithImage = new PopupWithImage(popups.image);
            popupWithImage.open(item.name, item.link);
            popupWithImage.setEventListeners();
          },
        },
        {
          handleCardDelete: () => {
            api
              .deleteCardServer(card._id)
              .then(() => card.deleteCard());
          },
        },
        {
          handleLikeClick: () => handleLikeCard(card)
        },
      );
      return card.createCard();
    },
  },
  cardContainer
);

function renderProfileInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  avararProfile.src = userInfo.avatar;
}

api
  .loadData()
  .then(([user, cards]) => {
    userId = user._id;
    renderProfileInfo(user);
    profileInfo.getUserInfo(user);
    newCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
