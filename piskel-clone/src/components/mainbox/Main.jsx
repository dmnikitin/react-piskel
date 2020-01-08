import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Framebox from './framebox/framebox';
import Preview from './preview/preview';
import Toolbox from './toolbox/toolbox';
import Canvas from './canvas/canvas';
import './Main.scss';
import { setActiveTool, setPenSize, setColor } from '../../state/ac/tools';
import { setCurrentFrame, addFrame, deleteFrame } from '../../state/ac/frames';
import { createMatrix } from '../../helpers/canvas';
import { keyboardEvents, frameSizes, penSizes } from '../../assets/data';

const { matrixLength: { basic } } = frameSizes;


function Main(props) {
  const {
    buttons,
    currentFrame,
    onSetActiveTool,
    onSetPenSize,
    onSetCurrentFrame,
    onAddFrame,
    onDeleteFrame,
    frames,
    colors,
    onSetColor,
    penSize,
  } = props;
  let nameInput;

  let isGif = false;

  React.useEffect(() => {
    nameInput.focus();
  }, []);

  const handleKeyPress = (event) => {
    const e = event.nativeEvent;

    const entries = Object.entries(buttons);
    entries.forEach((key) => {
      if (e.key === key[1]) {
        const id = currentFrame + 1;
        if (key[1] === keyboardEvents.pen
          || key[1] === keyboardEvents.bucket
          || key[1] === keyboardEvents.stroke
          || key[1] === keyboardEvents.eraser
          || key[1] === keyboardEvents.colorPicker
          || key[1] === keyboardEvents.allToOneColor) {
          onSetActiveTool(key[0]);
        }
        if (key[1] === keyboardEvents.add) {
          const newFrame = { id, array: createMatrix(basic) };
          onAddFrame(id, newFrame);
          onSetCurrentFrame(id);
        }
        if (key[1] === keyboardEvents.duplicate) {
          const duplicate = { id, array: createMatrix(basic, frames[currentFrame]) };
          onAddFrame(id, duplicate);
          onSetCurrentFrame(id);
        }
        if (key[1] === keyboardEvents.delete) onDeleteFrame(currentFrame);

        if (key[1] === keyboardEvents.swap) {
          const { alternativeColor, primaryColor } = colors;
          onSetColor(alternativeColor, primaryColor);
        }
        if (key[1] === keyboardEvents.changePenSize) {
          const sizes = Object.keys(penSizes);
          const value = sizes.indexOf(penSize);
          onSetPenSize(value < 2 ? sizes[value] : sizes[0]);
        }
        if (key[1] === keyboardEvents.exportGif) {
          isGif = true;
        }
      }
    });
  };


  return (
    <div
      className="mainbox"
      onKeyDown={handleKeyPress}
      tabIndex="1"
      ref={(input) => {
        nameInput = input;
      }}
    >

      <Framebox />
      <Canvas />
      {/* <Preview isGif={isGif} /> */}
      <Toolbox />
    </div>
  );
}

export default connect((state) => ({
  buttons: state.buttons,
  frames: state.frames.framesArray,
  currentFrame: state.frames.currentFrame,
  colors: state.tools.colors,
  penSize: state.tools.penSize,
}), (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetColor: (alternative, primary) => dispatch(setColor(alternative, primary)),
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
