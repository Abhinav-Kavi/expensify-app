import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(()=>{
 startEditExpense = jest.fn();
 startRemoveExpense = jest.fn();
 history = {push : jest.fn()};
 wrapper = shallow(
            <EditExpensePage 
              startEditExpense = {startEditExpense}
              startRemoveExpense={startRemoveExpense}  
              history = {history}
              expense = {expenses[0]}
            />
           );
});

test('should render EditExpensePage correctly',()=>{
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense',()=>{
  const expenseId = expenses[0].id;
  const expenseUpdates = {
    description : expenses[0].description,
    amount : expenses[0].amount,
    createdAt : expenses[0].createdAt,
    note : expenses[0].note
  };

  wrapper.find('ExpenseForm').simulate('submit',expenseUpdates);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenseId,expenseUpdates);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense',()=>{
  wrapper.find('button').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id : expenses[0].id});
  expect(history.push).toHaveBeenLastCalledWith('/');
});


