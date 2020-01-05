import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { colors, tools, mouseEvents } from '../../../assets/data';
import './canvas.scss';
import { setUpdatedFrame } from '../../../state/ac/frames';
import { setColor } from '../../../state/ac/tools';
import { createMatrix } from '../../../helpers/canvas';
// get screen width => canvas h/w
// const LSArray = state.map((val) => val.color).reduce((a,b) => a.concat(b)));

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
  const canvasRef = React.useRef(null);

  const [state, changeState] = React.useState([]);

  const getCtxFromRef = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  const createFrame = () => {
    const canvas = canvasRef.current;
    const ctx = getCtxFromRef();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = frames[currentFrame] ? frames[currentFrame].array : [];
    const extendedMatrix = createMatrix(matrixLength, x);
    extendedMatrix.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
    changeState(extendedMatrix);
    updatedFrames = [...extendedMatrix];
  };

  React.useEffect(() => {
    createFrame();
  }, [currentFrame]);

  React.useEffect(() => {
    createFrame();
  }, [frames]);

  React.useEffect(() => {
    createFrame();
    onSetUpdatedFrame(currentFrame, { id: currentFrame, array: updatedFrames });
  }, []);

  const usePen = (e, ctx, color = colors[0]) => {
    state.forEach((part) => {
      const minX = part.width * part.place.column;
      const minY = part.width * part.place.row;
      const maxX = part.width * part.place.column + part.width;
      const maxY = part.width * part.place.row + part.width;
      if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
        if (e.button === 2) {
          drawOnCanvas(ctx, part, color, state);
        } else if (e.button === 0) {
          drawOnCanvas(ctx, part, color, state);
        }
        // drawOnCanvas(ctx, part, e.button ? alternativeColor : primaryColor, state);
      }
    });
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
      state.forEach((part) => {
        const minX = part.width * part.place.column;
        const minY = part.width * part.place.row;
        const maxX = part.width * part.place.column + part.width;
        const maxY = part.width * part.place.row + part.width;
        if (x >= minX && x < maxX && y >= minY && y < maxY) {
          drawOnCanvas(ctx, part, primaryColor);
        }
      });
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
        state.forEach((part) => {
          const minX = part.width * part.place.column;
          const minY = part.width * part.place.row;
          const maxX = part.width * part.place.column + part.width;
          const maxY = part.width * part.place.row + part.width;
          if (x >= minX && x < maxX && y >= minY && y < maxY) {
            drawOnCanvas(ctx, part, primaryColor);
          }
        });
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
      state.forEach((part) => {
        const minX = part.width * part.place.column;
        const minY = part.width * part.place.row;
        const maxX = part.width * part.place.column + part.width;
        const maxY = part.width * part.place.row + part.width;
        if (x >= minX && x < maxX && y >= minY && y < maxY) {
          drawOnCanvas(ctx, part, primaryColor);
        }
      });

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
        state.forEach((part) => {
          const minX = part.width * part.place.column;
          const minY = part.width * part.place.row;
          const maxX = part.width * part.place.column + part.width;
          const maxY = part.width * part.place.row + part.width;
          if (x >= minX && x < maxX && y >= minY && y < maxY) {
            drawOnCanvas(ctx, part, primaryColor);
          }
        });
      }
    }
  };

  const useColorPicker = (e, ctx) => {
    state.forEach((part) => {
      const minX = part.width * part.place.column;
      const minY = part.width * part.place.row;
      const maxX = part.width * part.place.column + part.width;
      const maxY = part.width * part.place.row + part.width;
      if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
        onSetColor(part.color, primaryColor);
      }
    });
  };

  const useAllToOneColor = (e, ctx) => {
    const getColor = () => {
      let color;
      state.forEach((part) => {
        const minX = part.width * part.place.column;
        const minY = part.width * part.place.row;
        const maxX = part.width * part.place.column + part.width;
        const maxY = part.width * part.place.row + part.width;
        if (e.layerX >= minX && e.layerX < maxX && e.layerY >= minY && e.layerY < maxY) {
          color = part.color;
        }
      });
      return color;
    };
    const color = getColor();

    state.forEach((part) => {
      if (part.color === color) {
        drawOnCanvas(ctx, part, primaryColor, state);
      }
    });
  };

  const useBucket = (e, ctx) => {
    const bucketList = [];

    const addToBucket = (part) => {
      state.forEach((val) => {
        if (val.id === part.id) {
          const adjacent = [];
          const row = Math.floor(val.id / matrixLength);
          const column = val.id % matrixLength;
          if (column > 0) adjacent.push(state[row * matrixLength + column - 1].id);
          if (row > 0) adjacent.push(state[(row - 1) * matrixLength + column].id);
          if (row <= matrixLength - 2) adjacent.push(state[(row + 1) * matrixLength + column].id);
          if (column <= matrixLength - 2) adjacent.push(state[row * matrixLength + column + 1].id);
          adjacent.forEach((pixel) => {
            if (bucketList.indexOf(state[pixel]) < 0 && state[pixel].color === part.color) {
              bucketList.push(state[pixel]);
              addToBucket(state[pixel]);
            }
          });
        }
      });
    };

    state.forEach((val) => {
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
    bucketList.forEach((val) => drawOnCanvas(ctx, val, primaryColor, state));
  };

  let coordsMouseDown;
  let coordsMouseUp;

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
      isSwitched = false;
      changeState(updatedFrames);
      onSetUpdatedFrame(currentFrame, { id: currentFrame, array: updatedFrames });
      if (activeTool === tools.stroke) {
        const ctx = getCtxFromRef();
        coordsMouseUp = { x: nativeEvent.layerX, y: nativeEvent.layerY };
        useStroke(ctx, coordsMouseDown.x, coordsMouseDown.y, coordsMouseUp.x, coordsMouseUp.y);
        coordsMouseUp = {};
        coordsMouseDown = {};
      }
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
    primaryColor: state.tools.colors.primaryColor,
    alternativeColor: state.tools.colors.alternativeColor,
    activeTool: state.tools.activeTool,
    penSize: state.tools.penSize,
    matrixLength: 32,
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
