import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

export default function CanvasSize({ callback }) {
  return (
    <div className="toolbox-canvas">
      <h3>Choose the canvas size</h3>
      <div className="toolbox-canvas__buttons">
        <Button data="32" icon="square-o" callback={callback} />
        <Button data="64" icon="plus-square-o" callback={callback} />
        <Button data="128" icon="plus-square" callback={callback} />
      </div>
    </div>
  );
}

CanvasSize.propTypes = {
  callback: PropTypes.func.isRequired,
};
