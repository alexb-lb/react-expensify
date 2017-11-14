import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

/** ACTIONS **/
// Add expense
const addExpense = ({
                      description = '',
                      note = '',
                      amount = 0,
                      createdAt = 0
                    } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// Remove expense
const removeExpense = ({id} = {}) => {
  return ({type: 'REMOVE_EXPENSE', id})
};

// Edit expense
const editExpense = (id, updates = {}) => {
  return ({type: 'EDIT_EXPENSE', id, updates});
};

// set text filter
const setTextFilter = ((text = '') => ({type: 'SET_TEXT_FILTER', text}));

// sort by amount
const sortByAmount = (() => ({type: 'SET_SORT_BY_AMOUNT'}));

// sort by date
const sortByDate = (() => ({type: 'SET_SORT_BY_DATE'}));

// set start date
const setStartDate = ((startDate = undefined) => ({type: 'SET_START_DATE', startDate}));

// set end date
const setEndDate = ((endDate = undefined) => ({type: 'SET_END_DATE', endDate}));

/** EXPENSES REDUCER **/
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
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
    default:
      return state;
  }
};

/** FILTERS REDUCER **/
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {...state, text: action.text};
    case 'SET_SORT_BY_AMOUNT':
      return {...state, sortBy: 'amount'};
    case 'SET_SORT_BY_DATE':
      return {...state, sortBy: 'date'};
    case 'SET_START_DATE':
      return {...state, startDate: action.startDate};
    case 'SET_END_DATE':
      return {...state, startDate: action.endDate};
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== "number" || expense.createdAt <= startDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
};

/** COMBINE REDUCERS **/
const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
}));

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 500, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000}));
//
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1000));
// store.dispatch(setStartDate());
//
// store.dispatch(setEndDate(54321));
// store.dispatch(setEndDate());

/** Example app state object **/
const demoState = {
  expenses: [{
    id: '1234',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent', // for search in string
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};