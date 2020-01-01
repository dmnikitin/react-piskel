import React from 'react';
import { connect } from 'react-redux';
import {
  setUpdatedFrame,
  setCurrentFrame,
  addFrame,
  deleteFrame,
} from '../../../state/ac/frames.js';

import { createMatrix } from '../../../helpers/canvas';

const drawOnCanvas = (ctx, part, color) => {
  const minX = part.width * part.place.column;
  const minY = part.width * part.place.row;
  const element = part;
  ctx.fillStyle = color;
  ctx.fillRect(minX / 4, minY / 4, element.width / 4, element.width / 4);
};

function Frame({ frame, index, onDeleteFrame, onSetCurrentFrame, onAddFrame }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
  }, [frame]);

  const addFrameHandler = () => {
    const newFrame = createMatrix(32);
    onAddFrame(index + 1, newFrame);
  };

  const duplicateFrameHandler = () => {
    const duplicate = createMatrix(32, frame);
    onAddFrame(index + 1, duplicate);
  };
  const deleteFrameHandler = () => onDeleteFrame(index);

  const selectFrameHandler = () => onSetCurrentFrame(index);

  return (
    <div className="framebox-frame">
      <canvas ref={canvasRef} width={128} height={128} onClick={selectFrameHandler} />
      <div className="framebox-frame-buttons">
        <button type="button" onClick={addFrameHandler}>
          ADD
        </button>
        <button type="button" onClick={duplicateFrameHandler}>
          DUPL
        </button>
        <button type="button" onClick={deleteFrameHandler}>
          DEL
        </button>
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  onSetUpdatedFrame: (frame, data) => dispatch(setUpdatedFrame(frame, data)),
  onSetCurrentFrame: (frame) => dispatch(setCurrentFrame(frame)),
  onAddFrame: (frame, data) => dispatch(addFrame(frame, data)),
  onDeleteFrame: (frame) => dispatch(deleteFrame(frame)),
}))(Frame);
