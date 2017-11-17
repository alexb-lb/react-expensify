import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={0} expensesTotal={[]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={26} expensesTotal={6123123231}/>);
  expect(wrapper).toMatchSnapshot();
});