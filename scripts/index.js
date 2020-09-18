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
const nameInput = popupProfile.querySelector('.form__fullname');
const jobInput = popupProfile.querySelector('.form__description');
// Выбираем элементы профиля, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profilejob = document.querySelector('.profile__job');
// Находим форму добавления карточки места
const formAddElement = popupAddElement.querySelector('.form_addElement');
const titleInput = popupAddElement.querySelector('.form__fullname');
const srcInput = popupAddElement.querySelector('.form__description');

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
    htmlElement.querySelector('.element__title').innerText = name;
  return htmlElement;
};
//добавляем карточки в ДОМ
function addCard (item){
    const card = createCard(item.name, item.link);
    setListeners(card);
    elements.prepend(card);
};

//обработчик формы добавления карточки
function formAddElementSubmitHandler(evt){
  evt.preventDefault();
  const newcard = {};
    newcard.name = titleInput.value;
    newcard.link = srcInput.value;
  addCard(newcard);
  popupClose(popupAddElement);
};

//функции открытия/закрытия попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_overflow_hidden');
};

function popupClose(popup){
  popup.classList.remove('popup_opened');
  page.classList.remove('page_overflow_hidden');
};

//* функция открытия попапа профиля
const popupProfileOpen = (event) => {
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
  popupOpen(popupProfile);
};

//функция открытия попапа картинок
const popupEnlargeImageOpen = (event)=>{
    popupEnlargeImage.querySelector('.popup__image').setAttribute('src', event.target.src);
    popupEnlargeImage.querySelector('.popup__title_image').textContent = event.target.alt;
  popupOpen(popupEnlargeImage);
};
//функция открытия попапа добавления карточки
const popupAddElementOpen = (event)=>{
  titleInput.value ="";
  srcInput.value = "";
  popupOpen(popupAddElement);
};
//* функция закрытия по клику не на форму
const popupCloseByClickonOverlay = (event) => {
  if (event.target === event.currentTarget){
    popupClose();
  } else {return}};

// Обработчик «отправки» формы
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); //убираем стандартную отправку
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  popupClose(popupProfile);
};

//функция удаления карточки
function handleDelete (event){
  const card = event.target.closest('.element');
  card.remove();
};

//ставим лайки
function handleLike (event){
  event.target.classList.toggle('button_type_like_clicked');
};

//Вставляем все слушатели событий
function setListeners (htmlelem){
  let btnDelete = htmlelem.querySelector('.button_type_delete');
  btnDelete.addEventListener('click', handleDelete);

  let btnLike = htmlelem.querySelector('.button_type_like');
  btnLike.addEventListener('click', handleLike);

  let imgsize = htmlelem.querySelector('.button_type_enlarge');
  imgsize.addEventListener('click',popupEnlargeImageOpen);
};

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
formProfile.addEventListener('submit', formProfileSubmitHandler);
popupProfileClose.addEventListener('click', () => {popupClose(popupProfile)});
popupProfile.addEventListener('click', popupCloseByClickonOverlay);

popupAddElementOpenButton.addEventListener('click', popupAddElementOpen);
formAddElement.addEventListener('submit', formAddElementSubmitHandler);
popupAddElementClose.addEventListener('click',() => {popupClose(popupAddElement)});

popupEnlargeImage.querySelector('.button_type_close').addEventListener('click',() => {popupClose(popupEnlargeImage)});
places.forEach(item =>{addCard(item)});


