import { validationConfig, FormValidator } from './FormValidator.js';
import { initialCards, Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

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

function openPopup(popupSelector) {
  const popup = new Popup(popupSelector);
  popup.open();
}

function closePopup(popupSelector) {
  const popup = new Popup(popupSelector);
  popup.close();
}

const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

const popupProfileWithForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
popupProfileWithForm.setEventListeners();

const popupAddWithForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
popupAddWithForm.setEventListeners();



// Функкция обработчик клика по картинке карты
function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupPicture, name, link);
  popupWithImage.open();
}

// Функция создания карточки
function createCard(item) {
  const cardItem = new Card(item, '#card-template', handleCardClick);
  return cardItem.generateCard();
}

// Добавление начальных карт с данными из массива initialCards;
initialCards.forEach(item => {
  const card = createCard(item);
  galleryList.append(card);
});

// Функции PopupEdit
// Функция активациии PopupEdit
function openProfilePopup() {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
  formValidators['edit-profile'].resetValidation();
};

// Обработка PopupEdit
function handleEditFormSubmit() {
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  closePopup(popupEdit);
};

// Слушатели событий PopupEdit
profileButtonEdit.addEventListener('click', openProfilePopup);

// Функции PopupAdd
// Функция активациии PopupAdd
function openAddPopup() {
  openPopup(popupAdd);
  popupAddForm.reset();
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
profileButtonAdd.addEventListener('click', openAddPopup);



