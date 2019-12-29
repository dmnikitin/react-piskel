import React from 'react';
import { connect } from 'react-redux';
import './framebox.scss';

function Framebox({ frames }) {
  return (
    <div className="framebox">
      <Frame frame={frames[0]} />
    </div>
  );
}

export default connect((state) => ({
  frames: state.frames,
}))(Framebox);

const drawOnCanvas = (ctx, place, color) => {
  const minX = place.width * place.place.column;
  const minY = place.width * place.place.row;
  const element = place;
  ctx.fillStyle = color;
  ctx.fillRect(minX / 4, minY / 4, element.width / 4, element.width / 4);
};

function Frame({ frame }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    frame.forEach((curr) => drawOnCanvas(ctx, curr, curr.color));
  }, [frame]);

  return (
    <div>
      <canvas ref={canvasRef} width={128} height={128} />
    </div>
  );
}
