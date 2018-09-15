import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Provider } from 'react-redux';
import App from '../App';
import NotFound from '../NotFound';
import Authenticator from '../Authenticator';
import Zillow from '../Zillow';
import Dataviewer from '../Zillow/Dataviewer';

const MainApp = () => {
  return (
    // <Provider>
    <Router basepath={window.basePath}>
      <App path="/">
        <Redirect from="/" to="/zillow" />
        <Authenticator path="/">
          <Zillow path="zillow/">
            <Dataviewer path="search/" />
          </Zillow>
          <NotFound default />
        </Authenticator>
        <NotFound default />
      </App>
    </Router>
    // </Provider>
  );
};

export default MainApp;
