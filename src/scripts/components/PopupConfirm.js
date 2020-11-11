import Popup from './Popup.js';
import {renderLoading} from '../utils/renderLoading.js';

export default class PopupConfirm extends Popup{
  constructor(page, popupCloseButtonSelector, formElementSelector,popupSelector,formSubmitHandler, id){
    super(popupSelector, page, popupCloseButtonSelector);
    this._formSubmitHandler= formSubmitHandler;
    this._id = id;
    this._formElement = this._popup.querySelector(formElementSelector);
    this.renderLoading = renderLoading;
  }
  setEventListeners(card){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      renderLoading(this._formElement, true);
      this._formSubmitHandler(this._id, card);
    });
    super.setEventListeners();
  }
  close(){
    this.renderLoading(this._formElement, false);
    super.close();
  }
  }
