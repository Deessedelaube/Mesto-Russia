import './index.css';
import {templateSelector, cardListSection, popupProfileSelector,
    popupImageSelector, popupAddElementSelector,
    profileNameSelector, profileInfoSelector,
    popupProfileOpenButton, popupAddElementOpenButton} from '../scripts/utils/constants.js';
import places from '../scripts/utils/places.js';
import PopupWithImage from '../scripts/components/popupimage.js';
import PopupWithForm from '../scripts/components/popupform.js';
import UserInfo from '../scripts/components/userinfo.js';
import Card from '../scripts/components/card.js';
import Section from '../scripts/components/section.js';

//обработчик формы добавления карточки
function formAddElemSubmitHandler(obj){
  const popupImage = new PopupWithImage(popupImageSelector);
  popupImage.setEventListeners();
  const card = new Card(templateSelector, obj.elemTitle, obj.link, popupImage.open.bind(popupImage));
  const cardElement = card.generateCard();
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
popupProfileOpenButton.addEventListener('click', popupProfile.open.bind(popupProfile));
popupProfile.setEventListeners();
popupProfile.validate();

//создание экземпляра класса для попапа добавления карточки
const popupAdd = new PopupWithForm(popupAddElementSelector, formAddElemSubmitHandler);
popupAddElementOpenButton.addEventListener('click', popupAdd.open.bind(popupAdd));
popupAdd.setEventListeners();
popupAdd.validate();

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
