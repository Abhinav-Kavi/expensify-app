import React from 'react';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboradPage from '../components/ExpenseDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import createHistroy from 'history/createBrowserHistory';
import {Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistroy();

const AppRouter = ()=> (
  <Router history = {history}>
    <div> 
      <Switch>
        <PublicRoute  path='/' component={LoginPage} exact={true} />
        <PrivateRoute path='/dashboard' component={ExpenseDashboradPage}/>
        <PrivateRoute  path='/create' component={AddExpensePage} />
        <PrivateRoute  path='/edit/:id' component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;