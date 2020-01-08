import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import CCapture from 'ccapture.js';
// import toApng from 'gif-to-apng';
import PreviewCanvas from './previewCanvas';
import Slider from './slider';
import { changeFrameRate } from '../../../state/ac/frameRate';
import './preview.scss';

const capturer = new CCapture({ format: 'gif', workersPath: '../../../../node_modules/ccapture.js/src/' });
const frameRateToInterval = (val) => 1000 / (val - 1);

// let running = false;
let isStarted = false;

function Preview({ frames, frameRate, isGif, onChangeFrameRate }) {
  const [frame, changeFrame] = useState(0);
  const [isFull, changeFull] = useState(false);
  const [interval, changeInterval] = useState();

  const addFrameToGif = (ctx) => {
    capturer.capture(ctx);
  };

 useEffect( ()=>{
  if (isGif) makeGif()
 }, [isGif]);

  const update = () => {
    // if (frame === frames.length - 1 && frames.length > 1) {
    // }
    changeFrame((state) => {
      const newState = state < frames.length - 1 ? state + 1 : 0;
      return newState;
    });
  };


  const makeGif = (apng) => {
    isStarted = true;
    capturer.start();
    clearInterval(interval);
    const frameRateOptimised = frameRateToInterval(frameRate);

    const counter = () => {
      let i = -1;
      return () => {
        if (i < frames.length - 1) {
          i += 1;
          return i;
        }
      };
    };
    const count = counter();

    const intr = setInterval(() => {
      const a = count();
      if (a) {
        changeFrame(a);
      }
      if (!a) {
        capturer.stop();
        isStarted = false;
        capturer.save();
        // if (apng) {
        //   capturer.save((blob) => {
        //     // toApng(blob).then(() => console.log('success'))
        //   });
        // }
        clearInterval(intr);
      }
    }, frameRateOptimised);
    changeInterval(intr);
  };

  const frameRateHandler = (val) => {
    onChangeFrameRate(val);
    clearInterval(interval);
    const frameRateOptimised = frameRateToInterval(frameRate);
    const intr = setInterval(() => update(), frameRateOptimised);
    changeInterval(intr);
  };

  useEffect(() => {
    clearInterval(interval);
    const frameRateOptimised = frameRateToInterval(frameRate);
    const intr = setInterval(() => update(), frameRateOptimised);
    changeInterval(intr);
  }, [frames]);


  const goFull = () => changeFull(true);

  return (
    <div className="preview">
      <Fullscreen enabled={isFull} onChange={(full) => changeFull(full)}>
        <PreviewCanvas isFull={isFull} isStarted={isStarted} frame={frames[frame]} addFrameToGif={addFrameToGif} />
      </Fullscreen>
      <Slider frameRate={frameRate} frameRateHandler={frameRateHandler} />
      <div className="preview-buttons">
        <span>Animation options</span>
        <div className="preview-buttons__wrapper">
          <button type="button" onClick={goFull}>Full Page</button>
          <button type="button" onClick={makeGif}>Export GIF</button>
          <button type="button" onClick={makeGif}>Export APNG</button>
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
};
