class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод активация рендер-функции на каждом элементе массива
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод добавления элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };