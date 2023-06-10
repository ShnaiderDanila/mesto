import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__button-save');
  }

  // Метод получения логики подтверждения удаления карточки
  setDeleteConfirm(callbackFunction) {
    this._handleDeleteConfirm = callbackFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      this._handleDeleteConfirm();
    })
  }
}

export { PopupWithConfirmation };

