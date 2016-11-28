import React, { Component } from 'react';
import { connect } from 'react-redux';
import Landing from './LandingComponent';
import Player from './PlayerComponent';

class App extends Component {

  render() {
    if (this.props.view === 'landing') {
      return <Landing />;
    } else if (this.props.view === 'player') {
      return <Player />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps)(App);
