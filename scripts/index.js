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
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditNameInput = popupEdit.querySelector('.popup__input[name="name"]');
const popupEditJobInput = popupEdit.querySelector('.popup__input[name="job"]');
// PopupAdd
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddPlaceNameInput = popupAdd.querySelector('.popup__input[name="place-name"]');
const popupAddLinkInput = popupAdd.querySelector('.popup__input[name="link"]');

// PopupPicture
const popupPicture = document.querySelector('.popup-picture');
const popupFigcaption = popupPicture.querySelector('.popup__figcaption');
const popupBigImage = popupPicture.querySelector('.popup__big-image');

// CardTemplate
const cardTemplate = document.querySelector('#card-template').content;

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscKey);
};

// Функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscKey);
};

// Функция закрытия попапа кликом на оверлей
function closePopupOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  };
}

// Функция закрытия попапа нажатием клавиши Esc
function closePopupEscKey (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  };
}

// Функция добавления слушателей событий закрытия попапов
function addEventsClosePopup () {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    // Функция закрытия попапа кликом на крестик
    const popupButtonClose = popup.querySelector('.popup__button-close')
    popupButtonClose.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', closePopupOverlay);
});
}

addEventsClosePopup();

// Создание класса Card
class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    return this._card;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__button_is-active');
  }

  _deleteCard() {
    this._card.remove();
  }

  _openPopupImage() {
    openPopup(popupPicture);
    popupBigImage.src = this._card.querySelector('.card__image').src;
    popupBigImage.alt = this._card.querySelector('.card__image').alt;
    popupFigcaption.textContent = this._card.querySelector('.card__title').textContent;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._openPopupImage();
    });

    this._card.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._card.querySelector('.card__button').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }
}

// Добавление начальных карт с данными из массива initialCards;
initialCards.forEach(item => {
  const cardItem = new Card(item, '#card-template');
  const card = cardItem.generateCard();
  galleryList.append(card);
});


// Функция проверки состояния кнопки, в зависимости от валидности формы
function checkSaveButtonState (popupForm, config) {
  const saveButton = popupForm.querySelector(config.submitButtonSelector);
  const formInputs = popupForm.querySelectorAll(config.inputSelector);
  const formInputsArray = Array.from(formInputs);
  toggleButtonValidity(formInputsArray, saveButton, config)
}

// Функции PopupEdit
// Функция активациии PopupEdit
function enableEditPopup (popup, popupForm, config) {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
  openPopup(popup);
  checkSaveButtonState(popupForm, config);
};

// Обработка PopupEdit
function handleEditFormSubmit () {
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  closePopup(popupEdit);
};

// Слушатели событий PopupEdit
profileButtonEdit.addEventListener('click', () => enableEditPopup(popupEdit, popupEditForm, validationConfig));
popupEditForm.addEventListener('submit', handleEditFormSubmit);

// Функции PopupAdd
// Функция активациии PopupAdd
function enableAddPopup (popup, popupForm, config) {
  openPopup(popup);
  checkSaveButtonState(popupForm, config);
}

function handleAddFormSubmit () {
  // Добавление новой карточки
  const popupAddObj = {
    name:  popupAddPlaceNameInput.value,
    link:  popupAddLinkInput.value,
  };
  const cardItem = new Card(popupAddObj, '#card-template');
  const card = cardItem.generateCard();
  galleryList.prepend(card);
  closePopup(popupAdd);
};

// Слушатели событий PopupAdd
profileButtonAdd.addEventListener('click', () => enableAddPopup(popupAdd, popupAddForm, validationConfig));
popupAddForm.addEventListener('submit', handleAddFormSubmit);




