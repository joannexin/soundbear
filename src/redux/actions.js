export function switchViewToPlayer(view, currentSong) {
  return {
    type: 'SWITCH_VIEW_TO_PLAYER',
    view,
    currentSong
  };
}

export function initiateQueue() {
  return {
    type: 'INITIATE_QUEUE',
    songQueue: [],
    songHistory: []
  };
}

export function changeCurrentSong(currentSong) {
  return {
    type: 'CHANGE_CURRENT_SONG',
    currentSong
  };
}

export function addToQueue(songQueue) {
  return {
    type: 'ADD_TO_QUEUE',
    songQueue
  };
}

export function dequeueSong() {
  return {
    type: 'DEQUEUE_SONG'
  };
}

export function addToHistory(song) {
  return {
    type: 'ADD_TO_HISTORY',
    song
  };
}

export function modifyQueue(newQueue) {
  return {
    type: 'MODIFY_QUEUE',
    newQueue
  };
}

export function modifyHistory(newHistory) {
  return {
    type: 'MODIFY_HISTORY',
    newHistory
  };
}

export function playPrevious() {
  return {
    type: 'PLAY_PREVIOUS'
  };
}

export function removeFromHistory(songId) {
  return {
    type: 'REMOVE_FROM_HISTORY',
    songId
  };
}

export function toggleRestartToFalse() {
  return {
    type: 'RESTART_TO_FALSE'
  };
}
