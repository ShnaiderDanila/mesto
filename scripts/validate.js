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
function hideError (form, input, config) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Функция отображения ошибки
function showError (form, input, config) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция проверки на валидность инпута
function checkInputValidity (form, input, config) {
    if (input.validity.valid) {
      hideError(form, input, config);
    } else {
      showError(form, input, config);
    }
};

// Проверка формы на валидность
function checkFormValidity(formInputsArray) {
  return formInputsArray.every((input) => {
    return input.validity.valid;
  });
};

// Переключение состояния кнопки в зависимости от валидности формы
function toggleButtonValidity(formInputsArray, saveButton, config) {
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
  const popupForms = document.querySelectorAll(config.formSelector);
  popupForms.forEach(popupForm => {
    const saveButton = popupForm.querySelector(config.submitButtonSelector);
    const formInputs = popupForm.querySelectorAll(config.inputSelector);
    const formInputsArray = Array.from(formInputs);
    toggleButtonValidity(formInputsArray, saveButton, config);
    formInputsArray.forEach(input => {
      hideError(popupForm, input, config);
      input.addEventListener('input', () => {
        checkInputValidity(popupForm, input, config);
        toggleButtonValidity(formInputsArray, saveButton, config);
      });
    });
  });
};
