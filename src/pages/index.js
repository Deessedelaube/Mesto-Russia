import './index.css';
import {templateSelector, cardListSection, popupProfileSelector,
    popupImageSelector, popupAddElementSelector,
    profileNameSelector, profileInfoSelector,
    popupProfileOpenButton, popupAddElementOpenButton,
    formPopupProfile, formPopupAddElement} from '../scripts/utils/constants.js';
import obj from '../scripts/utils/config.js';
import places from '../scripts/utils/places.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//создаем элемент карточки
function createCard(obj){
  const card = new Card(templateSelector, obj.name, obj.link, popupImage.open.bind(popupImage));
  return card.generateCard();
};
//обработчик формы добавления карточки
function formAddElemSubmitHandler(obj){
  const cardElement = createCard({name: obj.elemTitle, link: obj.link});
  cardList.addNewItem(cardElement);
  this.close();
};

// Обработчик попапа профиля
function formProfileSubmitHandler(obj){
  userData.setUserInfo(obj);
  this.close();
};

const userData = new UserInfo ({nameSelector: profileNameSelector, infoSelector: profileInfoSelector});

// создание экземпляра класса для попапа профиля
const popupProfile = new PopupWithForm (popupProfileSelector, formProfileSubmitHandler);
const profileFormValidator = new FormValidator(obj, formPopupProfile);
popupProfileOpenButton.addEventListener('click', openPopupProfile.bind(popupProfile));
popupProfile.setEventListeners();

//открываем попап профиля, вставляем значения данных пользователя, валидируем форму
function openPopupProfile(){
  const data = userData.getUserInfo();
  formPopupProfile.querySelector('.form__input_name').value = data.name;
  formPopupProfile.querySelector('.form__input_description').value = data.info;
  popupProfile.open();
  profileFormValidator.enableValidation();
};

//создание экземпляра класса для попапа добавления карточки
const popupAdd = new PopupWithForm(popupAddElementSelector, formAddElemSubmitHandler);
const addElemFormValidator = new FormValidator(obj, formPopupAddElement);
popupAddElementOpenButton.addEventListener('click', openPopupAddElement.bind(popupAdd));
addElemFormValidator.enableValidation();
popupAdd.setEventListeners();

//открываем попап доб-я карточки, меняем состояние кнопки, тк форма пустая
function openPopupAddElement(){
  popupAdd.open();
  addElemFormValidator.toggleButtonState();
};
const cardList = new Section({
  data: places,
  renderer: (item)=> {
    const cardElement = createCard({name: item.name, link: item.link});
    cardList.addItem(cardElement);
  }
  },
  cardListSection
);
cardList.renderItems();
