import {page} from '../utils/constants.js';
export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }
  open(){
    this._popup.classList.add('popup_opened');
    page.classList.add('page_overflow_hidden');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  close(){
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.remove('popup_opened');
    page.classList.remove('page_overflow_hidden');
  }
  _handleEscClose(evt){
    const openedPopup = document.querySelector('.popup_opened');
    if ((evt.key==="Escape")&&(openedPopup)){
      this.close();
    }
  }
  setEventListeners(){
    const popupCloseButton = this._popup.querySelector('.button_type_close');
    popupCloseButton.addEventListener('click', this.close.bind(this));
  }
}

