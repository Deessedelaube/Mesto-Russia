import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(page, popupCloseButtonSelector, popupSelector, imageSelector, titleImageSelector){
    super(popupSelector, page, popupCloseButtonSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._titleImage = this._popup.querySelector(titleImageSelector);
  }
  open(name, link){
    this._image.src = link;
    this._titleImage.textContent = name;
    super.open();
  }
}
