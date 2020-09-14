const popup = document.querySelectorAll('.popup');
const popupProfile = popup[0];
const popupAddElement = popup[1];
const popupEnlargeImage = popup[2];
const page = document.querySelector('.page');
const popupProfileOpenButton = document.querySelector('.button_type_edit');
const popupAddElementOpenButton = document.querySelector('.button_type_add');

const popupProfileClose = popupProfile.querySelector('.button_type_close');
const popupAddElementClose = popupAddElement.querySelector('.button_type_close');

// Находим форму редактирования профиля и ее поля в DOM
let formProfile = popupProfile.querySelector('.form_profile');
let nameInput = popupProfile.querySelector('.form__fullname');
let jobInput = popupProfile.querySelector('.form__description');
// Выбираем элементы профиля, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');
// Находим форму добавления карточки места
let formAddElement = popupAddElement.querySelector('.form_addElement');
let titleInput = popupAddElement.querySelector('.form__fullname');
let srcInput = popupAddElement.querySelector('.form__description');

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
//отрисовщик массива картинок
function render (){
  elements.innerHTML ="";
  places.forEach((item, index) =>{
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector('.element__title').innerText = item.name;
    htmlElement.querySelector('.element__image').src = item.link;
    htmlElement.querySelector('.element__image').alt = item.name;
    htmlElement.querySelector('.element').setAttribute("data-id", index);
    elements.appendChild(htmlElement);
    setListeners();
  })
};

//обработчик формы добавления карточки
function formAddElementSubmitHandler (){
  const newelement = {};
    newelement.name = titleInput.value;
    newelement.link = srcInput.value;
  places.unshift(newelement);
  render(places);
  titleInput.value ="Название";
  srcInput.value ="Ссылка на картинку";
  popupToggle();
};

//функция открытия/закрытия попапа добавления карточки
const popupToggle = () =>{
  popupAddElement.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
};

//* функция открытия/закрытия попапа профиля
const popupProfileToggle = (event) => {
  //если форма была закрыта, то записываем в форму значения полей профиля
  if (!popupProfile.classList.contains('popup_opened')){
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
  };
  popupProfile.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
};

//функция открытия/закрытия попапа картинок
const popupEnlargeImageToggle = (event)=>{
  //если форма была закрыта, то задиваем в нее картинку и название
  if (!popupEnlargeImage.classList.contains('popup_opened')){
    popupEnlargeImage.querySelector('.popup__image').setAttribute('src', event.target.src);
    popupEnlargeImage.querySelector('.popup__title_image').textContent = event.target.alt;
  };
  popupEnlargeImage.classList.toggle('popup_opened');
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
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  popupProfileToggle();
};

//функция удаления карточки
function handleDelete (event){
  let index = event.target.parentNode.getAttribute("data-id");
  places.splice(index, 1);
  render();
};

//ставим лайки
function handleLike (event){
  event.target.classList.toggle('button_type_like_clicked');
};

//Вставляем все слушатели событий
function setListeners (){
  document.querySelectorAll('.button_type_delete').forEach((btn)=>{
    btn.addEventListener('click', handleDelete);
  });
  document.querySelectorAll('.button_type_like').forEach((btn)=>{
    btn.addEventListener('click', handleLike);
  });
  document.querySelectorAll('.button_type_enlarge').forEach((btn)=>{
    btn.addEventListener('click',popupEnlargeImageToggle);
  })
};

popupProfileOpenButton.addEventListener('click', popupProfileToggle);
formProfile.addEventListener('submit', formProfileSubmitHandler);
popupProfileClose.addEventListener('click', popupProfileToggle);
popupProfile.addEventListener('click', popupCloseByClickonOverlay);

popupAddElementOpenButton.addEventListener('click', popupToggle);
formAddElement.addEventListener('submit', formAddElementSubmitHandler);
popupAddElementClose.addEventListener('click',popupToggle);

popupEnlargeImage.querySelector('.button_type_close').addEventListener('click',popupEnlargeImageToggle);
render();
