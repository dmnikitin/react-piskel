import React from 'react'
import { shallow, mount } from 'enzyme';
import { App } from './App';

const wrapperShallow = shallow(<App />);
const wrapperMount = mount(<App />);

describe('App component', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
  it("displays initial div", () => {
    expect(wrapperMount.find("div")).toHaveLength(4);
  });
});

