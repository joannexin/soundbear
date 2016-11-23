import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as helpers from '../modules/ajax';
import * as newHelpers from '../modules/helpers';
import { annyangCall } from '../annyang';
import { initiateQueue, initiateHistory, changeCurrentSong, addToQueue, dequeueSong, addToHistory, toggleRestartToFalse } from '../redux/actions';
import Song from '../modules/Song';
import map from '../visualization/map';
import Scrollchor from 'react-scrollchor';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import ControlBar from './ControlBarComponent';
import MostPopular from './MostPopularComponent';
import Lineup from './LineupComponent';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infoClicked: false
    };
  }

  // searchFromPlayer() {
  //   helpers.youTubeGetSong($('#srch-term').val(), (response) => {
  //     var searchedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
  //     this.props.changeCurrentSong(searchedSong);
  //   });
  // }
  //
  // queueSong(string) {
  //   helpers.youTubeGetSong(string = $('#srch-term').val(), (response) => {
  //     var queuedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
  //     this.props.addToQueue(queuedSong);
  //   });
  // }

  componentDidMount() {

    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 32) {
        newHelpers.decreaseVolume();
        $('#helpBar').css("opacity", "0.6").animate({opacity: 0}, 400, function(){
          $('#helpBar').css("visibility", "hidden");
        });

        annyangCall();
        console.log('what up');
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);

    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.props.currentSong.videoId,
      events: {
        onReady: onPlayerReady,
        'onStateChange': onPlayerStateChange.bind(this)
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
      event.target.unMute();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        this.props.addToHistory(this.props.currentSong);
        if (this.props.songQueue.length > 0) {
          this.props.dequeueSong();
        } else {
          this.props.changeCurrentSong('');
        }
      }
    }
    this.props.initiateQueue();

    setInterval(() => {
      if (!this.state.infoClicked) {
        $('#info').fadeOut(500);
        $('#info').fadeIn(500);
      }
    }, 1000);
  }

  displayCommands() {
    $('.player').css('filter', 'blur(2px)');
    this.setState({
      infoClicked: true
    });
  }

  displayPlayer() {
    $('.player').css('filter', 'blur(0px)');
    $('body').click();
  }

  componentDidUpdate() {
    if (this.props.restartSong) {
      player.stopVideo();
      this.props.toggleRestartToFalse();
      player.playVideo();
      $('.fa-play').hide();
      $('.fa-pause').show();
    }
    if (this.props.currentSong.videoId !== player.getVideoData().video_id) {
      player.cueVideoById(this.props.currentSong.videoId);
      player.playVideo();
    }
    if (this.props.mute) {
      console.log('would like to mute');
      player.mute();
      $('#volumebar').val(0);
      $('#unmute').hide();
      $('#mute').show();
    } else {
      player.unMute();
      $('#volumebar').val(50);
      $('#mute').hide();
      $('#unmute').show();
    }
  }


  render() {


    return (
      <div className="container">
        <div className="player">
          <div className="heading row">
            <div className="col-md-1 inline" id='headlogo'>
              <a href="/"><img id="logo" src={'/assets/logo.png'}/><p>soundBear.</p></a>
            </div>
          </div>
          <button className="js-trigger-overlay-about commandsBar" onClick={ this.displayCommands.bind(this) } data-toggle="modal" data-target="#commandModal" type="button">commands</button>
          <Scrollchor to="navbar" className="nav-link"><button className="js-trigger-overlay-about" type="button">about</button></Scrollchor>

          <hr></hr>

          <br></br>

          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <p id="currentTrack"> { this.props.currentSong.artistName } - { this.props.currentSong.songName } </p>
              <p id="currentTrack"> { this.props.currentSong.albumName } </p>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <Lineup />

        <br></br>

        <ControlBar player={ player } />

        <hr></hr>

        <br></br>


        <div className="modal fade" id="commandModal" data-backdrop="static">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <br/>
              <h4 className="centerAlign"><b> Voice Commands </b></h4>
              <img id="closeModal" onClick={ this.displayPlayer.bind(this) } data-dismiss="modal" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_close-128.png"></img>
              <br></br>
              <table className="table">
                <thead>
                  <tr className='eachRow heading'>
                    <th className="col-xs-2 heading">What you want to do:</th>
                    <th className="col-xs-4 heading">What you need to say:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='eachRow first'>
                    <td className="col-xs-2">Play song</td>
                    <td className="col-xs-4 descript">"play The Scientist by Coldplay"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Add song to queue</td>
                    <td className="col-xs-4 descript">"add to queue Sweet Virgina by The Rolling Stones"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Play next song</td>
                    <td className="col-xs-4 descript">"skip" or "play next song"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Play previous song</td>
                    <td className="col-xs-4 descript">"play previous song"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Restart current song</td>
                    <td className="col-xs-4 descript"> "restart song" </td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Pause</td>
                    <td className="col-xs-4 descript">"stop" or "pause"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Resume</td>
                    <td className="col-xs-4 descript">"continue" or "resume"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Mute volume </td>
                    <td className="col-xs-4 descript">"mute song"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Unmute volume </td>
                    <td className="col-xs-4 descript">"unmute song"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Show lyrics </td>
                    <td className="col-xs-4 descript">"display lyrics"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Show soundBear Top Ten </td>
                    <td className="col-xs-4 descript">"display top ten</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Show artist's popular songs </td>
                    <td className="col-xs-4 descript">"display popular"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Show artist's albums </td>
                    <td className="col-xs-4 descript">"display albums"</td>
                  </tr>
                  <tr className='eachRow'>
                    <td className="col-xs-2">Show related artists </td>
                    <td className="col-xs-4 descript">"display related"</td>
                  </tr>

                </tbody>

              </table>

              <h4 className="centerAlign funchead"><b> Other Functionality </b></h4>
              <br></br>
              <p className="actions"> Click on any song in queue or history to play it</p>
              <p className="actions"> Remove song from queue by dragging it to trash bin</p>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>

        <br></br>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    view: state.view,
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    songHistory: state.songHistory,
    restartSong: state.restartSong,
    mute: state.mute
  };
};

export default connect(mapStateToProps, { initiateQueue: initiateQueue, changeCurrentSong: changeCurrentSong, addToQueue: addToQueue, dequeueSong: dequeueSong, addToHistory: addToHistory, toggleRestartToFalse: toggleRestartToFalse })(Player);
