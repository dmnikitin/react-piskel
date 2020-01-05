import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Mainbox from '../mainbox/mainbox.jsx';
import { keyboardEvents } from '../../assets/data';
import { setActiveTool, setPenSize } from '../../state/ac/tools';

function App({ onSetActiveTool }) {
  let nameInput;
  React.useEffect(() => {
    nameInput.focus();
  }, []);
  const handleKeyPress = (e) => {
    const entries = Object.entries(keyboardEvents);
    entries.forEach((key) => {
      if (e.keyCode === key[1]) {
        // try catch?
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

export default connect(null, (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetPenSize: (size) => dispatch(setPenSize(size)),
}))(App);

// store.subscribe(() => saveToLocalStorage(store.getState()));
