import fromEntries from 'object.fromentries';
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
      const newState = fromEntries(entries);
      return { ...newState, [payload.tool]: payload.button };
    }

    default:
      return state;
  }
};

export default ButtonsReducer;
