import React from 'react';
import './mainbox.scss';
import Canvas from './canvas/canvas';
import Framebox from './framebox/framebox';
import Preview from './preview/preview';
import Toolbox from './toolbox/toolbox';

export default function Mainbox() {
  return (
    <div className="mainbox">
      <Framebox />
      <Canvas />

      <Toolbox />
    </div>
  );
}
