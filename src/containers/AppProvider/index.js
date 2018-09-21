import React from 'react';
import { Router, Redirect } from '@reach/router';
import App from '../App';
import NotFound from '../NotFound';
import Authenticator from '../Authenticator';
import Zillow from '../Zillow';

const MainApp = () => {
  return (
    <Router basepath={window.basePath}>
      <App path="/">
        <Redirect from="/" to="/zillow" />
        <Authenticator path="/">
          <Zillow path="zillow/*" />
          <NotFound default />
        </Authenticator>
        <NotFound default />
      </App>
    </Router>
  );
};

export default MainApp;
