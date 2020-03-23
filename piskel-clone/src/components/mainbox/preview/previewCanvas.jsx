import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { drawOnCanvas } from '../../../helpers/canvas';
import { frameSizes } from '../../../assets/data';

const { coeff: { fullPage, preview }, canvas: { small, large } } = frameSizes;
export default function PreviewCanvas(props) {
  const {
    frame, isFull, addFrameToGif, isStarted, frames, count,
  } = props;
  const canvasRef = useRef(null);
  const [frameSize, changeFrameSize] = useState(small);

  const frameSizeHandler = (value) => changeFrameSize(value);

  const drawFrame = (currentFrame, isFullPage, size) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const coeff = isFullPage ? fullPage : preview;
    ctx.clearRect(0, 0, size, size);
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
    return Promise.resolve(canvas);
  };

  useEffect(() => {
    if (frame) {
      drawFrame(frame, isFull, frameSize);
    }
    if (isStarted) {
      getFrame().then((ctx) => {
        if (count < frames.length) {
          addFrameToGif(ctx);
        }
        return () => { };
      });
    }
  }, [frame, isStarted]);

  useEffect(() => {
    if (isFull) {
      frameSizeHandler(large);
      drawFrame(frame, isFull, frameSize);
    } else if (!isFull && frame) {
      frameSizeHandler(small);
      drawFrame(frame, isFull, frameSize);
    }
  }, [isFull]);

  return (
    <div className="preview">
      <canvas ref={canvasRef} width={frameSize} height={frameSize} />
    </div>
  );
}

PreviewCanvas.defaultProps = {
  frames: [],
};

PreviewCanvas.propTypes = {
  frames: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number.isRequired,
  frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
  isFull: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
  addFrameToGif: PropTypes.func.isRequired,
};
