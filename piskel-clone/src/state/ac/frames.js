import { UPDATE_FRAME, SET_CURRENT_FRAME, ADD_FRAME } from '../variables';

const setUpdatedFrame = (frame, data) => ({
  type: UPDATE_FRAME,
  payload: { frame, data },
});

const setCurrentFrame = (frame) => ({
  type: SET_CURRENT_FRAME,
  payload: frame,
});

const addFrame = (frame) => ({
  type: ADD_FRAME,
  payload: frame,
});

export { setUpdatedFrame, setCurrentFrame, addFrame };
