// Импорт главного файла стилей
import './index.css';

// Импорт классов
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// Импорт переменных
import {
  validationConfig,
  profileButtonEdit,
  profileButtonAdd,
  profileAvatar,
  profileTitle,
  profileSubtitle,
  popupProfileNameInput,
  popupProfileJobInput,
  popupProfileAvatarButton
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '354e8aec-b975-496d-b856-6d5457e3b39e',
    'Content-Type': 'application/json'
  }
});

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

// Создание экземпляров классов
// Экземпляр класса Section
const card = new Section ({
  renderer: (item, userInfo) => {
    const cardItem = new Card
    // Параметры класса Card
    (item, '#card-template',

    // Функкция обработчик клика по картинке карты
    function handleCardImageClick(name, link) {
      popupPicture.open(name, link);
    },

    // Функция обработчик клика по иконке удаления
    function handleTrashClick() {
      popupConfirmation.open();
      popupConfirmation.setDeleteConfirm(() => {
        api.deleteCard(item._id)
        .then(() => {
          cardItem.deleteCard();
          popupConfirmation.close();
        })
        .catch((err) => {
          console.log(err);
        })
      })
    },

    // Функция обработчик установки лайка
    function handleLikeSet() {
      api.setLike(item._id)
      .then((item) => {
        cardItem.addLike();
        cardItem.changeLikeCounter(item);
      })
      .catch((err) => {
        console.log(err);
      })
    },

    // Функция обработчик удаления лайка
    function handleLikeDelete() {
      api.removeLike(item._id)
      .then((item) => {
        cardItem.deleteLike();
        cardItem.changeLikeCounter(item);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    // Последний параметр id Пользователя
    userInfo._id)

    // Тело метода renderer
    // Генерация карточки
    const cardElement = cardItem.generateCard();
    card.addItem(cardElement);

  },
}, '.gallery__list')

// Функция запуска рендер-функции класса Section (для добавления начальных карточек на страницу)
api.getAppInfo()
.then(([ initialCards, userInfo ]) => {
  card.renderItems(initialCards.reverse(), userInfo);
  profileTitle.textContent = userInfo.name;
  profileSubtitle.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
})
.catch((err) => {
  console.log(err);
});

// Экземпляр класса PopupWithImage (для попапа с картинкой)
const popupPicture = new PopupWithImage('.popup-picture');

// // Экземпляры класса PopupWithForm (для попапов с формой)
const popupProfile = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const popupAddCard = new PopupWithForm('.popup-add', handleAddFormSubmit);
const popupAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit)

// Экземпляр класса PopupWithConfirmation (для попапа с подтверждением удаления)
const popupConfirmation = new PopupWithConfirmation('.popup-alert');

// Экземлпяр класса UserInfo (для хранения информации о пользователе)
const profileInfo = new UserInfo({
  usernameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle'
});

// Функция обработчик самбита popupProfile
function handleProfileFormSubmit({name, job}) {
  popupProfile.renderLoadingStart();
  api.editProfile(name, job)
  .then(() => {
    profileInfo.setUserInfo({
      newUsername: name,
      newDescription: job
    })
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupProfile.renderLoadingEnd();
  })
};

// Функция обработчик самбита popupAddCard
function handleAddFormSubmit({place, link}) {
  popupAddCard.renderLoadingStart();
  api.getUserInfo()
  .then(userInfo => {
    api.addCard(place, link)
    .then(result => {
      card.renderItems([result], userInfo)
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAddCard.renderLoadingEnd();
  })
};

// Функция обработчик самбита popupAvatar
function handleAvatarFormSubmit({avatar}) {
  let img = document.createElement('img');
  img.src = avatar;
  img.onload = function() {
    popupAvatar.renderLoadingStart();
    api.updateAvatar(avatar)
    .then(() => {
      profileAvatar.src = avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoadingEnd();
    })
  }
  img.onerror = function() {
    alert('Введена некорректная ссылка');
  }
};

// Добавление слушателей событий на все попапы
popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAvatar.setEventListeners();
popupConfirmation.setEventListeners();

// Слушатель события активации PopupProfile
profileButtonEdit.addEventListener('click', openProfilePopup);

// Слушатель события активации PopupAddCard
profileButtonAdd.addEventListener('click', openAddPopup);

// Слушатель события активации PopupAvatar
popupProfileAvatarButton.addEventListener('click', openAvatarPopup);

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

// Функция активациии PopupAvatar
function openAvatarPopup() {
  popupAvatar.open()
  formValidators['avatar-update'].resetValidation();
}
