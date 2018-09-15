import React, { Component, Fragment } from 'react';
import Controls from './Controls';

class Zillow extends Component {
  render() {
    return (
      <Fragment>
        <Controls />
        {this.props.children}
      </Fragment>
    );
  }
}
export default Zillow;
