// Higher order component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulating
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please dont share</p>}
      <WrappedComponent {...props}/>
    </div>
  )
};

const requrieAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {
        props.isAuthenticated ? (
          <WrappedComponent {...props}/>
        ) : (
          <p>Please log in to see details</p>
        )
      }
    </div>
  )
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requrieAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="details"/>, document.getElementById('app'));