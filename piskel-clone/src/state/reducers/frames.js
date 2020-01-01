import { UPDATE_FRAME, SET_CURRENT_FRAME, ADD_FRAME, DELETE_FRAME } from '../variables';

const defaultState = { framesArray: [], currentFrame: 0 };
const FramesReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FRAME: {
      const newArray = [...state.framesArray];
      newArray.splice(payload.frame, 1, payload.data);
      return { ...state, framesArray: newArray };
    }
    case ADD_FRAME: {
      const newArray = [...state.framesArray];
      console.log('payload', payload);
      newArray.splice(payload.frame, 0, payload.data);
      return { currentFrame: payload.frame, framesArray: newArray };
    }
    case DELETE_FRAME: {
      const newArray = [...state.framesArray];
      console.log('payload', payload);
      newArray.splice(payload, 1);
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
