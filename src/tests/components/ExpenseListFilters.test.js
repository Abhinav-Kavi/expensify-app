import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

let setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount, wrapper;

beforeEach(()=>{
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  
  wrapper = shallow(
             <ExpenseListFilters
                filters = {filters}
                setStartDate = {setStartDate}
                setEndDate = {setEndDate}
                setTextFilter = {setTextFilter}
                sortByDate = {sortByDate}
                sortByAmount = {sortByAmount}
             />);
})


test('should render ExpenseListFilters correctly',()=>{
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly',()=>{
  wrapper.setProps({filters : altFilters});
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change',()=>{
  const data = {
    target : {value  : 'rent'}
  }; 
  
  wrapper.find('input').simulate('change',data);

  expect(setTextFilter).toHaveBeenLastCalledWith(data.target.value);
});

test('should sort by date',()=>{
  wrapper.setProps({filters : altFilters});
  const data = {
    target : {value  : 'date'}
  }; 
  
  wrapper.find('select').simulate('change',data);

  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount',()=>{
  const data = {
    target : {value  : 'amount'}
  }; 
  
  wrapper.find('select').simulate('change',data);

  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes',()=>{
  const startDate = moment(0).add(5, 'days');
  const endDate = moment(0).add(15, 'days');

  wrapper.find(DateRangePicker).prop('onDatesChange')({
    startDate, endDate  
  });

  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change',()=>{
  const calenderFocused = 'endDate';

  wrapper.find(DateRangePicker).prop('onFocusChange')(calenderFocused);
  expect(wrapper.state('calenderFocused')).toEqual(calenderFocused);
});

