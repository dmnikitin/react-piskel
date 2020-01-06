import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.scss';
import Mainbox from '../mainbox/mainbox';
import { setActiveTool, setPenSize } from '../../state/ac/tools';

function App({ buttons, onSetActiveTool }) {
  let nameInput;
  React.useEffect(() => {
    nameInput.focus();
  }, []);
  const handleKeyPress = (e) => {
    const entries = Object.entries(buttons);
    entries.forEach((key) => {
      if (e.keyCode === key[1]) {
        onSetActiveTool(key[0]);
      }
    });
  };

  return (
    <div
      className="App"
      onKeyDown={handleKeyPress}
      tabIndex="1"
      ref={(input) => {
        nameInput = input;
      }}
    >
      <header className="App-header">
        <h3>PISKEL</h3>
      </header>
      <Mainbox />
    </div>
  );
}

export default connect((state) => ({
  buttons: state.buttons,
}), (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetPenSize: (size) => dispatch(setPenSize(size)),
}))(App);

// store.subscribe(() => saveToLocalStorage(store.getState()));

App.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetActiveTool: PropTypes.func.isRequired,
  onSetPenSize: PropTypes.func.isRequired,
};
