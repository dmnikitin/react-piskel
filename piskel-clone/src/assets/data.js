const mouseEvents = {
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  mousemove: 'mousemove',
  mouseout: 'mouseout',
};

const keyboardEvents = {
  pen: 'p',
  bucket: 'b',
  stroke: 'w',
  eraser: 'e',
  colorPicker: 'c',
  allToOneColor: 'm',
  exportGif: 'g',
  swap: 's',
  resizeCanvas: 'r',
  changePenSize: 'z',
  add: 'a',
  duplicate: 'd',
  delete: 'x',
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

const penSizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const tools = {
  pen: 'pen',
  stroke: 'stroke',
  colorPicker: 'colorPicker',
  eraser: 'eraser',
  bucket: 'bucket',
  allToOneColor: 'allToOneColor',
};


const frameSizes = {
  width: 512,
  coeff: {
    basic: 1,
    fullPage: 0.5,
    preview: 4,
  },
  matrixLength: {
    init: 32,
    ext: 64,
    max: 128,
  },
  canvas: {
    small: 128,
    medium: 512,
    large: 1024,
  },
};

const active = {
  colors: {
    primaryColor: colors[1],
    alternativeColor: colors[0],
  },
  activeTool: tools.pen,
  penSize: penSizes.small,
  canvasSize: frameSizes.matrixLength.init,
};

const defaultFrameRate = 12;
const defaultState = { framesArray: [], currentFrame: 0 };

export {
  colors,
  penSizes,
  tools,
  active,
  mouseEvents,
  keyboardEvents,
  frameSizes,
  defaultFrameRate,
  defaultState,
};
