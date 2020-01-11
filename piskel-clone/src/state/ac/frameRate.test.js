import { changeFrameRate } from './frameRate';
import { CHANGE_FRAMERATE } from '../variables';

describe('actions', () => {
  it('should create an action to change framerate', () => {
    const value = 1;
    const expectedAction = {
      type: CHANGE_FRAMERATE,
      payload: value,
    }
    expect(changeFrameRate(1)).toEqual(expectedAction)
  })
})
