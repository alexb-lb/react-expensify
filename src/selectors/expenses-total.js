/** return sum of expenses amount **/
export default (expenses) => {
  if(!expenses || expenses.length === 0) {
    return 0;
  }

  const amounts = expenses.map(expense => expense.amount);
  return amounts.reduce((sum, current) => sum + current, 0);
}