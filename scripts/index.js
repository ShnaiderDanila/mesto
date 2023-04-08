// Profile variables
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Gallery variables
const gallery = document.querySelector('.gallery');
const galleryList = gallery.querySelector('.gallery__list');

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

// Popup functions
function openPopup (popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
}

// PopupEdit functions
function enableEditPopup() {
  openPopup(popupEdit);
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  closePopup(popupEdit);
};

profileButtonEdit.addEventListener('click', enableEditPopup);
popupEditButtonClose.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit', handleEditFormSubmit);

// PopupPicture functions
popupPictureButtonClose.addEventListener('click', () => closePopup(popupPicture));

// Function add card
function createCard(name, link) {
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

// PopupAdd functions
function handleAddFormSubmit (evt) {
  evt.preventDefault();
  // Добавление новой карточки
  galleryList.prepend(createCard(popupAddPlaceNameInput.value, popupAddLinkInput.value));
  closePopup(popupAdd);
  popupAddForm.reset();
};

profileButtonAdd.addEventListener('click', () => openPopup(popupAdd));
popupAddButtonClose.addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit', handleAddFormSubmit);
