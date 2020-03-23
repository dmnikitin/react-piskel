import React from 'react'
import { shallow, mount } from 'enzyme';
import ChangeControl from './changeControl';
import store from '../../../state/store';

const props = {
  tool: 'bucket',
  onSetButton: () => { },
}
const wrapperShallow = shallow(<ChangeControl {...props} store={store} />);

describe('changeControls component', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
});
