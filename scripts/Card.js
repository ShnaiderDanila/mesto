import { openPopup } from "./index.js";

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

// Создание класса Card
class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }

  // Метод получения шаблона карты
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  // Метод генерации карты
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    return this._card;
  }

  // Метод лайка карточки
  _likeCard(evt) {
    evt.target.classList.toggle('card__button_is-active');
  }

  // Метод удаления карточки
  _deleteCard() {
    this._card.remove();
  }

  // Метод открытия попапа с картинкой
  _openPopupImage() {
    const popupPicture = document.querySelector('.popup-picture');
    const popupFigcaption = popupPicture.querySelector('.popup__figcaption');
    const popupBigImage = popupPicture.querySelector('.popup__big-image');
    openPopup(popupPicture);
    popupBigImage.src = this._card.querySelector('.card__image').src;
    popupBigImage.alt = this._card.querySelector('.card__image').alt;
    popupFigcaption.textContent = this._card.querySelector('.card__title').textContent;
  }

  // Метод добавления слушателей событий
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

export { initialCards, Card };
