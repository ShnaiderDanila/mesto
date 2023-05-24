import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    this._popupBigImage = this._popup.querySelector('.popup__big-image');
  }

  open() {
    super.open();
    this._popupBigImage.src = this._link;
    this._popupBigImage.alt = this._name;
    this._popupFigcaption.textContent = this._name;
  }
}
