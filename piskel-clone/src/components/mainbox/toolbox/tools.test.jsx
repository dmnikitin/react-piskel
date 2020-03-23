import React from 'react'
import { shallow, mount } from 'enzyme';
import Tools from './tools';
import store from '../../../state/store';

const callback = () => { };
jest.mock('../button.jsx', () => 'Button');
const wrapperShallow = shallow(<Tools callback={callback} />);
const wrapperMount = mount(<Tools store={store} callback={callback} />);

describe('tools component', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
  it("displays initial div", () => {
    expect(wrapperMount.find("div")).toHaveLength(1);
  });
  it('displays proper amount of buttons', () => {
    expect(wrapperMount.find("div").children()).toHaveLength(6);
  });
});
