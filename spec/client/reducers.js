require('babel-register')({
        "presets": ["react", "stage-0", "es2015"]
});

const should = require('should');
const mainReducer = require('../../src/redux/reducers').default;

let data = require('./data.js');

describe('Reducers-', () => {
  describe('SWITCH_VIEW_TO_PLAYER', () => {
    it('mainReducer: Should return new view', () => {
      mainReducer({}, data.switchView).view.should.equal('player');
    });
  });

  describe('INITIATE_QUEUE', () => {
    let testData = {
      type: 'INITIATE_QUEUE',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    it('mainReducer: Should have property songQueue', () => {
      mainReducer({}, testData).should.have.property('songQueue');
    });
  });

    describe('CHANGE_CURRENT_SONG', () => {
    let newDataChange = {
      type: 'CHANGE_CURRENT_SONG',
      view: 'player',
      currentSong: {
        videoId: "MYSVMgRr6pw",
        title: "Hozier - Take Me To Church",
        artwork: "https://i.scdn.co/image/012a058071e324d6751e5969dd4a651ee01f4501",
        albumName: "Hozier",
        songName: "Take Me to Church",
        artistName: "Hozier",
        artistId: "2FXC3k01G6Gw61bmprjgqS",
        countries: ["AU", "CA", "US"]
      }
    };
    it('mainReducer: Should change current song', () => {
      let state = mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');
      mainReducer(state, newDataChange).currentSong.artistName.should.equal('Hozier');
    });
  });

  describe('ADD_TO_QUEUE', () => {
    it('mainReducer: Should add new song to queue', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, data.newData).songQueue[0].artistName.should.equal('Arctic Monkeys');
    });
  });

  describe('DEQUEUE_SONG', () => {
    let actionDequeue = {
      type: 'DEQUEUE_SONG'
    };
    it('mainReducer: Should set current song when dequeued', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, data.newData).songQueue[0].artistName.should.equal('Arctic Monkeys');

      let dequeued = mainReducer(initiated, data.newData);
      mainReducer(dequeued, actionDequeue).currentSong.artistName.should.equal('Arctic Monkeys');
    });
  });

  describe('ADD_TO_HISTORY', () => {
    let actionHistory = {
      type: 'ADD_TO_HISTORY',
      song: data.switchView.currentSong
    };
    it('mainReducer: Should add current song to history when played', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, actionHistory).songHistory[0].artistName.should.equal('Adele');
      mainReducer(initiated, actionHistory).currentSong.artistName.should.not.be.ok;
    });
  });

  describe('MODIFY_QUEUE', () => {
    let newQueue = {
      type: 'ADD_TO_QUEUE',
      view: 'player',
      videoId: 'YQHsXMglC9A',
      title: 'Adele - Hello',
      artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
      albumName: "Adele",
      songName: 'Hello',
      artistName: 'Adele',
      artistId: '4dpARuHxo51G3z768sgnrY',
      countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX"]
    };

    let modifiedQueue = {
      type: 'MODIFY_QUEUE',
      newQueue: [{
        type: 'ADD_TO_QUEUE',
        view: 'player',
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        albumName: "Adele",
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX"]
      }]
    };

    it('mainReducer: Should remove chosen song from queue', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, data.newData).songQueue[0].artistName.should.equal('Arctic Monkeys');

      let newQueueCreated = mainReducer(initiated, data.newData);
      mainReducer(newQueueCreated, newQueue).songQueue[1].artistName.should.equal('Adele');

      let modified = mainReducer(newQueueCreated, newQueue);
      mainReducer(modified, modifiedQueue).songQueue[0].artistName.should.not.equal('Arctic Monkeys');
      mainReducer(modified, modifiedQueue).songQueue.length.should.equal(1);
    });
  });

  describe('MODIFY_HISTORY', () => {
    let actionHistory = {
      type: 'ADD_TO_HISTORY',
      song: data.switchView.currentSong
    };

    let modifiedHistory = {
      type: 'MODIFY_HISTORY',
      newHistory: []
    };

    it('mainReducer: Should remove chosen song from history', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, actionHistory).songHistory[0].artistName.should.equal('Adele');
      mainReducer(initiated, actionHistory).currentSong.artistName.should.not.be.ok;

      let modifier = mainReducer(initiated, actionHistory);
      mainReducer(modifier, modifiedHistory).songHistory.should.be.empty;
    });
  });

  describe('PLAY_PREVIOUS', () => {
    let actionHistory = {
      type: 'ADD_TO_HISTORY',
      song: data.switchView.currentSong
    };
    let action = {
      type: 'PLAY_PREVIOUS'
    };

    it('mainReducer: Should play previous song', () => {
      let state =  mainReducer({}, data.switchView);
      mainReducer({}, data.switchView).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, data.queue);
      mainReducer(initiated, actionHistory).songHistory[0].artistName.should.equal('Adele');
      mainReducer(initiated, actionHistory).currentSong.artistName.should.not.be.ok;

      let addedToHistory = mainReducer(initiated, actionHistory);
      mainReducer(addedToHistory, action).currentSong.artistName.should.equal('Adele');
      mainReducer(addedToHistory, action).songHistory.should.be.empty;
      mainReducer(addedToHistory, action).songQueue.should.be.empty;
    });
  });

});

