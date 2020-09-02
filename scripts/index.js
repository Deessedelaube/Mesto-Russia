const popup = document.querySelector('.popup');
const page = document.querySelector('.page');
const popupOpenButton = document.querySelector('.button_type_edit');
const popupClose = popup.querySelector('.button_type_close');
// Находим форму в DOM
let formElement = popup.querySelector('.form');
// Находим поля формы в DOM
let nameInput = popup.querySelector('.form__fullname');
let jobInput = popup.querySelector('.form__description');
// Выбираем элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

//* функция открытия/закрытия поп-апа
const popupToggle = () => {

  //если форма была закрыта, то записываем в форму значения полей профиля
if (popup.classList.contains('popup_opened') === false){
  nameInput.textContent = profileName.value;
  jobInput.textContent = profilejob.value;
}
//открываем-закрываем попап
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
};

//* функция закрытия по клику не на форму
const popupCloseByClickonOverlay = (event) => {
  // console.log({target: event.target,
  // currentTarget: event.currentTarget,});
  if (event.target === event.currentTarget){
    popupToggle();
  } else {return}};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку

// Вставляем новые значения с помощью textContent
profileName.textContent = nameInput.value;
profilejob.textContent = jobInput.value;
popupToggle();
}

//Вставляем все слушатели событий
popupOpenButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', popupToggle);
popup.addEventListener('click', popupCloseByClickonOverlay);
