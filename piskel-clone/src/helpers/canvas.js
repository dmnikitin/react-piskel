import { colors, frameSizes } from '../assets/data';

const createMatrix = (matrixLength, matrix = []) => {
  const modifiedArray = Array.from({ length: matrixLength },
    (val, ind) => Array.from({ length: matrixLength },
      (newVal, index) => ({
        id: ind * matrixLength + index,
        width: frameSizes.width / matrixLength,
        place: { row: ind, column: index },
        color: matrix.length ? matrix[ind * matrixLength + index].color : colors[0],
      })));
  return modifiedArray.reduce((a, b) => a.concat(b));
};


const drawOnCanvas = (ctx, position, color, frameSize = frameSizes.coeff.basic) => {
  // const minX = part.width * part.place.column;
  // const minY = part.width * part.place.row;
  // const element = part;

  // console.log(color, frameSize);
  // ctx.fillRect(
  //   minX / frameSize,
  //   minY / frameSize,
  //   element.width / frameSize,
  //   element.width / frameSize,
  // );

  ctx.fillStyle = color;
  ctx.fillRect(
    position.x / frameSize,
    position.y / frameSize,
    position.width / frameSize,
    position.width / frameSize,
  );
};

const getCanvasPosition = (e, matrixLength) => {
  const x = Math.floor(e.layerX / matrixLength) * matrixLength;
  const y = Math.floor(e.layerY / matrixLength) * matrixLength;
  const column = Math.floor(e.layerX / (matrixLength / 2));
  const row = Math.floor(e.layerY / (matrixLength / 2));
  return {
    x, y, id: (row * matrixLength) + column, width: matrixLength,
  };
};

const getCanvasPositionFromId = (id, matrixLength) => {
  const diff = Math.floor(id / matrixLength);
  const y = diff * (matrixLength / 2);
  const x = (id - (diff * matrixLength)) * (matrixLength / 2);
  return {
    x, y, id, width: matrixLength,
  };
};

const framesUpdater = (frames, element) => frames.map((frame) => {
  if (frame.id === element.id) {
    return element;
  }
  return frame;
});

const getCoords = (part) => {
  const minX = part.width * part.place.column;
  const minY = part.width * part.place.row;
  const maxX = part.width * part.place.column + part.width;
  const maxY = part.width * part.place.row + part.width;
  return {
    minX,
    minY,
    maxX,
    maxY,
  };
};

const getColor = (e, state) => {
  let color;
  state.forEach((part) => {
    const {
      minX, minY, maxX, maxY,
    } = getCoords(part);
    if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
      color = part.color;
    }
  });
  return color;
};

export {
  createMatrix,
  drawOnCanvas,
  framesUpdater,
  getCoords,
  getColor,
  getCanvasPosition,
  getCanvasPositionFromId,
};
