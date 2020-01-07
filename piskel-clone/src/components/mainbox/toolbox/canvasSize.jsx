import React from 'react';
import Button from '../button';

export default function CanvasSize() {
  return (
    <div className="toolbox-canvas">
      <span>Choose the canvas size</span>
      <div className="toolbox-canvas__buttons">
        <Button data="basic" icon="square-o" />
        <Button data="medium" icon="plus-square-o" />
        <Button data="large" icon="plus-square" />
      </div>
    </div>
  );
}
