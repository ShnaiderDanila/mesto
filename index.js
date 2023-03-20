// Profile
let profile = document.querySelector('.profile');
let profileButtonEdit = profile.querySelector('.profile__button-edit');
let profileButtonAdd = profile.querySelector('.profile__button-add');

function greyButtonEdit() {
  profileButtonEdit.classList.toggle('profile__button-edit_color_grey');
}

profileButtonEdit.addEventListener('mouseover', greyButtonEdit);
profileButtonEdit.addEventListener('mouseout', greyButtonEdit);

function greyButtonAdd() {
  profileButtonAdd.classList.toggle('profile__button-add_color_grey');
}

profileButtonAdd.addEventListener('mouseover', greyButtonAdd);
profileButtonAdd.addEventListener('mouseout', greyButtonAdd);

// Elements
let elements = document.querySelector('.elements');
let cardButtons = document.querySelectorAll('.elements__card-button');

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
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button-close');
let buttonSave = document.querySelector('.popup__button-save');

function popupDisabled() {
  popup.classList.remove('popup__enabled')
}

function popupEnabled() {
  popup.classList.add('popup__enabled')
}

buttonClose.addEventListener('click', popupDisabled);
profileButtonEdit.addEventListener('click', popupEnabled);

function greyButtonClose() {
  buttonClose.classList.toggle('popup__button-close_color_grey');
}

buttonClose.addEventListener('mouseover', greyButtonClose);
buttonClose.addEventListener('mouseout', greyButtonClose);

function greyButtonSave() {
  buttonSave.classList.toggle('popup__button-save_color_grey');
}

buttonSave.addEventListener('mouseover', greyButtonSave);
buttonSave.addEventListener('mouseout', greyButtonSave);

