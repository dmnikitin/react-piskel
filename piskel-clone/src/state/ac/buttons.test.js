import { setButton } from './buttons';
import { UPDATE_BUTTON } from '../variables';

describe('actions', () => {
  it('should create an action to update a button', () => {
    const tool = 'bucket';
    const button = 'p';
    const expectedAction = {
      type: UPDATE_BUTTON,
      payload: { tool, button }
    }
    expect(setButton(tool, button)).toEqual(expectedAction)
  })
})
