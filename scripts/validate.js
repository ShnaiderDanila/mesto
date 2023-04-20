// Функции настройки валидации формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

// Функция скрытия ошибки
function hideError (input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Функция отображения ошибки
function showError (input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция проверки инпута на валидность
function checkInputValidity (input, errorElement, config) {
  if (input.validity.valid) {
    hideError(input, errorElement, config);
  } else {
    showError(input, errorElement, config);
  }
};

// Функция проверки формы на валидность
function checkFormValidity (formInputsArray) {
  return formInputsArray.every((input) => {
    return input.validity.valid;
  });
};

// Функция переключение состояния кнопки, в зависимости от валидности формы
function toggleButtonValidity (formInputsArray, saveButton, config) {
  if (checkFormValidity(formInputsArray)) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove(config.inactiveButtonClass);
  } else {
    saveButton.setAttribute('disabled', '');
    saveButton.classList.add(config.inactiveButtonClass);
  };
};

// Функция включения валидации на форме
function enableValidation (config) {
  // Нахождение всех форм на странице
  const popupForms = document.querySelectorAll(config.formSelector);
  popupForms.forEach(popupForm => {
    const saveButton = popupForm.querySelector(config.submitButtonSelector);
    const formInputs = popupForm.querySelectorAll(config.inputSelector);
    const formInputsArray = Array.from(formInputs);
    // Проверка валидности кнопки, до ввода данных пользователем
    toggleButtonValidity(formInputsArray, saveButton, config);
    // Скрытие ошибок в инпутах, до ввода данных пользователем
    formInputsArray.forEach(input => {
      const errorElement = popupForm.querySelector(`#error-${input.id}`);
      hideError(input, errorElement, config);
    // Проверка данных на валидность
      input.addEventListener('input', () => {
        checkInputValidity(input, errorElement, config);
        toggleButtonValidity(formInputsArray, saveButton, config);
      });
    });
  });
};

