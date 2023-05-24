import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach(input => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

}

export { PopupWithForm };
