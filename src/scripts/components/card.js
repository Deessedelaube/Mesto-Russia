class Card {
  constructor(templateSelector, name, link, handleCardClick){
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    this._likeBtn = this._element.querySelector('.button_type_like');
    this._setEventListeners();
    //запишем в нее данные
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.alt = this._name;
    //возвращаем наружу элемент
    return this._element;
  }
  _setEventListeners(){
    this._element.querySelector('.button_type_delete').addEventListener('click', ()=>this._handleDelete());
    this._likeBtn.addEventListener('click', ()=>this._handleLike());
    this._element.querySelector('.button_type_enlarge').addEventListener('click', ()=>this._handleCardClick(this._name, this._link));
  }
  _handleDelete(){
    this._element.remove();
    this._element = null;
  }
  _handleLike(){
    this._likeBtn.classList.toggle('button_type_like_clicked');
  }
}

export default Card;
