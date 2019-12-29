import React from 'react';
import { connect } from 'react-redux';
import { colors } from '../../../assets/data';
import './canvas.scss';

// get screen width => canvas h/w
// matrix to LS => [0, 1, 1, 0];
// on unmount => create Array with colors;

function createMatrix(matrixLength, matrix = []) {
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) =>
    Array.from({ length: matrixLength }, (newVal, index) => ({
      id: ind * matrixLength + index,
      width: 512 / matrixLength,
      place: { row: ind, column: index },
      color: matrix.length ? matrix[ind * matrixLength + index] : colors[0],
    }))
  );
  return modifiedArray.reduce((a, b) => a.concat(b));
}

const drawBackground = (ctx, canvas) => {
  const logoImg = new Image();
  logoImg.onload = () => {
    const originalWidth = logoImg.width;
    logoImg.width = Math.round((50 * document.body.clientWidth) / 100);
    logoImg.height = Math.round((logoImg.width * logoImg.height) / originalWidth);
    const logo = {
      img: logoImg,
      x: canvas.width / 2 - logoImg.width / 2,
      y: canvas.height / 2 - logoImg.height / 2,
    };
    ctx.drawImage(logo.img, logo.x, logo.y, logo.img.width, logo.img.height);
  };
  logoImg.src = './assets/bcgr.jpg';
  logoImg.crossOrigin = '';
  return logoImg;
};

const drawOnCanvas = (ctx, place, color = colors[0]) => {
  const minX = place.width * place.place.column;
  const minY = place.width * place.place.row;
  const element = place;
  element.color = color;
  ctx.fillStyle = color;
  console.log(minX, minY, element.width, element.width);
  ctx.fillRect(minX, minY, element.width, element.width);
  // return element;
};

function Canvas(props) {
  let switcher = false;
  let mouseDownSwitcher = false;
  const { primaryColor, alternativeColor, penSize, activeTool, matrixLength } = props;
  const canvasRef = React.useRef(null);
  const [parts, changeData] = React.useState([]);

  const getCtxFromRef = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  };

  React.useEffect(() => {
    const { ctx, canvas } = getCtxFromRef();
    drawBackground(ctx, canvas);
    const extendedMatrix = createMatrix(matrixLength);
    extendedMatrix.forEach((current) => drawOnCanvas(ctx, current, current.color));
    changeData(extendedMatrix);
  }, []);

  const pen = (e) => {
    const { ctx } = getCtxFromRef();
    parts.forEach((part) => {
      const minX = part.width * part.place.column;
      const minY = part.width * part.place.row;
      const maxX = part.width * part.place.column + part.width;
      const maxY = part.width * part.place.row + part.width;
      if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
        if (primaryColor !== part.color) {
          // const modifiedPart = part;
          // modifiedPart.color = primaryColor;
          drawOnCanvas(ctx, part, primaryColor);
        }
      }
    });
  };

  const mouseAction = (e) => {
    if (activeTool === 'pen') pen(e);
  };

  const mouseHandler = (e) => {
    const { nativeEvent } = e;
    if (e.type === 'mousedown') {
      switcher = true;
      mouseDownSwitcher = true;
      if (mouseDownSwitcher) {
        mouseAction(nativeEvent);
        mouseDownSwitcher = false;
      }
    }
    if (e.type === 'mouseup' || e.type === 'mouseout') switcher = false;
    if (e.type === 'mousemove') {
      if (switcher) mouseAction(nativeEvent);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseMove={mouseHandler}
        onMouseDown={mouseHandler}
        onMouseUp={mouseHandler}
        onMouseOut={mouseHandler}
        onBlur={mouseHandler}
      />
    </div>
  );
}

export default connect((state) => ({
  primaryColor: state.tools.primaryColor,
  alternativeColor: state.tools.alternativeColor,
  activeTool: state.tools.activeTool,
  penSize: state.tools.penSize,
  matrixLength: 32,
}))(Canvas);

// const bucket = () => {
//   const bucketList = [];
//   const addToBucket = (part) => {
//     for (let i = 0; i < matrixLength; i += 1) {
//       for (let j = 0; j < matrixLength; j += 1) {
//         if (extendedMatrix[i][j].id === part.id) {
//           const adjacent = [];
//           if (j > 0) adjacent.push(extendedMatrix[i][j - 1].id);
//           if (i > 0) adjacent.push(extendedMatrix[i - 1][j].id);
//           if (i <= matrixLength - 2) adjacent.push(extendedMatrix[i + 1][j].id);
//           if (j <= matrixLength - 2) adjacent.push(extendedMatrix[i][j + 1].id);
//           adjacent.forEach((e) => {
//             if (bucketList.indexOf(parts[e]) < 0 && parts[e].color === part.color) {
//               bucketList.push(parts[e]);
//               addToBucket(parts[e]);
//             }
//           });
//         }
//       }
//     }
//   };

//   parts.forEach((x) => {
//     const part = x;
//     part.minX = part.width * part.place.column;
//     part.minY = part.width * part.place.row;
//     part.maxX = part.width * part.place.column + part.width;
//     part.maxY = part.width * part.place.row + part.width;
//     if (event.layerX >= part.minX &&
//       event.layerX < part.maxX &&
//       event.layerY >= part.minY &&
//       event.layerY < part.maxY) {
//       if (colors[0] !== part.color) {
//         bucketList.push(part);
//         addToBucket(part);
//       }
//     }
//   });
//   bucketList.forEach((e) => drawOnCanvas(e, e.minX, e.minY));
// }

// this.sizeSwitcher.range.addEventListener('change', () => this.createCanvas(this.sizeSwitcher.value.textContent));

// if (tool === 'color') {
//   const pixel = this.ctx.getImageData(event.layerX, event.layerY, 1, 1);
//   const {
//     data,
//   } = pixel;
//   const rgb = `${data[0]}, ${data[1]}, ${data[2]}`;
//   const current = colorsObj[rgb];
//   const prev = colors[0] === current ? colors[1] : colors[0];
//   this.colorPicker.setColor(prev, current);
// }
