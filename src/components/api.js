export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  //добавление карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //изменение профиля с сервера
  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //изменение профиля
  changeProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //добавление карточки
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //удаление карточки
  deleteCardServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //добавление like
  addLikeServer(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //удаление like
  deleteLikeServer(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  //добавление avatar
  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkPromise(res);
    });
  }
  loadData() {
    return Promise.all([this.getInitialProfile(), this.getInitialCards()]);
  }
}
export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-21",
  headers: {
    authorization: "df2d8024-40e8-4519-add0-3eea43f4cfb0",
    "Content-Type": "application/json",
  },
});

//загрузка на кнопке
export function renderLoading(button, text) {
  button.textContent = text;
}
