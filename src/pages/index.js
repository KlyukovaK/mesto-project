import "./index.css";
import { api, renderLoading } from "../components/Api.js";
import {
  profilePopup,
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
  avatarInput,
  popupAvatareAddContent,
  cardTemplate,
  imagePopup,
  confimPopup,
  popups,
  cardContainer,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
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
        evt.target.reset();
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
        const authorId = data.owner._id;
        newCards.addItem(data);
        popupCardAddContent.setAttribute("disabled", "disabled");
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopupApi.setSubmitButton("Сохранить");
      });
  },
});
cardPopup.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  cardPopup.open();
});

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
//       closePopup(cardPopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(popupCardAddContent, "Сохранить");
//     });
// }
// cardPopup.addEventListener("submit", submitCardForm);

//open popup avatar
const avararPopup = new PopupWithForm(popups.avatar, {
  submit: () => {
    avararPopup.setSubmitButton("Сохранить...");
    api
      .changeAvatar(avatarInput.value)
      .then((data) => {
        profileInfo.setUserInfo(data);
        popupAvatareAddContent.setAttribute("disabled", "disabled");
        avararPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopupApi.setSubmitButton("Сохранить");
      });
  },
});
avararPopup.setEventListeners();

document.querySelector(".profile__change").addEventListener("click", () => {
  avararPopup.open();
});

function handleLikeCard(card, data) {
  const like = card.idLiked()
    ? api.deleteLikeServer(data._id)
    : api.addLikeServer(data._id);
  like
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
/*
function handleLikeCard(card, data) {
  const like = card.idLiked() ? api.deleteLikeServer(data._id) : api.addLikeServer(data._id);
  like
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err)
    })
}
*/
const newCards = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        userId,
        cardTemplate,
        {
          handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
          },
        },
        {
          handleLikeClick: (card, data) => {
            handleLikeCard(card, data);
          },
        }
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
    renderProfileInfo(user);
    profileInfo.getUserInfo(user);
    newCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
