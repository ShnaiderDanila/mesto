// Функции настройки валидации формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

// Создание класса FormValidator
class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    this._inputListArray = Array.from(this._inputList);
  }

  // Метод скрытия ошибки
  _hideError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Метод отображения ошибки
  _showError(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Метод проверки валидности инпутов
  _checkInputValidity(input, errorElement) {
    if (input.validity.valid) {
      this._hideError(input, errorElement);
    } else {
      this._showError(input, errorElement);
    }
  };

  // Метод проверки валидности формы
  _checkFormValidity() {
    return this._inputListArray.every((input) => {
      return input.validity.valid;
    });
  };

  // Метод переключения состояния кнопки в зависимости от валидности формы
  _toggleButtonValidity() {
    if (this._checkFormValidity()) {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButton.setAttribute('disabled', '');
      this._submitButton.classList.add(this._inactiveButtonClass);
    };
  };

  // Метод обработки формы
  _setSubmitListener() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._form.reset();
    });
  };

  // Метод установки слушателей событий
  _setEventListeners(input, errorElement) {
    input.addEventListener('input', () => {
      this._checkInputValidity(input, errorElement);
      this._toggleButtonValidity();
    });
  }

  // Метод очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButtonValidity();
    this._inputList.forEach(input => {
      const errorElement = this._form.querySelector(`#error-${input.id}`);
      this._hideError(input, errorElement);
    });
  };

  // Метод включения валидации
  enableValidation() {
    this._setSubmitListener();
    this._inputListArray.forEach(input => {
      const errorElement = this._form.querySelector(`#error-${input.id}`);
      this._setEventListeners(input, errorElement);
    });
  }
};

export { validationConfig, FormValidator };

