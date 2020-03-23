import React from 'react'
import { shallow, mount } from 'enzyme';
import PenSize from './penSize';
import store from '../../../state/store';

const callback = () => { };
jest.mock('../button.jsx', () => 'Button');
const wrapperShallow = shallow(<PenSize callback={callback} />);
const wrapperMount = mount(<PenSize store={store} callback={callback} />);

describe('pensize component', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
  it("displays initial div", () => {
    expect(wrapperMount.find("div")).toHaveLength(2);
  });
  it('displays proper amount of buttons', () => {
    expect(wrapperMount.find('.toolbox-pensize__buttons').children()).toHaveLength(3);
  });
  it('displays heading', () => {
    expect(wrapperMount.find('h3').text()).toBe('Choose the pen size');
  });
});
