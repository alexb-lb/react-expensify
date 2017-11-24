// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// App root and imported reducers inside configureStore
import AppRouter from './routers/AppRouter.js'
import configureStore from './store/configureStore';

// Actions
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';

// Selectors
import getVisibleExpenses from './selectors/expenses';

// Css
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// DB
import './firebase/firebase';

// Combine imported reducers
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

const promise = new Promise((res, rej) => {
  setTimeout(() => res('result'), 3000);
});

// render
ReactDOM.render(jsx, document.getElementById('app'));