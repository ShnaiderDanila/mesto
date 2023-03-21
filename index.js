// Profile
let profile = document.querySelector('.profile');
let profileButtonEdit = profile.querySelector('.profile__button-edit');
// Elements
let elements = document.querySelector('.elements');
let cardButtons = document.querySelectorAll('.elements__card-button');
// Popup
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button-close');
let buttonSave = document.querySelector('.popup__button-save');

// Elements
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

// Popup
function popupEnabled() {
  popup.classList.add('popup__enabled')
}
function popupDisabled() {
  popup.classList.remove('popup__enabled')
}

profileButtonEdit.addEventListener('click', popupEnabled);
buttonClose.addEventListener('click', popupDisabled);



