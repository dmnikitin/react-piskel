import React from 'react';
import Button from './button';

export default function Pensize() {
  return (
    <div className="toolbox-pensize">
      <span>Choose the pen size</span>
      <div>
        <Button data="normal" icon="pencil" />
        <Button data="medium" icon="pencil-square-o" />
        <Button data="large" icon="pencil-square" />
      </div>
    </div>
  );
}
