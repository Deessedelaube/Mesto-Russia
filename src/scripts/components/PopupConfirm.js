import {formElementSelector} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupConfirm extends Popup{
  constructor(popupSelector,formSubmitHandler, id){
    super(popupSelector);
    this._formSubmitHandler= formSubmitHandler;
    this._id = id;
    this._formElement = this._popup.querySelector(formElementSelector);
  }
  setEventListeners(card){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formElement.querySelector('.button_type_save').textContent = 'Удаление...';
      this._formSubmitHandler(this._id, card);
    });
    super.setEventListeners();
  }
  }
