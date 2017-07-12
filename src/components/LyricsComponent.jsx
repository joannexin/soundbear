import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyrics } from '../modules/ajax';

class Lyrics extends Component {

  constructor(props) {
    super(props);
    this.state = { lyrics: "Searching...", videoId: this.props.currentSong.videoId }
  }

  displayLyrics() {
    var that = this;
    getLyrics(this.props.currentSong.songName, this.props.currentSong.artistName, function(data) {
      that.setState({ lyrics: data, videoId: that.props.currentSong.videoId });
    });
  }

  componentDidMount() {
    this.displayLyrics();
  }

  componentDidUpdate() {
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayLyrics();
    }
  }

  render() {
    return(
      <div>
        <h1 id="topten">Lyrics</h1>
        <pre id="lyrics">{this.state.lyrics}</pre>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Lyrics);
