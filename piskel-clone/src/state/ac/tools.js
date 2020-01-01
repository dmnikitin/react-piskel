import { SET_COLOR, SET_ACTIVE_TOOL, SET_PEN_SIZE } from '../variables';

const setActiveTool = (value) => ({
  type: SET_ACTIVE_TOOL,
  payload: value,
});

const setColor = (primaryColor, alternativeColor) => ({
  type: SET_COLOR,
  payload: { primaryColor, alternativeColor },
});

const setPenSize = (value) => ({
  type: SET_PEN_SIZE,
  payload: value,
});

export { setActiveTool, setColor, setPenSize };
