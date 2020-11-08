import {formElementSelector, formInputSelector} from '../utils/constants.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
export default class PopupConfirm extends Popup{
  constructor(popupSelector,formSubmitHandler){
    super(popupSelector);
  }
  setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
    super.setEventListeners();
  }
}
