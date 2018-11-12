import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';
import '../../../numeralConfig';

test('should render ExpenseListItem with provided expense',()=>{
  const wrapper = shallow(<ExpenseListItem  {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});