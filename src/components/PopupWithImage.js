import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageText = this._popup.querySelector('.popup__img-name');
    this._openImagePopup = this._popup.querySelector('.popup__img');
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
