import React from 'react';
import { render } from 'react-dom';
import AppProvider from './containers/AppProvider';

const renderApp = () => {
  render(<AppProvider />, document.getElementById('app-container'));
};

renderApp();
