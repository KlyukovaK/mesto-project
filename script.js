const formElement = document.querySelectorAll(".popup");
const nameInput = formElement[0].querySelector("#name");
const namePlaceInput = formElement[1].querySelector("#nameplace");
const jobInput = formElement[0].querySelector("#profession");
const imagesInput = formElement[1].querySelector("#images");
const editButton = document.querySelector(".profile-info__button");
const addButton = document.querySelector(".profile__button");
const closeButton = document.querySelectorAll(".popup__close");
const likeButton = document.querySelectorAll(".element__like");

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile-info__title");
  let profileJob = document.querySelector(".profile-info__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement[0].addEventListener("submit", formSubmitHandler);

  editButton.addEventListener('click', function openPopup() {
    formElement[0].classList.add("popup_open");
  });
  closeButton[0].addEventListener('click', function closePopup() {
    formElement[0].classList.remove("popup_open");
  });

  addButton.addEventListener('click', function openPopup() {
    formElement[1].classList.add("popup_open");
  });
  closeButton[1].addEventListener('click', function closePopup() {
    formElement[1].classList.remove("popup_open");
  });
