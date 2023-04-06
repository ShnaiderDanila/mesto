// Profile variables
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Elements variables
const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');

// Popup variables
// Popup Edit
const popupEdit = document.querySelector('.popup-edit');
const popupEditButtonClose = popupEdit.querySelector('.popup__button-close');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditNameInput = popupEdit.querySelector('.popup__input[name="name"]');
const popupEditJobInput = popupEdit.querySelector('.popup__input[name="job"]');
// Popup Add
const popupAdd = document.querySelector('.popup-add');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddPlaceNameInput = popupAdd.querySelector('.popup__input[name="place-name"]');
const popupAddLinkInput = popupAdd.querySelector('.popup__input[name="link"]');
// Popup Picture
const popupPicture = document.querySelector('.popup-picture');
const popupPictureButtonClose = popupPicture.querySelector('.popup__button-close');
const popupFigcaption = popupPicture.querySelector('.popup__figcaption');
const popupBigImage = popupPicture.querySelector('.popup__big-image');

// Card Template
const cardTemplate = document.querySelector('#card-template').content;

// Elements Cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Elements functions
function addStartCards (array) {
  array.forEach(element => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = element.link;
    card.querySelector('.card__image').alt = element.name;
    card.querySelector('.card__title').textContent = element.name;
    // Функция удаления карточки
    card.querySelector('.card__delete-button').addEventListener('click', () => {
      card.closest('.card').remove();
    });
    // Функция лайка карточки
    card.querySelector('.card__button').addEventListener('click', evt => {
      evt.target.classList.toggle('card__button_is-active');
    });
    // Функция открытия попапа с картинкой
    card.querySelector('.card__image').addEventListener('click', () => {
      popupPicture.classList.add('popup_is-opened');
      popupBigImage.src = card.querySelector('.card__image').src;
      popupFigcaption.textContent = card.querySelector('.card__title').textContent;
    });
    // Функция закрытия попапа с картинкой
    popupPictureButtonClose.addEventListener('click', () => {
      popupPicture.classList.remove('popup_is-opened');
    });
    // Функция добавления карточки на страницу
    elementsCards.append(card);
  })
};
addStartCards(initialCards);

// Popup Edit Functions
function popupEditEnabled() {
  popupEdit.classList.add('popup_is-opened');
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
};

function popupEditDisabled() {
  popupEdit.classList.remove('popup_is-opened');
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  popupEditDisabled();
};

profileButtonEdit.addEventListener('click', (popupEditEnabled));
popupEditButtonClose.addEventListener('click', popupEditDisabled);
popupEditForm.addEventListener('submit', handleEditFormSubmit);

// Popup Add Functions
function popupAddEnabled() {
  popupAdd.classList.add('popup_is-opened');
};

function popupAddDisabled() {
  popupAdd.classList.remove('popup_is-opened');
  popupAddPlaceNameInput.value = '';
  popupAddLinkInput.value = '';
};

function addNewCard() {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = popupAddLinkInput.value;
  card.querySelector('.card__image').alt = popupAddPlaceNameInput.value;
  card.querySelector('.card__title').textContent = popupAddPlaceNameInput.value;
  // Функция удаления карточки
  card.querySelector('.card__delete-button').addEventListener('click', () => {
    card.closest('.card').remove();
  });
  // Функция лайка карточки
  card.querySelector('.card__button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__button_is-active');
  });
  // Функция открытия попапа с картинкой
  card.querySelector('.card__image').addEventListener('click', () => {
    popupPicture.classList.add('popup_is-opened');
    popupBigImage.src = card.querySelector('.card__image').src;
    popupFigcaption.textContent = card.querySelector('.card__title').textContent;
  });
  // Функция закрытия попапа с картинкой
  popupPictureButtonClose.addEventListener('click', () => {
    popupPicture.classList.remove('popup_is-opened');
  });
  // Функция добавления карточки на страницу
  elementsCards.prepend(card)
};

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  addNewCard();
  popupAddDisabled();
};

profileButtonAdd.addEventListener('click', popupAddEnabled);
popupAddButtonClose.addEventListener('click', popupAddDisabled);
popupAddForm.addEventListener('submit', handleAddFormSubmit);






















