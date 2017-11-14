import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'})
});

// EDIT_EXPENSE
test('should setup edit expense action object', () => {
  const action = editExpense('abc321', {description: 'test'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc321',
    updates: {
      description: 'test'
    }
  })
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'test description',
    note: 'some note',
    amount: 105000,
    createdAt: 1000
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    },
  })
});