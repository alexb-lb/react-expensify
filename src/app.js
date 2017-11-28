// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// App root and imported reducers inside configureStore
import AppRouter, {history} from './routers/AppRouter.js'
import configureStore from './store/configureStore';

// Actions
import {startSetExpenses} from "./actions/expenses"
import {login, logout} from "./actions/auth"

// Css
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// DB
import {firebase} from './firebase/firebase';

// Components
import LoadingPage from './components/LoadingPage'

// Combine imported reducers
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

// avoid rendering app every time after user log in
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

// waits until database sends info about authentication
ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

// listen when firebase check if user logged in
firebase.auth().onAuthStateChanged((user) => {
  // if user logged in, firebase sends back user object in promise
  if (user) {
    store.dispatch(login(user.uid));
    // get data from Firebase
    store.dispatch(startSetExpenses()).then(() => {
      // then render page
      renderApp();
      // if user on start page - redirect him to expenses list
      if(history.location.pathname === '/'){
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    // if user logged out or not logged in - redirect to "/"
    renderApp();
    history.push('/');
  }
});

