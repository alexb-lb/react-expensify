import database from '../firebase/firebase';

// component calls action generator
// action generator returns function
// component dispatches function (?)
// function runs (has the ability to dispath other actions and do whatever it wants)

// Add expense
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  // return function to access dispatch method as argument from redux store
  return (dispatch) => {
    // destructuring properties from expenseData
    // const for every name in obj (const description = ''; const note = '')
    const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;

    const expense = {description, note, amount, createdAt};
    // push into Firebase and get back generated ID of expense, return promise
    return database.ref('expenses').push(expense).then((ref) => {
      // dispatch expense into redux store by passing an expense into addExpense func
      dispatch(addExpense({id: ref.key, ...expense}))
    })
  };
};

// Remove expense
export const removeExpense = ({id} = {}) => {
  return ({type: 'REMOVE_EXPENSE', id})
};

// Edit expense
export const editExpense = (id, updates = {}) => {
  return ({type: 'EDIT_EXPENSE', id, updates});
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  // return function to access dispatch method as argument from redux store
  return (dispatch) => {
    // return function to access promise chaining further
    return database.ref(`expenses`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push(({
          id: childSnapshot.key,
          ...childSnapshot.val()
        }))
      });
      // dispatch expense into redux store by passing an expense into addExpense func
      dispatch(setExpenses(expenses));
    });
  };
};


