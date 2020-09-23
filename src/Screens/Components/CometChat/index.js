
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import PrivateRoute from './PrivateRoute';

import * as actions from './store/action';
import { COMETCHAT_CONSTANTS } from './consts';
import { CometChatUnified } from './react-chat-ui-kit/CometChat'; 

const history = createBrowserHistory();

class App extends React.Component {
  state = {
    isLoggedin: false
  }

  componentDidMount() {
    this.props.onLogin(this.props.Uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  }

  render() {
    
    return (
      <div>
        <PrivateRoute Userlist={this.props.Userlist} Uid={this.props.Uid} lan={this.props.lan} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);