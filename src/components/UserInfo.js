class UserInfo {
  constructor({name, about, avatar, _id}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._userId = _id;
  }

// Метод возвращения объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      userId: this._userId
    }
  }

// Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}

export { UserInfo }
