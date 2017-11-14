import moment from 'moment';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../../actions/filters';

test('should generate set text filter object with text value', () => {
  const text = 'some value';
  const action = setTextFilter(text);
  expect(action).toEqual({type: 'SET_TEXT_FILTER', text})
});

test('should generate set text filter object with default', () => {
  expect(setTextFilter()).toEqual({type: 'SET_TEXT_FILTER', text: ''})
});

test('should generate action object for sort by amount', () => {
  expect(sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'})
});

test('should generate action object for sort by date', () => {
  expect(sortByDate()).toEqual({type: 'SORT_BY_DATE'})
});

test('should generate set start date filter object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({type: 'SET_START_DATE', startDate: moment(0)})
});

test('should generate set end date filter object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({type: 'SET_END_DATE', endDate: moment(0)})
});