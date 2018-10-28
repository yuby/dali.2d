import typeChecker from '../utils/typeCheck';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

class Polygon {
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
      bgColor,
      globalCompositeOperation,
      lineWidth,
      lineType,
      holes,
      isClose = true,
      opacity,
    } = props;

    this.props.push({
      points,
      isClose,
      lineType,
      holes,
      style: {
        color,
        bgColor,
        lineWidth,
        globalCompositeOperation,
        opacity,
      },
    });
  }

  _drawPolygon() {
    const {
      context: ctx,
      props,
      propsLength,
    } = this;
    let isSameStyle = true;
    let prevStyle = '';
    let propsIdx = 0;

    for (; propsIdx < propsLength; propsIdx += 1) {
      const prop = props[propsIdx];
      const {
        points, style, isClose, lineType, holes,
      } = prop;
      const { lineWidth, color, bgColor } = style;
      const pointsCount = points.length;
      const currentStyle = `${color || ''}${bgColor || ''}${lineWidth || ''}${lineType || ''}`;

      if (propsIdx > 0) {
        isSameStyle = currentStyle === prevStyle;
      }

      if (propsIdx === 0) {
        ctx.save();
        ctx.beginPath();
        this._setStyle(Object.assign(style, {
          isClose,
        }));
      } else if (!isSameStyle) {
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();

        this._setStyle(Object.assign(style, {
          isClose,
        }));
      }

      if (LINE_TYPE[lineType]) {
        ctx.setLineDash(LINE_TYPE[lineType].map(value => value * lineWidth));
      } else {
        ctx.setLineDash(LINE_TYPE.solid);
      }

      let pidx = 0;

      for (; pidx < pointsCount; pidx += 1) {
        const point = points[pidx];

        if (pidx === 0) {
          ctx.moveTo(Math.trunc(point[0]), Math.trunc(point[1]));
        }
        ctx.lineTo(Math.trunc(point[0]), Math.trunc(point[1]));
      }
      if (isClose) {
        ctx.closePath();
      }

      if (holes && holes.length > 0) {
        const holeCnt = holes.length;
        let hidx = 0;

        for (; hidx < holeCnt; hidx += 1) {
          const hole = holes[hidx];
          const holePolygonCnt = hole.length;

          for (let hpidx = 0; hpidx < holePolygonCnt; hpidx += 1) {
            const holePoly = hole[hpidx];

            if (hpidx === 0) {
              ctx.moveTo(Math.trunc(holePoly[0]), Math.trunc(holePoly[1]));
            }
            ctx.lineTo(Math.trunc(holePoly[0]), Math.trunc(holePoly[1]));
          }
          ctx.closePath();
        }
      }


      if (propsIdx === propsLength - 1) {
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      } else if (!isSameStyle) {
        ctx.stroke();
        ctx.fill();
        prevStyle = currentStyle;

        ctx.beginPath();
      }
    }
  }

  draw() {
    this._drawPolygon();
  }

  _setStyle(style) {
    const { context: ctx } = this;

    ctx.fillStyle = style.bgColor && style.isClose ? style.bgColor : 'rgba(255,255,255,0)';
    ctx.strokeStyle = style.color ? style.color : 'rgba(255,255,255,0)';
    ctx.lineWidth = style.lineWidth ? style.lineWidth : 1;
    ctx.globalCompositeOperation = style.globalCompositeOperation ? style.globalCompositeOperation : 'source-over';
    ctx.globalAlpha = style.opacity ? style.opacity : 1;
  }
}

export default Polygon;
