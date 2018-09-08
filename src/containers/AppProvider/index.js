import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Provider } from 'react-redux';
import App from '../App';
import NotFound from '../NotFound';
import Authenticator from '../Authenticator';
import Zillow from '../Zillow';

const MainApp = () => {
  return (
    // <Provider>
    <Router basepath={window.basePath}>
      <App path="/">
        <Authenticator path="/">
          <Zillow path="zillow/" />
          <NotFound default />
        </Authenticator>
        <NotFound default />
      </App>
    </Router>
    // </Provider>
  );
};

export default MainApp;
