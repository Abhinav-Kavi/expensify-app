import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//-----Action Generators

//ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
)=>({
  type : 'ADD_EXPENSE',
  expense: {
    id : uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//REMOVE_EXPENSE
const removeExpense = ({id} = {})=>({
  type : 'REMOVE_EXPENSE',
  id
});

//EDIT_EXPENSE
const editExpense = (id,updates) =>({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

//SORT_BY_AMOUNT
const sortByAmount =()=>({
  type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate =()=>({
  type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate =(startDate)=>({
  type: 'SET_START_DATE',
  startDate
});

//SET_END_DATE
const setEndDate =(endDate)=>({
  type: 'SET_END_DATE',
  endDate
});


//-----Reducers

//Expenses Reducer

const expensesDefaultState = [];
const expensesReducer = (state = expensesDefaultState , action) =>{
  switch(action.type){
    case 'ADD_EXPENSE':
         return [...state, action.expense];

    case 'REMOVE_EXPENSE':
        return state.filter(({id}) => id !== action.id);

    case 'EDIT_EXPENSE':   
        return state.map(expense => {
          if(expense.id === action.id)
            return {
              ...expense,
              ...action.updates
            };

          return expense;       
        })
    
    default: return state;
  }
};

//Filters Reducer

const filtersDefaultState = {
  text: '',
  sortBy: 'date',   //amount or date
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersDefaultState , action)=>{
  switch(action.type){
    case 'SET_TEXT_FILTER':
       return {...state, text: action.text};

    case 'SORT_BY_DATE':
    return {...state, sortBy: "date"};

    case 'SORT_BY_AMOUNT':
    return {...state, sortBy: "amount"};

    case 'SET_START_DATE':
    return {...state, startDate: action.startDate};

    case 'SET_END_DATE':
    return {...state, endDate: action.endDate};

    default: return state;
  }
};

//----Get visible expenses

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate})=>{
 
  return expenses.filter(expense =>{
    const startDateMatch = typeof startDate !== 'number'|| expense.createdAt >= startDate ;
    const endDateMatch =  typeof endDate !== 'number'|| expense.createdAt <= endDate ;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b)=>{
    if(sortBy === 'date')
      return a.createdAt < b.createdAt ? 1 : -1;
    
    if(sortBy === 'amount')
      return a.amount < b.amount ? 1 : -1;
  });

};


//----CreateStore

const store = createStore(
  combineReducers({
    expenses : expensesReducer,
    filters: filtersReducer
  })
);


store.subscribe(()=>{
  var state = store.getState();
  var visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
  console.log(visibleExpenses);
});



const expense1 = store.dispatch(addExpense({description:'Rent',amount:7000, createdAt: 3000}));
const expense2 = store.dispatch(addExpense({description:'Coffee',amount:200, createdAt: 3000}));

// store.dispatch(removeExpense({id : expense1.expense.id}));

// store.dispatch(editExpense(expense2.expense.id,{amount: 500, note:'Avoid this in future'}));

 //store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

 //store.dispatch(setStartDate(-1000));

// store.dispatch(setStartDate());

 store.dispatch(setEndDate());

// store.dispatch(setEndDate());


const demoState = {
  expenses:[{
    id: 'asdfgsth234hgre',
    description: 'Rent',
    note: 'this is the expense for rent',
    amount: 12345,
    createdAt: 0
  }],

  filters:{
    text: 'rent',
    sortBy: 'amount',   //amount or date
    startDate: undefined,
    endDate: undefined
  }
};
