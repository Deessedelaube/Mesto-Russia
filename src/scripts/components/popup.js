export default class Popup{
  constructor(popupSelector, page, popupCloseButtonSelector){
    this._popup = document.querySelector(popupSelector);
    this._page = page;
    this._closeBtn = this._popup.querySelector(popupCloseButtonSelector);
    this._handleEscClose=this._handleEscClose.bind(this);
  }
  open(){
    this._popup.classList.add('popup_opened');
    this._page.classList.add('page_overflow_hidden');
    document.addEventListener('keydown', this._handleEscClose);

  }
  close(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._page.removeEventListener('click', this._handleOverlayClose.bind(this));
    this._popup.classList.remove('popup_opened');
    this._page.classList.remove('page_overflow_hidden');
  }
  _handleEscClose(evt){
    const openedPopup = document.querySelector('.popup_opened');
    if ((evt.key==="Escape")&&(openedPopup)){
      this.close();
    }
  }
  _handleOverlayClose(event){
    if ((event.target !== event.currentTarget)&&(event.target.classList.contains('popup_opened'))){
      this.close();}
  }
  setEventListeners(){
    this._page.addEventListener('click', this._handleOverlayClose.bind(this));
    //const popupCloseButton = this._popup.querySelector(popupCloseButtonSelector);
    this._closeBtn.addEventListener('click', this.close.bind(this));
  }
}

