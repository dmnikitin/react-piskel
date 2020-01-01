import { UPDATE_FRAME, SET_CURRENT_FRAME, ADD_FRAME, DELETE_FRAME } from '../variables';

const setUpdatedFrame = (frame, data) => ({
  type: UPDATE_FRAME,
  payload: { frame, data },
});

const setCurrentFrame = (frame) => ({
  type: SET_CURRENT_FRAME,
  payload: frame,
});

const addFrame = (frame, data) => ({
  type: ADD_FRAME,
  payload: { frame, data },
});

const deleteFrame = (frame) => ({
  type: DELETE_FRAME,
  payload: frame,
});

export { setUpdatedFrame, setCurrentFrame, addFrame, deleteFrame };
