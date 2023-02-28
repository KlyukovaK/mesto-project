import { profilePopup, cardPopup } from "./index.js";
const popupProfileOpenButton = document.querySelector(".profile-info__button");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
/*открыте и закрытие popup*/
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeByBackground);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeByBackground);
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


function closeByBackground(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
