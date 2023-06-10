import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popup.querySelector('.popup__button-save');
    this._saveButtonText = this._saveButton.textContent
  }

  // Метод получения объекта из инпутов формы
  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach(input => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  // Расширенный метод закрытия попапа с формой
  close() {
    super.close();
    this._popupForm.reset();
  }

  // Метод добавления нового текста кнопке самбита, в процессе загрузки
  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  // Расширенный метод установки слушателей событий на попап с формой
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export { PopupWithForm }
