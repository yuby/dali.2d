import typeChecker from '../utils/typeCheck';

class Arrow {
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

  draw() {
    const {
      context: ctx,
      props,
      propsLength,
    } = this;

    for (let idx = 0; idx < propsLength; idx += 1) {
      const prop = props[idx];
      const {
        points, style, angle,
      } = prop;
      const r = style.lineWidth ? style.lineWidth + 2 : 3;
      const pointLen = points.length;

      ctx.beginPath();

      let pidx = 0;
      let x = 0;
      let y = 0;

      for (; pidx < pointLen; pidx += 1) {
        let degree = (angle - 90) * (Math.PI / 180);
        const point = points[pidx];
        const centerX = point[0];
        const centerY = point[1];

        x = (r * 1.2 * Math.cos(degree)) + centerX;
        y = (r * 1.2 * Math.sin(degree)) + centerY;
        ctx.moveTo(x, y);

        degree += ((4 / 10) * (2 * Math.PI));
        x = (r * 1.2 * Math.cos(degree)) + centerX;
        y = (r * 1.2 * Math.sin(degree)) + centerY;
        ctx.lineTo(x, y);

        degree += ((2 / 10) * (2 * Math.PI));
        x = (r * 1.2 * Math.cos(degree)) + centerX;
        y = (r * 1.2 * Math.sin(degree)) + centerY;
        ctx.lineTo(x, y);

        ctx.closePath();
        ctx.fillStyle = style.color ? style.color : 'rgba(255,255,255,0)';
        ctx.fill();
      }
    }
  }

  setProperty(props) {
    const {
      points,
      color,
      angle,
      lineWidth,
    } = props || this.props;

    this.props.push({
      points,
      angle,
      style: {
        color,
        lineWidth,
      },
    });
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

export default Arrow;
