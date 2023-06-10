// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

// Переменные кнопок Profile
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupProfileAvatarButton = document.querySelector('.profile__avatar-button');

// Переменные PopupProfile
const popupProfileNameInput = document.querySelector('.popup__input[name="name"]');
const popupProfileAboutInput = document.querySelector('.popup__input[name="about"]');

export {
  validationConfig,
  profileButtonEdit,
  profileButtonAdd,
  popupProfileNameInput,
  popupProfileAboutInput,
  popupProfileAvatarButton
}
