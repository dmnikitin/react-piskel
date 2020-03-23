import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { defaultFrameRate } from '../../../assets/data';
import 'react-input-range/lib/css/index.css';

export default function Slider({ frameRateHandler, frameRate }) {
  const [value, changeValue] = useState(frameRate);

  const handleChange = (rate) => {
    changeValue(rate);
    frameRateHandler(rate);
  };

  return (
    <Fragment className="preview-slider">
      <InputRange
        maxValue={24}
        minValue={1}
        value={value}
        step={1}
        onChange={(val) => handleChange(val)}
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


// <input
// id="fps"
// type="range"
// min="1"
// max="24"
// value={value}
// onChange={handleChange}
// step="1"
// />
