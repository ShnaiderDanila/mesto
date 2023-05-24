// Импорт классов
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

// Импорт переменных
import {
  initialCards,
  profileButtonEdit,
  profileButtonAdd,
  popupProfileNameInput,
  popupProfileJobInput,
  validationConfig
} from '../utils/constants.js';

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
// Экземпляр класса Section
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
      const cardItem = new Card(item, '#card-template', handleCardClick);
      const cardElement = cardItem.generateCard();
      cardList.addItem(cardElement);
  },
}, '.gallery__list')

// Функция запуска рендер-функции класса Section (для добавления начальных карточек на страницу)
cardList.renderItems();

// Экземпляр класса PopupWithImage (для попапа с картинкой)
const popupPicture = new PopupWithImage('.popup-picture');

// // Экземпляры класса PopupWithForm (для попапов с формой)
const popupProfile = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup-add', handleAddFormSubmit);

// Экземлпяр класса UserInfo (для хранения информации о пользователе)
const profileInfo = new UserInfo({
  usernameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle'
});

// Функция обработчик самбита PopupProfile
function handleProfileFormSubmit({name, job}) {
  profileInfo.setUserInfo({
    newUsername: name,
    newDescription: job
  })
};

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

// Добавление слушателей событий на все попапы
popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAdd.setEventListeners();

// Слушатель события активации PopupProfile
profileButtonEdit.addEventListener('click', openProfilePopup);

// Слушатель события активации PopupAdd
profileButtonAdd.addEventListener('click', openAddPopup);

// Функция активациии PopupProfile
function openProfilePopup() {
  const {username, description} = profileInfo.getUserInfo();
  popupProfileNameInput.value = username;
  popupProfileJobInput.value = description;
  popupProfile.open();
  formValidators['edit-profile'].resetValidation();
};

// Функция активациии PopupAdd
function openAddPopup() {
  popupAdd.close();
  popupAdd.open();
  formValidators['add-card'].resetValidation();
}
