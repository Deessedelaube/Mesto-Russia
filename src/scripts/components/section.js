class Section{
  constructor({data, renderer}, containerSelector){
    this._container = containerSelector;
    this._initialArray = data;
    this._renderer = renderer;
  }
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
  addNewItem(element) {
    this._container.prepend(element);
  }
}
export default Section;
