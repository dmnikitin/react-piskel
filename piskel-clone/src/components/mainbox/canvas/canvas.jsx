import React from 'react';
import { connect } from 'react-redux';
import { colors, tools, mouseEvents } from '../../../assets/data';
import './canvas.scss';
import { setUpdatedFrame } from '../../../state/ac/frames';

// get screen width => canvas h/w
// const LSArray = parts.map((val) => val.color).reduce((a,b) => a.concat(b)));

const createMatrix = (matrixLength, matrix = []) => {
  const modifiedArray = Array.from({ length: matrixLength }, (val, ind) =>
    Array.from({ length: matrixLength }, (newVal, index) => ({
      id: ind * matrixLength + index,
      width: 512 / matrixLength,
      place: { row: ind, column: index },
      color: matrix.length ? matrix[ind * matrixLength + index] : colors[0],
    }))
  );
  return modifiedArray.reduce((a, b) => a.concat(b));
};

let updatedFrames;

const drawOnCanvas = (ctx, place, color = colors[0], frames) => {
  const minX = place.width * place.place.column;
  const minY = place.width * place.place.row;
  const element = place;
  element.color = color;
  ctx.fillStyle = color;
  ctx.clearRect(minX, minY, element.width, element.width);
  ctx.fillRect(minX, minY, element.width, element.width);
  if (frames) {
    updatedFrames = frames.map((frame) => {
      if (frame.id === element.id) {
        return element;
      }
      return frame;
    });
  }
};

function Canvas(props) {
  let isSwitched = false;
  let isMouseDownSwitched = false;
  const {
    primaryColor,
    alternativeColor,
    penSize,
    activeTool,
    matrixLength,
    onSetUpdatedFrame,
  } = props;
  const canvasRef = React.useRef(null);

  const [parts, changeData] = React.useState([]);

  const getCtxFromRef = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  React.useEffect(() => {
    const ctx = getCtxFromRef();
    const extendedMatrix = createMatrix(matrixLength);
    extendedMatrix.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
    changeData(extendedMatrix);
    updatedFrames = [...extendedMatrix];
    onSetUpdatedFrame(0, extendedMatrix);
  }, []);

  const usePen = (e, ctx, color = colors[0]) => {
    parts.forEach((part) => {
      const minX = part.width * part.place.column;
      const minY = part.width * part.place.row;
      const maxX = part.width * part.place.column + part.width;
      const maxY = part.width * part.place.row + part.width;
      if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
        if (e.button === 2) {
          drawOnCanvas(ctx, part, color, parts);
        } else if (e.button === 0) {
          drawOnCanvas(ctx, part, color, parts);
        }
        // drawOnCanvas(ctx, part, e.button ? alternativeColor : primaryColor, parts);
      }
    });
  };

  const useStroke = (e, ctx) => {};

  const useColorPicker = (e, ctx) => {};

  const useAllToOneColor = (e, ctx) => {};

  const useBucket = (e, ctx) => {
    const bucketList = [];

    const addToBucket = (part) => {
      parts.forEach((val) => {
        if (val.id === part.id) {
          const adjacent = [];
          const row = Math.floor(val.id / matrixLength);
          const column = val.id % matrixLength;
          if (column > 0) adjacent.push(parts[row * matrixLength + column - 1].id);
          if (row > 0) adjacent.push(parts[(row - 1) * matrixLength + column].id);
          if (row <= matrixLength - 2) adjacent.push(parts[(row + 1) * matrixLength + column].id);
          if (column <= matrixLength - 2) adjacent.push(parts[row * matrixLength + column + 1].id);
          adjacent.forEach((pixel) => {
            if (bucketList.indexOf(parts[pixel]) < 0 && parts[pixel].color === part.color) {
              bucketList.push(parts[pixel]);
              addToBucket(parts[pixel]);
            }
          });
        }
      });
    };

    parts.forEach((val) => {
      const part = val;
      part.minX = part.width * part.place.column;
      part.minY = part.width * part.place.row;
      part.maxX = part.width * part.place.column + part.width;
      part.maxY = part.width * part.place.row + part.width;
      if (
        e.layerX >= part.minX &&
        e.layerX < part.maxX &&
        e.layerY >= part.minY &&
        e.layerY < part.maxY
      ) {
        if (primaryColor !== part.color) {
          bucketList.push(part);
          addToBucket(part);
        }
      }
    });
    bucketList.forEach((val) => drawOnCanvas(ctx, val, primaryColor, parts));
  };

  const mouseAction = (e) => {
    const ctx = getCtxFromRef();
    switch (activeTool) {
      case tools.pen: {
        usePen(e, ctx, primaryColor);
        break;
      }
      case tools.eraser: {
        usePen(e, ctx);
        break;
      }
      case tools.bucket: {
        useBucket(e, ctx);
        break;
      }
      case tools.colorPicker: {
        useColorPicker(e, ctx);
        break;
      }
      case tools.stroke: {
        useStroke(e, ctx);
        break;
      }
      case tools.allToOneColor: {
        useAllToOneColor(e, ctx);
        break;
      }
      default:
        return null;
    }
  };

  const mouseHandler = (e) => {
    const { nativeEvent } = e;
    if (e.type === mouseEvents.mousedown) {
      isSwitched = true;
      isMouseDownSwitched = true;
      if (isMouseDownSwitched) {
        mouseAction(nativeEvent);
        isMouseDownSwitched = false;
      }
    }
    if (e.type === mouseEvents.mouseup) {
      isSwitched = false;
      changeData(updatedFrames);
      onSetUpdatedFrame(0, updatedFrames);
    }
    if (e.type === mouseEvents.mouseout) {
      isSwitched = false;
    }
    if (e.type === mouseEvents.mousemove) {
      if (isSwitched) mouseAction(nativeEvent);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onMouseMove={mouseHandler}
        onMouseDown={mouseHandler}
        onMouseUp={mouseHandler}
        onMouseOut={mouseHandler}
        onBlur={mouseHandler}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    primaryColor: state.tools.primaryColor,
    alternativeColor: state.tools.alternativeColor,
    activeTool: state.tools.activeTool,
    penSize: state.tools.penSize,
    matrixLength: 32,
  }),
  (dispatch) => ({
    onSetUpdatedFrame: (frame, data) => dispatch(setUpdatedFrame(frame, data)),
  })
)(Canvas);
