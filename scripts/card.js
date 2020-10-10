class Card {
  constructor(templateSelector, name, link,openPopupEnlargeImage){
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._openPopupEnlargeImage = openPopupEnlargeImage;
  }
  _getTemplate(){
    //создаем шаблон элемента
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  // вернём DOM-элемент карточки
    return cardElement;
  }
  generateCard(){
    //создаем разметку
    this._element = this._getTemplate();
    this._setEventListeners();
    //запишем в нее данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    //возвращаем наружу элемент
    return this._element;
  }
  _setEventListeners(){
    this._element.querySelector('.button_type_delete').addEventListener('click', ()=>this._handleDelete());
    this._element.querySelector('.button_type_like').addEventListener('click', ()=>this._handleLike(evt));
    this._element.querySelector('.button_type_enlarge').addEventListener('click', ()=>this._openPopupEnlargeImage(this._name, this._link));
  }
  _handleDelete(){
    this._element.remove();
  }
  _handleLike(){
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like_clicked');
  }
}

export default Card;
