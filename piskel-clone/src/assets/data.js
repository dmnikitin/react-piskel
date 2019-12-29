// const colorsArray = {
//   0: 'green',
//   1: 'blue',
//   2: 'red',
//   3: 'grey',
// };

// const colorsObj = {
//   '0, 128, 0': colorsArray[0],
//   '0, 0, 255': colorsArray[1],
//   '128, 128, 128': colorsArray[2],
//   '255, 0, 0': colorsArray[3],
// };

// #000000
// #

const colors = {
  0: 'rgba(0,0,0,0)',
  1: 'rgba(0,0,0,1)',
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
  primaryColor: colors[1],
  alternativeColor: colors[0],
  activeTool: tools.pen,
  penSize: penSize[0],
};

export { colors, penSize, tools, active };
