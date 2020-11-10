class Card {
  constructor(templateSelector, obj, userId, handleCardClick, handleCardDelete, handleCardLike){
    this._templateSelector = templateSelector;
    this._name = obj.name;
    this._link = obj.link;
    this.id = obj._id;
    this._userId = userId;
    this._authorId = obj.authorId;
    this.likes = obj.likes.map(item=>item._id);
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleApiLike = handleCardLike;
    this._isLiked = obj.likes.map(item=>item._id).includes(userId);
  }
  _getTemplate(){
    //создаем шаблон элемента
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    if (this._userId !== this._authorId){
      cardElement.querySelector('.button_type_delete').remove();
    }
  // вернём DOM-элемент карточки
    return cardElement;
  }
  generateCard(){
    //создаем разметку
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.button_type_like');
    if (this._isLiked){
      this._likeBtn.classList.add('button_type_like_clicked');
    };
    this._deleteBtn = this._element.querySelector('.button_type_delete');
    this._setEventListeners();
    //запишем в нее данные
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.alt = this._name;
    this._element.querySelector('.element__likes_number').textContent = this.likes.length;

    //возвращаем наружу элемент
    return this._element;
  }
  _setEventListeners(){
    if (this._deleteBtn){
      this._deleteBtn.addEventListener('click', ()=> this._handleCardDelete(this.id, this._element));
      };
    this._likeBtn.addEventListener('click', ()=>{
      this._likeBtn.classList.toggle('button_type_like_clicked');
      this._handleLike().then((res)=>{
        this.likes= res.likes.map(item=>item._id);
        this._element.querySelector('.element__likes_number').textContent = this.likes.length;
        this._isLiked = this.likes.includes(this._userId);
      });
    });
    this._element.querySelector('.button_type_enlarge').addEventListener('click', ()=>this._handleCardClick(this._name, this._link));
  }
  handleDelete(){
    this._element.remove();
    this._element = null;
  }
  _handleLike(){
    if (this._isLiked){
      return this._handleApiLike(this.id, 'DELETE')
    } else {
      return this._handleApiLike(this.id, 'PUT')
    }
  }
}

export default Card;

          //this.likes= res.likes.map(item=>item._id);
          //element.querySelector('.element__likes_number').textContent = this.likes.length;
          //this._isLiked = this.likes.includes(this._userId);
