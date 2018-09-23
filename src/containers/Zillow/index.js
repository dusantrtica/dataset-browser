import React, { Component, Fragment } from 'react';
import { Router, Redirect } from '@reach/router';
import Controls from './Controls';
import Dataviewer from './Dataviewer';

class Zillow extends Component {
  state = {
    query: {},
  };
  setInitSearchQuery = query => {
    this.setState({
      query,
    });
  };
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Controls initQuery={this.state.query} />
        </div>
        <Router>
          <Dataviewer
            path="search"
            setInitSearchQuery={this.setInitSearchQuery}
          />
        </Router>
      </div>
    );
  }
}

export default Zillow;
