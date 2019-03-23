import simpleEvent from 'canvas-simple-event';
import Arc from './shapes/arc';
import Rect from './shapes/rect';
import Path from './shapes/path';
import QuadraticCurve from './shapes/quadraticCurve';
import BezierCurve from './shapes/bezierCurve';
import Text from './shapes/text';
import Polygon from './shapes/polygon';
import SmoothCurve from './shapes/smoothCurve';
import Image from './shapes/image';
import Arrow from './shapes/arrow';
import typeCheck from './utils/typeCheck';

class Dali {
  constructor(selector, active) {
    if (typeCheck(selector) === '[object String]') {
      this.canvas = document.querySelector(selector);
    } else {
      this.canvas = selector;
    }
    this.selector = selector;
    this.context = this.canvas.getContext('2d');
    this.zoom = 0;
    this.selection = null;
    this.featureQueue = [];
    this.activeEvent = typeCheck(active) === '[object Boolean]' ? active : true;

    this.eventHandler = null;

    if (this.activeEvent) {
      this.eventHandler = simpleEvent(selector);
    }
  }

  init() {
    this.featureQueue.forEach((f) => {
      f.setProperty();
    });
  }

  add(feature) {
    this.featureQueue.push(feature);
  }

  draw() {
    const { featureQueue, canvas } = this;

    featureQueue.forEach((feature) => {
      if (typeCheck(feature) === '[object Array]') {
        feature.forEach(((f) => {
          Object.assign(f, {
            canvas,
            context: canvas.getContext('2d'),
          });
          f.draw();
        }));
      } else {
        Object.assign(feature, {
          canvas,
          context: canvas.getContext('2d'),
        });
        feature.draw();
      }
    });
  }

  clear() {
    const { context, canvas } = this;

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  delete(id) {
    if (id) {
      this.featureQueue = this.featureQueue.filter(elem => elem.uuid !== id);
    } else {
      this.featureQueue = [];
    }
  }

  reDraw() {
    this.clear();
    this.draw();
  }

  on(type, fn) {
    if (this.eventHandler) {
      this.eventHandler.on(type, fn);
    }

    return this.eventHandler;
  }
}


Dali.Arc = Arc;
Dali.Rect = Rect;
Dali.Path = Path;
Dali.Text = Text;
Dali.Arrow = Arrow;
Dali.Image = Image;
Dali.QuadraticCurve = QuadraticCurve;
Dali.BezierCurve = BezierCurve;
Dali.SmoothCurve = SmoothCurve;
Dali.Polygon = Polygon;

const _global = typeof window === 'undefined' ? self : window;

_global.Dali = Dali;

export default Dali;
