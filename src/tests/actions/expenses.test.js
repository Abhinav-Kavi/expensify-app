import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup removeExpense action objesct',()=>{
  const result = removeExpense({id : '123'});
  expect(result).toEqual({
    type : 'REMOVE_EXPENSE',
    id : '123'
  });
});

test('should setup editExpense action object',()=>{
  const result = editExpense('123',{description  : 'rent'});
  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id : '123',
    updates : {description  : 'rent'}
  });
});

test('should setup addExpense action object with given values',()=>{
  const expense = {
    description  : 'Rent',
    note : 'Rent for October',
    amount: 7000,
    createdAt : 1000
  }
  const result = addExpense(expense);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      id : expect.any(String)
    }
  });
});


test('should setup addExpense action object with default values',()=>{
  const expense = {
    description  : '',
    note : '',
    amount: 0,
    createdAt : 0
  }
  const result = addExpense();
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      id : expect.any(String)
    }
  });
});