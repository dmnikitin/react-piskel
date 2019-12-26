import React from 'react';
import './canvas.scss';
import { colorsArray } from '../../../assets/data';

// get screen width => canvas h/w

function createMatrix(props) {
  const { matrixLength, matrix = [] } = props;
  const initialArray = Array.from({ length: 32 }, (val, ind) =>
    Array.from({ length: 32 }, (newVal, index) => ({
      id: ind * 32 + index,
      width: 16,
      color: colorsArray[0],
    }))
  );
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) =>
    Array.from({ length: matrixLength }, (newVal, index) => ({
      id: ind * matrixLength + index,
      width: 512 / matrixLength,
      color: matrix.length ? matrix[ind * matrixLength + index].color : colorsArray[0],
    }))
  );
  const extendedMatrix = matrix.length && matrix ? modifiedArray : initialArray;
  return extendedMatrix;
}

function drawMatrix(ctx, extendedMatrix) {
  // const { ctx, extendedMatrix } = props;
  const parts = [];
  const length = 32;
  for (let row = 0; row < length; row += 1) {
    for (let column = 0; column < length; column += 1) {
      const current = extendedMatrix[row][column];
      const rectangle = {
        id: current.id,
        place: {
          row,
          column,
        },
        color: current.color,
        width: current.width,
      };
      const minX = current.width * column;
      const minY = current.width * row;
      parts.push(rectangle);
      ctx.fillStyle = current.color;
      ctx.fillRect(minX, minY, current.width, current.width);
    }
  }
}

export default function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const x = createMatrix(128);
    drawMatrix(ctx, x);
  }, []);

  // update state => extended (x)
  // on unmount => create Array with colors;

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} onClick={(e) => {}} />
    </div>
  );
}
