import React from 'react';
import { Provider } from 'react-redux';
import store from '../state/store';
import { App } from './app/App';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;

// store.subscribe(() => saveToLocalStorage(store.getState()));
