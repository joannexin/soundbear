import $ from 'jquery';
import * as helpers from './modules/helpers';

export const annyangCall = () => {
  // Creates query based on passed params
  const createQuery = (songName, artistName) => {
    let query;
    if (artistName) {
      query = songName +' by ' + artistName;
    } else {
      query = songName + 'song';
    }
    return query;
  };

  // Finds and plays new song
  const playSong = (songName, artistName) => {
    $('.spinner-toggle').toggle();
    const query = createQuery(songName, artistName);
    helpers.searchSong(query, songName, artistName, 'playSong');
  };

  // Adds song to queue to be played later
  const addToQueue = (songName, artistName) => {
    const query = createQuery(songName, artistName);
    helpers.searchSong(query, songName, artistName, 'queueSong');
  };

  // Defines commands
  if (annyang) {
    const commands = {
      'display top ten': () => {
        document.getElementById('react-tabs-2').click();
        helpers.communicateAction('Display top ten');
      },

      'display lyrics': () => {
        document.getElementById('react-tabs-0').click();
        helpers.communicateAction('Display lyrics');
      },

      'display popular': () => {
        document.getElementById('react-tabs-4').click();
        helpers.communicateAction('Display popular songs');
      },

      'display albums': () => {
        document.getElementById('react-tabs-6').click();
        helpers.communicateAction('Display artist\'s albums');
      },

      'display related': () => {
        document.getElementById('react-tabs-8').click();
        helpers.communicateAction('Display related artists');
      },

      'sound': () => {
        helpers.decreaseVolume();
      },

      'sound bear': () => {
        helpers.decreaseVolume();
      },

      'stop': () => {
        document.getElementById('player-pause').click();
        helpers.communicateAction('Stop');
      },

      'pause': () => {
        document.getElementById('player-pause').click();
        helpers.communicateAction('Pause');
      },

      'resume': () => {
        document.getElementById('player-play').click();
        helpers.communicateAction('Resume');
      },

      'continue': () => {
        document.getElementById('player-play').click();
        helpers.communicateAction('Continue');
      },

      'forward': () => {
        document.getElementById('player-forward').click();
        helpers.communicateAction('Forward');
      },

      'backward': () => {
        document.getElementById('player-backward').click();
        helpers.communicateAction('Backward');
      },

      'mute song': () => {
        helpers.muteSong();
      },

      'unmute song': () => {
        helpers.unMuteSong();
      },

      'play next song': () => {
        helpers.dequeueSong();
      },

      'play previous song': () => {
        helpers.playPrevious();
      },

      'restart song': () => {
        helpers.restartSong();
      },

      'play track *song': (song) => {
        helpers.communicateAction('Play track ' + song);
        playSong(song);
      },

      'play *song by *artist': (song, artist) => {
        helpers.communicateAction('Play song ' + song + ' by ' + artist);
        playSong(song, artist);
      },

      'play song *song': (song) => {
        helpers.communicateAction('Play song ' + song);
        playSong(song);
      },

      'play *song': (song) => {
        helpers.communicateAction('Play ' + song);
        playSong(song);
      },

      'add next *song by *artist': (song, artist) => {
        helpers.communicateAction('Add next ' + song +' by ' + artist);
        addToQueue(song, artist);
      },

      'add next *song': (song) => {
        helpers.communicateAction('Add next ' + song);
        addToQueue(song);
      },

      'add to queue *song by *artist': (song, artist) => {
        helpers.communicateAction('Add to queue ' + song +' by ' + artist);
        addToQueue(song, artist);
      },

      'add to queue *song': (song) => {
        helpers.communicateAction('Add to queue ' + song);
        addToQueue(song);
      },

      ':nomatch': (message) => {
        helpers.errorMessage('Sorry, I don\'t understand this action: ' + message);
      }
    };

    // Adds commands to annyang
    annyang.addCommands(commands);

    // Starts listening
    annyang.start({ autoRestart: false, continuous: false });
    
    annyang.addCallback('error', () => {
      helpers.errorMessage('Oops! Something isn\'t right...');
    });
  }
};
