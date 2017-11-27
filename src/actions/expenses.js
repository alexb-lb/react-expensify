import database from '../firebase/firebase';

// component calls action generator
// action generator returns function
// component dispatches function (?)
// function runs (has the ability to dispath other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  // return function to access dispatch method as argument from redux store
  return (dispatch, getState) => {
    // get state of store to get user id
    const uid = getState().auth.uid;

    // destructuring properties from expenseData
    // const for every name in obj (const description = ''; const note = '')
    const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;

    const expense = {description, note, amount, createdAt};

    // push into Firebase and get back generated ID of expense, return promise
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      // dispatch expense into redux store by passing an expense into addExpense func
      dispatch(addExpense({id: ref.key, ...expense}));
    })
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => {
  return ({type: 'REMOVE_EXPENSE', id})
};

export const startRemoveExpense = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return  database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}));
    });
  }
};

// EDIT_EXPENSE
export const editExpense = (id, updates = {}) => {
  return ({type: 'EDIT_EXPENSE', id, updates});
};

export const startEditExpense = (id, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  }
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});


export const startSetExpenses = () => {
  // return function to access dispatch method as argument from redux store
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // return function to access promise chaining further
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
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


