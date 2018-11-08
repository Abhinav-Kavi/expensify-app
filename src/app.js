import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';  
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import { setTimeout } from 'core-js';
import 'react-dates/lib/css/_datepicker.css';



const store = configureStore();

store.dispatch(addExpense({description:'Water bill', amount:800, createdAt:800}));
store.dispatch(addExpense({description:'Gas bill', amount:200, createdAt:1000}));
store.dispatch(addExpense({description:'Rent', amount:7000, createdAt:700}));


const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);


const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(jsx,document.getElementById("app"));
