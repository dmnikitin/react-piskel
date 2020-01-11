import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setButton } from '../../../state/ac/buttons';

function ChangeControl({ tool, onSetButton }) {
  const [isPressed, changePressed] = useState(false);
  const [input, changeInput] = useState({ value: '' });

  const onChangeInput = (e) => changeInput({ value: e.target.value });
  const open = () => changePressed(true);
  const close = () => changePressed(false);
  const changeButton = () => onSetButton(tool, input.value);

  const submit = () => {
    close();
    changeButton();
  };

  const displayedAtRender = (
    <form
      action=""
      onSubmit={submit}
    >
      <input
        autoFocus
        type="text"
        value={input.value}
        onChange={onChangeInput}
      />
    </form>
  );
  const displayedAtPressed = (
    <button type="button" onClick={open}> change </button>
  );

  return isPressed ? displayedAtRender : displayedAtPressed;
}

export default connect(null, (dispatch) => ({
  onSetButton: (tool, button) => dispatch(setButton(tool, button)),
}))(ChangeControl);

ChangeControl.propTypes = {
  tool: PropTypes.string.isRequired,
  onSetButton: PropTypes.func.isRequired,
};
