import React, { Fragment } from 'react';

export default function Slider({ frameRateHandler }) {
  const [value, changeValue] = React.useState(12);
  const handleChange = (e) => {
    frameRateHandler(e.target.value);
    changeValue(e.target.value);
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
        min="0"
        max="24"
        value={value}
        onChange={handleChange}
        step="1"
      />
    </Fragment>
  );
}
