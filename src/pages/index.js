import './index.css';
import {templateSelector, cardListSection, popupProfileSelector,
    popupImageSelector, popupAddElementSelector, popupAvatarSelector,
    popupConfirmSelector,
    profileNameSelector, profileInfoSelector, avatarSelector,
    popupProfileOpenButton, popupAddElementOpenButton, popupAvatarOpenButton,
    formPopupProfile, formPopupAddElement,formPopupAvatar, formPopupConfirm,
    formPopupProfileNameSelector,formPopupProfileInfoSelector} from '../scripts/utils/constants.js';
import obj from '../scripts/utils/config.js';
import places from '../scripts/utils/places.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirm from '../scripts/components/PopupConfirm';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'a5ab0f86-d530-4405-820a-39c59495e62f',
    'Content-Type': 'application/json'
  }
});

const userData = new UserInfo ({nameSelector: profileNameSelector, infoSelector: profileInfoSelector, avatarSelector: avatarSelector, id: '1'});
//запрашиваем информацию о пользователе, а затем рендерим картинки с сервера
api.loadUserInfo().then((data)=>{
  userData.setUserInfo({fullname: data.name, job: data.about, avatar: data.avatar, _id: data._id});
  userData.getUserInfo();
  return api.getInitialCards()
  })
  .then((cards)=>{
    const cardList = new Section({
      data: cards,
      renderer: (item)=> {
        const cardElement = createCard({name: item.name, link: item.link, _id: item._id, authorId: item.owner._id, likes: item.likes}, userData.id);
        cardList.addItem(cardElement);
      }
    },
    cardListSection
    );
    cardList.renderItems();
  });

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//создаем элемент карточки
function createCard(obj, userId){
  const card = new Card(templateSelector,
    obj, userId,
    popupImage.open.bind(popupImage),
    handleCardDelete,
    handleCardLike);
  return card.generateCard();
};
//обработчик формы добавления карточки
function formAddElemSubmitHandler(obj){
  api.addCard(obj).then((res)=>{
    const cardElement = createCard({name: res.name, link: res.link, _id: res._id, authorId: res.owner._id, likes: res.likes}, userData.id);
    cardListSection.prepend(cardElement);
    this.close();
  })
};

// Обработчик попапа профиля
function formProfileSubmitHandler(obj){
  api.updateUserInfo(obj).then((res)=>{
    userData.setUserInfo({fullname: res.name, job: res.about});
    this.close();
  });
};

// создание экземпляра класса для попапа профиля
const popupProfile = new PopupWithForm (popupProfileSelector, formProfileSubmitHandler);
const profileFormValidator = new FormValidator(obj, formPopupProfile);
popupProfileOpenButton.addEventListener('click', openPopupProfile.bind(popupProfile));
popupProfile.setEventListeners();

//открываем попап профиля, вставляем значения данных пользователя, валидируем форму
function openPopupProfile(){
  const data = userData.getUserInfo();
  formPopupProfile.querySelector(formPopupProfileNameSelector).value = data.name;
  formPopupProfile.querySelector(formPopupProfileInfoSelector).value = data.info;
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

const popupAvatar = new PopupWithForm(popupAvatarSelector, avatarHandler);
popupAvatarOpenButton.addEventListener('click', popupAvatar.open.bind(popupAvatar));
popupAvatar.setEventListeners();

//обработчик смены аватара
function avatarHandler(obj){
  api.updateAvatar(obj).then((res)=>{
    userData.setAvatar(res.avatar);
    this.close();
  });
};
//обработчик лайков
function handleCardLike(id, method){
  return api.likeCard(id, method);
};
// обработчик клика удаления карточки
function handleCardDelete(id, card){
  const popupConfirm = new PopupConfirm(popupConfirmSelector, confirmHandler, id);
  popupConfirm.open();
  popupConfirm.setEventListeners(card);
};
//обработчик формы попапа подтверждения
function confirmHandler(id, card){
  api.deleteCard(id).then((res)=>{
    if (res){
      this.close();
      card.remove();
      card = null;
    }
  })
  };



