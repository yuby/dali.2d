import typeChecker from '../utils/typeCheck';

class Image {
  constructor(props) {
    this.props = [];
    if (typeChecker(props) === '[object Object]') {
      this.propsLength = 1;
      this.setProperty(props);
    } else if (typeChecker(props) === '[object Array]') {
      const propsLen = props.length;

      this.propsLength = propsLen;
      for (let idx = 0; idx < propsLen; idx += 1) {
        this.setProperty(props[idx]);
      }
    }
  }

  setProperty(props) {
    const {
      x = 0,
      y = 0,
      image,
      offsetX = 0,
      offsetY = 0,
    } = props || this.props;

    this.props.push({
      x,
      y,
      image,
      offsetX,
      offsetY,
    });
  }

  draw() {
    const {
      context: ctx,
      props,
      propsLength,
    } = this;

    for (let idx = 0; idx < propsLength; idx += 1) {
      const prop = props[idx];
      const {
        x, y, image, offsetX, offsetY,
      } = prop;

      ctx.save();
      ctx.drawImage(image, x + offsetX, y + offsetY);
      ctx.restore();
    }
  }
}

export default Image;
