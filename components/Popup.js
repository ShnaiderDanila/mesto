class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector('.popup__button-close');
  }

  // Метод открытия попапа
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Приватный метод закрытия попапа клавишей ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      openedPopup.classList.remove('popup_is-opened');
    };
  }

  // Приватный метод закрытия попапа кликом на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    };
  }

  // Метод установки слушателей событий на попап
  setEventListeners() {
    this._popupButtonClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}

export { Popup }
