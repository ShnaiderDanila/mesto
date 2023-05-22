export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupButtonClose = this._popupSelector.querySelector('.popup__button-close');
  }
  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      openedPopup.classList.remove('popup_is-opened');
    };
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popupButtonClose.addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}
