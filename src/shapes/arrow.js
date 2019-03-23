import uuidv1 from 'uuid/v1';
import Shape from './shape';

const drawArrow = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;
  let prevStyle = '';

  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      color,
      angle = 0,
      lineWidth,
      bgColor,
    } = prop;
    const r = lineWidth ? lineWidth + 2 : 3;
    const pointLen = points.length;
    const style = {
      bgColor,
      color,
      lineWidth,
    };
    const currentStyle = Object.values(style).toString();
    const isSameStyle = prevStyle === currentStyle;
    const isLastProps = propsIdx === propsLength - 1;

    if (!isSameStyle) {
      if (propsIdx !== 0) {
        ctx.stroke();
        ctx.fill();
      }

      ctx.beginPath();
      self.setStyle(style);
    }

    for (let pidx = 0; pidx < pointLen; pidx += 1) {
      let degree = (angle - 90) * (Math.PI / 180);
      const point = points[pidx];
      const x = point[0];
      const y = point[1];


      ctx.moveTo(x, y);

      degree += ((4 / 10) * (2 * Math.PI));
      const x1 = (r * 1.2 * Math.cos(degree)) + x;
      const y1 = (r * 1.2 * Math.sin(degree)) + y;

      ctx.lineTo(x1, y1);

      degree += ((2 / 10) * (2 * Math.PI));
      const x2 = (r * 1.2 * Math.cos(degree)) + x;
      const y2 = (r * 1.2 * Math.sin(degree)) + y;

      ctx.lineTo(x2, y2);

      ctx.closePath();
    }
    prevStyle = currentStyle;

    if (isSameStyle && isLastProps) {
      ctx.stroke();
      ctx.fill();
    } else if (isLastProps) {
      ctx.stroke();
      ctx.fill();
    } else;
  }
};

const Arrow = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `arrow-${uuidv1()}`;
  }

  draw() {
    drawArrow(this);
  }

  setStyle(style) {
    const { context: ctx } = this;
    const {
      bgColor = 'rgba(255,255,255,0)',
      color = 'rgba(255,255,255,0)',
      lineWidth = 1,
      globalCompositeOperation = 'source-over',
      opacity = 1,
    } = style;

    ctx.fillStyle = bgColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = globalCompositeOperation;
    ctx.globalAlpha = opacity;
  }
};

export default Arrow;
