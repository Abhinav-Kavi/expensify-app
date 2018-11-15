import {addExpense, editExpense, removeExpense, startAddExpense, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const expensesData = {};
  expenses.forEach(({description,amount,id,createdAt, note}) => 
                      expensesData[id] = {description,amount,createdAt, note});

  database.ref('expenses').set(expensesData).then(()=>done());
});

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
  const result = addExpense(expenses[2]);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add given expense to the database and store',(done)=>{
  const store = createMockStore({});
  const { description, note, amount, createdAt } = expenses[0];
  const expense  = {description, note, amount, createdAt};

  store.dispatch(startAddExpense(expense))
   .then(()=>{
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type : 'ADD_EXPENSE',
       expense : {
         id : expect.any(String),
         ...expense
       }
     });
     
     database.ref(`expenses/${actions[0].expense.id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expense);
        done();
      });    
   });
});


test('should add default expense to the database and store',(done)=>{
  const store = createMockStore({});
  const expense = {
    description : '',
    note : '',
    amount : 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({}))
   .then(()=>{
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type : 'ADD_EXPENSE',
       expense : {
         id : expect.any(String),
         ...expense
       }
     });
     
     database.ref(`expenses/${actions[0].expense.id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expense);
        done();
      });    
   });
});

test('should fetch the expenses from firebase',()=>{
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type : 'SET_EXPENSES',
      expenses
    });
  })
});