import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboradPage =()=> (
  <div>
   <ExpenseListFilters/>
   <ExpenseList/>
  </div>

);

export default ExpenseDashboradPage;