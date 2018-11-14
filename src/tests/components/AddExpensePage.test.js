import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense,history,wrapper;

beforeEach(()=>{
  startAddExpense = jest.fn();
  history = {push  :  jest.fn()};
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>);
});


test('should render the AddExpensePage correctly',()=>{  
  expect(wrapper).toMatchSnapshot();
});

test('should handle addExpense',()=>{
  wrapper.find('ExpenseForm').simulate('submit', expenses[0]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
  expect(history.push).toHaveBeenCalledWith('/');
});