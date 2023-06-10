class UserInfo {
  constructor({username, about, avatar, _id}) {
    this._username = username;
    this._about = about;
    this._avatar = avatar;
    this._userId = _id;
  }

// Метод возвращения объекта с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      about: this._about.textContent,
      userId: this._userId
    }
  }

// Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({username, about, avatar, _id}) {
    this._username.textContent = username;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}

export { UserInfo }
