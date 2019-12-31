import React from 'react';
import { connect } from 'react-redux';
import { colors, tools, mouseEvents } from '../../../assets/data';
import './canvas.scss';
import { setUpdatedFrame } from '../../../state/ac/frames';
import { createMatrix } from '../../../helpers/canvas';
// get screen width => canvas h/w
// const LSArray = parts.map((val) => val.color).reduce((a,b) => a.concat(b)));

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
    frames,
  } = props;
  const canvasRef = React.useRef(null);

  const [parts, changeData] = React.useState([]);

  const getCtxFromRef = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCtxFromRef();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const extendedMatrix = createMatrix(matrixLength, frames[currentFrame]);
    extendedMatrix.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
    changeData(extendedMatrix);
    updatedFrames = [...extendedMatrix];
  }, [currentFrame]);

  // no need
  React.useEffect(() => {
    const ctx = getCtxFromRef();
    const extendedMatrix = createMatrix(matrixLength);
    extendedMatrix.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
    changeData(extendedMatrix);
    updatedFrames = [...extendedMatrix];
    onSetUpdatedFrame(currentFrame, extendedMatrix);
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

  const useStroke = (ctx, x1, y1, x2, y2) => {
  
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;

    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;

    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);

    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;

    // The line is X-axis dominant
    if (dy1 <= dx1) {

        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }

           parts.forEach((part) => {
        const minX = part.width * part.place.column;
        const minY = part.width * part.place.row;
        const maxX = part.width * part.place.column + part.width;
        const maxY = part.width * part.place.row + part.width;
        if (x >= minX && x < maxX && y >= minY && y < maxY) {
         
          drawOnCanvas(ctx, part, primaryColor);
        }
      });

        // Rasterize the line
        for (i = 0; x < xe; i++) {
            x = x + 1;

            // Deal with octants...
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }

            // Draw pixel from line span at currently rasterized position
            parts.forEach((part) => {
              const minX = part.width * part.place.column;
              const minY = part.width * part.place.row;
              const maxX = part.width * part.place.column + part.width;
              const maxY = part.width * part.place.row + part.width;
              if (x >= minX && x < maxX && y >= minY && y < maxY) {
               
                drawOnCanvas(ctx, part, primaryColor);
              }
            });
        }

    } else { // The line is Y-axis dominant

        // Line is drawn bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }

        parts.forEach((part) => {
          const minX = part.width * part.place.column;
          const minY = part.width * part.place.row;
          const maxX = part.width * part.place.column + part.width;
          const maxY = part.width * part.place.row + part.width;
          if (x >= minX && x < maxX && y >= minY && y < maxY) {
           
            drawOnCanvas(ctx, part, primaryColor);
          }
        });

        // Rasterize the line
        for (i = 0; y < ye; i++) {
            y = y + 1;

            // Deal with octants...
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }

            // Draw pixel from line span at currently rasterized position
            parts.forEach((part) => {
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
      // case tools.stroke: {
      //   useStroke(ctx, coordsMouseDown.x, coordsMouseUp.x, coordsMouseDown.y, coordsMouseUp.y);
      //   break;
      // }
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
        console.log('TCL: mouseHandler -> coordsMouseDown', coordsMouseDown);
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
      changeData(updatedFrames);
      onSetUpdatedFrame(currentFrame, updatedFrames);
      if (activeTool === tools.stroke) {
        const ctx = getCtxFromRef();
        coordsMouseUp = { x: nativeEvent.layerX, y: nativeEvent.layerY };
        console.log('TCL: mouseHandler -> coordsMouseUp', coordsMouseUp);
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
    primaryColor: state.tools.primaryColor,
    alternativeColor: state.tools.alternativeColor,
    activeTool: state.tools.activeTool,
    penSize: state.tools.penSize,
    matrixLength: 32,
    frames: state.frames.framesArray,
    currentFrame: state.frames.currentFrame,
  }),
  (dispatch) => ({
    onSetUpdatedFrame: (frame, data) => dispatch(setUpdatedFrame(frame, data)),
  })
)(Canvas);
