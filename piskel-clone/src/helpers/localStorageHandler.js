import { active, defaultFrameRate, keyboardEvents } from '../assets/data';

const getFromLocalStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('state') || '{}');
    const storage = parsed;
    if (parsed === null) {
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(parsed, 'tools')) storage.tools = active;
    if (!Object.prototype.hasOwnProperty.call(parsed, 'frames')) storage.frames = { framesArray: [], currentFrame: 0 };
    if (!Object.prototype.hasOwnProperty.call(parsed, 'buttons')) storage.buttons = keyboardEvents;
    if (!Object.prototype.hasOwnProperty.call(parsed, 'framerate')) storage.matrixLength = defaultFrameRate;
    return storage;
  } catch (err) {
    return undefined;
  }
};

const saveToLocalStorage = (value) => localStorage.setItem('state', JSON.stringify(value));

export { getFromLocalStorage, saveToLocalStorage };
