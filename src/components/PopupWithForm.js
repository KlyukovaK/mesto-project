import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submit } /*{ deleteErrors }*/) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector(".form");
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
  _setEventListeners() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }
  close(evt) {
    super.close();
    evt.target.reset();
    /*this._inputList.forEach((input) => {
            this._deleteErrors(input)
        })*/
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
