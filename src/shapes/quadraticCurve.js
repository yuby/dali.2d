class QuadraticCurve {
  constructor(props) {
    this.props = props;
    this.setProperty(props);
  }

  setProperty(props) {
    const {
      from,
      mid,
      to,
      color,
    } = props || this.props;

    this.from = from;
    this.mid = mid;
    this.to = to;
    this.style = {
      color,
    };
  }

  draw() {
    this._beginPath();
    this._loadPath();
    this._setDefaultStyle();
    this._endPath();
  }

  _beginPath() {
    this.context.beginPath();
  }

  _loadPath() {
    const {
      x: fromX,
      y: fromY,
    } = this.from;
    const {
      x: midX,
      y: midY,
    } = this.mid;
    const {
      x: toX,
      y: toY,
    } = this.to;
    const { context: ctx } = this;

    ctx.moveTo(fromX, fromY);
    ctx.quadraticCurveTo(midX, midY, toX, toY);
  }

  _endPath() {
    const { context: ctx } = this;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  _setDefaultStyle() {
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

export default QuadraticCurve;
