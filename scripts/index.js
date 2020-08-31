const popup = document.querySelector('.popup');
const page = document.querySelector('.page');
const popupOpenButton = document.querySelector('.button_type_edit');
const popupClose = popup.querySelector('.button_type_close');

//* функция открытия/закрытия поп-апа
const popupToggle = () => {
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
}

//* закрыть по клику не на форму
const popupCloseByClickonOverlay = (event) => {
  // console.log({target: event.target,
  // currentTarget: event.currentTarget,});
  if (event.target === event.currentTarget){
    popupToggle();
  } else {return} };

popupOpenButton.addEventListener('click', popupToggle);

let formElement = popup.querySelector('.form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку

// Находим поля формы в DOM
let nameInput = popup.querySelector('.form__fullname');
let jobInput = popup.querySelector('.form__description');

// Получите значение полей из свойства value
// let name = nameInput.value;
// let job = jobInput.value;
// console.log(name);

// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

// Вставьте новые значения с помощью textContent
profileName.textContent = nameInput.value;
profilejob.textContent = jobInput.value;
popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', popupToggle);
popup.addEventListener('click', popupCloseByClickonOverlay);
