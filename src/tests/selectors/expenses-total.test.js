import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
  const res = selectExpensesTotal([expenses[1]]);
  expect(res).toBe(expenses[1].amount);
});

test('should correctly add up a multiple expenses', () => {
  let sum = 0;
  for(let i = 0; i < expenses.length; i++){
    sum += expenses[i].amount;
  }

  const res = selectExpensesTotal(expenses);
  expect(res).toBe(sum);
});