const mouseEvents = {
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  mousemove: 'mousemove',
  mouseout: 'mouseout',
};

const keyboardEvents = {
  pen: 80,
  bucket: 66,
  stroke: 83,
  eraser: 69,
  colorPicker: 67,
  allToOneColor: 77,
  exportGif: 71,
  exportApng: 72,
  switchColor: 87,
  resizeCanvas: 82,
  changePenSize: 90,
  addFrame: 65,
  duplicateFrame: 68,
  deleteFrame: 88,
};

const colors = {
  0: '#e3e4e6',
  1: '#000000',
  2: '#ffffff',
  3: '#d61818',
  4: '#13c219',
  5: '#0249ba',
  6: '#d5d900',
  7: '#d98200',
  8: '#760fbf',
};

const penSize = {
  0: '1px',
  1: '2px',
  2: '4px',
};

const tools = {
  pen: 'pen',
  stroke: 'stroke',
  colorPicker: 'colorPicker',
  eraser: 'eraser',
  bucket: 'bucket',
  allToOneColor: 'allToOneColor',
};

const active = {
  colors: {
    primaryColor: colors[1],
    alternativeColor: colors[0],
  },
  activeTool: tools.pen,
  penSize: penSize[0],
};

const frameSizes = {
  width: 512,
  coeff: {
    basic: 1,
    fullPage: 0.5,
    preview: 4,
  },
  matrixLength: {
    basic: 32,
    ext: 64,
    max: 128,
  },
  canvas: {
    small: 128,
    medium: 512,
    large: 1024,
  },
};

const defaultFrameRate = 12;

export {
  colors,
  penSize,
  tools,
  active,
  mouseEvents,
  keyboardEvents,
  frameSizes,
  defaultFrameRate,
};
