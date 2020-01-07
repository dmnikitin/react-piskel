import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { colors, tools, mouseEvents, frameSizes, penSizes } from '../../../assets/data';
import './canvas.scss';
import { setUpdatedFrame } from '../../../state/ac/frames';
import { setColor } from '../../../state/ac/tools';
import {
  createMatrix,
  drawOnCanvas,
  changeUpdated,
  getCanvasPosition,
  getCanvasPositionFromId,
} from '../../../helpers/canvas';

// const LSArray = state.map((val) => val.color).reduce((a,b) => a.concat(b)));
let updatedFrames;
function Canvas(props) {
  let isSwitched = false;
  let isMouseDownSwitched = false;
  const {
    currentFrame,
    primaryColor,
    alternativeColor,
    penSize,
    activeTool,
    matrixLength,
    onSetUpdatedFrame,
    onSetColor,
    frames,
  } = props;
  const canvasRef = useRef(null);

  const getCtxFromRef = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  };

  const createFrame = () => {
    const { canvas, ctx } = getCtxFromRef();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = frames[currentFrame] ? frames[currentFrame].array : [];
    const extendedMatrix = createMatrix(matrixLength, x);
    extendedMatrix.forEach((curr) => {
      const pixel = getCanvasPositionFromId(curr.id, matrixLength);
      drawOnCanvas(ctx, pixel, curr.color);
    });
    updatedFrames = changeUpdated(extendedMatrix);
  };

  useEffect(() => createFrame(), [currentFrame, frames]);
  useEffect(() => {
    createFrame();
    onSetUpdatedFrame(currentFrame, { id: currentFrame, array: updatedFrames });
  }, []);

  const handlePenSize = (id, row, column, color ) => {

    const pack = [];
    let adjacent;
    let adjacentArr;  

    if (penSize === penSizes.medium) {
      adjacent = {
        left: (column > 0) ? id - 1 : null,
        right: (column < matrixLength) ? id + 1 : null,
        top: (row > 0) ? id - matrixLength : null,
        bottom: (row < matrixLength) ? id + matrixLength : null,
      };
      adjacentArr = Object.values(adjacent);
    }
    if (penSize === penSizes.large) {
      adjacent = {
        left: (column > 0) ? id - 1 : null,
        leftbottom: (column > 0 && row < matrixLength) ? id + matrixLength - 1 : null,
        right: (column < matrixLength) ? id + 1 : null,
        rightbottom: (column < matrixLength && row < matrixLength) ? id + matrixLength + 1 : null,
        top: (row > 0) ? id - matrixLength : null,
        righttop: (row > 0 && column < matrixLength) ? id - matrixLength + 1 : null,
        bottom: (row < matrixLength) ? id + matrixLength : null,
        lefttop: (row > 0 && column > 0) ? id - matrixLength - 1 : null,
      }
      adjacentArr = Object.values(adjacent);
    }
         
    if (adjacentArr) {
      adjacentArr.forEach((val) => {
        if (val && updatedFrames[val].color !== color) {
          const position = getCanvasPositionFromId(val);
          pack.push(position);
        }
      });
    }  
    return pack;
  }

  const usePen = (e, ctx, color = colors[0]) => {
    const position = getCanvasPosition(e, matrixLength);
    const { id, row, column } = position;
    if (updatedFrames[id].color !== color) {     
      drawOnCanvas(ctx, position, color);
      const arr = [...updatedFrames];
      arr.splice(id, 1, { ...arr[id], color });
      updatedFrames = changeUpdated(arr);     
       const drawPenSize = handlePenSize(id, row, column, color);
      if (drawPenSize.length) {
        drawPenSize.forEach((key) => {
             drawOnCanvas(ctx, key, color);
          const arr = [...updatedFrames];
          arr.splice(key.id, 1, { ...arr[key.id], color });
          updatedFrames = changeUpdated(arr);
        })
      }
  }
};


const useStroke = (ctx, x1, y1, x2, y2) => {
  let x;
  let y;
  let xDominant;
  let yDominant;
  let iterator;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const positiveDeltaX = Math.abs(deltaX);
  const positiveDeltaY = Math.abs(deltaY);
  let errorIntervalX = 2 * positiveDeltaY - positiveDeltaX;
  let errorIntervalY = 2 * positiveDeltaX - positiveDeltaY;

  if (positiveDeltaY <= positiveDeltaX) {
    if (deltaX >= 0) {
      x = x1;
      y = y1;
      xDominant = x2;
    } else {
      x = x2;
      y = y2;
      xDominant = x1;
    }

    let e = { layerX: x, layerY: y };
    usePen(e, ctx, primaryColor);

    for (iterator = 0; x < xDominant; iterator += 1) {
      x += 1;
      if (errorIntervalX < 0) {
        errorIntervalX += 2 * positiveDeltaY;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        errorIntervalX += 2 * (positiveDeltaY - positiveDeltaX);
      }
      let e = { layerX: x, layerY: y };
      usePen(e, ctx, primaryColor);

    }
  } else {
    if (deltaY >= 0) {
      x = x1;
      y = y1;
      yDominant = y2;
    } else {
      x = x2;
      y = y2;
      yDominant = y1;
    }
    let e = { layerX: x, layerY: y };
    usePen(e, ctx, primaryColor);

    for (iterator = 0; y < yDominant; iterator += 1) {
      y += 1;
      if (errorIntervalY <= 0) {
        errorIntervalY += 2 * positiveDeltaX;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        errorIntervalY += 2 * (positiveDeltaX - positiveDeltaY);
      }
      let e = { layerX: x, layerY: y };
      usePen(e, ctx, primaryColor);
    }
  }
};

