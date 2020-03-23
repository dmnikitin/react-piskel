import React from 'react'
import { shallow, mount } from 'enzyme';
import LandingPage from './LandingPage';

const wrapperShallow = shallow(<LandingPage />);
const wrapperMount = mount(<LandingPage />);

describe('landing page', () => {
  it('renders correctly', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });
  it("displays initial div", () => {
    expect(wrapperMount.find("div")).toHaveLength(3);
  });
});
