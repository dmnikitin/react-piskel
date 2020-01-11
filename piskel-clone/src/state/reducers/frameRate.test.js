import FrameRateReducer from './frameRate';
import { CHANGE_FRAMERATE } from '../variables';

describe('framerate reducer', () => {
  it('should return the initial state', () => {
    expect(FrameRateReducer(undefined, {})).toEqual(12);
  });
  it('should handle framerate changes', () => {
    expect(
      FrameRateReducer([], {
        type: CHANGE_FRAMERATE,
        payload: 1,
      }),
    ).toEqual(1);
  });
  it('should handle framerate changes', () => {
    expect(
      FrameRateReducer([], {
        type: CHANGE_FRAMERATE,
        payload: 24,
      }),
    ).toEqual(24);
  });
});
