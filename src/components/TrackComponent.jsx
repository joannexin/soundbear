import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistTracks } from '../modules/ajax';
import  * as chart  from '../visualization/top-chart';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: "Searching...", videoId: this.props.currentSong.videoId }
  }

  componentDidMount() {
    this.displayTracks();
  }

  componentDidUpdate() {
    if (!this.props.currentSong.videoId) {
      document.getElementById("track").innerHTML = 'Sorry, we were unable to find popular songs...';
    } else if (this.props.currentSong.videoId !== chart.getId()) {
      document.getElementById("track").innerHTML = "";
      this.displayTracks();
    }
  }

  displayTracks() {
    var that = this;
    artistTracks(this.props.currentSong.artistName, function(data) {
      chart.processData(data, that.state.videoId);
      that.setState({ tracks: data, videoId: that.props.currentSong.videoId });
    });
  }

  render() {
    return(
      <div id ='track' style={{height: '600px'}}></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Track);
