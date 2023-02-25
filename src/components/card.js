import {openImage, nameImage, imagePopup} from "./index.js";
import {openPopup} from "./utils.js";
const cardTemplate = document.querySelector("#element").content;
/*добавление карточек*/
export function addImage(elementImageValue, elementTextValue) {
  const element = cardTemplate.querySelector(".element").cloneNode("true");
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__text");
  elementImage.src = elementImageValue;
  elementImage.alt = elementTextValue;
  elementText.textContent = elementTextValue;
  element.querySelector(".element__like").addEventListener("click", (evt) => {
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
