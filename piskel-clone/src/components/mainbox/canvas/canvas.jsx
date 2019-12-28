import React from 'react';
import './canvas.scss';
import { colors } from '../../../assets/data';

// get screen width => canvas h/w

function createMatrix(props) {
  const { matrixLength, matrix = [] } = props;
  const initialArray = Array.from({ length: 32 }, (val, ind) =>
    Array.from({ length: 32 }, (newVal, index) => ({
      id: ind * 32 + index,
      width: 16,
      color: colors[0],
    }))
  );
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) =>
    Array.from({ length: matrixLength }, (newVal, index) => ({
      id: ind * matrixLength + index,
      width: 512 / matrixLength,
      color: matrix.length ? matrix[ind * matrixLength + index].color : colors[0],
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

      // return parts;
      // pure f;

      ctx.fillStyle = current.color;
      ctx.fillRect(minX, minY, current.width, current.width);
    }
  }
}

// let switcher = false;
// let mouseDownSwitcher = false;

// const mouseHandler = (direction, e) => {
//   if (direction === 'down') {
//     switcher = true;
//     mouseDownSwitcher = true;
//     if (mouseDownSwitcher) {
//       this.mouseAction(e);
//       mouseDownSwitcher = false;
//     }
//   }
//   if (direction === 'up' || direction === 'out') switcher = false;
//   if (direction === 'move') {
//     if (switcher) this.mouseAction(e);
//   }
// };
// this.sizeSwitcher.range.addEventListener('change', () => this.createCanvas(this.sizeSwitcher.value.textContent));

// const pictureButton = document.getElementById('getImage');
// const bwButton = document.getElementById('bw');
// pictureButton.addEventListener('click', this.getImage.bind(this), false);
// bwButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   this.monochrome();
// }, false);
// this.canv.addEventListener('mousemove', (e) => mouseHandler('move', e), false);
// this.canv.addEventListener('mousedown', (e) => mouseHandler('down', e), false);
// this.canv.addEventListener('mouseup', (e) => mouseHandler('up', e), false);
// this.canv.addEventListener('mouseout', (e) => mouseHandler('out', e), false);

// function mouseAction(event) {
//   const {
//     tool,
//     colors,
//   } = store.getState();

//   if (tool === 'pencil') {
//     this.parts.forEach((part) => {
//       const minX = part.width * part.place.column;
//       const minY = part.width * part.place.row;
//       const maxX = part.width * part.place.column + part.width;
//       const maxY = part.width * part.place.row + part.width;
//       if (event.layerX >= minX &&
//         event.layerX < maxX &&
//         event.layerY >= minY &&
//         event.layerY < maxY) {
//         if (colors[0] !== part.color) {
//           const x = part;
//           const [color] = colors;
//           x.color = color;
//           this.draw(part, minX, minY);
//         }
//       }
//     });
//   }

//   if (tool === 'color') {
//     const pixel = this.ctx.getImageData(event.layerX, event.layerY, 1, 1);
//     const {
//       data,
//     } = pixel;
//     const rgb = `${data[0]}, ${data[1]}, ${data[2]}`;
//     const current = colorsObj[rgb];
//     const prev = colors[0] === current ? colors[1] : colors[0];
//     this.colorPicker.setColor(prev, current);
//   }

//   if (tool === 'bucket') {
//     const bucketList = [];
//     const addToBucket = (part) => {
//       for (let i = 0; i < this.matrixLength; i += 1) {
//         for (let j = 0; j < this.extendedMatrix[i].length; j += 1) {
//           if (this.extendedMatrix[i][j].id === part.id) {
//             const adjacent = [];
//             if (j > 0) adjacent.push(this.extendedMatrix[i][j - 1].id);
//             if (i > 0) adjacent.push(this.extendedMatrix[i - 1][j].id);
//             if (i <= this.matrixLength - 2) adjacent.push(this.extendedMatrix[i + 1][j].id);
//             if (j <= this.matrixLength - 2) adjacent.push(this.extendedMatrix[i][j + 1].id);
//             adjacent.forEach((e) => {
//               if (bucketList.indexOf(this.parts[e]) < 0 && this.parts[e].color === part.color) {
//                 bucketList.push(this.parts[e]);
//                 addToBucket(this.parts[e]);
//               }
//             });
//           }
//         }
//       }
//     };

//     this.parts.forEach((x) => {
//       const part = x;
//       part.minX = part.width * part.place.column;
//       part.minY = part.width * part.place.row;
//       part.maxX = part.width * part.place.column + part.width;
//       part.maxY = part.width * part.place.row + part.width;
//       if (event.layerX >= part.minX &&
//         event.layerX < part.maxX &&
//         event.layerY >= part.minY &&
//         event.layerY < part.maxY) {
//         if (colors[0] !== part.color) {
//           bucketList.push(part);
//           addToBucket(part);
//         }
//       }
//     });
//     bucketList.forEach((e) => this.draw(e, e.minX, e.minY));
//   }
// }

// function drawOnCanvas(part, minX, minY) {
//   const color = store.getState().colors[0];
//   const element = part;
//   element.color = color;
//   this.ctx.fillStyle = color;
//   this.ctx.fillRect(minX, minY, element.width, element.width);
// }

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
