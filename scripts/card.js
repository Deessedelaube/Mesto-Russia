class Card {
  constructor(name, link,openPopupEnlargeImage){
    this._name = name;
    this._link = link;
    this._openPopupEnlargeImage = openPopupEnlargeImage;
  }
  _getTemplate(){
    const cardElement = document
    .querySelector('.element_template')
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
    this._element.querySelector('.button_type_like').addEventListener('click', ()=>this._handleLike());
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
