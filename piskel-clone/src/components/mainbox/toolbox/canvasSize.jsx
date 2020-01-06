import React from 'react';
import Button from './button';

export default function CanvasSize() {
  return (
    <div className="toolbox-canvas">
      <span>Choose the canvas size</span>
      <div>
        <Button data="basic" icon="square-o" />
        <Button data="medium" icon="plus-square-o" />
        <Button data="large" icon="square-o" />
      </div>
    </div>
  );
}
