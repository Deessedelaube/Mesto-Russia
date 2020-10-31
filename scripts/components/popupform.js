import {formElementSelector, formInputSelector} from '../utils/constants.js';
import Popup from './popup.js';
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
    this._formElement.addEventListener('submit', (evt) => this._formSubmitHandler.bind(this));
    super.setEventListeners();
  }
  close(){
    this._formElement.reset();
    super.close();
  }
}
