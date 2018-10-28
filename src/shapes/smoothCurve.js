import Spline from '../utils/spline';

class SmoothCurve {
  constructor(props) {
    this.props = props;
    this.setProperty(props);
  }

  setProperty(props) {
    const {
      route,
      color,
      lineWidth,
      resolution,
    } = props || this.props;

    this.route = route;
    this.resolution = resolution;
    this.style = {
      color,
      lineWidth,
    };
  }

  draw() {
    this._beginPath();
    this._loadPath();
    this._setStyle();
    this._endPath();
  }

  _beginPath() {
    this.context.beginPath();
  }

  _loadPath() {
    const { context: ctx } = this;

    ctx.moveTo(Math.trunc(this.route[0][0]), Math.trunc(this.route[0][1]));
    const pointLen = this.route.length;
    const xs = this.route.map(p => Math.trunc(p[0]));
    const ys = this.route.map(p => Math.trunc(p[1]));

    for (let idx = this.route[0][0]; idx <= this.route[pointLen - 1][0]; idx += this.resolution) {
      ctx.lineTo(idx, Spline(idx, xs, ys));
    }
  }

  _endPath() {
    const { context: ctx } = this;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  _setStyle() {
    const { style, context: ctx, className } = this;

    if (className === 'Text') {
      ctx.textBaseline = style.textBaseline ? style.textBaseline : 'alphabetic';
      ctx.textAlign = style.textAlign ? style.textAlign : 'alphabetic';
      ctx.font = `${style.fontSize} ${style.fontFamily}`;
    }

    ctx.fillStyle = style.bgColor ? style.bgColor : 'rgba(255,255,255,0)';
    ctx.strokeStyle = style.color ? style.color : 'rgba(255,255,255,0)';
    ctx.lineWidth = style.lineWidth ? style.lineWidth : '1';
    ctx.globalCompositeOperation = style.globalCompositeOperation ? style.globalCompositeOperation : 'source-over';
  }
}

export default SmoothCurve;
