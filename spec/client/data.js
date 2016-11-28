module.exports = {
  switchView: {
    type: 'SWITCH_VIEW_TO_PLAYER',
    view: 'player',
    currentSong: {
      videoId: 'YQHsXMglC9A',
      title: 'Adele - Hello',
      artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
      albumName: "Adele",
      songName: 'Hello',
      artistName: 'Adele',
      artistId: '4dpARuHxo51G3z768sgnrY',
      countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
    }
  },
  queue: {
    type: 'INITIATE_QUEUE',
    songQueue: [],
    songHistory: []
  },
   newData: {
    type: 'ADD_TO_QUEUE',
    view: 'player',
    videoId: "Jn6-TItCazo",
    title: "Arctic Monkeys - Arabella (Official Audio)",
    artwork: "https://i.scdn.co/image/10c7b4705032bc99da2d32ec2751ab3fdd64ca5f",
    albumName: "AM",
    songName: "Arabella",
    artistName: "Arctic Monkeys",
    artistId: "7Ln80lUS6He07XvHI8qqHH",
    countries: ["US"]
  }
};
