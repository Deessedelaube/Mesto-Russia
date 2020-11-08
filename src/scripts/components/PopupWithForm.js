import {formElementSelector, formInputSelector} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitHandler){
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector(formElementSelector);
  }
  _getInputValues(){
    this._inputValues = Array.from(this._formElement.querySelectorAll(formInputSelector))
      .reduce(function(obj, input){
        obj[input.name] = input.value;
        return obj;
      },{});
    return this._inputValues;
  }
  setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formElement.querySelector('.button_type_save').textContent = 'Сохранение...';
      this._formSubmitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }
  close(){
    this._formElement.reset();
    this._formElement.querySelector('.button_type_save').textContent = this._formElement.querySelector('.button_type_save').value;
    super.close();
  }
}
