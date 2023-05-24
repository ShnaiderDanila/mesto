import { validationConfig, FormValidator } from './FormValidator.js';
import { initialCards, Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

// Переменные Profile
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

// Переменные Popup
// PopupProfile
const popupProfileNameInput = document.querySelector('.popup__input[name="name"]');
const popupProfileJobInput = document.querySelector('.popup__input[name="job"]');
// PopupAdd
const popupAddForm = document.forms['add-card'];

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

// Функкция обработчик клика по картинке карты
function handleCardClick(name, link) {
  const popupPicture = new PopupWithImage('.popup-picture', name, link);
  popupPicture.open();
}

// Создание экземпляров классов
// Экземпляр класса для добавления начальных карточек на страницу
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
      const cardItem = new Card(item, '#card-template', handleCardClick);
      const cardElement = cardItem.generateCard();
      cardList.addItem(cardElement);
  },

}, '.gallery__list')

// Функция добавления начальных карточек из массива initialCards
cardList.renderItems();

// Экземпляр класса для попапа с картинкой
const popupPicture = new PopupWithImage('.popup-picture');

// // Экземпляры класса для попапов с формой
const popupProfile = new PopupWithForm('.popup-profile', handleEditFormSubmit);
const popupAdd = new PopupWithForm('.popup-add', handleAddFormSubmit);

// Экземлпяр класса для информации пользователя на странице
const profileInfo = new UserInfo({
  usernameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle'
});

// Добавление слушателей событий на все попапы
popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAdd.setEventListeners();

// Функции PopupEdit
// Функция активациии PopupEdit
function openProfilePopup() {
  const {username, description} = profileInfo.getUserInfo();
  popupProfileNameInput.value = username;
  popupProfileJobInput.value = description;
  popupProfile.open();
  formValidators['edit-profile'].resetValidation();
};

// Функция обработчик самбита PopupProfile
function handleEditFormSubmit({name, job}) {
  profileInfo.setUserInfo({
    newUsername: name,
    newDescription: job
  })
};

// Слушатели событий PopupEdit
profileButtonEdit.addEventListener('click', openProfilePopup);

// Функции PopupAdd
// Функция активациии PopupAdd
function openAddPopup() {
  popupAdd.open();
  popupAddForm.reset();
  formValidators['add-card'].resetValidation();
}

// Функция обработчик самбита PopupAdd
function handleAddFormSubmit({place, link}) {
// Массив данных для новой карточки
  const popupAddObj = [{
    name: place,
    link: link
  }];
// Добавление новой карточки по классу Section
  const card = new Section({
    items: popupAddObj,
    renderer: (item) => {
      const cardItem = new Card(item, '#card-template', handleCardClick);
      const cardElement = cardItem.generateCard();
      document.querySelector('.gallery__list').prepend(cardElement);
    }
  }, '.gallery__list')
  card.renderItems();
};

// Слушатели событий PopupAdd
profileButtonAdd.addEventListener('click', openAddPopup);




