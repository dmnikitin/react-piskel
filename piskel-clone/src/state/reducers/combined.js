import { combineReducers } from 'redux';
import ToolsReducer from './tools';

const combined = combineReducers({
  tools: ToolsReducer,
});

export default combined;
