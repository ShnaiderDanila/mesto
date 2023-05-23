// Создание и экспорт класса UserInfo
export class UserInfo {
  constructor({usernameSelector, descriptionSelector}) {
    this._username = document.querySelector(usernameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

// Метод возращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent
    }
  }

// Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({newUsername, newDescription}) {
    this._username.textContent = newUsername;
    this._description.textContent = newDescription;
  }
}
