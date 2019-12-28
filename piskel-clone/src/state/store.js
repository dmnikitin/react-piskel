import { createStore } from 'redux';
import { getFromLocalStorage } from '../helpers/localStorageHandler';
import combined from './reducers/combined';

const localStorageData = getFromLocalStorage();
const store = createStore(combined, localStorageData);

export default store;
