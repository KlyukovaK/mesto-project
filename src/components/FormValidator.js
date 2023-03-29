export class FormValidator {
  constructor(config, selector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._selector = document.querySelector(selector);
    this._inputList = Array.from(
      this._selector.querySelectorAll(this._inputSelector)
    );
    this._iputElement = this._selector.querySelector(this._inputSelector);
    this._buttonElement = this._selector.querySelector(
      this._submitButtonSelector
    );
    this._formElement = this._selector.querySelector(this._formSelector);
  }
  //функция добавления ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._selector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //функция удаления ошибки
  _hidleInputError(inputElement) {
    const errorElement = this._selector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  // функция определения есть ошибка или нет
  _checkInputValidity() {
    if (this._iputElement.validity.patternMismatch) {
      this._iputElement.setCustomValidity(
        this._iputElement.dataset.errorMessage
      );
    } else {
      this._iputElement.setCustomValidity("");
    }
    if (!this._iputElement.validity.valid) {
      this._showInputError(
        this._iputElement,
        this._iputElement.validationMessage
      );
    } else {
      this._hidleInputError(this._iputElement);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //функция для активации кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  //функция перебора всех input в форме и их проверки
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._selector, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
  //функция перебора всех форм в документе
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }

  _deactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  resetValidation() {
      this._deactivateButton();
    this._inputList.forEach((inputElement) => {
      this._hidleInputError(inputElement);
    });
  }
}
