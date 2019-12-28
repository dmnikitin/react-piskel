import {
  SET_PRIMARY_COLOR,
  SET_ALTERNATIVE_COLOR,
  SET_ACTIVE_TOOL,
  SET_PEN_SIZE,
} from '../variables';

const setActiveTool = (value) => ({
  type: SET_ACTIVE_TOOL,
  payload: value,
});

const setPrimaryColor = (value) => ({
  type: SET_PRIMARY_COLOR,
  payload: value,
});

const setAlternativeColor = (value) => ({
  type: SET_ALTERNATIVE_COLOR,
  payload: value,
});

const setPenSize = (value) => ({
  type: SET_PEN_SIZE,
  payload: value,
});


export {
  setActiveTool,
  setPrimaryColor,
  setAlternativeColor,
  setPenSize,
};
