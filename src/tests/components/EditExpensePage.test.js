import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(()=>{
 editExpense = jest.fn();
 removeExpense = jest.fn();
 history = {push : jest.fn()};
 wrapper = shallow(
            <EditExpensePage 
              editExpense = {editExpense}
              removeExpense={removeExpense}  
              history = {history}
              expense = {expenses[0]}
            />
           );
});

test('should render EditExpensePage correctly',()=>{
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense',()=>{
  const expenseId = expenses[0].id;
  const expenseUpdates = {
    description : expenses[0].description,
    amount : expenses[0].amount,
    createdAt : expenses[0].createdAt,
    note : expenses[0].note
  };

  wrapper.find('ExpenseForm').simulate('submit',expenseUpdates);
  expect(editExpense).toHaveBeenLastCalledWith(expenseId,expenseUpdates);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense',()=>{
  wrapper.find('button').simulate('click');
  expect(removeExpense).toHaveBeenLastCalledWith({id : expenses[0].id});
  expect(history.push).toHaveBeenLastCalledWith('/');
});