const useColorPicker = (e) => {
  const { id } = getCanvasPosition(e, matrixLength);
  const { color } = updatedFrames[id];
  onSetColor(color, primaryColor);
};

const useAllToOneColor = (e, ctx) => {
  const { id } = getCanvasPosition(e, matrixLength);
  const { color } = updatedFrames[id];
  const arr = [...updatedFrames];
  arr.forEach((part) => {
    if (part.color === color) {
      const newPart = part;
      const position = getCanvasPositionFromId(newPart.id, matrixLength);
      drawOnCanvas(ctx, position, primaryColor);
      newPart.color = primaryColor;
    }
  });
  updatedFrames = changeUpdated(arr);
};

const useBucket = (e, ctx) => {
  const bucketList = [];

  const addToBucket = (part) => {
    updatedFrames.forEach((val) => {
      if (val.id === part.id) {
        const adjacent = [];
        const row = Math.floor(val.id / matrixLength);
        const column = val.id % matrixLength;
        if (column > 0) adjacent.push(updatedFrames[row * matrixLength + column - 1].id);
        if (row > 0) adjacent.push(updatedFrames[(row - 1) * matrixLength + column].id);
        if (row <= matrixLength - 2) adjacent.push(updatedFrames[(row + 1) * matrixLength + column].id);
        if (column <= matrixLength - 2) adjacent.push(updatedFrames[row * matrixLength + column + 1].id);
        adjacent.forEach((pixel) => {
          if (bucketList.indexOf(updatedFrames[pixel]) < 0 && updatedFrames[pixel].color === part.color) {
            bucketList.push(updatedFrames[pixel]);
            addToBucket(updatedFrames[pixel]);
          }
        });
      }
    });
  };

  updatedFrames.forEach((val) => {
    const position = getCanvasPosition(e, matrixLength);
    const { id } = position;
    if (id === val.id) {
      if (primaryColor !== val.color) {
        bucketList.push(val);
        addToBucket(val);
      }
    }
  });
  bucketList.forEach((val) => {
    const pixel = getCanvasPositionFromId(val.id, matrixLength);
    const arr = [...updatedFrames];
    arr.splice(val.id, 1, { ...arr[val.id], color: primaryColor });
    updatedFrames = changeUpdated(arr);
    drawOnCanvas(ctx, pixel, primaryColor);
  });
};

let coordsMouseDown;
let coordsMouseUp;

const mouseAction = (e) => {
  const { ctx } = getCtxFromRef();
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
    if (activeTool === tools.stroke) {
      coordsMouseDown = { x: nativeEvent.layerX, y: nativeEvent.layerY };
    }
    isSwitched = true;
    isMouseDownSwitched = true;
    if (isMouseDownSwitched) {
      mouseAction(nativeEvent);
      isMouseDownSwitched = false;
    }
  }
  if (e.type === mouseEvents.mouseup) {    
    if (activeTool === tools.stroke) {
      const { ctx } = getCtxFromRef();
      coordsMouseUp = { x: nativeEvent.layerX, y: nativeEvent.layerY };
      useStroke(ctx, coordsMouseDown.x, coordsMouseDown.y, coordsMouseUp.x, coordsMouseUp.y);
      coordsMouseUp = {};
      coordsMouseDown = {};
    }    
    isSwitched = false;
    onSetUpdatedFrame(currentFrame, { id: currentFrame, array: updatedFrames });
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
      width={frameSizes.canvas.medium}
      height={frameSizes.canvas.medium}
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
    primaryColor: state.tools.colors.primaryColor,
    alternativeColor: state.tools.colors.alternativeColor,
    activeTool: state.tools.activeTool,
    penSize: state.tools.penSize,
    matrixLength: frameSizes.matrixLength.basic,
    frames: state.frames.framesArray,
    currentFrame: state.frames.currentFrame,
  }),
  (dispatch) => ({
    onSetUpdatedFrame: (frame, data) => dispatch(setUpdatedFrame(frame, data)),
    onSetColor: (primary, alternative) => dispatch(setColor(primary, alternative)),
  })
)(Canvas);

Canvas.propTypes = {
  // frames: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   array: PropTypes.array.isRequired,
  // })).isRequired,
  // frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
  // index: PropTypes.number.isRequired,
  // onDeleteFrame: PropTypes.func.isRequired,
  // onSetCurrentFrame: PropTypes.func.isRequired,
  // onAddFrame: PropTypes.func.isRequired,
};
