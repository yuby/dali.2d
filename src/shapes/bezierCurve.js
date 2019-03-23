import uuidv1 from 'uuid/v1';
import Shape from './shape';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

const drawBezierCurve = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;
  let prevStyle = '';

  ctx.beginPath();

  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      color,
      lineType,
      opacity,
      lineWidth = 1,
      isClose = false,
    } = prop;
    const style = {
      color,
      lineWidth,
      opacity,
    };
    const currentStyle = Object.values(style).toString();
    const isSameStyle = prevStyle === currentStyle;
    const isLastProps = propsIdx === propsLength - 1;
    const pointsCount = points.length;

    if (!isSameStyle) {
      if (propsIdx !== 0) {
        ctx.stroke();
      }

      ctx.beginPath();
      self.setStyle(style);

      if (LINE_TYPE[lineType]) {
        ctx.setLineDash(LINE_TYPE[lineType].map(value => value * lineWidth));
      } else {
        ctx.setLineDash(LINE_TYPE.solid);
      }
    }

    for (let pIdx = 0; pIdx < pointsCount; pIdx += 1) {
      const point = points[pIdx];
      const [fromX, fromY, midX1, midY1, midX2, midY2, toX, toY ] = point;

      if (pIdx === 0) {
        ctx.moveTo(Math.trunc(fromX), Math.trunc(fromY));
      }
      ctx.bezierCurveTo(
        Math.trunc(midX1), Math.trunc(midY1),
        Math.trunc(midX2), Math.trunc(midY2),
        Math.trunc(toX), Math.trunc(toY),
      );
    }
    prevStyle = currentStyle;

    if (isSameStyle && isLastProps) {
      if (isClose) ctx.closePath();
      ctx.stroke();
    } else if (isLastProps) {
      if (isClose) ctx.closePath();
      ctx.stroke();
    } else;
  }
};

const BezierCurve = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `bezierCurve-${uuidv1()}`;
  }

  draw() {
    drawBezierCurve(this);
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

export default BezierCurve;
