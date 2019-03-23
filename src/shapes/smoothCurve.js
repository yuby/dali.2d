import uuidv1 from 'uuid/v1';
import Shape from './shape';
import Spline from '../utils/spline';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

const drawSmoothCurve = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;

  if (propsLength === 0) return;

  ctx.beginPath();

  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      color,
      lineType,
      opacity,
      resolution = 1,
      lineWidth = 1,
    } = prop;
    const style = {
      color,
      lineWidth,
      opacity,
    };

    ctx.beginPath();
    self.setStyle(style);
    if (LINE_TYPE[lineType]) {
      ctx.setLineDash(LINE_TYPE[lineType].map(value => value * lineWidth));
    } else {
      ctx.setLineDash(LINE_TYPE.solid);
    }

    const start = points[0];
    const end = points[points.length - 1];
    const xs = points.map(p => Math.trunc(p[0]));
    const ys = points.map(p => Math.trunc(p[1]));

    ctx.moveTo(Math.trunc(start[0]), Math.trunc(start[1]));

    for (let idx = start[0]; idx <= end[0]; idx += resolution) {
      ctx.lineTo(idx, Spline(idx, xs, ys));
    }
    ctx.lineTo(end[0], Spline(end[0], xs, ys));
    ctx.stroke();
  }
};

const SmoothCurve = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `smmothCurve-${uuidv1()}`;
  }

  draw() {
    drawSmoothCurve(this);
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

export default SmoothCurve;
