const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const nameInput = profilePopup.querySelector('#name');
const jobInput = profilePopup.querySelector('#profession');
const cardPopupText = cardPopup.querySelector('#nameplace');
const cardPopupImage = cardPopup.querySelector('#images');
const editButton = document.querySelector('.profile-info__button');
const addButton = document.querySelector('.profile__button');
const closeButtons = document.querySelectorAll('.popup__close');
const elementContainer = document.querySelector('.elements');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const cardTemplate = document.querySelector('#element').content;
const openImage = imagePopup.querySelector('.popup__img');
const nameImage = imagePopup.querySelector('.popup__img-name');

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*открыте и закрытие popup*/
function openPopup(popupElement) {
  popupElement.classList.add("popup_open");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_open");
}

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
}); //open popup1
addButton.addEventListener("click", () => {
  openPopup(cardPopup);
}); //oprn popup2

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// закрыте popup Esc

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(imagePopup);
  };
});

/*сохранение в popup1*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
profilePopup.addEventListener("submit", handleProfileFormSubmit);

/*добавление карточек*/
function addImage(elementImageValue, elementTextValue) {
  const element = cardTemplate.querySelector('.element').cloneNode("true");
  const elementImage = element.querySelector('.element__image');
  const elementText = element.querySelector(".element__text");
  elementImage.src = elementImageValue;
  elementImage.alt = elementTextValue;
  elementText.textContent = elementTextValue;
  element
    .querySelector(".element__like")
    .addEventListener("click", evt => {
      evt.target.classList.toggle("element__like_active");
    });
  element.querySelector(".element__delete").addEventListener("click", () => {
    element.remove();
  });

  /*openImg*/
  function handleImageClick() {
    openImage.src = elementImageValue;
    openImage.alt = elementTextValue;
    nameImage.textContent = elementTextValue;
    openPopup(imagePopup);
  }
  elementImage.addEventListener("click", handleImageClick);
  return element;
}
//добавление карточек из popup
function createCard(evt) {
  evt.preventDefault();
  elementContainer.prepend(addImage(cardPopupImage.value, cardPopupText.value));
  evt.target.reset();
  closePopup(cardPopup);
}
cardPopup.addEventListener("submit", createCard);
// добавление карточек из массива
initialCards.forEach(item => {
  elementContainer.append(addImage(item.link, item.name));
});

//валидация форм1
const formPofilePopup = profilePopup.querySelector('popup__input-container');
const formInput = formPofilePopup.querySelector('.popup__item');
const formError = formPofilePopup.querySelector(`.${formInput.id}-error`);

//функция добавления ошибки
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__item-error_active');
};
//функция удаления ошибки
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__item-error_active');
  errorElement.textContent='';
};
// функция определения есть ошибка или нет
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
//функция перебора всех input в форме и их проверки
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};
//функция перебора всех форм в документе
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__input-container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefaunt();
      });
      setEventListeners(formElement);

  });
};
