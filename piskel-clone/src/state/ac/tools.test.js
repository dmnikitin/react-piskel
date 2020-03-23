import { setActiveTool, setColor, setPenSize } from './tools';
import { SET_COLOR, SET_ACTIVE_TOOL, SET_PEN_SIZE } from '../variables';

describe('actions', () => {
  it('should create an action to set colors', () => {
    const primaryColor = 'black';
    const alternativeColor = 'white';
    const expectedAction = {
      type: SET_COLOR,
      payload: { primaryColor, alternativeColor },
    };
    expect(setColor(primaryColor, alternativeColor)).toEqual(expectedAction);
  });

  it('should create an action to set active tool', () => {
    const value = 'bucket';
    const expectedAction = {
      type: SET_ACTIVE_TOOL,
      payload: value,
    };
    expect(setActiveTool(value)).toEqual(expectedAction);
  });
  it('should create an action to set pen size', () => {
    const value = 'medium';
    const expectedAction = {
      type: SET_PEN_SIZE,
      payload: value,
    };
    expect(setPenSize(value)).toEqual(expectedAction);
  });
});
