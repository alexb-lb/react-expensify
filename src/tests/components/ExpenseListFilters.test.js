import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { DateRangePicker } from 'react-dates';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, setEventObj, wrapper;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setEventObj = (value) => ({target: {value}});

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
    />
  )
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({filters: altFilters});
  expect(wrapper).toMatchSnapshot();
});

test('should set dates on dates change', () => {
  wrapper.find(DateRangePicker).prop('onDatesChange')({startDate: -1000, endDate: 2000});
  expect(setStartDate).toHaveBeenLastCalledWith(-1000);
  expect(setEndDate).toHaveBeenLastCalledWith(2000);
});

test('should handle date focus changes', () => {
  wrapper.find(DateRangePicker).prop('onFocusChange')('endDate');
  expect(wrapper.state('calendarFocused')).toBe('endDate');
});


test('should set text on text change event', () => {
  wrapper.find('input').simulate('change', setEventObj('bill'));
  expect(setTextFilter).toHaveBeenLastCalledWith('bill');
});

test('should sort by date', () => {
  wrapper.setProps({filters: altFilters});
  wrapper.find('select').simulate('change', setEventObj('date'));
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  wrapper.find('select').simulate('change', setEventObj('amount'));
  expect(sortByAmount).toHaveBeenCalled();
});