export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__close')
  }
  /*открыте и закрытие popup*/

  open() {
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});
    document.addEventListener("mousedown", (evt) => {this._closeByBackground(evt)});
  }
  close() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {this._handleEscClose(evt)});
    document.removeEventListener("mousedown", (evt) => {this._closeByBackground(evt)});
  }

  // open() {
  //   this._popup.classList.add('popup_opened');
  //   this._setEventListeners();
  // }
  // close() {
  //   this._popup.classList.remove('popup_opened');
  //   this._removeEventListeners();
  // }
  // закрыте popup Esc

  // _handleEscClose(evt) {
  //   if (evt.key === "Escape") {
  //     const openedPopup = document.querySelector(".popup_opened");
  //     this.closePopup(openedPopup);
  //   }
  // }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  // _handleClickClose(evt) {
  //   if (evt.target.classList.contains('popup')) {
  //     this.close();
  //   }
  // }

  // _setEventListeners() {
  //   this._popup.addEventListener('click', this._handleClickClose);
  //   document.addEventListener('keydown', this._handleEscClose);
  // }

  // _removeEventListeners() {
  //   this._popup._removeEventListener('click', this._handleClickClose);
  //   document.removeEventListener('keydown', this._handleEscClose)
  // }

  // setEventListener() {
  //   this._closeButton.addEventListener('click', () => {
  //     this.close()
  //   })
  // }

  _closeByBackground(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.target === openedPopup) {
      this.close(openedPopup);
    }
  }
  setEventListeners() {
    document.querySelectorAll(".popup__close").forEach((button) => {
      const popup = button.closest(".popup");
      button.addEventListener("click", () => this.close(popup));
    });
  }

}
