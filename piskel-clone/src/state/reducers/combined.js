import { combineReducers } from 'redux';
import ToolsReducer from './tools';
import FramesReducer from './frames';
import ButtonsReducer from './buttons';
import FrameRateReducer from './frameRate';

const combined = combineReducers({
  tools: ToolsReducer,
  frames: FramesReducer,
  buttons: ButtonsReducer,
  frameRate: FrameRateReducer,
});

export default combined;
