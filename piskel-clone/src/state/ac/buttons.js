import { UPDATE_BUTTON } from '../variables';

const setButton = (tool, button) => ({
  type: UPDATE_BUTTON,
  payload: { tool, button },
});

export default setButton;
