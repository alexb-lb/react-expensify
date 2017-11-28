import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item__message">
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map((expense, i, arr) => {
            return <ExpenseListItem key={expense.id} {...expense}/>
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
};

// сначала передаем функ, которая достает данные из Redux Store
// потом указываем, куда эти данные нужно вывести
export default connect(mapStateToProps)(ExpenseList);