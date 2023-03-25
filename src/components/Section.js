export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems(items) {
        items.reverse().forEach((item) => {
            this.addItem(item)
        })
    }
    addItem(item) {
        this._container.prepend(this._renderer(item));
    }
}