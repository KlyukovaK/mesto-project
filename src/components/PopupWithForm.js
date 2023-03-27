import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submit }) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__container");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._inputList = this._popup.querySelectorAll(".popup__item");
  }
  _getInput() {
    this._objectInput = {};
    this._inputList.forEach((input) => {
      this._objectInput[input.name] = input.value;
    });
    return this._objectInput;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInput());
    });
    super.setEventListeners();
  }
  close() {
    super.close();
    this._inputList.forEach((input) => {
      input.value = input.defaultValue;
    });
  }
  setSubmitButton(content) {
    this._submitButton.textContent = content;
  }
}
