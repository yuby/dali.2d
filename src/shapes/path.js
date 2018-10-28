import typeChecker from '../utils/typeCheck';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

class Path {
  constructor(props) {
    this.props = [];
    if (typeChecker(props) === '[object Object]') {
      this.propsLength = 1;
      this._setProperty(props);
    } else if (typeChecker(props) === '[object Array]') {
      const propsLen = props.length;

      this.propsLength = propsLen;
      for (let idx = 0; idx < propsLen; idx += 1) {
        this._setProperty(props[idx]);
      }
    }
  }

  _setProperty(props) {
    const {
      points,
      color,
      lineWidth,
      arrow,
      lineType,
      isClose = false,
      opacity,
    } = props;

    this.props.push({
      arrow,
      arrowArr: [],
      points,
      isClose,
      lineType,
      style: {
        color,
        lineWidth,
        opacity,
      },
    });
  }

  drawArrow(fromPosition, toPosition, style) {
    const { context: ctx } = this;
    const fromx = fromPosition[0];
    const fromy = fromPosition[1];
    const tox = toPosition[0];
    const toy = toPosition[1];
    const r = style.lineWidth ? style.lineWidth + 2 : 3;
    const centerX = tox;
    const centerY = toy;
    let angle = Math.atan2(toy - fromy, tox - fromx);
    let x;
    let y;

    ctx.beginPath();
    x = (r * 1.2 * Math.cos(angle)) + centerX;
    y = (r * 1.2 * Math.sin(angle)) + centerY;
    ctx.moveTo(x, y);

    angle += ((4 / 10) * (2 * Math.PI));
    x = (r * 1.2 * Math.cos(angle)) + centerX;
    y = (r * 1.2 * Math.sin(angle)) + centerY;
    ctx.lineTo(x, y);

    angle += ((2 / 10) * (2 * Math.PI));
    x = (r * 1.2 * Math.cos(angle)) + centerX;
    y = (r * 1.2 * Math.sin(angle)) + centerY;
    ctx.lineTo(x, y);

    ctx.closePath();
    ctx.fillStyle = style.color ? style.color : 'rgba(255,255,255,0)';
    ctx.fill();
  }

  draw() {
    this._drawPath();
  }

  _drawPath() {
    const { context: ctx } = this;
    const { props, propsLength } = this;
    let isSameStyle = true;
    let prevStyle = '';
    let propsIdx = 0;


    if (propsLength === 0) return;

    for (; propsIdx < propsLength; propsIdx += 1) {
      const prop = props[propsIdx];
      const {
        style, points, isClose, lineType, arrow,
      } = prop;
      const {
        lineWidth, color, bgColor,
      } = style;
      const pointsCount = points.length;
      const currentStyle = `${color || ''}${bgColor || ''}${lineWidth || ''}${lineType || ''}`;

      if (propsIdx > 0) {
        isSameStyle = currentStyle === prevStyle;
      }
      if (propsIdx === 0) {
        ctx.save();
        ctx.beginPath();
        this._setStyle(style);
      } else if (!isSameStyle) {
        ctx.stroke();
        ctx.beginPath();

        this._setStyle(style);
      } else if (isSameStyle) {
        ctx.beginPath();
      }

      if (LINE_TYPE[lineType]) {
        ctx.setLineDash(LINE_TYPE[lineType].map(value => value * lineWidth));
      } else {
        ctx.setLineDash(LINE_TYPE.solid);
      }

      let pIdx = 0;

      for (; pIdx < pointsCount; pIdx += 1) {
        const point = points[pIdx];

        if (pIdx === 0) {
          ctx.moveTo(Math.trunc(point[0]), Math.trunc(points[1]));
        }
        ctx.lineTo(Math.trunc(point[0]), Math.trunc(point[1]));
      }
      if (isClose) {
        ctx.closePath();
      }
      ctx.stroke();

      if (!isSameStyle) {
        prevStyle = currentStyle;
      }

      if (arrow) {
        const from = points[pointsCount - 2];
        const to = points[pointsCount - 1];

        this.drawArrow(from, to, style);
      }
    }
  }

  _setStyle(style) {
    const { context: ctx } = this;

    ctx.fillStyle = style.bgColor ? style.bgColor : 'rgba(255,255,255,0)';
    ctx.strokeStyle = style.color ? style.color : 'rgba(255,255,255,0)';
    ctx.lineWidth = style.lineWidth ? style.lineWidth : '1';
    ctx.globalCompositeOperation = style.globalCompositeOperation ? style.globalCompositeOperation : 'source-over';
    ctx.globalAlpha = style.opacity ? style.opacity : 1;
  }
}

export default Path;
