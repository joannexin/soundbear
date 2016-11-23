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
import Command from './CommandComponent';
import Nav from './NavComponent';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 32) {
        newHelpers.decreaseVolume();
        $('#helpBar').css("opacity", "0.6").animate({opacity: 0}, 400, function(){
          $('#helpBar').css("visibility", "hidden");
        });

        var interval = setInterval(function () {
          $('#listening').css("opacity", "0.6").animate({opacity: 0}, 1000, function(){
            $('#listening').css("visibility", "hidden");
          });
          $('#listening').css({ opacity: 0.0, visibility: 'visible' }).animate({ opacity: 0.6 }, 1000);
        }, 1000);

        setTimeout(function () {
          clearInterval(interval);
        }, 5000);

        annyangCall();
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
  }

  displayCommands() {
    $('.player').css('filter', 'blur(2px)');
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

        <Command />

        <div id="navbar" className="row controlDiv">
          <Nav />
        </div>

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
