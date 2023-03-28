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
const enableValidationPopupProfile = new FormValidator(
  {
    formSelector: ".popup__input-container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__item_type_error",
    errorClass: "popup__item-error_active",
  },
  popups.profile
);
enableValidationPopupProfile.enableValidation();

const profileInfo = new UserInfo (profileName, profileJob, avararProfile);

const profilePopupApi = new PopupWithForm(popups.profile, {
  submit: ({ name, profession }) => {
    profilePopupApi.renderLoading("Сохранение...");
    api
      .changeProfile(name, profession)
      .then((data) => {
        profileInfo.setUserInfo(data);
        profilePopupApi.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopupApi.renderLoading("Сохранить");
      });
  },
});
profilePopupApi.setEventListeners();

popupProfileOpenButton.addEventListener("click", () => {
  profilePopupApi.open();
  const infoObject = profileInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.about;
});
// open popup2

//валидация форм
const enableValidationPopupCard = new FormValidator(
  {
    formSelector: ".popup__input-container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__item_type_error",
    errorClass: "popup__item-error_active",
  },
  popups.card
);
enableValidationPopupCard.enableValidation();

const cardPopup = new PopupWithForm(popups.card, {
  submit: ({ nameplace, images }) => {
    cardPopup.renderLoading("Создать...");
    api
      .addCard(nameplace, images)
      .then((data) => {
        newCards.addItem(data);
        enableValidationPopupCard.deactivateButton();
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardPopup.renderLoading("Сохранить");
      });
  },
});
cardPopup.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  cardPopup.open();
});

//open popup avatar
//валидация форм
const enableValidationPopupAvatar = new FormValidator(
  {
    formSelector: ".popup__input-container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__item_type_error",
    errorClass: "popup__item-error_active",
  },
  popups.avatar
);
enableValidationPopupAvatar.enableValidation();

const avararPopup = new PopupWithForm(popups.avatar, {
  submit: ({ avatar_imag }) => {
    avararPopup.renderLoading("Сохранить...");
    api
      .changeAvatar(avatar_imag)
      .then((data) => {
        profileInfo.setUserInfo(data);
        enableValidationPopupAvatar.deactivateButton();
        avararPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avararPopup.renderLoading("Сохранить");
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
        card.setCount(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLikeServer(card._id)
      .then((data) => {
        card.addLike();
        card.setCount(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
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
            api.deleteCardServer(card._id).then(() => card.deleteCard());
          },
        },
        {
          handleLikeClick: () => handleLikeCard(card),
        }
      );
      return card.createCard();
    },
  },
  cardContainer
);



api
  .loadData()
  .then(([user, cards]) => {
    userId = user._id;
    profileInfo.getUserInfo(user);
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    avararProfile.src = user.avatar;
    newCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
