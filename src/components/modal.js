/*открыте и закрытие popup*/
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("mousedown", closeByBackground);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("mousedown", closeByBackground);
}

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
