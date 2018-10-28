class Group {
  constructor(features, style) {
    this.features = features;
    this.style = style;
  }

  get className() {
    return this.constructor.name;
  }

  draw() {
    const { context: ctx, canvas } = this;

    this.features.forEach((f) => {
      Object.assign(f, {
        canvas,
        context: canvas.getContext('2d'),
      });
      console.log(f.draw)
      f.draw();
    });
  }
}

export default Group;
