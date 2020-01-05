import React from 'react';
import { connect } from 'react-redux';
import { setActiveTool, setPenSize } from '../../../state/ac/tools';

function Button({ icon, data, onSetActiveTool }) {
  const [state, changeState] = React.useState(false);
  const handleMouseIn = () => changeState(true);
  const handleMouseOut = () => changeState(false);
  const handleClick = (e) => onSetActiveTool(e.currentTarget.getAttribute('data'));

  const className = `${state ? 'tooltip-open' : 'tooltip-closed'} button`;

  return (
    <div>
      <button
        type="button"
        data={data}
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        onMouseonFocus={handleMouseIn}
        onBlur={handleMouseOut}
        onClick={handleClick}
      >
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </button>
      <div>
        <div className={className}>{data}</div>
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetPenSize: (size) => dispatch(setPenSize(size)),
}))(Button);

// onMouseOver={handleToolTip} onMouseOut={handleToolTip}
