import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const App = props => {
  return <Fragment>{props.children}</Fragment>;
};

export default App;
