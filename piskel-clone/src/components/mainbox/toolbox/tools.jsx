import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

export default function Tools({ callback }) {
  return (
    <div className="toolbox-tools">
      <Button data="pen" icon="pencil" callback={callback} />
      <Button data="eraser" icon="eraser" callback={callback} />
      <Button data="colorPicker" icon="eyedropper" callback={callback} />
      <Button data="stroke" icon="arrows-h" callback={callback} />
      <Button data="bucket" icon="shower" callback={callback} />
      <Button data="allToOneColor" icon="magic" callback={callback} />
    </div>
  );
}

Tools.propTypes = {
  callback: PropTypes.func.isRequired,
};
