import uuidv1 from 'uuid/v1';
import Shape from './shape';

const drawImage = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;

  for (let idx = 0; idx < propsLength; idx += 1) {
    const prop = props[idx];
    const {
      points, image, width, height, offsetX = 0, offsetY = 0,
    } = prop;
    const pointsCount = points.length;

    for (let pIdx = 0; pIdx < pointsCount; pIdx += 1) {
      const point = points[pIdx];
      const [x, y] = point;
      const fixedX = Math.trunc(x);
      const fixedY = Math.trunc(y);
      const imageWidth = width || image.width;
      const imageHeight = height || image.height;

      ctx.drawImage(
        image, fixedX + offsetX, fixedY + offsetY, imageWidth, imageHeight,
      );
    }
  }
};

const Image = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `image-${uuidv1()}`;
  }

  draw() {
    drawImage(this);
  }
};

export default Image;
