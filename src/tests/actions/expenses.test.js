import {addExpense, editExpense, removeExpense, startAddExpense, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'testId';
const defaultAuthState = {auth : {uid}};

beforeEach((done)=>{
  const expensesData = {};
  expenses.forEach(({description,amount,id,createdAt, note}) => 
                      expensesData[id] = {description,amount,createdAt, note});

  database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done());
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
  const store = createMockStore(defaultAuthState);
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
     
     database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expense);
        done();
      });    
   });
});


test('should add default expense to the database and store',(done)=>{
  const store = createMockStore(defaultAuthState);
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
     
     database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expense);
        done();
      });    
   });
});

test('should fetch the expenses from firebase',(done)=>{
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type : 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should remove the given expense from firebase',(done)=>{
  const store = createMockStore(defaultAuthState);
  const id =  expenses[0].id;
  store.dispatch(startRemoveExpense({id})).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type : 'REMOVE_EXPENSE',
      id 
    });

    database.ref(`users/${uid}/expenses/${id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toBeNull();
        done();
      });  
  });

});

test('should edit the given expense in firebase',(done)=>{
  const store = createMockStore(defaultAuthState);
  const id =  expenses[0].id;
  const updates = {
    description : 'new description',
    note : 'demo note'
  };

  const {amount,description,createdAt,note} = expenses[0];
  
  const updatedExpense = {
    amount,description,createdAt,note,
    ...updates
  };

  store.dispatch(startEditExpense(id,updates)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });

    database.ref(`users/${uid}/expenses/${id}`).once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(updatedExpense)
        done();
      });  
  });
});