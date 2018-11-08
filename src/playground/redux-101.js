import {createStore} from 'redux';


//Action Generators

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({decrementBy = 1}= {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
});

const resetCount = ()=>({
  type: 'RESET'
});


//Reducers
//1.Pure functions i.e output only depends on input. It does not change any value outside function scope
//2.Must not change state and actions directly
const countReducer = (state = {count : 0},action)=>{
  switch(action.type){
    case 'INCREMENT': 
       return {count : state.count + action.incrementBy};
 
    case 'DECREMENT': 
       return {count : state.count -  action.decrementBy};
 
    case 'RESET': 
       return {count : 0};
 
    case 'SET':
       return {count : action.count}
 
    default :  return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
  console.log(store.getState());
});

store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy:5}));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy:5}));

store.dispatch(setCount({count:9}));
