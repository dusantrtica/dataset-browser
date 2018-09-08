import React, { Fragment } from 'react';

class Authenticator extends React.Component {
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default Authenticator;
