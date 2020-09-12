const popupProfile = document.querySelector('.popup_profile');
const popupAddElement = document.querySelector('.popup_addElement');
const page = document.querySelector('.page');
const popupProfileOpenButton = document.querySelector('.button_type_edit');
const popupAddElementOpenButton = document.querySelector('.button_type_add');
// Можно ли найти универсальную кнопку закрытия?
const popupProfileClose = popupProfile.querySelector('.button_type_close');
const popupAddElementClose = popupAddElement.querySelector('.button_type_close');

// Находим форму редактирования профиля и ее поля в DOM
let formProfile = popupProfile.querySelector('.form_profile');
let nameInput = popupProfile.querySelector('.form__fullname');
let jobInput = popupProfile.querySelector('.form__description');
// Выбираем элементы профиля, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

let formAddElement = popupAddElement.querySelector('form_addElement');
let titleInput = popupAddElement.querySelector('.form__fullname');
let srcInput = popupAddElement.querySelector('.form__description');

//функция открытия/закрытия попапа добавления карточки
const popupToggle = () =>{
  popupAddElement.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
};

//* функция открытия/закрытия попапа профиля
const popupProfileToggle = () => {
  //если форма была закрыта, то записываем в форму значения полей профиля
  if (!popupProfile.classList.contains('popup_opened')){
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
  }
  //открываем-закрываем попап
  popupProfile.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
};

//* функция закрытия по клику не на форму
const popupCloseByClickonOverlay = (event) => {
  if (event.target === event.currentTarget){
    popupProfileToggle();
  } else {return}};

// Обработчик «отправки» формы
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку
// Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  popupProfileToggle();
}

//Вставляем все слушатели событий
popupProfileOpenButton.addEventListener('click', popupProfileToggle);
formProfile.addEventListener('submit', formProfileSubmitHandler);
popupProfileClose.addEventListener('click', popupProfileToggle);
popupProfile.addEventListener('click', popupCloseByClickonOverlay);

popupAddElementOpenButton.addEventListener('click', popupToggle);
popupAddElementClose.addEventListener('click',popupToggle);
