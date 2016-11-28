import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { changeCurrentSong, modifyQueue } from '../redux/actions';
import $ from 'jquery';

class Queue extends Component {

  selectSongFromQueue(song) {
    var newQueue = this.props.songQueue.filter(function(origSong) {
      if (origSong.videoId !== song.videoId) {
        return origSong;
      }
    });
    this.props.modifyQueue(newQueue);
    this.props.changeCurrentSong(song);
  }

  render() {
    if (this.props.songQueue.length > 0) {
      return (
        <div>
          <div>
            {
              this.props.songQueue.map(function(song, index) {
                if (index < 5) {
                  return (
                    <Draggable type="song" data={ song.videoId } key={ index } className="queue available" style={{ zIndex: index }}>
                      <img className="songImage" src={ song.artwork } onClick={ () => { this.selectSongFromQueue(song)} } ></img>
                    </Draggable>
                  );
                }
              }, this)
            }
          </div>
        </div>
      );
    } else {
      return <div></div>
    }
  }

}

const mapStateToProps = (state) => {
  return {
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps, { changeCurrentSong: changeCurrentSong, modifyQueue: modifyQueue })(Queue);
