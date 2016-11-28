import $ from 'jquery';

export const spotifyGetSongs = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/getSongs',
      data: { string: params }
    })
    .done((data) => {
      if (data.tracks.items.length > 0) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
};

export const getLyrics = (track, artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/lyrics',
    data: { artist, track }
  })
  .done((data) => {
    cb(data);
  });
};

export const artistTracks = (artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/artistTracks',
    data: { string: artist }
  })
  .done((data) => {
    cb(data);
  });
};

export const albumInfo = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/albumInfo',
      data: { id }
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const artistInfo = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/artistInfo',
      data: { id }
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const artistAlbums = (artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/artistAlbums',
    data: { string: artist }
  })
  .done((data) => {
    cb(data);
  });
};

export const relatedTree = (artistId, excludeList) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/artistsTree',
      data: { artistId, excludeList }
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const getMostPopular = (cb) => {
  $.ajax({
    method: 'GET',
    url: '/mostPopular'
  })
  .done((data) => {
    cb(data);
  });
};
