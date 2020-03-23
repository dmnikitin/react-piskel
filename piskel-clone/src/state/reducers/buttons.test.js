import ButtonsReducer from './buttons';
import { UPDATE_BUTTON } from '../variables';
import { keyboardEvents } from '../../assets/data';

const defaultState = keyboardEvents;

describe('buttons reducer', () => {
  it('should return the initial state', () => {
    expect(ButtonsReducer(undefined, {})).toEqual(defaultState);
  });

  it('should set buttons correctly', () => {
    /* eslint-disable */
    if (!Object.entries) {
      Object.entries = function (obj) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i);
        while (i -= 1) resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
      };
    }

    expect(ButtonsReducer(
      defaultState,
      { type: UPDATE_BUTTON, payload: { button: 'p', tool: 'bucket' } },
    )).toMatchObject({ ...defaultState, bucket: 'p', pen: '' });
    expect(ButtonsReducer(
      { ...defaultState, bucket: 'p' },
      { type: UPDATE_BUTTON, payload: { button: 'p', tool: 'pen' } },
    )).toMatchObject({ ...defaultState, pen: 'p', bucket: '' });
  });
});
