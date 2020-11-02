import Popup from './Popup.js';
import {imageSelector, titleImageSelector} from '../utils/constants.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }
  open(name, link){
    this._popup.querySelector(imageSelector).src = link;
    this._popup.querySelector(titleImageSelector).textContent = name;
    super.open();
  }
}
