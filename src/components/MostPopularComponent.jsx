import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMostPopular } from '../modules/ajax';


class MostPopular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      videoId: this.props.currentSong.videoId
    };
  }

  displayMostPopular() {
    var that = this;
    getMostPopular(function(data) {
      that.setState({ result: data });

    });
  }


  componentDidMount() {
    this.displayMostPopular();
  }

  componentDidUpdate () {
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayMostPopular();
    }
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h1 id="topten">soundBear's Top 10</h1>
        <br></br>
        <br></br>
        {
          this.state.result.map(function(champion, index) {
            return (
              <div className="row championrow" key={ index }>
                <div className="col-md-offset-1 col-md-9">
                  <div className="rank col-md-2">
                    { index + 1 }
                    &nbsp;
                    <img id="championPic" src={champion.url}></img>
                  </div>

                  <div className="songArtist col-md-6">
                    <div className="song">
                      { champion.songName }
                    </div>
                    <br></br>
                    <div className="artist">
                      { champion.artistName }
                    </div>
                  </div>
                  <div className="totalViews col-md-1">
                    <div className="numViews">
                      { champion.views }
                    </div>
                    <div>views</div>
                  </div>
                </div>
                <br></br>
              </div>
            );
          }, this)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(MostPopular);
