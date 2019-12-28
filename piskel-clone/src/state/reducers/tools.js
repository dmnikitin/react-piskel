import {
  SET_PRIMARY_COLOR,
  SET_ALTERNATIVE_COLOR,
  SET_ACTIVE_TOOL,
  SET_PEN_SIZE,
} from '../variables';

import { toolsState } from '../../assets/data';

const ToolsReducer = (state = toolsState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ACTIVE_TOOL:
      return { ...state, activeTool: payload };
    case SET_PRIMARY_COLOR:
      return { ...state, primaryColor: payload };
    case SET_ALTERNATIVE_COLOR:
      return { ...state, alternativeColor: payload };
    case SET_PEN_SIZE:
      return { ...state, penSize: payload };
    default:
      return state;
  }
};

export default ToolsReducer;
