import uuidv1 from 'uuid/v1';
import Shape from './shape';

const drawRect = (self) => {
  const { context: ctx, props } = self;
  const propsLength = props.length;

  let prevStyle = '';
  let propsIdx = 0;

  if (propsLength === 0) return;

  ctx.beginPath();

  for (; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
    const {
      points,
      width = 10,
      height = 10,
      bgColor,
      color,
      lineWidth,
      opacity,
    } = prop;
    const style = {
      color,
      bgColor,
      lineWidth,
      opacity,
    };
    const pointsCount = points.length;
    const currentStyle = Object.values(style).toString();
    const isSameStyle = prevStyle === currentStyle;
    const isLastProps = propsIdx === propsLength - 1;

    if (!isSameStyle) {
      if (propsIdx !== 0) {
        ctx.stroke();
      }

      ctx.beginPath();
      self.setStyle(style);
    }

    for (let pIdx = 0; pIdx < pointsCount; pIdx += 1) {
      const point = points[pIdx];
      const [x, y] = point;
      const fixedX = Math.trunc(x);
      const fixedY = Math.trunc(y);

      if (pIdx === 0) {
        ctx.moveTo(fixedX, fixedY);
      }
      ctx.rect(fixedX, fixedY, width, height);
    }
    prevStyle = currentStyle;

    if (isSameStyle && isLastProps) {
      ctx.stroke();
      ctx.fill();
    } else if (isLastProps) {
      ctx.stroke();
      ctx.fill();
    } else;
  }
};

const Rect = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `rect-${uuidv1()}`;
  }

  draw() {
    drawRect(this);
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

  // _loadPath() {
  //   const { context: ctx } = this;

  //   ctx.moveTo(this.x, this.y);
  //   ctx.rect(this.x, this.y, this.width, this.height);
  //   ctx.closePath();
  // }

  // _endPath() {
  //   const { context: ctx } = this;

  //   ctx.fill();
  //   ctx.stroke();
  //   ctx.closePath();
  // }

  // _setDefaultStyle() {
  //   const { style, context: ctx, className } = this;

  //   if (className === 'Text') {
  //     ctx.textBaseline = style.textBaseline ? style.textBaseline : 'alphabetic';
  //     ctx.textAlign = style.textAlign ? style.textAlign : 'alphabetic';
  //     ctx.font = `${style.fontSize} ${style.fontFamily}`;
  //   }

  //   ctx.fillStyle = style.bgColor ? style.bgColor : 'rgba(255,255,255,0)';
  //   ctx.strokeStyle = style.color ? style.color : 'rgba(255,255,255,0)';
  //   ctx.lineWidth = style.lineWidth ? style.lineWidth : '1';
  //   ctx.globalCompositeOperation = style.globalCompositeOperation ? style.globalCompositeOperation : 'source-over';

  // }
};

export default Rect;
