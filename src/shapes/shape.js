const Shape = class {
  constructor(props) {
    this.props = [...props];
  }

  getID() {
    return this.uuid;
  }

  // eslint-disable-next-line class-methods-use-this
  draw() { throw new Error('draw override'); }

  // eslint-disable-next-line class-methods-use-this
  setStyle() { throw new Error('style override'); }
};

export default Shape;
