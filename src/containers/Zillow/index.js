import React, { Component, Fragment } from 'react';
import Controls from './Controls';

class Zillow extends Component {
  render() {
    return (
      <div className="container">
        <Controls />
        {this.props.children}
      </div>
    );
  }
}
export default Zillow;
