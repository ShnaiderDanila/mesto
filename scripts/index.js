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
const popupEdit = document.querySelector('.popup-edit');
const popupEditButtonClose = popupEdit.querySelector('.popup-edit__button-close');
const popupEditForm = popupEdit.querySelector('.popup__edit-form');
const popupEditNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupEditJobInput = popupEdit.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup-add');
const popupAddButtonClose = popupAdd.querySelector('.popup-add__button-close');
const popupAddForm = popupAdd.querySelector('.popup__add-form');
const popupAddPlaceNameInput = popupAdd.querySelector('.popup__input_type_place-name');
const popupAddLinkInput = popupAdd.querySelector('.popup__input_type_link');

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
function likeStartCards() {
  const startCardButtons = elements.querySelectorAll('.card__button');
  startCardButtons.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('card__button_is-active');
    });
  });
};

function deleteCard() {
  const deleteButtons = elements.querySelectorAll('.card__delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const elementsCard = button.closest('.card');
      elementsCard.remove();
    });
  });
};

function addStartCards () {
  initialCards.forEach(element => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = element.link;
    card.querySelector('.card__image').alt = element.name;
    card.querySelector('.card__title').textContent = element.name;
    elementsCards.append(card);
  });
  likeStartCards();
  deleteCard();
};
addStartCards();

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

profileButtonEdit.addEventListener('click', popupEditEnabled);
popupEditButtonClose.addEventListener('click', popupEditDisabled);
popupEditForm.addEventListener('submit', handleEditFormSubmit);

// Popup Add Functions
function popupAddEnabled() {
  popupAdd.classList.add('popup_is-opened');
};

function popupAddDisabled() {
  popupAdd.classList.remove('popup_is-opened');
};

function likeNewCard() {
  const newCardButton = elements.querySelector('.card__button');
  newCardButton.addEventListener('click', () => {
    newCardButton.classList.toggle('card__button_is-active');
  });
};

function addNewCard() {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = popupAddLinkInput.value;
  card.querySelector('.card__image').alt = popupAddPlaceNameInput.value;
  card.querySelector('.card__title').textContent = popupAddPlaceNameInput.value;
  elementsCards.prepend(card);
  likeNewCard();
  deleteCard();
};

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  addNewCard();
  popupAddDisabled();
};

profileButtonAdd.addEventListener('click', popupAddEnabled);
popupAddButtonClose.addEventListener('click', popupAddDisabled);
popupAddForm.addEventListener('submit', handleAddFormSubmit);



