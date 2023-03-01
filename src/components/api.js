export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-21",
  headers: {
    authorization: "df2d8024-40e8-4519-add0-3eea43f4cfb0",
    "Content-Type": "application/json",
  },
};
//добавление карточки с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
//изменение профиля
export function changeProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: "Marie Skłodowska Curie",
      about: "Physicist and Chemist",
    }),
  });
}
//добавление карточки
function addCard(){
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: "Булочка",
      link: "https://www.rupixel.ru/files/preview/1280x853/21670417257pgyexoxqqlcsmewhcd6cqwr4scfhnfxv03o1n9g5ssw8yjet9llkfwrcpiougdees0vn4tcdixh5q8oxysacfbtztxa7kxcujivr.jpg"
    }),
  });
}
addCard();

