import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    buttons, icon, data, callback,
  } = props;
  const [state, changeState] = React.useState(false);
  const handleMouseIn = () => changeState(true);
  const handleMouseOut = () => changeState(false);
  const handleClick = (e) => callback(e.currentTarget.getAttribute('data'));
  const className = `${state ? 'tooltip-open' : 'tooltip-closed'} button`;
  const toolTip = `${data}(${String.fromCharCode(buttons[data])})`;

  return (
    <div>
      <button
        type="button"
        data={data}
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseIn}
        onBlur={handleMouseOut}
        onClick={handleClick}
      >
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </button>
      <div>
        <div className={className}>{toolTip}</div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  buttons: state.buttons,
}))(Button);

Button.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  icon: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
