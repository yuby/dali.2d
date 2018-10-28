class BezierCurve {
  constructor(props) {
    this.props = props;
    this.setProperty(props);
  }

  setProperty(props) {
    const {
      from,
      mid1,
      mid2,
      to,
      color,
      bgColor,
    } = props || this.props;

    this.from = from;
    this.mid1 = mid1;
    this.mid2 = mid2;
    this.to = to;
    this.style = {
      color,
    };
  }

  draw() {
    this._drawBezierCurve();
  }

  _drawBezierCurve() {
    const { context: ctx } = this;
    const {
      x: fromX,
      y: fromY,
    } = this.from;
    const {
      x: mid1X,
      y: mid1Y,
    } = this.mid1;
    const {
      x: mid2X,
      y: mid2Y,
    } = this.mid2;
    const {
      x: toX,
      y: toY,
    } = this.to;

    ctx.save();
    ctx.beginPath();
    this._setStyle();
    ctx.moveTo(Math.trunc(fromX), Math.trunc(fromY));
    ctx.bezierCurveTo(Math.trunc(mid1X), Math.trunc(mid1Y), Math.trunc(mid2X), Math.trunc(mid2Y), Math.trunc(toX), Math.trunc(toY));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
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

export default BezierCurve;
