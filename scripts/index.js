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

// Функция создания карточки
function createCard (name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  // Функция удаления карточки
  card.querySelector('.card__delete-button').addEventListener('click', () => {
    card.remove();
  });
  // Функция лайка карточки
  card.querySelector('.card__button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__button_is-active');
  });
  // Функция открытия попапа с картинкой
  cardImage.addEventListener('click', () => {
    openPopup(popupPicture);
    popupBigImage.src = cardImage.src;
    popupBigImage.alt = cardImage.alt;
    popupFigcaption.textContent = cardTitle.textContent;
  });
  return card;
};

// Добавление начальных карточек из массива
initialCards.forEach(item => {
  galleryList.append(createCard(item.name, item.link));
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
  galleryList.prepend(createCard(popupAddPlaceNameInput.value, popupAddLinkInput.value));
  closePopup(popupAdd);
};

// Слушатели событий PopupAdd
profileButtonAdd.addEventListener('click', () => enableAddPopup(popupAdd, popupAddForm, validationConfig));
popupAddForm.addEventListener('submit', handleAddFormSubmit);




