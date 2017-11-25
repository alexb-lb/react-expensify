import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, history, editExpense, startRemoveExpense, wrapper;

beforeEach(() => {
  expense = expenses[1];
  history = {push: jest.fn()};
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();

  // pass in props FROM CONNECT (connect(mapStateToProps, mapDispatchToProps))
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      history={history}
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
    />
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should pass an expense updates on form submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should remove expense when remove button clicked', () => {
  wrapper.find('button').prop('onClick')();
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
});