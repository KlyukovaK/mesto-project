export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    userId,
    selector,
    { handleCardClick },
    { handleCardDelete },
    { handleLikeClick }
  ) {
    this._selector = selector;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  createCard() {
    this._card = this._getElement();
    this._cardImage = this._card.querySelector(".element__image");
    this._cardText = this._card.querySelector(".element__text");
    this._cardLike = this._card.querySelector(".element__like");
    this._countLike = this._card.querySelector(".element__count");
    this._deleteCard = this._card.querySelector(".element__delete");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._countLike.textContent = this._likes.length;

    this.setEventListeners();
    this._setDeleteButton();
    this._chekLike();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  isLiked() {
    return this._isLiked;
  }

  _chekLike() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._cardLike.classList.add("element__like_active");
      }
    });
  }

  getLike(data) {
    this._isLiked =
      data.likes.filter((item) => {
        return item._id === this._userId;
      }).length > 0;
    this._countLike.textContent = data.likes.length;
    if (this._isLiked) {
      this._cardLike.classList.add("element__like_active");
    } else {
      this._cardLike.classList.remove("element__like_active");
    }
  }

  _setDeleteButton() {
    if (this._owner._id === this._userId) {
      this._deleteCard.classList.add("element__delete_active");
    }
  }

  setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteCard.addEventListener("click", () => {
      this._handleCardDelete();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
