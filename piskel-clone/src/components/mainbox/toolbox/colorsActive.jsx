import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

export default function ColorsActive(props) {
  const { primaryColor, alternativeColor, callback } = props;
  const clickHandler = () => callback(alternativeColor, primaryColor);
  return (
    <div className="toolbox-colors-active">
      <div
        className="toolbox-colors-active__primary"
        style={{ background: primaryColor }}
      />
      <Button data="exchange" icon="exchange" callback={clickHandler} />
      <div
        className="toolbox-colors-active__alternative"
        style={{ background: alternativeColor }}
      />
    </div>
  );
}

ColorsActive.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  alternativeColor: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
