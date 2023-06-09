class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод активация рендер-функции на каждом элементе массива
  renderItems(items, userInfo) {
    items.forEach(item => {
      this._renderer(item, userInfo);
    });
  }

  // Метод добавления элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
