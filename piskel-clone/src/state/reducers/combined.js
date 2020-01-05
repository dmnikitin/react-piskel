import { combineReducers } from 'redux';
import ToolsReducer from './tools';
import FramesReducer from './frames';
import ButtonsReducer from './buttons';

const combined = combineReducers({
  tools: ToolsReducer,
  frames: FramesReducer,
  buttons: ButtonsReducer,
});

export default combined;
