import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentFrame, addFrame, deleteFrame } from '../../../state/ac/frames';
import { createMatrix, drawOnCanvas } from '../../../helpers/canvas';
import { frameSizes } from '../../../assets/data';
import Button from '../button';


const { coeff: { preview }, canvas: { small } } = frameSizes;

function Frame(props) {
  const {
    frame, index, onDeleteFrame, onSetCurrentFrame, onAddFrame, matrixLength,
  } = props;
  const canvasRef = useRef(null);
  const id = index + 1;

  useEffect(() => {
    console.log('frame', frame);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame.array.forEach((curr) => {
      const position = {
        x: curr.width * curr.place.column,
        y: curr.width * curr.place.row,
        width: curr.width,
      };
      drawOnCanvas(ctx, position, curr.color, preview);
    });
  }, [frame]);

  const addFrameHandler = () => {
    const newFrame = { id, array: createMatrix(matrixLength) };
    onAddFrame(id, newFrame);
    onSetCurrentFrame(id);
  };

  const duplicateFrameHandler = () => {
    const duplicate = { id, array: createMatrix(matrixLength, frame.array) };
    onAddFrame(id, duplicate);
    onSetCurrentFrame(id);
  };

  const deleteFrameHandler = () => onDeleteFrame(index);
  const selectFrameHandler = () => onSetCurrentFrame(index);

  return (
    <div className="framebox-frame">
      <canvas ref={canvasRef} width={small} height={small} onClick={selectFrameHandler} />
      <div className="framebox-frame-buttons">
        <Button data="add" icon="plus" callback={addFrameHandler} />
        <Button data="duplicate" icon="copy" callback={duplicateFrameHandler} />
        <Button data="delete" icon="trash" callback={deleteFrameHandler} />
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
  matrixLength: PropTypes.number.isRequired,
};
