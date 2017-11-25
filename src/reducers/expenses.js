const expensesReducerDefaultState = [];

/** Expenses Reducer **/
export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense, i, arr) => {
        if (action.id === expense.id) {
          return {...expense, ...action.updates}; // overwrite object with new props
        } else {
          return expense;
        }
      });
    case 'SET_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};