class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

// Метод обработки ответа от сервера
_renderServerResponce(res) {
  if (res.ok) {
    return res.json();
  } else {
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

// Метод загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

// Метод получения общей информации (метода 1 и метода 2)
getAppInfo() {
  return Promise.all([this.getInitialCards(), this.getUserInfo()]);
}

// Метод редактирования профиля на сервере
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

// Метод добавления новой карточки на сервер
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

  // Метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

  // Метод постановки лайка на сервере
  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

  // Метод снятия лайка на сервере
    removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

  // Метод обновление аватара пользователя на сервере
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      return this._renderServerResponce(res)
    })
  }
}

export { Api };


