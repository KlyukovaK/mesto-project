import { popupCardAddContent } from "./index.js";
export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-21",
  headers: {
    authorization: "df2d8024-40e8-4519-add0-3eea43f4cfb0",
    "Content-Type": "application/json",
  },
};
//проверка
function checkPromise(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
//изменение профиля с сервера
export function getInitialProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkPromise(res);
  });
}
//изменение профиля
export function changeProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    return checkPromise(res);
  });
}
//добавление карточки
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return checkPromise(res);
  });
}
//добавление карточки с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkPromise(res);
  });
}
//загрузка на кнопке
export function renderLoading(button, isLoading) {
  if (isLoading & button !== popupCardAddContent) {
    button.textContent = 'Сохранение...';
  } else if (isLoading & button === popupCardAddContent) {
    button.textContent = 'Создать...';
  } else {
    button.textContent = 'Сохранить';
  }
}
//удаление карточки
export function deleteCardServer(card) {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkPromise(res);
  });
}
//добавление like
export function addLikeServer(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return checkPromise(res);
  });
}
//удаление like
export function deleteLikeServer(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkPromise(res);
  });
}
//добавление avatar
export function changeAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    }),
  }).then((res) => {
    return checkPromise(res);
  });
}
