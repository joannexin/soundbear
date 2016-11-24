import $ from 'jquery';
import * as ajaxHelpers from './ajax';
import store from '../index';

export const searchSong = (query, songName, artistName, task) => {
  return new Promise((resolve, reject) => {
    const request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      maxResults: 5
    });
    request.execute((response) => {

      return new Promise ((resolve, reject) => {

        ajaxHelpers.spotifyGetSongs(songName + ' ' + artistName)
          .then((songs) => {
            let srchItem;
            let countriesArr;
            let spotifyArtwork;
            let artistId;
            let albumName;
            if (songs) {
              spotifyArtwork = songs.tracks.items[0].album.images[1].url;
              albumName = songs.tracks.items[0].album.name;
              countriesArr = songs.tracks.items[0].available_markets;
            } else {
              spotifyArtwork = 'http://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png';
              albumName = null;
              countriesArr = ['US'];
            }
            srchItem = response.result.items[0];
            artistId = songs.tracks.items[0].artists[0].id;
            if (task === 'playSong') {
              store.dispatch({
                type: 'SWITCH_VIEW_TO_PLAYER',
                view: 'player',
                currentSong: {
                  videoId: srchItem.id.videoId,
                  title: srchItem.snippet.title,
                  artwork: spotifyArtwork,
                  countries: countriesArr,
                  request: 'playNow',
                  albumName,
                  songName,
                  artistName,
                  artistId
                }
              });
            } else if (task === 'queueSong') {
              store.dispatch({
                type: 'ADD_TO_QUEUE',
                songQueue: srchItem.id.videoId,
                title: srchItem.snippet.title,
                artwork: spotifyArtwork,
                countries: countriesArr,
                albumName,
                songName,
                artistName,
                artistId
              });
            }
          });
        resolve();
      })
      .then(() => {
        resolve();
      });
    });
  });
};

export const communicateAction = (text) => {
  const recP = document.getElementById('conversationPlayer');
  if (recP) {
    recP.innerHTML = 'Recognized: '+"'"+ text + "'";
    $('#conversationPlayer').css({ opacity: 0.0, visibility: 'visible' }).animate({ opacity: 0.6 }, 1200);

    setTimeout(() => {
      $('#conversationPlayer').css('opacity', '0.6').animate({ opacity: 0 }, 1200, () => {
        $('#conversationPlayer').css('visibility', 'hidden');
      });
    }, 2000);
  }
};

export const errorMessage = (text) => {
  const recP = document.getElementById('conversationPlayer');
  if (recP) {
    recP.innerHTML = text;
    $('#conversationPlayer').css({ opacity: 0.0, visibility: 'visible' }).animate({ opacity: 0.6 }, 1200);

    setTimeout(() => {
      $('#conversationPlayer').css('opacity', '0.6').animate({ opacity: 0 }, 1200, () => {
        $('#conversationPlayer').css('visibility', 'hidden');
      });
    }, 2000);
  }
};

export const dequeueSong = () => {
  if (store.getState().songQueue.length > 0) {
    const currentSong = store.getState().currentSong;
    store.dispatch({
      type: 'ADD_TO_HISTORY',
      song: currentSong
    });
    store.dispatch({
      type: 'DEQUEUE_SONG',
      view: 'player'
    });
    communicateAction('Playing next song in queue...');
  }
};

export const playPrevious = () => {
  if (store.getState().songHistory.length > 0) {
    store.dispatch({
      type: 'PLAY_PREVIOUS'
    });
    communicateAction('Playing previous song...');
  }
};

export const restartSong = () => {
  store.dispatch({
    type: 'RESTART_SONG'
  });
  communicateAction('Restarting song...');
};

export const muteSong = () => {
  store.dispatch({
    type: 'MUTE'
  });
  communicateAction('Mute');
};

export const unMuteSong = () => {
  store.dispatch({
    type: 'UNMUTE'
  });
  communicateAction('Unmute');
};

export const increaseVolume = (previousVolume) => {
  const el = document.getElementById('volumebar');
  el.value = previousVolume;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(() => {
    $('#helpBar').css({ opacity: 0.0, visibility: 'visible' }).animate({ opacity: 0.6 }, 1200);

  }, 3000);
};

export const decreaseVolume = () => {



  const el = document.getElementById('volumebar');
  const previousVolume = el.value;
  el.value = '10';
  el.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(() => {
    increaseVolume(previousVolume);
  }, 4000);
};
