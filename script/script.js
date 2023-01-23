const formElement = document.querySelectorAll(".popup");
const nameInput = formElement[0].querySelector("#name");
const jobInput = formElement[0].querySelector("#profession");
const editButton = document.querySelector(".profile-info__button");
const addButton = document.querySelector(".profile__button");
const closeButton = document.querySelectorAll(".popup__close");
const likeButton = document.querySelectorAll(".element__like");

/*открытие и закрытие popup1*/
editButton.addEventListener('click', function openPopup() {
  formElement[0].classList.add("popup_open");
});
closeButton[0].addEventListener('click', function closePopup() {
  formElement[0].classList.remove("popup_open");
});

/*сохранение в popup*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile-info__title");
  let profileJob = document.querySelector(".profile-info__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement[0].addEventListener("submit", formSubmitHandler);

/*открытие и закрытие popup2*/
addButton.addEventListener('click', function openPopup() {
  formElement[1].classList.add("popup_open");
});
closeButton[1].addEventListener('click', function closePopup() {
  formElement[1].classList.remove("popup_open");
});
/*
function formSubmitHandler(evt) {
  evt.preventDefault();
  const namePlaceInput = formElement[1].querySelector("#nameplace");
  const imagesInput = formElement[1].querySelector("#images");
  let elementImage = document.querySelector(".element__image");
  let elementText = document.querySelector(".element__text");
  elementImage = imagesInput.value;
  elementText.textContent = namePlaceInput.value;
}
formElement[1].addEventListener("submit", formSubmitHandler);*/
/*добавление карточек*/
function addImage(imagesValue,namePlaceValue) {
  const cardTemplate = document.querySelector('#element').content;
  const element = songTemplate.querySelector('.element').cloneNode('true');
  element.querySelector('.element__image').scr = imagesValue;
  element.querySelector('.element__text').textContent = namePlaceValue;
  elementContainer.append(element);
};


/*
addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');
  const title = document.querySelector('.input__text_type_title');

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = '';
  title.value = '';
});*/
