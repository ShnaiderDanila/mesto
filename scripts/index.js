import { validationConfig, FormValidator } from './FormValidator.js';
import { initialCards, Card } from './Card.js';

// Переменные Profile
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные Gallery
const gallery = document.querySelector('.gallery');
const galleryList = gallery.querySelector('.gallery__list');

// Переменные Popup
// PopupEdit
const popupEdit = document.querySelector('.popup-edit');
const popupEditForm = document.forms['edit-profile'];
const popupEditNameInput = popupEdit.querySelector('.popup__input[name="name"]');
const popupEditJobInput = popupEdit.querySelector('.popup__input[name="job"]');
// PopupAdd
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = document.forms['add-card'];
const popupAddPlaceNameInput = popupAdd.querySelector('.popup__input[name="place-name"]');
const popupAddLinkInput = popupAdd.querySelector('.popup__input[name="link"]');
// PopupPicture
const popupPicture = document.querySelector('.popup-picture');
const popupFigcaption = popupPicture.querySelector('.popup__figcaption');
const popupBigImage = popupPicture.querySelector('.popup__big-image');

// Объект, где будут храниться все формы со страницы
const formValidators = {}

// Функция включения валидации на каждой форме
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((form) => {
    const validator = new FormValidator(config, form)
// получаем данные из атрибута `name` у формы
    const formName = form.getAttribute('name')
// в объект записываем - имя текущей формы: объект с методами валидации
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscKey);
};

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscKey);
};

// Функция закрытия попапа кликом на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

// Функция закрытия попапа нажатием клавиши Esc
function closePopupEscKey(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.target);
  };
}

// Функция добавления слушателей событий закрытия попапов
function addEventsClosePopup () {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    // Функция закрытия попапа кликом на крестик
    const popupButtonClose = popup.querySelector('.popup__button-close')
    popupButtonClose.addEventListener('click', () => closePopup(popup));
    // Функция закрытия попапа кликом на оверлей
    popup.addEventListener('click', closePopupOverlay);
});
}

addEventsClosePopup();

// Функкция обработчик клика по картинке карты
function handleCardImageClick(name, link) {
  popupBigImage.src = link;
  popupBigImage.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupPicture);
}

// Функция создания карточки
function createCard(item) {
  const cardItem = new Card(item, '#card-template', handleCardImageClick);
  return cardItem.generateCard();
}

// Добавление начальных карт с данными из массива initialCards;
initialCards.forEach(item => {
  const card = createCard(item);
  galleryList.append(card);
});

// Функции PopupEdit
// Функция активациии PopupEdit
function enableEditPopup(popup) {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
  openPopup(popup);
  formValidators['edit-profile'].resetValidation();
};

// Обработка PopupEdit
function handleEditFormSubmit() {
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  closePopup(popupEdit);
};

// Слушатели событий PopupEdit
profileButtonEdit.addEventListener('click', () => enableEditPopup(popupEdit));
popupEditForm.addEventListener('submit', handleEditFormSubmit);

// Функции PopupAdd
// Функция активациии PopupAdd
function enableAddPopup(popup) {
  openPopup(popup);
  formValidators['add-card'].resetValidation();
}

function handleAddFormSubmit() {
  // Добавление новой карточки по классу Card
  const popupAddObj = {
    name:  popupAddPlaceNameInput.value,
    link:  popupAddLinkInput.value,
  };
  const card = createCard(popupAddObj);
  galleryList.prepend(card);
  closePopup(popupAdd);
};

// Слушатели событий PopupAdd
profileButtonAdd.addEventListener('click', () => enableAddPopup(popupAdd));
popupAddForm.addEventListener('submit', handleAddFormSubmit);



