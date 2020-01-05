import { UPDATE_BUTTON } from '../variables';
import { keyboardEvents } from '../../assets/data';

const defaultState = keyboardEvents;
const ButtonsReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_BUTTON: {
      const entries = Object.entries(state);
      entries.forEach((val) => {
        const newVal = val;
        if (newVal[1] === payload.button && newVal[0] !== payload.tool) {
          newVal[1] = '';
        }
      });
      const newState = Object.fromEntries(entries);
      const thisTool = { [payload.tool]: payload.button };
      return { ...newState, thisTool };
    }

    default:
      return state;
  }
};

export default ButtonsReducer;
