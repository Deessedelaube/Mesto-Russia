const popupProfile = document.querySelector('.popup_profile');
const popupAddElement = document.querySelector('.popup_addElement');
const popupEnlargeImage = document.querySelector('.popup_openImage');
const page = document.querySelector('.page');
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
const profilejob = document.querySelector('.profile__job');
// Находим форму добавления карточки места
const formAddElement = popupAddElement.querySelector('.form_addElement');
const titleInput = popupAddElement.querySelector('.form__input_name');
const srcInput = popupAddElement.querySelector('.form__input_description');

const elements = document.querySelector('.elements');
const itemTemplate = document.querySelector('.element_template').content;

const places = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//создаем карточку
function createCard (name,link){
  const htmlElement = itemTemplate.cloneNode(true);
  const image = htmlElement.querySelector('.element__image');
  image.src = link;
  image.alt = name;
  htmlElement.querySelector('.element__title').textContent = name;
  return htmlElement;
};
//добавляем карточки в ДОМ
function addCard (item){
  const card = createCard(item.name, item.link);
  setListeners(card);
  elements.prepend(card);
};

//обработчик формы добавления карточки
function formAddElemSubmitHandler(evt){
  evt.preventDefault();
  const newcard = {};
  newcard.name = titleInput.value;
  newcard.link = srcInput.value;
  addCard(newcard);
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
  if ((evt.key==="Escape")&&(document.querySelector('.popup_opened'))){
    const openedPopup = document.querySelector('.popup_opened');
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
  jobInput.value = profilejob.textContent;
  openPopup(popupProfile);
};

//функция открытия попапа картинок
const openPopupEnlargeImage = (event)=>{
  popupEnlargeImage.querySelector('.popup__image').src = event.target.src;
  popupEnlargeImage.querySelector('.popup__title_image').textContent = event.target.alt;
  openPopup(popupEnlargeImage);
};
//функция открытия попапа добавления карточки
const openPopupAddElement = ()=>{
  titleInput.value ="";
  srcInput.value = "";
  openPopup(popupAddElement);
};

// Обработчик «отправки» формы
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup(popupProfile);
};

//функция удаления карточки
function handleDelete (event){
  event.target.closest('.element').remove();
};

//ставим лайки
function handleLike (event){
  event.target.classList.toggle('button_type_like_clicked');
};

//Вставляем все слушатели событий
function setListeners (htmlElem){
  const btnDelete = htmlElem.querySelector('.button_type_delete');
  btnDelete.addEventListener('click', handleDelete);

  const btnLike = htmlElem.querySelector('.button_type_like');
  btnLike.addEventListener('click', handleLike);

  const imgsize = htmlElem.querySelector('.button_type_enlarge');
  imgsize.addEventListener('click',openPopupEnlargeImage);
};

popupProfileOpenButton.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', formProfileSubmitHandler);
popupProfileClose.addEventListener('click', () => {closePopup(popupProfile)});

popupAddElementOpenButton.addEventListener('click', openPopupAddElement);
formAddElement.addEventListener('submit', formAddElemSubmitHandler);
popupAddElementClose.addEventListener('click',() => {closePopup(popupAddElement)});

popupEnlargeImage.querySelector('.button_type_close').addEventListener('click',() => {closePopup(popupEnlargeImage)});

//закрываем попап по оверлэй
page.addEventListener('click', closePopupByClickOnOverlay);

places.forEach(item =>{
  addCard(item)
});


