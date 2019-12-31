import { colors } from '../assets/data';

const createMatrix = (matrixLength, matrix = []) => {
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) =>
    Array.from({ length: matrixLength }, (newVal, index) => ({
      id: ind * matrixLength + index,
      width: 512 / matrixLength,
      place: { row: ind, column: index },
      color: matrix.length ? matrix[ind * matrixLength + index].color : colors[0],
    }))
  );
  return modifiedArray.reduce((a, b) => a.concat(b));
};

export { createMatrix };
