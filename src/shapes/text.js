import typeChecker from '../utils/typeCheck';

class Text {
  constructor(props) {
    this.props = [];
    if (typeChecker(props) === '[object Object]') {
      this.propsLength = 1;
      this.setProperty(props);
    } else if (typeChecker(props) === '[object Array]') {
      const propsLen = props.length;

      this.propsLength = propsLen;
      for (let idx = 0; idx < propsLen; idx += 1) {
        this.setProperty(props[idx]);
      }
    }
  }

  setProperty(props) {
    const {
      x,
      y,
      text,
      maxWidth,
      color,
      bgColor,
      font,
      textAlign,
      textBaseline,
      lineWidth,
      lineHeight,
      wordBreak = false,
      rad,
      angle,
      opacity,
    } = props || this.props;

    this.props.push({
      x,
      y,
      text,
      maxWidth,
      wordBreak,
      rad,
      angle,
      style: {
        color,
        bgColor,
        font,
        textAlign,
        textBaseline,
        lineWidth,
        lineHeight,
        opacity,
      },
    });
  }

  _drawText() {
    const {
      context: ctx, props, propsLength,
    } = this;
    let idx = 0;

    for (; idx < propsLength; idx += 1) {
      const prop = props[idx];
      const {
        x, y, style, text, wordBreak, rad,
      } = prop;

      ctx.save();
      ctx.beginPath();

      this._setStyle(style);
      ctx.rotate(rad || 0);

      if (wordBreak) {
        const { lineHeight } = style;
        const _text = text.split(' ');
        let yPosition = +y;
        let i = 0;

        for (; i < _text.length; i += 1) {
          ctx.strokeText(_text[i], x, yPosition);
          ctx.fillText(_text[i], x, yPosition);
          yPosition += +lineHeight;
        }
      } else {
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      }

      ctx.restore();
    }
  }

  draw() {
    this._drawText();
  }

  _setStyle(style) {
    const { context: ctx } = this;

    ctx.textBaseline = style.textBaseline ? style.textBaseline : 'alphabetic';
    ctx.textAlign = style.textAlign ? style.textAlign : 'alphabetic';
    ctx.font = `${style.font}`;
    ctx.fillStyle = style.bgColor ? style.bgColor : 'rgba(255,255,255,0)';
    ctx.strokeStyle = style.color ? style.color : 'rgba(255,255,255,0)';
    ctx.lineWidth = style.lineWidth ? style.lineWidth : '1';
    ctx.globalCompositeOperation = style.globalCompositeOperation ? style.globalCompositeOperation : 'source-over';
    ctx.globalAlpha = style.opacity ? style.opacity : 1;
  }
}

export default Text;
