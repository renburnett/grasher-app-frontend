import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const SecurityHOC = WrappedComponent => {
  return class SecurityHOC extends Component {

    isAuthorized = () => {
      return localStorage.loggedIn;
    }

    render() {
      return <> { this.isAuthorized() ? <WrappedComponent {...this.props} /> : <Redirect to="/login" /> } </>;
    }
  }
}

export default SecurityHOC;