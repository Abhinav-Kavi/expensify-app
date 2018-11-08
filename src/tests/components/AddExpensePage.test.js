import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense,history,wrapper;

beforeEach(()=>{
  addExpense = jest.fn();
  history = {push  :  jest.fn()};
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);
});


test('should render the AddExpensePage correctly',()=>{  
  expect(wrapper).toMatchSnapshot();
});

test('should handle addExpense',()=>{
  wrapper.find('ExpenseForm').simulate('submit', expenses[0]);
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0]);
  expect(history.push).toHaveBeenCalledWith('/');
});