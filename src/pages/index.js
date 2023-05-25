// Импорт главного файла стилей
import './index.css';

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
  popupPicture.open(name, link);
}

// Создание экземпляров классов
// Экземпляр класса Section
const card = new Section ({
  renderer: (item) => {
      const cardItem = new Card(item, '#card-template', handleCardClick);
      const cardElement = cardItem.generateCard();
      card.addItem(cardElement);
  },
}, '.gallery__list')

// Функция запуска рендер-функции класса Section (для добавления начальных карточек на страницу)
card.renderItems(initialCards.reverse());

// Экземпляр класса PopupWithImage (для попапа с картинкой)
const popupPicture = new PopupWithImage('.popup-picture');

// // Экземпляры класса PopupWithForm (для попапов с формой)
const popupProfile = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const popupAddCard = new PopupWithForm('.popup-add', handleAddFormSubmit);

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

// Функция обработчик самбита PopupAddCard
function handleAddFormSubmit({place, link}) {
  const popupAddCardObj= [{
    name: place,
    link: link
  }];
  // Добавление новой карточки по классу Section
  card.renderItems(popupAddCardObj);
};

// Добавление слушателей событий на все попапы
popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

// Слушатель события активации PopupProfile
profileButtonEdit.addEventListener('click', openProfilePopup);

// Слушатель события активации PopupAddCard
profileButtonAdd.addEventListener('click', openAddPopup);

// Функция активациии PopupProfile
function openProfilePopup() {
  const {username, description} = profileInfo.getUserInfo();
  popupProfileNameInput.value = username;
  popupProfileJobInput.value = description;
  popupProfile.open();
  formValidators['edit-profile'].resetValidation();
};

// Функция активациии PopupAddCard
function openAddPopup() {
  popupAddCard.close();
  popupAddCard.open();
  formValidators['add-card'].resetValidation();
}
