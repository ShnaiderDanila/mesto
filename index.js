// Profile
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__button-edit');
let profileAddButton = profile.querySelector('.profile__button-add');

function greyEditButton() {
  profileEditButton.classList.toggle('profile__button-edit_color_grey');
}

profileEditButton.addEventListener('mouseover', greyEditButton);
profileEditButton.addEventListener('mouseout', greyEditButton);

function greyAddButton() {
  profileAddButton.classList.toggle('profile__button-add_color_grey');
}

profileAddButton.addEventListener('mouseover', greyAddButton);
profileAddButton.addEventListener('mouseout', greyAddButton);


