class Card {
  constructor(data, cardTemplate, handleCardImageClick, handleTrashClick, handleLikeSet, handleLikeDelete, userId) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id
    this._likes = data.likes;
    this._handleCardImageClick = handleCardImageClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeSet = handleLikeSet;
    this._handleLikeDelete = handleLikeDelete;
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
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._likeButton = this._card.querySelector('.card__like-button');
    this._likeCounter = this._card.querySelector('.card__like-count');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    // Отрисовка иконки удаления на Hand Made карточках
    this.setIconDelete();
    // Отрисовка количества лайков на карточках
    this.changeLikeCounter(this._data);
    // Отрисовка уже поставленного лайка
    this._addExistingLike();
    // Добавление слушателей событий
    this._setEventListeners();
    return this._card;
  }

  // Метод добавление иконки удаления ТОЛЬКО на Hand Made карточки
  setIconDelete() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add('card__delete-button_visible');
    }
  }

  // Метод добавления лайка
  addLike() {
    this._likeButton.classList.add('card__like-button_is-active');
  }

  // Метод удаления лайка
  deleteLike() {
    this._likeButton.classList.remove('card__like-button_is-active');
  }

  // Метод проверки уже существующего лайка на сервере
  isLiked() {
    return this._likes.some(item => {
       return item._id === this._userId;
    })
  }

  // Метод добавления уже существующих лайков
  _addExistingLike() {
    if (this.isLiked()) {
      this.addLike()
    }
  }

  // Метод изменения и отображения счетчика лайков
  changeLikeCounter(item) {
    this._likeCounter.textContent = item.likes.length;
  }

  // Метод удаления карточки
  deleteCard() {
    this._card.remove();
  }

  // Метод добавления слушателей событий
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick(this._name, this._link);
    });

    this._card.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleTrashClick();
    });

  // Добавление слушателя на кнопку лайка (если лайк активен, обработчик handleLikeDelete, в ином случае handleLikeSet)
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-button_is-active')) {
        this._handleLikeDelete();
      } else {
        this._handleLikeSet();
      }
    });
  }
}

export { Card };
