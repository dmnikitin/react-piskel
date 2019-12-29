import { combineReducers } from 'redux';
import ToolsReducer from './tools';
import FramesReducer from './frames';

const combined = combineReducers({
  tools: ToolsReducer,
  frames: FramesReducer,
});

export default combined;
