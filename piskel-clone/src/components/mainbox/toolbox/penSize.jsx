import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

export default function Pensize({ callback }) {
  return (
    <div className="toolbox-pensize">
      <span>Choose the pen size</span>
      <div className="toolbox-pensize__buttons">
        <Button data="small" icon="pencil" callback={callback} />
        <Button data="medium" icon="pencil-square-o" callback={callback} />
        <Button data="large" icon="pencil-square" callback={callback} />
      </div>
    </div>
  );
}

Pensize.propTypes = {
  callback: PropTypes.func.isRequired,
};
