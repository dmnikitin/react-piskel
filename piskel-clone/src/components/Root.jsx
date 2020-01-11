import React from 'react';
import { Provider } from 'react-redux';
import store from '../state/store';
import { App } from './app/App';
import { saveToLocalStorage } from '../helpers/localStorageHandler';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
store.subscribe(() => saveToLocalStorage(store.getState()));
export default Root;
