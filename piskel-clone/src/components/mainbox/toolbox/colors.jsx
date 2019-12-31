import React from 'react';
import { connect } from 'react-redux';
import { colors } from '../../../assets/data';

import { setPrimaryColor, setAlternativeColor } from '../../../state/ac/tools';

function ColorsBox(props) {
  const { onSetAlternativeColor, onSetPrimaryColor, primaryColor } = props;
  React.useEffect(() => {}, []);
  const clickHandler = (e) => {
    // const { nativeEvent } = e;
    // console.log('native', nativeEvent);
    onSetAlternativeColor(primaryColor);
    // onSetPrimaryColor(nativeEvent.target.key);
    onSetPrimaryColor(colors[e]);
  };
  return (
    <section className="toolbox-colors">
      <ColorsActive props={props} />
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
  const { primaryColor, alternativeColor, onSetAlternativeColor, onSetPrimaryColor } = props.props;
  React.useEffect(() => {
    console.log('props', props);
  }, []);
  const clickHandler = (e) => {
    onSetAlternativeColor(primaryColor);
    onSetPrimaryColor(alternativeColor);
  };
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
    primaryColor: state.tools.primaryColor,
    alternativeColor: state.tools.alternativeColor,
  }),
  (dispatch) => ({
    onSetPrimaryColor: (color) => dispatch(setPrimaryColor(color)),
    onSetAlternativeColor: (color) => dispatch(setAlternativeColor(color)),
  })
)(ColorsBox);
