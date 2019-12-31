import React from 'react';
import './mainbox.scss';
// import { connect } from 'react-redux';
import Canvas from './canvas/canvas.jsx';
import Framebox from './framebox/framebox.jsx';
import Preview from './preview/preview.jsx';
import Toolbox from './toolbox/toolbox.jsx';

export default function Mainbox() {
  return (
    <div className="mainbox">
      <Framebox />
      <Canvas />
      <Preview />
      <Toolbox />
    </div>
  );
}

// export default connect((state) => ({
//   currentFrame: state.frames.currentFrame,
// }))(Mainbox);
