import { active } from '../assets/data';

const getFromLocalStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('state') || '{}');
    const storage = parsed;
    if (parsed === null) {
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(parsed, 'active')) storage.active = active;
    if (!Object.prototype.hasOwnProperty.call(parsed, 'frames')) storage.frames = { 0: [] };
    // if (!Object.prototype.hasOwnProperty.call(parsed, 'matrix')) storage.matrix = [];
    // if (!Object.prototype.hasOwnProperty.call(parsed, 'matrixLength')) storage.matrixLength = 32;
    // if (!Object.prototype.hasOwnProperty.call(parsed, 'image')) storage.image = null;
    return storage;
  } catch (err) {
    return undefined;
  }
};

const saveToLocalStorage = (value) => localStorage.setItem('state', JSON.stringify(value));

export { getFromLocalStorage, saveToLocalStorage };
