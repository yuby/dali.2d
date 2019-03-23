import uuidv1 from 'uuid/v1';
import Shape from './shape';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

const drawArrow = (ctx, fromPosition, toPosition, size) => {
  const fromx = fromPosition[0];
  const fromy = fromPosition[1];
  const tox = toPosition[0];
  const toy = toPosition[1];
  const r = size === 1 ? 4 : size * 2;
  let angle = Math.atan2(toy - fromy, tox - fromx);
  let x;
  let y;

  ctx.moveTo(tox, toy);

  angle += ((4 / 10) * (2 * Math.PI));
  x = (r * 1.2 * Math.cos(angle)) + tox;
  y = (r * 1.2 * Math.sin(angle)) + toy;
  ctx.lineTo(x, y);

  angle += ((2 / 10) * (2 * Math.PI));
  x = (r * 1.2 * Math.cos(angle)) + tox;
  y = (r * 1.2 * Math.sin(angle)) + toy;
  ctx.lineTo(x, y);

  ctx.closePath();
};

const drawPath = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;

  let prevStyle = '';

  if (propsLength === 0) return;

  ctx.beginPath();

  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      color,
      arrow,
      lineType,
      opacity,
      lineWidth = 1,
      isClose = false,
    } = prop;
    const pointsCount = points.length;
    const currentStyle = `${color || '-'}${lineWidth || '-'}${lineType || '-'}`;
    const isSameStyle = prevStyle === currentStyle;
    const isLastProps = propsIdx === propsLength - 1;
    const style = {
      color,
      lineWidth,
      opacity,
    };

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

      if (pIdx === 0) {
        ctx.moveTo(Math.trunc(point[0]), Math.trunc(point[1]));
      }
      ctx.lineTo(Math.trunc(point[0]), Math.trunc(point[1]));
    }

    prevStyle = currentStyle;

    if (arrow) {
      const from = points[pointsCount - 2];
      const to = points[pointsCount - 1];

      drawArrow(ctx, from, to, lineWidth);
    }
    if (isSameStyle && isLastProps) {
      if (isClose) ctx.closePath();
      ctx.stroke();
    } else if (isLastProps) {
      if (isClose) ctx.closePath();
      ctx.stroke();
    } else;
  }
};

const Path = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `path-${uuidv1()}`;
  }

  draw() {
    drawPath(this);
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

export default Path;
