import { UPDATE_FRAME } from '../variables';

const setUpdatedFrame = (frame, data) => ({
  type: UPDATE_FRAME,
  payload: { frame, data },
});

export { setUpdatedFrame };
