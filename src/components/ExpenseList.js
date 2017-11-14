import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map((expense, i, arr) => {
          return <ExpenseListItem key={expense.id} {...expense}/>
        })
      )
    }
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