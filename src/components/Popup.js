export class Popup {
  constructor(selector) {
    this._selector = selector;
  }
  /*открыте и закрытие popup*/
  openPopup() {
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});
    document.addEventListener("mousedown", (evt) => {this._closeByBackground(evt)});
  }
  closePopup() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {this._handleEscClose(evt)});
    document.removeEventListener("mousedown", (evt) => {this._closeByBackground(evt)});
  }
  // закрыте popup Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.closePopup(openedPopup);
    }
  }
  _closeByBackground(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.target === openedPopup) {
      this.closePopup(openedPopup);
    }
  }
  setEventListeners() {
    document.querySelectorAll(".popup__close").forEach((button) => {
      const popup = button.closest(".popup");
      button.addEventListener("click", () => this.closePopup(popup));
    });
  }
}

