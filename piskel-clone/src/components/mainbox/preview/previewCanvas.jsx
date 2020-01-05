import React from 'react';
import PropTypes from 'prop-types';

const drawOnCanvas = (ctx, part, color, frameSize) => {
  const minX = part.width * part.place.column;
  const minY = part.width * part.place.row;
  const element = part;
  ctx.fillStyle = color;

  ctx.fillRect(
    minX / (frameSize ? 0.5 : 4),
    minY / (frameSize ? 0.5 : 4),
    element.width / (frameSize ? 0.5 : 4),
    element.width / (frameSize ? 0.5 : 4)
  );
};

export default function PreviewCanvas({ frame, isFull }) {
  const canvasRef = React.useRef(null);
  const [frameSize, changeFrameSize] = React.useState(128);
  React.useEffect(() => {
    if (frame) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, frameSize, frameSize);
      frame.array.forEach((curr) => drawOnCanvas(ctx, curr, curr.color, !!isFull));
    }
  }, [frame]);

  const frameSizeHandler = (value) => {
    changeFrameSize(value);
  };

  React.useEffect(() => {
    if (isFull) {
      frameSizeHandler(1028);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, frameSize, frameSize);
      frame.array.forEach((curr) => drawOnCanvas(ctx, curr, curr.color, !!isFull));
    }
  }, [isFull]);

  return (
    <div className="preview">
      <canvas ref={canvasRef} width={frameSize} height={frameSize} />
    </div>
  );
}

PreviewCanvas.propTypes = {
  frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
};
