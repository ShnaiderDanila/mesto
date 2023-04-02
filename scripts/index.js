// Profile variables
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
// Elements variables
const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');
// Popup variables
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');

// Elements Cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: ''
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
function addStartCards() {
  const cardTemplate = document.querySelector('#card-template').content;
  initialCards.forEach(element => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = element.link;
    card.querySelector('.card__image').alt = element.alt;
    card.querySelector('.card__title').textContent = element.name;
    elementsCards.append(card);
  });
}
addStartCards();

function likeTheCard() {
  const cardButtons = elementsCards.querySelectorAll('.card__button');
  cardButtons.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('card__button_is-active');
    });
  });
}
likeTheCard();

// Popup functions
function popupEnabled() {
  popup.classList.add('popup_is-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function popupDisabled() {
  popup.classList.remove('popup_is-opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupDisabled();
}

profileButtonEdit.addEventListener('click', popupEnabled);
buttonClose.addEventListener('click', popupDisabled);
popupForm.addEventListener('submit', handleFormSubmit);


