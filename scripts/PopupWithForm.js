import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  // _getInputValues() {


  // }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
  }

}

