export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeButton = this._popup.querySelector('.popup__close')
    }
    open() {
        const popupContainer = this._popup.querySelector('.popup__container');
        popupContainer.classList.add('.popup_opened');
        this._popup.classList.add
    }
}