class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._id = id;
  }

// Метод возвращения объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

// Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

// Метод изменения аватара пользователя
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

export { UserInfo }
