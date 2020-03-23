import FramesReducer from './frames';
import {
  UPDATE_FRAME,
  SET_CURRENT_FRAME,
  ADD_FRAME,
  DELETE_FRAME,
  REARRANGE_FRAMES,
} from '../variables';
import { defaultState } from '../../assets/data';

describe('framerate reducer', () => {
  it('should return the initial state', () => {
    expect(FramesReducer(undefined, {})).toEqual(defaultState);
  });

  it('should set current frame correctly', () => {
    expect(FramesReducer(
      { ...defaultState, currentFrame: 0 },
      { type: SET_CURRENT_FRAME, payload: 1 },
    )).toEqual({ ...defaultState, currentFrame: 1 });
    expect(FramesReducer(
      { ...defaultState, currentFrame: 3 },
      { type: SET_CURRENT_FRAME, payload: 3 },
    )).toEqual({ ...defaultState, currentFrame: 3 });
  });

  it('should add frame', () => {
    expect(FramesReducer(
      { currentFrame: 0, framesArray: ['1', '2', '3'] },
      { type: ADD_FRAME, payload: '4' },
    ).framesArray.length).toEqual(4);
    expect(FramesReducer(
      { currentFrame: 0, framesArray: ['1', '2', '3'] },
      { type: ADD_FRAME, payload: { frame: 1, data: '4' } },
    )).toMatchObject({ currentFrame: 1, framesArray: ['1', '4', '2', '3'] });
    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3'] },
      { type: ADD_FRAME, payload: { frame: 3, data: '4' } },
    )).toMatchObject({ currentFrame: 3, framesArray: ['1', '2', '3', '4'] });
  });

  it('should delete frame', () => {
    expect(FramesReducer(
      { currentFrame: 0, framesArray: ['1', '2', '3'] },
      { type: DELETE_FRAME, payload: 2 },
    ).framesArray.length).toEqual(2);
    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3'] },
      { type: DELETE_FRAME, payload: 0 },
    )).toMatchObject({ currentFrame: 0, framesArray: ['2', '3'] });
    expect(FramesReducer(
      { currentFrame: 1, framesArray: ['1', '2', '3'] },
      { type: DELETE_FRAME, payload: 1 },
    )).toMatchObject({ currentFrame: 1, framesArray: ['1', '3'] });
  });


  it('should rearrange frames', () => {
    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3', '4'] },
      { type: REARRANGE_FRAMES, payload: { dragIndex: 1, hoverIndex: 2 } },
    )).toMatchObject({ currentFrame: 2, framesArray: ['1', '3', '2', '4'] });

    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3', '4'] },
      { type: REARRANGE_FRAMES, payload: { dragIndex: 0, hoverIndex: 3 } },
    )).toMatchObject({ currentFrame: 2, framesArray: ['4', '2', '3', '1'] });
  });


  it('should update frame', () => {
    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3', '4'] },
      { type: UPDATE_FRAME, payload: { frame: 1, data: 'foo' } },
    )).toMatchObject({ currentFrame: 2, framesArray: ['1', 'foo', '3', '4'] });

    expect(FramesReducer(
      { currentFrame: 2, framesArray: ['1', '2', '3', '4'] },
      { type: UPDATE_FRAME, payload: { frame: 3, data: 'bar' } },
    )).toMatchObject({ currentFrame: 2, framesArray: ['1', '2', '3', 'bar'] });
  });
});
