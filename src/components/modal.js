import { profilePopup, cardPopup } from "./index.js";
const popupProfileOpenButton = document.querySelector(".profile-info__button");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
/*открыте и закрытие popup*/
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
popupProfileOpenButton.addEventListener("click", () => {
  openPopup(profilePopup);
}); //open popup1
popupCardOpenButton.addEventListener("click", () => {
  openPopup(cardPopup);
}); //oprn popup2

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// закрыте popup Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
document.addEventListener("keydown", closeByEsc);

function closeByBackground(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}
document.addEventListener("click", closeByBackground);

export { openPopup, closePopup };
