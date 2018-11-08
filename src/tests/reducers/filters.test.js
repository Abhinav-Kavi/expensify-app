import filtersReducers from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', ()=>{
  const state = filtersReducers(undefined,{type : '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',   
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', ()=>{
  const state = filtersReducers(undefined, {type : 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', ()=>{
  const state = filtersReducers({
    text : '',
    sortBy: 'amount',
    startDate: undefined, 
    endDate:undefined
  },
   {type : 'SORT_BY_DATE'}
  );
  expect(state.sortBy).toBe('date');
});

test('should set text filter to provided value', ()=>{
  const state = filtersReducers(undefined, {type : 'SET_TEXT_FILTER', text : 'rent'});
  expect(state.text).toBe('rent');
});


test('should set startDate to provided value', ()=>{
  const state = filtersReducers(undefined, {type : 'SET_START_DATE', startDate : moment(0)});
  expect(state.startDate).toEqual(moment(0));
});

test('should set endDate to provided value', ()=>{
  const state = filtersReducers(undefined, {type : 'SET_END_DATE', endDate : moment(0)});
  expect(state.endDate).toEqual(moment(0));
});

