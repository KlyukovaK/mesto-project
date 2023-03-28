export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByBackground = this._closeByBackground.bind(this);
  }
  /*открыте и закрытие popup*/
  open() {
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._closeByBackground);
  }
  close() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._closeByBackground);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeByBackground(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close(this._popup);
    });
  }
}
