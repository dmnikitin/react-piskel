import {
  setUpdatedFrame,
  setCurrentFrame,
  addFrame,
  deleteFrame,
  rearrangeFrames
} from './frames';
import {
  UPDATE_FRAME,
  SET_CURRENT_FRAME,
  ADD_FRAME,
  DELETE_FRAME,
  REARRANGE_FRAMES,
} from '../variables';

describe('actions', () => {
  it('should create an action to update frame', () => {
    const frame = 1;
    const data = 'some data';
    const expectedAction = {
      type: UPDATE_FRAME,
      payload: { frame, data },
    }
    expect(setUpdatedFrame(frame, data)).toEqual(expectedAction)
  })
  it('should create an action to rearrange frames', () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: REARRANGE_FRAMES,
      payload: { dragIndex, hoverIndex },
    }
    expect(rearrangeFrames(dragIndex, hoverIndex)).toEqual(expectedAction)
  })
  it('should create an action to set current frame', () => {
    const value = 1;
    const expectedAction = {
      type: SET_CURRENT_FRAME,
      payload: value,
    }
    expect(setCurrentFrame(value)).toEqual(expectedAction)
  })
  it('should create an action to add a frame', () => {
    const frame = 1;
    const data = 'some data';
    const expectedAction = {
      type: ADD_FRAME,
      payload: { frame, data },
    }
    expect(addFrame(frame, data)).toEqual(expectedAction)
  })
  it('should create an action to delete a frame', () => {
    const value = 1;
    const expectedAction = {
      type: DELETE_FRAME,
      payload: value,
    }
    expect(deleteFrame(value)).toEqual(expectedAction)
  })
})
