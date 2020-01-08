import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { drawOnCanvas } from '../../../helpers/canvas';
import { frameSizes } from '../../../assets/data';

const { coeff: { fullPage, preview }, canvas: { small, large } } = frameSizes;
export default function PreviewCanvas(props) {
  const {
    frame, isFull, addFrameToGif, isStarted,
  } = props;
  const canvasRef = useRef(null);
  const [frameSize, changeFrameSize] = useState(small);

  const frameSizeHandler = (value) => changeFrameSize(value);

  const drawFrame = (currentFrame, isFullPage, size) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const coeff = isFullPage ? fullPage : preview;
    ctx.clearRect(0, 0, size, size);
    // currentFrame.array.forEach((curr) => drawOnCanvas(ctx, curr, curr.color, coeff));
    currentFrame.array.forEach((curr) => {
      const position = {
        x: curr.width * curr.place.column,
        y: curr.width * curr.place.row,
        width: curr.width,
      };
      drawOnCanvas(ctx, position, curr.color, coeff);
    });
  };

  const getFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // const imageData = ctx.getImageData(0, 0, frameSize, frameSize);
    return Promise.resolve(canvas);
  };

  useEffect(() => {
    if (frame) {
      drawFrame(frame, isFull, frameSize);
      if (isStarted) {
        getFrame().then((ctx) => {
          console.log('adding');
          addFrameToGif(ctx);
        });
      }
    }
  }, [frame, isStarted]);


  useEffect(() => {
    console.log('____1');
    if (isFull) {
      frameSizeHandler(large);
      drawFrame(frame, isFull, frameSize);
    } else if (!isFull && frame) {
      console.log('okk');
      frameSizeHandler(small);
      drawFrame(frame, isFull, frameSize);
    }
    // else {
    // }
  }, [isFull]);

  return (
    <div className="preview">
      <canvas ref={canvasRef} width={frameSize} height={frameSize} />
    </div>
  );
}

PreviewCanvas.propTypes = {
  frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
  isFull: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
  addFrameToGif: PropTypes.func.isRequired,
};
