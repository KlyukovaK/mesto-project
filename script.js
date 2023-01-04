// Находим форму в DOM
const formElement = document.querySelector('.popup');
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('#name');
// Воспользуйтесь инструментом .querySelector()
const jobInput =formElement.querySelector('#profession');
  // Воспользуйтесь инструментом .querySelector()
  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function formSubmitHandler(evt) {
    evt.preventDefault();
    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения поле
    // Вставьте новые значения с помощью textContent
  }
formElement.addEventListener('submit', formSubmitHandler);
let editButton = document.querySelector('.profile-info__button');
let closeButton = document.querySelector('.popup__close');
editButton.addEventListener('click',function openPopup(){
  formElement.classList.add('popup_open');
});
closeButton.addEventListener('click',function closePopup(){
  formElement.classList.remove('popup_open');
});
