class Rect {
  constructor(props) {
    this.props = props;
    this.setProperty(props);
  }

  setProperty(props) {
    const {
      x = 0,
      y = 0,
      width = 100,
      height = 100,
      bgColor,
      color,
      lineWidth,
    } = props || this.props;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = {
      color,
      bgColor,
      lineWidth,
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
    const { context: ctx } = this;

    ctx.moveTo(this.x, this.y);
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
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

export default Rect;
