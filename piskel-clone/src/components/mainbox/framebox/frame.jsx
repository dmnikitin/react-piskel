import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentFrame, addFrame, deleteFrame } from '../../../state/ac/frames';
import { createMatrix } from '../../../helpers/canvas';

const drawOnCanvas = (ctx, part, color) =>
{
  const minX = part.width * part.place.column;
  const minY = part.width * part.place.row;
  const element = part;
  ctx.fillStyle = color;
  ctx.fillRect(minX / 4, minY / 4, element.width / 4, element.width / 4);
};

// magic numbers all over
// draw func out

function Frame(props)
{
  const {
    frame, index, onDeleteFrame, onSetCurrentFrame, onAddFrame,
  } = props;
  const canvasRef = useRef(null);
  const id = index + 1;

  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame.array.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
  }, [frame || index]);

  const addFrameHandler = () =>
  {
    const newFrame = { id, array: createMatrix(32) };
    onAddFrame(id, newFrame);
    onSetCurrentFrame(id);
  };

  const duplicateFrameHandler = () =>
  {
    const duplicate = { id, array: createMatrix(32, frame.array) };
    onAddFrame(id, duplicate);
    onSetCurrentFrame(id);
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
  onSetCurrentFrame: (frame) => dispatch(setCurrentFrame(frame)),
  onAddFrame: (frame, data) => dispatch(addFrame(frame, data)),
  onDeleteFrame: (frame) => dispatch(deleteFrame(frame)),
}))(Frame);

Frame.propTypes = {
  frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteFrame: PropTypes.func.isRequired,
  onSetCurrentFrame: PropTypes.func.isRequired,
  onAddFrame: PropTypes.func.isRequired,
};
