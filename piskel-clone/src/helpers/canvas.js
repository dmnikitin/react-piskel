import { colors, frameSizes } from '../assets/data';

const createMatrix = (matrixLength = frameSizes.matrixLength.init, matrix = []) => {
  const modifiedArray = Array.from({ length: matrixLength },
    (val, ind) => Array.from({ length: matrixLength },
      (newVal, index) => {
        let color = colors['0'];
        if (matrix.length && matrix[ind * matrixLength + index]) {
          color = matrix[ind * matrixLength + index].color;
        }
        return ({
          id: ind * matrixLength + index,
          width: frameSizes.width / matrixLength,
          place: { row: ind, column: index },
          color,
        });
      }));
  return modifiedArray.reduce((a, b) => a.concat(b));
};

const drawOnCanvas = (ctx, position, color, frameSize = frameSizes.coeff.basic) => {
  ctx.fillStyle = color;
  ctx.fillRect(
    position.x / frameSize,
    position.y / frameSize,
    position.width / frameSize,
    position.width / frameSize,
  );
};

const getCanvasPosition = (e, matrixLength) => {
  const coeff = matrixLength / 2;
  const row = Math.floor(e.layerX / coeff);
  const column = Math.floor(e.layerY / coeff);
  const x = row * coeff;
  const y = column * coeff;
  const id = column * matrixLength + row;
  return {
    x, y, id, width: coeff, row, column,
  };
};

const getCanvasPositionFromId = (id, matrixLength) => {
  const coeff = matrixLength / 2;
  const diff = Math.floor(id / matrixLength);
  const y = diff * coeff;
  const x = (id - (diff * matrixLength)) * coeff;
  return {
    x, y, id, width: coeff,
  };
};

const changeUpdated = (input) => {
  const arr = [...input];
  return arr;
};

export {
  createMatrix,
  drawOnCanvas,
  changeUpdated,
  getCanvasPosition,
  getCanvasPositionFromId,
};
