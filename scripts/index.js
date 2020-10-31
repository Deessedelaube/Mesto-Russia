import {page, templateSelector, cardListSection, popupProfileSelector, popupImageSelector, popupAddElementSelector } from './utils/constants.js';
import places from './utils/places.js';
import Popup from './components/popup.js';
import PopupWithImage from './components/popupimage.js';
import PopupWithForm from './components/popupform.js';
import Card from './components/card.js';
import Section from './components/section.js';
import obj from './utils/config.js';
import FormValidator from './components/validate.js';


const popupProfile = document.querySelector('.popup_profile');
const popupAddElement = document.querySelector('.popup_addElement');
const popupEnlargeImage = document.querySelector('.popup_openImage');

const popupProfileOpenButton = document.querySelector('.button_type_edit');
const popupAddElementOpenButton = document.querySelector('.button_type_add');

const popupProfileClose = popupProfile.querySelector('.button_type_close');
const popupAddElementClose = popupAddElement.querySelector('.button_type_close');

// Находим форму редактирования профиля и ее поля в DOM
const formProfile = popupProfile.querySelector('.form_profile');
const nameInput = popupProfile.querySelector('.form__input_name');
const jobInput = popupProfile.querySelector('.form__input_description');
// Выбираем элементы профиля, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Находим форму добавления карточки места
const formAddElement = popupAddElement.querySelector('.form_addElement');
const titleInput = popupAddElement.querySelector('.form__input_name');
const srcInput = popupAddElement.querySelector('.form__input_description');

const image = popupEnlargeImage.querySelector('.popup__image');
const titleImage = popupEnlargeImage.querySelector('.popup__title_image');

const elements = document.querySelector('.elements');

//создаем карточку из класса и добавляем в ДОМ
function createCard (name, link){
  const card = new Card(templateSelector, name, link, openPopupEnlargeImage);
  return card.generateCard();
};

//обработчик формы добавления карточки
function formAddElemSubmitHandler(evt){
  evt.preventDefault();
  elements.prepend(createCard(titleInput.value, srcInput.value));
  closePopup(popupAddElement);
};

//функции открытия/закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_overflow_hidden');
  document.addEventListener('keydown', closePopupByEsc);
};
function closePopup(popup){
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');
  page.classList.remove('page_overflow_hidden');
};
//*закрываем по Escape
const closePopupByEsc = (evt)=>{
  const openedPopup = document.querySelector('.popup_opened');
  if ((evt.key==="Escape")&&(openedPopup)){
    closePopup(openedPopup);
  }
};
//* функция закрытия по клику не на форму
const closePopupByClickOnOverlay = (event) => {
  if ((event.target !== event.currentTarget)&&(event.target.classList.contains('popup_opened'))){
    const openedPopup = event.target;
    closePopup(openedPopup);
  };
};

//* функция открытия попапа профиля
const openPopupProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

//функция открытия попапа картинок
const openPopupEnlargeImage = (name,link)=>{
  image.src = link;
  titleImage.textContent = name;
  openPopup(popupEnlargeImage);
};
//функция открытия попапа добавления карточки
const openPopupAddElement = ()=>{
  titleInput.value ="";
  srcInput.value = "";
  openPopup(popupAddElement);
};

// Обработчик попапа профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};
//добавляем валидацию для формы
const validateForm = (popup)=>{
  const formElement = popup.querySelector('.form');
  const newValidator = new FormValidator(obj, formElement);
  newValidator.enableValidation();
};
//УДАЛИТЬ создание newpopup
const popupPro = new Popup (popupProfileSelector);
// popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileOpenButton.addEventListener('click', popupPro.open.bind(popupPro));
popupPro.setEventListeners();
validateForm(popupProfile);
formProfile.addEventListener('submit', formProfileSubmitHandler);
// popupProfileClose.addEventListener('click', () => {closePopup(popupProfile)});

popupAddElementOpenButton.addEventListener('click', openPopupAddElement);
validateForm(popupAddElement);
formAddElement.addEventListener('submit', formAddElemSubmitHandler);
popupAddElementClose.addEventListener('click',() => {closePopup(popupAddElement)});

//popupEnlargeImage.querySelector('.button_type_close').addEventListener('click',() => {closePopup(popupEnlargeImage)});

//закрываем попап по оверлэй
//page.addEventListener('click', closePopupByClickOnOverlay);

// places.forEach((item)=>{
//   elements.append(createCard(item.name, item.link));
// });

const cardList = new Section({
  data: places,
  renderer: (item)=> {
    const popupImage = new PopupWithImage(popupImageSelector);
    popupImage.setEventListeners();
    const card = new Card(templateSelector, item.name, item.link, popupImage.open.bind(popupImage));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
  },
  cardListSection
);
cardList.renderItems();
