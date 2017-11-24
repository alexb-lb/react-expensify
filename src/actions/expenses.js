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
  return (dispatch) => {
    // destructuring properties from expenseData
    // const for every name in obj (const description = ''; const note = '')
    const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;

    const expense = {description, note, amount, createdAt};
    // push into Firebase and get back generated ID of expense
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


