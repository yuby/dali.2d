import uuidv1 from 'uuid/v1';
import Shape from './shape';

const LINE_TYPE = {
  solid: [],
  dot: [1, 2],
  broken: [7, 2],
  chain1: [7, 2, 2, 2],
  chain2: [2, 2, 2, 2, 7, 2],
};

const drawPolygon = (self) => {
  let prevStyle = '';

  const { context: ctx, props } = self;
  const propsLength = props.length;

  if (propsLength === 0) return;

  ctx.beginPath();

  for (let propsIdx = 0; propsIdx < propsLength; propsIdx += 1) {
    const prop = props[propsIdx];
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
    } = prop;
    const pointsCount = points.length;
    const currentStyle = `${color || ''}${bgColor || ''}${lineWidth || ''}${lineType || ''}`;
    const isSameStyle = currentStyle === prevStyle;
    const isLastProps = propsIdx === propsLength - 1;
    const style = {
      color,
      bgColor,
      lineWidth,
      globalCompositeOperation,
      opacity,
    };

    if (!isSameStyle) {
      if (propsIdx !== 0) {
        ctx.stroke();
        ctx.fill();
      }

      ctx.beginPath();
      self.setStyle(style);
      if (LINE_TYPE[lineType]) {
        ctx.setLineDash(LINE_TYPE[lineType].map(value => value * lineWidth));
      } else {
        ctx.setLineDash(LINE_TYPE.solid);
      }
    }

    for (let pidx = 0; pidx < pointsCount; pidx += 1) {
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
      let hidx = 0;
      const holeCnt = holes.length;

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

    prevStyle = currentStyle;

    if (isSameStyle && isLastProps) {
      ctx.stroke();
      ctx.fill();
    } else if (!isSameStyle) {
      ctx.stroke();
      ctx.fill();
    } else ;
  }
};

const Polygon = class extends Shape {
  constructor(props) {
    super(props);

    this.uuid = `path-${uuidv1()}`;
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

  draw() {
    drawPolygon(this);
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
}

export default Polygon;
