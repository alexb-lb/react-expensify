import uuid from 'uuid';

// Add expense
export const addExpense =
  ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
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
export const removeExpense = ({id} = {}) => {
  return ({type: 'REMOVE_EXPENSE', id})
};

// Edit expense
export const editExpense = (id, updates = {}) => {
  return ({type: 'EDIT_EXPENSE', id, updates});
};


