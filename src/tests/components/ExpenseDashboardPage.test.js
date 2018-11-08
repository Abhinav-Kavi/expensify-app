import React from 'react';
import {shallow} from 'enzyme';
import ExpenseDashboradPage from '../../components/ExpenseDashboardPage';


test('should render ExpenseDashboardPage correctly',()=>{
  const wrapper = shallow(<ExpenseDashboradPage/>);
  expect(wrapper).toMatchSnapshot();
});