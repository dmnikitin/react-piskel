import { UPDATE_FRAME } from '../variables';

const FramesReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FRAME: {
      console.log(payload);
      return { [payload.frame]: [...payload.data] };
    }
    default:
      return state;
  }
};

export default FramesReducer;
