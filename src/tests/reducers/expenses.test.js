import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should setup default expenses values', ()=>{
  const state = expensesReducer(undefined,{type : '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove an expense by id',()=>{
  const action = {
    type : 'REMOVE_EXPENSE',
    id : expenses[0].id
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[1],expenses[2]]);
});

test('should not remove an expense if id not found',()=>{
  const action = {
    type : 'REMOVE_EXPENSE',
    id : "-23"
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});

test('should add an expense',()=>{
  const action = {
    type : 'ADD_EXPENSE',
    expense  : {
      id : "123",
      description : 'tea',
      amount: 20,
      createdAt : moment().valueOf(),
      note: 'evening tea'
    }
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense',()=>{
  const action = {
    type : 'EDIT_EXPENSE',
    updates  : {
      note: 'last month shopping bill'
    },
    id : "1"
  };
  const state = expensesReducer(expenses,action);
  expect(state[0].note).toBe(action.updates.note);
});

test('should not edit an expense if id not found',()=>{
  const action = {
    type : 'EDIT_EXPENSE',
    updates  : {
      note: 'last month shopping bill'
    },
    id : 1231
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});


test('should set expenses and remove any existing expenses',()=>{
  const  action = {
    type : 'SET_EXPENSES',
    expenses: [expenses[2]]
  };

  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[2]]);
});

