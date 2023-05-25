import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    this._popupBigImage = this._popup.querySelector('.popup__big-image');
  }

  // Расширенный метод открытия попапа с картинкой
  open(name, link) {
    super.open();
    this._popupBigImage.src = link;
    this._popupBigImage.alt = name;
    this._popupFigcaption.textContent = name;
  }
}

export { PopupWithImage }
