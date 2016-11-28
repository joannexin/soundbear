import React, { Component } from 'react';
import { connect } from 'react-redux';
import Queue from './QueueComponent';
import History from './HistoryComponent';
import $ from 'jquery';

class Lineup extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <History />
        </div>
        <div className="col-md-2">
          <img id='currentSong' src={ this.props.currentSong.artwork } ></img>
        </div>
        <div className="col-md-5">
          <Queue />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Lineup);
