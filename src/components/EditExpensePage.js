import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {

  onSubmit = (expenseUpdates) => {
    const id = this.props.expense.id;
    this.props.editExpense(id, expenseUpdates);
    this.props.history.push('/');
  }

  onClick = (e)=>{
    this.props.startRemoveExpense({id : this.props.expense.id});
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <ExpenseForm 
        expense = {this.props.expense}
        onSubmit = {this.onSubmit}
       />
       <button 
          onClick = {this.onClick}
        >
          Remove
        </button>
    </div>
    );
  }
}

const mapStateToProps = (state,props) => ({
  expense : state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch,props) => ({
  editExpense : (id,expenseUpdates) => dispatch(editExpense(id,expenseUpdates)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default  connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);