import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Mainbox from '../mainbox/mainbox';
import Navbar from '../navbar/navbar';
import './Main.scss';
import { setActiveTool, setPenSize } from '../../state/ac/tools';
import { setCurrentFrame, addFrame, deleteFrame } from '../../state/ac/frames';
import { createMatrix } from '../../helpers/canvas';
import { keyboardEvents, frameSizes } from '../../assets/data';

const { matrixLength: { basic } } = frameSizes;


// exportGif: 'g',
// exportApng: 'h',
// switchColor: 's',
// resizeCanvas: 'r',
// changePenSize: 'z',


function Main(props) {
  const {
    buttons, currentFrame, onSetActiveTool, onSetPenSize,
    onSetCurrentFrame,
    onAddFrame,
    onDeleteFrame,
    frames,
  } = props;
  let nameInput;
  React.useEffect(() => {
    nameInput.focus();
  }, []);
  const handleKeyPress = (e) => {
    const entries = Object.entries(buttons);
    entries.forEach((key) => {
      if (e.key === key[1]) {
        const id = currentFrame + 1;
        if (key[0] === keyboardEvents.pen || key[0] === keyboardEvents.bucket || key[0] === keyboardEvents.stroke || key[0] === keyboardEvents.eraser || key[0] === keyboardEvents.colorPicker || key[0] === keyboardEvents.allToOneColor) {
          console.log('tool');
          onSetActiveTool(key[0]);
        }
        if (key[0] === keyboardEvents.add) {
          const newFrame = { id, array: createMatrix(basic) };
          onAddFrame(id, newFrame);
          onSetCurrentFrame(id);
        }
        if (key[0] === keyboardEvents.duplicate) {
          const duplicate = { id, array: createMatrix(basic, frames[currentFrame]) };
          onAddFrame(id, duplicate);
          onSetCurrentFrame(id);
        }
        if (key[0] === keyboardEvents.delete) onDeleteFrame(currentFrame);
      }
    });
  };


  return (
    <div
      className="Main"
      onKeyDown={handleKeyPress}
      tabIndex="1"
      ref={(input) => {
        nameInput = input;
      }}
    >
      <Navbar />
      <Mainbox />
    </div>
  );
}

export default connect((state) => ({
  buttons: state.buttons,
  frames: state.frames.framesArray,
  currentFrame: state.frames.currentFrame,
}), (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetPenSize: (size) => dispatch(setPenSize(size)),
  onSetCurrentFrame: (frame) => dispatch(setCurrentFrame(frame)),
  onAddFrame: (frame, data) => dispatch(addFrame(frame, data)),
  onDeleteFrame: (frame) => dispatch(deleteFrame(frame)),
}))(Main);

// store.subscribe(() => saveToLocalStorage(store.getState()));

Main.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetActiveTool: PropTypes.func.isRequired,
  onSetPenSize: PropTypes.func.isRequired,
  onSetCurrentFrame: PropTypes.func.isRequired,
  onAddFrame: PropTypes.func.isRequired,
  onDeleteFrame: PropTypes.func.isRequired,
};
