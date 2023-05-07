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
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  // Метод скрытия ошибки
  _hideError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Метод отображения ошибки
  _showError (input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Метод проверки валидности инпутов
  _checkInputValidity (input, errorElement) {
    if (input.validity.valid) {
      this._hideError(input, errorElement);
    } else {
      this._showError(input, errorElement);
    }
  };

  // Метод проверки валидности формы
  _checkFormValidity (formInputsArray) {
    return formInputsArray.every((input) => {
      return input.validity.valid;
    });
  };

  // Метод переключения состояния кнопки в зависимости от валидности формы
  _toggleButtonValidity(formInputsArray, saveButton) {
    if (this._checkFormValidity(formInputsArray)) {
      saveButton.removeAttribute('disabled');
      saveButton.classList.remove(this._inactiveButtonClass);
    } else {
      saveButton.setAttribute('disabled', '');
      saveButton.classList.add(this._inactiveButtonClass);
    };
  };

  // Метод обработки формы
  _setSubmitListener(form) {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      form.reset();
    });
  }

  // Метод установки слушателей событий
  _setEventListeners(input, errorElement, formInputsArray, saveButton) {
    input.addEventListener('input', () => {
      this._checkInputValidity(input, errorElement);
      this._toggleButtonValidity(formInputsArray, saveButton);
    });
  }
  // Метод включения валидации
  enableValidation() {
    const form = document.querySelector(this._form);
    const saveButton = form.querySelector(this._submitButtonSelector);
    const formInputs = form.querySelectorAll(this._inputSelector);
    const formInputsArray = Array.from(formInputs);
    this._setSubmitListener(form);
    this._toggleButtonValidity(formInputsArray, saveButton);
    formInputsArray.forEach(input => {
      const errorElement = form.querySelector(`#error-${input.id}`);
      this._hideError(input, errorElement);
      this._setEventListeners(input, errorElement, formInputsArray, saveButton);
    });
  }
};

export { validationConfig, FormValidator };

