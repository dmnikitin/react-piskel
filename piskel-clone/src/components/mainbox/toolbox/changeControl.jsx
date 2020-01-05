import React from 'react';
import { connect } from 'react-redux';
import { setButton } from '../../../state/ac/buttons';

function ChangeControl({ tool, onSetButton }) {
  const [isPressed, changePressed] = React.useState(false);
  const [input, changeInput] = React.useState({ value: '' });

  const changeButton = () => onSetButton(tool, input.value);
  const onChangeInput = (e) => {
    console.log(e);
    changeInput({ value: e.target.value });
  };
  const open = () => changePressed(true);
  const close = () => changePressed(false);

  return isPressed ? (
    <form
      action=""
      onSubmit={() => {
        close();
        console.log(tool, input);
        changeButton();
      }}
    >
      <input type="text" value={input.value} onChange={onChangeInput} />
    </form>
  ) : (
    <button onClick={open}> change </button>
  );
}

export default connect(null, (dispatch) => ({
  onSetButton: (tool, button) => dispatch(setButton(tool, button)),
}))(ChangeControl);
