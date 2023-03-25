import { PopupWithImage } from "./PopupWithImage.js";
export default class Card {
  constructor({ name, link, _id, likes, owner }, { handleLikeClick }, { handleCardClick }, { handleCardDelete }, userId, selector) {
    this._selector = selector;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._userId = userId;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  createCard() {
    this._card = this._getElement();
    this._cardImage = this._card.querySelector(".element__image");
    this._cardText = this._card.querySelector(".element__text");
    this._cardLike = this._card.querySelector('element__like');
    this._countLike = this._card.querySelector('element__count');
    this._deleteCard = this._card.querySelector('element__delete');

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._countLike.textContent = this._likes.length;

    this.setEventListeners();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked = data.filter((item) => {
      return item._id == this._userId;
    }).length > 0;
    this._countLike.textContent = data.likes.length;
    if (this._isLiked) {
      this._cardLike.classList.add('element__like_active')
    }
    else {
      this._cardLike.classList.remove('element__like_active');
    }
  }
  /*
    _toggleLikeContainer(data) {
      if (data.likes.length === 1) {
        this._countLike.classList.add()
      }
    }
  */

  _setDeleteButton() {
    if (this._owner._id !== this._userId) {
      this._deleteCard.remove();
    }
  }


  setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handlelikeClick()
    })

    this._deleteCard.addEventListener('click', () => {
      this._handleCardDelete();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link })
    })
  }
    /*openImg*/
//   handleCardClick() {
//      const handleImageClick = new PopupWithImage(
  //   ".image-popup",
  //   card.link,
  //   card.name
  // );
  // elementImage.addEventListener("click", () => {
  //   handleImageClick.openPopup();
  // });
// }
}



/*
import { openImage, nameImage, imagePopup } from "../utils/constants.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { api } from "./API.js";
const cardTemplate = document.querySelector("#element").content;
const deletePopup = document.querySelector(".delete-popup");
//добавление лайка
function addLike(evt) {
  evt.target.classList.toggle("element__like_active");
}
//удаление карточки
function deleteCard(element) {
  element.remove();
}

/*добавление карточек
export function createCard(card, authorId) {
  const element = cardTemplate.querySelector(".element").cloneNode("true");
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__text");
  const countLike = element.querySelector(".element__count");
  const delite = element.querySelector(".element__delete");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementText.textContent = card.name;
  countLike.textContent = card.likes.length;
  //проверка на удаление карточки
  if (authorId === card.owner._id) {
    delite.classList.add("element__delete_active");
    element.querySelector(".element__delete").addEventListener("click", () => {
      openPopup(deletePopup);
      deletePopup.addEventListener(
        "submit",
        (evt) => {
          evt.preventDefault();
          api
            .deleteCardServer(card)
            .then(() => {
              deleteCard(element);
              closePopup(deletePopup);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        { once: true }
      );
    });
  }
  card.likes.forEach((like) => {
    if (like._id === authorId) {
      element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    }
  });
  //добавление и удаление карточки
  element.querySelector(".element__like").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("element__like_active")) {
      api
        .deleteLikeServer(card)
        .then((res) => {
          addLike(evt);
          countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLikeServer(card)
        .then((res) => {
          addLike(evt);
          countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  /*openImg*/
//   function handleImageClick() {
//     openImage.src = card.link;
//     openImage.alt = card.name;
//     nameImage.textContent = card.name;
//     openPopup(imagePopup);
//   }
//   elementImage.addEventListener("click", handleImageClick);
//   return element;
// }
// */
