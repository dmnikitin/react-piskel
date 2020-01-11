import ButtonsReducer from './buttons';
import { UPDATE_BUTTON } from '../variables';
import { keyboardEvents } from '../../assets/data';
const defaultState = keyboardEvents;

describe('buttons reducer', () => {
  it('should return the initial state', () => {
    expect(ButtonsReducer(undefined, {})).toEqual(defaultState)
  })

  it('should set buttons correctly', () => {
    if (!Object.entries)
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array

        while (i--)
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
      };

    expect(ButtonsReducer(
      defaultState,
      { type: UPDATE_BUTTON, payload: { button: 'p', tool: 'bucket' } }
    )).toMatchObject({ ...defaultState, bucket: 'p', pen: '' })
    expect(ButtonsReducer(
      { ...defaultState, bucket: 'p' },
      { type: UPDATE_BUTTON, payload: { button: 'p', tool: 'pen' } }
    )).toMatchObject({ ...defaultState, pen: 'p', bucket: '' })
  })
});
