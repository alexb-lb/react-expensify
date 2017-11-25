import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, '@@INIT');
  expect(state).toEqual([]);
});

test('should add expense to existing expenses and return updated array', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      description: 'laptop',
      note: 'some note',
      amount: 29500,
      createdAt: 10000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should remove expense and return array without it', () => {
  const action = {type: 'REMOVE_EXPENSE', id: expenses[1].id};
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {type: 'REMOVE_EXPENSE', id: -1};
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit expense and return updated array', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount: 200
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(200);
});

test('should not edit an expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      amount: 200
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

// /** Expenses Reducer **/
// export default (state = expensesReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'ADD_EXPENSE':
//       return [...state, action.expense];
//     case 'REMOVE_EXPENSE':
//       return state.filter(({id}) => id !== action.id);
//     case 'EDIT_EXPENSE':
//       return state.map((expense, i, arr) => {
//         if (action.id === expense.id) {
//           return {...expense, ...action.updates}; // overwrite object with new props
//         } else {
//           return expense;
//         }
//       });
//     default:
//       return state;
//   }
// };