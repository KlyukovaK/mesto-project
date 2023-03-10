import { openImage, nameImage, imagePopup } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { addLikeServer, deleteLikeServer, deleteCardServer } from "./api.js";

const cardTemplate = document.querySelector("#element").content;
const deletePopup = document.querySelector(".delete-popup");
//добавление лайка
function addLike(evt) {
  evt.target.classList.toggle("element__like_active");
}
//удаление карточки
function deleteCard(element) {
  element.remove();
}

/*добавление карточек*/
export function createCard(card, authorId) {
  const element = cardTemplate.querySelector(".element").cloneNode("true");
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__text");
  const countLike = element.querySelector(".element__count");
  const delite = element.querySelector(".element__delete");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementText.textContent = card.name;
  countLike.textContent = card.likes.length;
  //проверка на удаление карточки
  if (authorId === card.owner._id) {
    delite.classList.add("element__delete_active");
    element.querySelector(".element__delete").addEventListener("click", () => {
      openPopup(deletePopup);
      deletePopup.addEventListener("submit", (evt) => {
        evt.preventDefault();
        deleteCardServer(card)
          .then(() => {
            deleteCard(element);
            closePopup(deletePopup);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
  card.likes.forEach((like) => {
    if (like._id === authorId) {
      element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    }
  });
  //добавление и удаление карточки
  element.querySelector(".element__like").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("element__like_active")) {
      deleteLikeServer(card)
        .then((res) => {
          addLike(evt);
          countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLikeServer(card)
        .then((res) => {
          addLike(evt);
          countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  /*openImg*/
  function handleImageClick() {
    openImage.src = card.link;
    openImage.alt = card.name;
    nameImage.textContent = card.name;
    openPopup(imagePopup);
  }
  elementImage.addEventListener("click", handleImageClick);
  return element;
}
