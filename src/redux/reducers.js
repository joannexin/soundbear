import _ from 'lodash';

const mainReducer = function (state = {}, action) {
  var deepEqualState = _.cloneDeep(state);
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return {
        ...state,
        view: action.view,
        currentSong: {
          videoId: action.currentSong.videoId,
          title: action.currentSong.title,
          artwork: action.currentSong.artwork,
          albumName: action.currentSong.albumName,
          songName: action.currentSong.songName,
          artistName: action.currentSong.artistName,
          artistId: action.currentSong.artistId,
          countries: action.currentSong.countries
        }
      };
    case 'INITIATE_QUEUE':
      return {
        ...state,
        songQueue: action.songQueue,
        songHistory: action.songHistory
      };
    case 'CHANGE_CURRENT_SONG':
      return {
        ...state,
        currentSong: {
          videoId: action.currentSong.videoId,
          title: action.currentSong.title,
          artwork: action.currentSong.artwork,
          albumName: action.currentSong.albumName,
          songName: action.currentSong.songName,
          artistName: action.currentSong.artistName,
          artistId: action.currentSong.artistId,
          countries: action.currentSong.countries
        }
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        songQueue: [...state.songQueue, { videoId: action.songQueue, title: action.title, artwork: action.artwork, albumName: action.albumName, songName: action.songName, artistName: action.artistName, artistId: action.artistId, countries: action.countries }]
      };
    case 'DEQUEUE_SONG':
      return {
        ...state,
        currentSong: state.songQueue[0],
        songQueue: [...state.songQueue.slice(1)]
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        songHistory: [...state.songHistory, action.song]
      };
    case 'MODIFY_QUEUE':
      return {
        ...state,
        songQueue: action.newQueue
      };
    case 'MODIFY_HISTORY':
      return {
        ...state,
        songHistory: action.newHistory
      };
    case 'PLAY_PREVIOUS':
      deepEqualState.songQueue.unshift(deepEqualState.currentSong);
      deepEqualState.currentSong = deepEqualState.songHistory.pop();
      return deepEqualState;
    case 'REMOVE_FROM_HISTORY':
      var newQueue = deepEqualState.songQueue.filter(function(song) {
        if (song.videoId !== action.songId.song) {
          return song;
        }
      });
      deepEqualState.songQueue = newQueue;
      return deepEqualState;
    case 'RESTART_SONG':
      deepEqualState.restartSong = true;
      return deepEqualState;
    case 'RESTART_TO_FALSE':
      deepEqualState.restartSong = false;
      return deepEqualState;
    case 'MUTE':
      deepEqualState.mute = true;
      return deepEqualState;
    case 'UNMUTE':
      deepEqualState.mute = false;
      return deepEqualState;
    default:
      return state;
  }
};

export default mainReducer;
