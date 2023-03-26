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
  cardContainer
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card.js";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";


const profilePopupApi = new PopupWithForm(popups.profile, {
  submit: (data) => {
    profilePopupApi.setSubmitButton('Сохранение...');
    api
      .changeProfile(data)
      .then((data) => {
        profileInfo.setUserUnfo(data);
        profilePopupApi.close(evt);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        profilePopupApi.setSubmitButton('Сохранить')
      })
  }
})
popupProfileOpenButton.addEventListener('click', () => {
  profilePopupApi.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
profilePopupApi.setEventListeners();
//open popup2
const cardPopup = new PopupWithForm(popups.card);
popupCardOpenButton.addEventListener("click", () => {
  cardPopup.open();
});
cardPopup.setEventListeners();

//open popup avatar
const avararPopup = new Popup(popups.avatar)
document.querySelector(".profile__change").addEventListener("click", () => {
  avararPopup.open();
});
avararPopup.setEventListeners();


const profileInfo = new UserInfo({
  profileName, profileJob, avararProfile
})


// api
//   .getInitialProfile()
//   .then((resalt) => {
//     profileName.textContent = resalt.name;
//     profileJob.textContent = resalt.about;
//     avararProfile.src = resalt.avatar;
//     return resalt;
//   })

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

const newCard = new Section({
  renderer: (item) => {
    const createCard = new Card(item, userId, cardTemplate, {
      handleCardClick: (name, link) => { popupWithImage.open(name, link) }
    },
      {
        handleLikeClick: (card, data) => { handleLikeCard(card, data) }
      });
    return createCard.createCard();
  }
}, cardContainer)

function renderProfileInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  avararProfile.src = userInfo.avatar;
}

api.loadData()
  .then(([user, cards]) => {
    renderProfileInfo(user);
    profileInfo.getUserInfo(user);
    newCard.renderItems(cards)
  })
  .catch((err) => {
    console.log(err)
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
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   renderLoading(popupProfileAddContent, "Сохранить...");
//   api
//     .changeProfile(nameInput.value, jobInput.value)
//     .then((resalt) => {
//       profileName.textContent = resalt.name;
//       profileJob.textContent = resalt.about;
//       closePopup(profilePopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(popupProfileAddContent, "Сохранить");
//     });
// }
// /*сохранение в popup1*/
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



/*сохранение в popup1*/
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


