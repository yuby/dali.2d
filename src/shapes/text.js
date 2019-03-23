import uuidv1 from 'uuid/v1';
import Shape from './shape';

const drawText = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;
  let idx = 0;

  for (; idx < propsLength; idx += 1) {
    const prop = props[idx];
    const {
      points,
      text,
      // maxWidth,
      color,
      bgColor,
      font,
      textAlign,
      textBaseline,
      lineWidth,
      lineHeight,
      wordBreak = false,
      rad,
      opacity,
    } = prop;
    const style = {
      color,
      bgColor,
      font,
      textAlign,
      textBaseline,
      lineWidth,
      lineHeight,
      opacity,
    };
    const pointsCount = points.length;

    ctx.save();
    ctx.beginPath();

    self.setStyle(style);
    ctx.rotate(rad || 0);

    for (let pIdx = 0; pIdx < pointsCount; pIdx += 1) {
      const point = points[pIdx];
      const [x, y] = point;

      if (wordBreak) {
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
};

const Text = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `text-${uuidv1()}`;
  }

  draw() {
    drawText(this);
  }

  setStyle(style) {
    const { context: ctx } = this;
    const {
      textBaseline = 'alphabetic',
      textAlign = 'alphabetic',
      bgColor = 'rgba(255,255,255,0)',
      color = 'rgba(255,255,255,0)',
      lineWidth = 0,
      globalCompositeOperation = 'source-over',
      opacity = 1,
      font,
    } = style;

    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.font = `${font}`;
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = globalCompositeOperation;
    ctx.globalAlpha = opacity;
  }
};

export default Text;
