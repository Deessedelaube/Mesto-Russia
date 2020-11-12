import {renderLoading} from '../utils/renderLoading.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(page, popupCloseButtonSelector, formElementSelector, formInputSelector, popupSelector, formSubmitHandler, section){
    super(popupSelector, page, popupCloseButtonSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector(formElementSelector);
    this._formInputSelector = formInputSelector;
    this._section = section;
    this.renderLoading = renderLoading;
  }
  _getInputValues(){
    this._inputValues = Array.from(this._formElement.querySelectorAll(this._formInputSelector))
      .reduce(function(obj, input){
        obj[input.name] = input.value;
        return obj;
      },{});
    return this._inputValues;
  }
  setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(this._formElement, true);
      this._formSubmitHandler(this._getInputValues(), this._section);
    });
    super.setEventListeners();
  }
  close(){
    this._formElement.reset();
    super.close();
  }
}
