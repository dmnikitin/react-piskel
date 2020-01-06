import { CHANGE_FRAMERATE } from '../variables';
import { defaultFrameRate } from '../../assets/data';

const FrameRateReducer = (state = defaultFrameRate, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_FRAMERATE: {
      return payload;
    }
    default: return state;
  }
};

export default FrameRateReducer;
