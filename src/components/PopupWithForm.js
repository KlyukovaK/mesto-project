import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submit } /*{ deleteErrors }*/) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__container");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._inputList = this._popup.querySelectorAll(".popup__item");
    // this._deleteErrors = deleteErrors;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      evt.target.reset();
    });
    super.setEventListeners();
  }
  close() {
    super.close();
  }
  setSubmitButton(content) {
    this._submitButton.textContent = content;
  }
  setInputValues(getData) {
    this._inputList.forEach((item) => {
      item.value = getData[item.id];
    });
  }
}
