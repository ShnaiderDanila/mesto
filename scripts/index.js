// Profile variables
const profile = document.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
// Elements variables
const elements = document.querySelector('.elements');
const cardButtons = elements.querySelectorAll('.elements__card-button');
// Popup variables
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const buttonSave = popup.querySelector('.popup__button-save');
const popupForm = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');

// Elements functions
cardButtons.forEach(function(cardButton) {
  cardButton.addEventListener('mouseover', function() {
    cardButton.classList.toggle('elements__card-button_type_hover');
  });
  cardButton.addEventListener('mouseout', function() {
    cardButton.classList.toggle('elements__card-button_type_hover');
  });
  cardButton.addEventListener('click', function() {
    cardButton.classList.toggle('elements__card-button_type_active');
  });
});

// Popup functions
function popupEnabled() {
  popup.classList.add('popup_type_opened')
}

function popupDisabled() {
  popup.classList.remove('popup_type_opened')
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;
  popupDisabled();
}

profileButtonEdit.addEventListener('click', popupEnabled);
buttonClose.addEventListener('click', popupDisabled);
popupForm.addEventListener('submit', handleFormSubmit);


