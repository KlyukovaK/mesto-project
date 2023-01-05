const formElement = document.querySelector(".popup");
const formImgElement = document.querySelector(".popup__images");
const nameInput = formElement.querySelector("#name");
const namePlaceInput = formElement.querySelector("#nameplace");
const jobInput = formElement.querySelector("#profession");
const imagesInput = formElement.querySelector("#images");
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
formElement.addEventListener("submit", formSubmitHandler);

  editButton.addEventListener('click', function openPopup() {
    formElement.classList.add("popup_open");
  });
  closeButton[0].addEventListener('click', function closePopup() {
    formElement.classList.remove("popup_open");
  });

  addButton.addEventListener('click', function openPopup() {
    formImgElement.classList.add("popup_open");
  });
  closeButton[1].addEventListener('click', function closePopup() {
    formImgElement.classList.remove("popup_open");
  });
