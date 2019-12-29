import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFromLocalStorage } from '../helpers/localStorageHandler';
import combined from './reducers/combined';

const localStorageData = getFromLocalStorage();
const store = createStore(combined, localStorageData, composeWithDevTools());

export default store;
