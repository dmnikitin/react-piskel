import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import store from '../../state/store';
import Mainbox from '../mainbox/mainbox.jsx';
import { saveToLocalStorage } from '../../helpers/localStorageHandler';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h3>PISKEL</h3>
        </header>
        <Mainbox />
      </div>
    </Provider>
  );
}

export default App;

// store.subscribe(() => saveToLocalStorage(store.getState()));
