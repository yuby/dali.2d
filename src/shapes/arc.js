import typeChecker from '../utils/typeCheck';

class Arc {
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
      points,
      radius = 10,
      bgColor,
      color,
      lineWidth,
      startAngle = 0,
      endAngle = 2 * Math.PI,
      opacity,
    } = props || this.props;

    this.props.push({
      points,
      radius,
      startAngle,
      endAngle,
      style: {
        color,
        bgColor,
        lineWidth,
        opacity,
      },
    });
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
        points, radius, startAngle, endAngle, style,
      } = prop;
      const pointLen = points.length;

      ctx.save();


      let pidx = 0;

      ctx.beginPath();
      for (; pidx < pointLen; pidx += 1) {
        const point = points[pidx];

        this._setStyle(style);
        ctx.moveTo(Math.trunc(point[0] + radius), Math.trunc(point[1]));
        ctx.arc(Math.trunc(point[0]), Math.trunc(point[1]), radius, startAngle, endAngle);
      }


      ctx.stroke();
      ctx.fill();
      ctx.restore();
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

export default Arc;
