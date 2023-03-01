import { openImage, nameImage, imagePopup } from "./utils.js";
import { openPopup } from "./modal.js";
const cardTemplate = document.querySelector("#element").content;
//добавление лайка
function addLike(evt) {
  evt.target.classList.toggle("element__like_active");
}
//удаление карточки
function deleteCard(element) {
  element.remove();
}
/*добавление карточек*/
export function createCard(elementImageValue, elementTextValue) {
  const element = cardTemplate.querySelector(".element").cloneNode("true");
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__text");
  elementImage.src = elementImageValue;
  elementImage.alt = elementTextValue;
  elementText.textContent = elementTextValue;
  element.querySelector(".element__like").addEventListener("click", (evt) => {
    addLike(evt);
  });
  element.querySelector(".element__delete").addEventListener("click", () => {
    deleteCard(element);
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