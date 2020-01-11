import React from 'react'
import { shallow, mount } from 'enzyme';
import ColorsActive from './colorsActive';
import store from '../../../state/store';

const props = {
  primaryColor: 'black',
  alternativeColor: 'white',
  callback: () => { },
};

jest.mock('../button.jsx', () => 'Button');
const wrapperShallow = shallow(<ColorsActive {...props} />);
const wrapperMount = mount(<ColorsActive {...props} store={store} />);

describe('pensize component', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
  it("displays initial div", () => {
    expect(wrapperMount.find("div")).toHaveLength(3);
  });
  it('displays proper amount of buttons', () => {
    expect(wrapperMount.find('.toolbox-colors-active').children()).toHaveLength(3);
  });
});
