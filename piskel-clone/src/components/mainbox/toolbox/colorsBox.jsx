import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ColorsActive from './colorsActive';
import { setColor } from '../../../state/ac/tools';
import { colors } from '../../../assets/data';

function ColorsBox(props) {
  const { onSetColor, primaryColor, alternativeColor } = props;
  const clickHandler = (e) => onSetColor(colors[e], primaryColor);
  const swapColor = () => onSetColor(alternativeColor, primaryColor);

  return (
    <section className="toolbox-colors">
      <ColorsActive
        callback={swapColor}
        primaryColor={primaryColor}
        alternativeColor={alternativeColor}
      />
      <ul className="toolbox-colors-palette">
        {Object.keys(colors)
          .filter((e, ind) => {
            if (ind > 0) return e;
          })
          .map((currentItem) => (
            <li
              key={currentItem}
              style={{ background: colors[currentItem] }}
              onClick={() => clickHandler(currentItem)}
            />
          ))}
      </ul>
    </section>
  );
}

export default connect(
  (state) => ({
    primaryColor: state.tools.colors.primaryColor,
    alternativeColor: state.tools.colors.alternativeColor,
  }),
  (dispatch) => ({
    onSetColor: (primary, alternative) => dispatch(setColor(primary, alternative)),
  }),
)(ColorsBox);

ColorsBox.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  alternativeColor: PropTypes.string.isRequired,
  onSetColor: PropTypes.func.isRequired,
};
