import { CHANGE_FRAMERATE } from '../variables';

const changeFrameRate = (value) => ({
  type: CHANGE_FRAMERATE,
  payload: value,
});

export default changeFrameRate;
