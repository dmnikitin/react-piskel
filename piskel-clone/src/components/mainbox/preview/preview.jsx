import React from 'react';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';
import PreviewCanvas from './previewCanvas.jsx';
import Slider from './slider.jsx';
import './preview.scss';

function Preview({ frames }) {
  const [frameRate, changeFrameRate] = React.useState(83);
  const [frame, changeFrame] = React.useState(0);
  const [isFull, changeFull] = React.useState(false);

  const [interval, changeInterval] = React.useState();

  const update = () => {
    changeFrame((state) => {
      const newState = state < frames.length - 1 ? state + 1 : 0;
      return newState;
    });
  };

  const frameRateHandler = (value) => {
    console.log(value);
    changeFrameRate(1000 / value);
    changeInterval(clearInterval(interval));
    const intr = setInterval(() => update(), frameRate);
    changeInterval(intr);
  };

  React.useEffect(() => {
    const intr = setInterval(() => update(), frameRate);
    changeInterval(intr);
    return () => {
      clearInterval(intr);
    };
  }, [frames]);

  const goFull = () => changeFull(true);

  return (
    <div className="preview">
      <Fullscreen enabled={isFull} onChange={() => changeFull(isFull)}>
        <PreviewCanvas isFull={isFull} frame={frames[frame]} />
      </Fullscreen>
      <Slider frameRateHandler={frameRateHandler} />
      <button onClick={goFull}> Full Page</button>
    </div>
  );
}

export default connect((state) => ({
  frames: state.frames.framesArray,
}))(Preview);
