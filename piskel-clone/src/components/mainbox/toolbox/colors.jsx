import React from 'react';
import { connect } from 'react-redux';
import { setColor } from '../../../state/ac/tools';
import { colors } from '../../../assets/data';

function ColorsBox(props) {
  const { onSetColor, primaryColor, alternativeColor } = props;
  const clickHandler = (e) => onSetColor(colors[e], primaryColor);

  return (
    <section className="toolbox-colors">
      <ColorsActive
        onSetColor={onSetColor}
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

function ColorsActive(props) {
  const { primaryColor, alternativeColor, onSetColor } = props;
  // React.useEffect(() => {
  //   console.log('props', props);
  // }, []);
  const clickHandler = () => onSetColor(alternativeColor, primaryColor);
  return (
    <div className="toolbox-colors-active">
      <div className="toolbox-colors-active__primary" style={{ background: primaryColor }} />
      <button type="button" className="toolbox-colors-active__switcher" onClick={clickHandler}>
        Switch
      </button>
      <div
        className="toolbox-colors-active__alternative"
        style={{ background: alternativeColor }}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    primaryColor: state.tools.colors.primaryColor,
    alternativeColor: state.tools.colors.alternativeColor,
  }),
  (dispatch) => ({
    onSetColor: (primary, alternative) => dispatch(setColor(primary, alternative)),
  })
)(ColorsBox);
