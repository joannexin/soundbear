const spotifyHelper = require("./spotifyApiHelpers");
const lyr = require('lyrics-fetcher');
const Sequelize = require('sequelize');
const Songs = require('../db/schema').Songs;
const logger = require("./logger.js");

module.exports = {
  getSpotifyData: function(req, res) {
    const spotifyApi = spotifyHelper.getSpotifyAPI();
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        let name = data.body.tracks.items[0].name;
        let artist = data.body.tracks.items[0].artists[0].name;
        let pic = data.body.tracks.items[0].album.images[2].url;
        Songs.find({ where: { songName: name, artistName: artist, url: pic } })
          .then(function (song) {
            if (song) {
              let newViews = song.dataValues.views + 1;
              song.update({ views: newViews });
            } else {
              Songs.create({
                songName: name,
                artistName: artist,
                url: pic,
                views: 1
              })
            }
          })
        res.status(data.statusCode).send(data.body);
      }, function(err) {
        logger.error("Failed to get Spotify Data " + err);
        res.send(err.statusCode, err);
      });
  },
  getMostPopular: function(req, res) {
    Songs.findAll({ limit: 10, order: 'views DESC' })
      .then(function(data) {
        res.send(200, data);
      }, function(err) {
        logger.error("Failed to get Most Popular " + err);
        res.send(err.statusCode, err);
      });
  },
  getArtistTopTracks: function(req, res) {
    const spotifyApi = spotifyHelper.getSpotifyAPI();
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        let artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistTopTracks(artistId, 'US')
          .then(function(tracks) {
            res.send(tracks.statusCode, tracks.body);
          }, function(err) {
            res.send(err.statusCode, err);
          });
      }, function(err) {
        logger.error("Failed to get Spotify Top Tracks " + err);
        res.send(err.statusCode, err);
      });
  },
  getArtistAlbums: function(req, res) {
    const spotifyApi = spotifyHelper.getSpotifyAPI();
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        let artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistAlbums(artistId)
          .then(function(albums) {
            res.send(albums.statusCode, albums.body);
          }, function(err) {
            res.send(err.statusCode, err);
          });
      }, function(err) {
        logger.error("Failed to get Spotify Artist Data " + err);
        res.send(err.statusCode, err);
      });
  },
  getArtistInfo: function(req, res) {
    const spotifyApi = spotifyHelper.getSpotifyAPI();
    spotifyApi.getArtist(req.body.id)
      .then(function(data) {
        res.send(data.statusCode, data.body);
      }, function(err) {
        logger.error("Failed to get Spotify Artist Info " + err);
        res.send(err.statusCode, err);
      });
  },
  getAlbumInfo: function(req, res) {
    const spotifyApi = spotifyHelper.getSpotifyAPI();
    spotifyApi.getAlbums([req.body.id])
      .then(function(data) {
        res.send(data.statusCode, data.body);
      }, function(err) {
        logger.error("Failed to get Spotify Album Info " + err);
        res.send(err.statusCode, err);
      });
  },
  getRelated: function(req, res) {
    return new Promise(function (resolve, reject) {
      const spotifyApi = spotifyHelper.getSpotifyAPI();
      return spotifyApi.getArtistRelatedArtists(req.body.artistId)
        .then(function(data) {
          data.body.artists.sort(function(a, b) {
            return b.popularity - a.popularity;
          });
        data.body.artists = data.body.artists.filter(function (artist) {
          return req.body.excludeList.indexOf(artist.id) === -1;
        });
        res.send(data.body.artists.slice(0, 10));
        resolve(data.body.artists.slice(0, 10));
      });
    });
  },
  getLyricsDetail: function (req, res) {
    let artist = req.body.artist;
    let track = req.body.track;
    lyr.fetch(artist, track, function(err, lyrics) {
      if (err) {
        res.send(err.statusCode, err);
      }
      res.send(lyrics);
    });
  }
};
