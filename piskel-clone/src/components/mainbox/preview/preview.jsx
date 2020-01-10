import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import CCapture from 'ccapture.js';
import PreviewCanvas from './previewCanvas';
import Slider from './slider';
import { changeFrameRate } from '../../../state/ac/frameRate';
import './preview.scss';

const frameRateToInterval = (val) => 1000 / val;
let isStarted = false;
let count = 0;
function Preview(props) {
  const {
    frames, frameRate, isGif, onChangeFrameRate,
  } = props;
  const [frame, changeFrame] = useState(0);
  const [isFull, changeFull] = useState(false);
  const [interval, changeInterval] = useState();
  const [capturer, changeCapturer] = useState();

  const update = () => changeFrame((state) => {
    const newState = state < frames.length - 1 ? state + 1 : 0;
    return newState;
  });

  const addFrameToGif = (ctx) => {
    capturer.capture(ctx);
    count += 1;
  };

  const makeGif = () => {
    isStarted = true;
    changeFrame(0);
    capturer.start();
    setTimeout(() => {
      capturer.stop();
      isStarted = false;
      capturer.save();
      changeCapturer({});
    }, (1000 / frameRate) * frames.length);
  };

  const frameRateHandler = (val) => onChangeFrameRate(val);
  const goFull = () => changeFull(true);

  const intervalHandler = () => {
    clearInterval(interval);
    const frameRateOptimised = frameRateToInterval(frameRate);
    const intr = setInterval(() => update(), frameRateOptimised);
    changeInterval(intr);
  };

  useEffect(() => {
    if (frameRate || frames) {
      intervalHandler();
      const newCapt = new CCapture({
        format: 'gif', framerate: frameRate, verbose: true, workersPath: '../../../../node_modules/ccapture.js/src/',
      });
      changeCapturer(newCapt);
      return () => { };
    }
    return () => { };
  }, [frameRate, frames]);

  useEffect(() => {
    if (isGif) makeGif();
  }, [isGif]);

  return (
    <div className="preview">
      <Fullscreen enabled={isFull} onChange={(full) => changeFull(full)}>
        <PreviewCanvas
          isFull={isFull}
          isStarted={isStarted}
          frame={frames[frame]}
          frames={frames}
          addFrameToGif={addFrameToGif}
          count={count}
        />
      </Fullscreen>
      <Slider frameRate={frameRate} frameRateHandler={frameRateHandler} />
      <div className="preview-buttons">
        <div className="preview-buttons__wrapper">
          <button type="button" onClick={goFull}>Full Page</button>
          <button type="button" onClick={makeGif}>Export GIF</button>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  frames: state.frames.framesArray,
  frameRate: state.frameRate,
}), (dispatch) => ({
  onChangeFrameRate: (val) => dispatch(changeFrameRate(val)),
}))(Preview);

Preview.defaultProps = {
  frames: [],
};
Preview.propTypes = {
  frames: PropTypes.arrayOf(PropTypes.object),
  frameRate: PropTypes.number.isRequired,
  onChangeFrameRate: PropTypes.func.isRequired,
  isGif: PropTypes.bool.isRequired,
};
