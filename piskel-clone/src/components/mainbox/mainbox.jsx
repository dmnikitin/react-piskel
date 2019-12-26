import React from 'react';
import './mainbox.scss';
import Canvas from './canvas/canvas.jsx';
import Framebox from './framebox/framebox.jsx';
import Preview from './preview/preview.jsx';
import Toolbox from './toolbox/toolbox.jsx';

function Mainbox() {
  return (
    <div className="mainbox">
      <Framebox />
      <Canvas />
      <Preview />
      <Toolbox />
    </div>
  );
}

export default Mainbox;
