import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import PreviewCanvas from './previewCanvas';
import Slider from './slider';
import { changeFrameRate } from '../../../state/ac/frameRate';
import './preview.scss';


// import CCapture from 'ccapture.js';

// const capturer = new CCapture({ format: 'gif', workersPath: '../../../../node_modules/ccapture.js/src/' });


// const frameRateToInterval = (val) => 1000 / (val - 1);

// // let running = false;
// let startgif = false;

// function Preview({ frames, frameRate, onChangeFrameRate }) {
//   const [frame, changeFrame] = React.useState(0);
//   const [isFull, changeFull] = React.useState(false);
//   const [interval, changeInterval] = React.useState();

//   const addFrameToGif = (ctx) => {
//     capturer.capture(ctx);
//   };

//   const update = () => {
//     if (frame === frames.length - 1 && frames.length > 1) {
//     }

//     changeFrame((state) => {
//       const newState = state < frames.length - 1 ? state + 1 : 0;
//       return newState;
//     });
//   };


//   const makeGif = () => {
//     startgif = true;
//     capturer.start();
//     clearInterval(interval);
//     const frameRateOptimised = frameRateToInterval(frameRate);

//     const counter = () => {
//       let i = -1;
//       return () => {
//         if (i < frames.length - 1) {
//           i += 1;
//           return i;
//         }
//       };
//     };
//     const count = counter();

//     const intr = setInterval(() => {
//       const a = count();
//       if (a) {
//         changeFrame(a);
//       }
//       if (!a) {
//         // capturer.stop();
//         startgif = false;
//         capturer.save();
//         // capturer.save( function( blob ) { /* ... */ } );
//         clearInterval(intr);
//       }
//     }, frameRateOptimised);
//     changeInterval(intr);
//   };

//   const frameRateHandler = (val) => {
//     onChangeFrameRate(val);
//     clearInterval(interval);
//     const frameRateOptimised = frameRateToInterval(frameRate);
//     const intr = setInterval(() => update(), frameRateOptimised);
//     changeInterval(intr);
//   };

//   React.useEffect(() => {
//     clearInterval(interval);
//     const frameRateOptimised = frameRateToInterval(frameRate);
//     const intr = setInterval(() => update(), frameRateOptimised);
//     changeInterval(intr);
//   }, [frames]);

//   const goFull = () => changeFull(true);

//   return (
//     <div className="preview">
//       <Fullscreen enabled={isFull} onChange={() => changeFull(isFull)}>
//         <PreviewCanvas isFull={isFull} startgif={startgif} frame={frames[frame]} addFrameToGif={addFrameToGif} />
//       </Fullscreen>
//       <Slider frameRate={frameRate} frameRateHandler={frameRateHandler} />
//       <button type="button" onClick={goFull}> Full Page </button>
//       <button type="button" onClick={makeGif}> gif </button>
//     </div>
//   );
// }

// export default connect((state) => ({
//   frames: state.frames.framesArray,
//   frameRate: state.frameRate,
// }), (dispatch) => ({
//   onChangeFrameRate: (val) => dispatch(changeFrameRate(val)),
// }))(Preview);

// Preview.defaultProps = {
//   frames: [],
// };
// Preview.propTypes = {
//   frames: PropTypes.arrayOf(PropTypes.object),
//   frameRate: PropTypes.number.isRequired,
//   onChangeFrameRate: PropTypes.func.isRequired,
// };
