import Popup from "./Popup.js";
/*
export class PopupWithImage extends Popup {
  constructor(selector, link, name) {
    super(selector);
    this._link = link;
    this._name = name;
  }
  openPopup() {
    document.querySelector(this._selector).src = this._link;
    document.querySelector(this._selector).alt = this._name;
    document
      .querySelector(this._selector)
      .querySelector(".popup__img-name").textContent = this._name;
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    document.addEventListener("mousedown", (evt) => {
      this._closeByBackground(evt);
    });
  }
}
*/

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageText = this._popup.querySelector('.popup__img-name');
    this._openImagePopup = this._popup.querySelector('.image-popup');
  }
  open(name, link) {
    super.open();
    this._name = name;
    this._link = link;
    this._imageText.textContent = this._name;
    this._openImagePopup.src = this._link;
    this._openImagePopup.alt = this._name;
  }
}