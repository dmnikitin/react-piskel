import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { defaultFrameRate } from '../../../assets/data';

export default function Slider({ frameRateHandler, frameRate }) {
  const [value, changeValue] = useState(frameRate);

  const handleChange = (e) => {
    changeValue(e.target.value);
    frameRateHandler(e.target.value);
  };

  return (
    <Fragment className="preview-slider">
      <h4>
        FPS:
        {value}
      </h4>
      <input
        id="fps"
        type="range"
        min="1"
        max="24"
        value={value}
        onChange={handleChange}
        step="1"
      />
    </Fragment>
  );
}

Slider.defaultProps = {
  frameRate: defaultFrameRate,
};

Slider.propTypes = {
  frameRateHandler: PropTypes.func.isRequired,
  frameRate: PropTypes.number,
};
