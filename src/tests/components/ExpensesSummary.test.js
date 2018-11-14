import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import '../../numeralConfig';

test('should render ExpensesSummary correctly with 1 expense',()=>{
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={100}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses',()=>{
  const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={1023.34}/>);
  expect(wrapper).toMatchSnapshot();
});