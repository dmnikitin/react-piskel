import React from 'react';
import { connect } from 'react-redux';
import './framebox.scss';
import { setUpdatedFrame, setCurrentFrame } from '../../../state/ac/frames.js';
import { createMatrix } from '../../../helpers/canvas';

function Framebox(props) {
  const { framesArray, currentFrame } = props.frames;

  React.useEffect(() => {}, [currentFrame]);

  const addFrameHandler = () => {
    const frame = createMatrix(32);
    props.onSetUpdatedFrame(currentFrame + 1, frame);
    props.onSetCurrentFrame(currentFrame + 1);
  };

  return (
    <div className="framebox">
      {framesArray.map((current, index) => (
        <Frame
          onSetCurrentFrame={props.onSetCurrentFrame}
          index={index}
          frame={framesArray[index]}
        />
      ))}
      <button type="button" onClick={addFrameHandler} />
    </div>
  );
}
// <Frame frame={frames[0]} />

export default connect(
  (state) => ({
    frames: state.frames,
  }),
  (dispatch) => ({
    onSetUpdatedFrame: (frame, data) => dispatch(setUpdatedFrame(frame, data)),
    onSetCurrentFrame: (frame) => dispatch(setCurrentFrame(frame)),
  })
)(Framebox);

const drawOnCanvas = (ctx, place, color) => {
  const minX = place.width * place.place.column;
  const minY = place.width * place.place.row;
  const element = place;
  ctx.fillStyle = color;
  ctx.fillRect(minX / 4, minY / 4, element.width / 4, element.width / 4);
};

function Frame({ frame, index, onSetCurrentFrame }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
  }, [frame]);

  const selectFrameHandler = (ind) => {
    onSetCurrentFrame(ind);
  };

  return (
    <div onClick={() => selectFrameHandler(index)}>
      <canvas ref={canvasRef} width={128} height={128} />
    </div>
  );
}
