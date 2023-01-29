const formElement = document.querySelectorAll(".popup");
const nameInput = formElement[0].querySelector("#name");
const jobInput = formElement[0].querySelector("#profession");
const editButton = document.querySelector(".profile-info__button");
const addButton = document.querySelector(".profile__button");
const closeButton = document.querySelectorAll(".popup__close");
const likeButton = document.querySelectorAll(".element__like");
const elementContainer = document.querySelector(".elements");

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

editButton.addEventListener("click", function () {
  openPopup(formElement[0]);
}); //open popup1
addButton.addEventListener("click", function () {
  openPopup(formElement[1]);
}); //oprn popup2
closeButton[0].addEventListener("click", function () {
  closePopup(formElement[0]);
}); //closepopup1
closeButton[1].addEventListener("click", function () {
  closePopup(formElement[1]);
}); //close popup2
closeButton[2].addEventListener("click", function () {
  closePopup(formElement[2]);
}); //close popup3
/*сохранение в popup1*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile-info__title");
  let profileJob = document.querySelector(".profile-info__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement[0].addEventListener("submit", formSubmitHandler);
formElement[0]
  .querySelector(".popup__button")
  .addEventListener("click", closePopup(formElement[0]));

/*добавление карточек*/
initialCards.forEach(function (item) {
  const card = document.querySelector("#element").content;
  const element = card.querySelector(".element").cloneNode("true");
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__text").textContent = item.name;
  element
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      evt.target.classList.toggle("element__like_active");
    });
  element
    .querySelector(".element__delete")
    .addEventListener("click", function () {
      element.remove();
    });
  elementContainer.append(element);
  /*openImg*/
  function imageClick(e) {
    formElement[2].querySelector(".popup__img").src = item.link;
    formElement[2].querySelector(".popup__img-name").textContent = item.name;
    openPopup(formElement[2]);
  }
  element
    .querySelector(".element__image")
    .addEventListener("click", imageClick);
});

/*
function createCard(evt) {
  evt.preventDefault();
  const elementText = formElement[1].querySelector("#nameplace");
  const elementImage = formElement[1].querySelector("#images");
  initialCards.push (
    initialCards.link = elementImage.value,
    initialCards.name = elementText.value
     );
     console.log(initialCards);
};
formElement[1].addEventListener("submit", createCard);*/

/*function creatCard(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile-info__title");
  let profileJob = document.querySelector(".profile-info__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement[1].addEventListener("submit", creatCard);*/

formElement[1]
  .querySelector(".popup__button")
  .addEventListener("click", closePopup(formElement[1]));
