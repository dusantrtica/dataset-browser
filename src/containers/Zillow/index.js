import React, { Component } from 'react';
import styled from 'react-emotion';
import { Router } from '@reach/router';
import Controls from './Controls';
import Dataviewer from './Dataviewer';

const StyledDiv = styled('div')`
  margin-top: 20px;
  margin-bottom: 20px;
`;

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
        <StyledDiv>
          <Controls initQuery={this.state.query} />
        </StyledDiv>

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
