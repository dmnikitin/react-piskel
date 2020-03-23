import {
  SET_COLOR, SET_ACTIVE_TOOL, SET_PEN_SIZE, SET_CANVAS_SIZE,
} from '../variables';

import { active } from '../../assets/data';

const ToolsReducer = (state = active, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ACTIVE_TOOL:
      return { ...state, activeTool: payload };
    case SET_COLOR: {
      const { primaryColor, alternativeColor } = payload;
      return { ...state, colors: { primaryColor, alternativeColor } };
    }
    case SET_PEN_SIZE:
      return { ...state, penSize: payload };
    case SET_CANVAS_SIZE:
      return { ...state, canvasSize: payload };
    default:
      return state;
  }
};

export default ToolsReducer;
