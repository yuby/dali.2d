import uuidv1 from 'uuid/v1';
import Shape from './shape';

const drawArc = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;
  let prevStyle = '';

  ctx.beginPath();
  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      radius = 10,
      bgColor,
      color,
      lineWidth,
      startAngle = 0,
      endAngle = 2 * Math.PI,
      opacity,
    } = prop;
    const style = {
      color,
      bgColor,
      lineWidth,
      opacity,
    };

    const currentStyle = Object.values(style).toString();
    const isSameStyle = prevStyle === currentStyle;
    const isLastProps = propsIdx === propsLength - 1;

    const pointLen = points.length;

    if (!isSameStyle) {
      if (propsIdx !== 0) {
        ctx.stroke();
        ctx.fill();
      }

      ctx.beginPath();
      self.setStyle(style);
    }

    for (let pidx = 0; pidx < pointLen; pidx += 1) {
      const point = points[pidx];

      ctx.moveTo(Math.trunc(point[0] + radius), Math.trunc(point[1]));
      ctx.arc(Math.trunc(point[0]), Math.trunc(point[1]), radius, startAngle, endAngle);
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

const Arc = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `arc-${uuidv1()}`;
  }

  draw() {
    drawArc(this);
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

export default Arc;
