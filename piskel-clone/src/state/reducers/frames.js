import {
  UPDATE_FRAME,
  SET_CURRENT_FRAME,
  ADD_FRAME,
  DELETE_FRAME,
  REARRANGE_FRAMES,
} from '../variables';

const defaultState = { framesArray: [], currentFrame: 0 };
const FramesReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  const newArray = [...state.framesArray];
  switch (type) {
    case UPDATE_FRAME: {
      newArray.splice(payload.frame, 1, payload.data);
      return { ...state, framesArray: newArray };
    }
    case REARRANGE_FRAMES: {
      const { dragIndex, hoverIndex } = payload;
      [newArray[dragIndex], newArray[hoverIndex]] = [newArray[hoverIndex], newArray[dragIndex]];
      return { ...state, framesArray: newArray };
    }
    case ADD_FRAME: {
      newArray.splice(payload.frame, 0, payload.data);
      return { currentFrame: payload.frame, framesArray: newArray };
    }
    case DELETE_FRAME: {
      if (newArray.length > 1) newArray.splice(payload, 1);
      return { currentFrame: payload, framesArray: newArray };
    }
    case SET_CURRENT_FRAME: {
      return { ...state, currentFrame: payload };
    }
    default:
      return state;
  }
};

export default FramesReducer;
