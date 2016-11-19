const keys = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(keys.spotify);
const lyr = require('lyrics-fetcher');
var Sequelize = require('sequelize');
var Songs = require('../db/schema').Songs;

module.exports = {
  getSpotifyData: function(req, res) {
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        var name = data.body.tracks.items[0].name;
        var artist = data.body.tracks.items[0].artists[0].name;


        Songs.find({ where: { songName: name, artistName: artist } })
          .then(function (song) {
            if (song) {
              var newViews = song.dataValues.views + 1;
              song.update({ views: newViews });
            } else {
              Songs.create({
                songName: name,
                artistName: artist,
                views: 1
              })
            }
          })
          //console.log('hello', data.statusCode, data.body.tracks.items[0])
        // res.send(data.statusCode, data.body);
        res.status(data.statusCode).send(data.body);
      }, function(err) {
        res.send(400, err);
      });
  },

  getMostPopular: function(req, res) {
    Songs.findAll({ limit: 10, order: 'views DESC' })
      .then(function(data) {
        res.status(200);
        res.send(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  },

  getArtistTopTracks: function (req, res) {
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        var artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistTopTracks(artistId, 'US')
          .then(function(tracks) {
            //console.log('inside getArtistTopTracks', tracks.body)
        res.status(tracks.statusCode).send(tracks.body);
          }, function(err) {
              res.send(400, err);
          })
      })
  },

  getArtistAlbums: function (req, res) {
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        var artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistAlbums(artistId)
          .then(function(albums) {
            //console.log('inside getArtistAlbums', albums.body)
            res.send(data.statusCode, albums.body);
          }, function(err) {
              res.send(400, err);
          })
      })
  },

  getArtistInfo: function (req, res) {
    console.log('getArtistInfo', req.body.id)
    spotifyApi.getArtist(req.body.id)
      .then(function(data) {
        console.log('got from getArtistInfo', data);
        res.send(data.statusCode, data.body);
      }, function(err) {
        console.error(err);
      });
  },

  getAlbumInfo: function (req, res) {
    console.log('getArtistInfo', req.body.id)
    spotifyApi.getAlbums([req.body.id])
      .then(function(data) {
        //console.log('got from getAlbumInfo', data);
        res.send(data.statusCode, data.body);
      }, function(err) {
        console.error(err);
      });
  },

  //AUTHENTICATION REQUIRED FOR THIS CALL
  getNewReleases: function (req, res) {
    //console.log('inside getNewReleases before call');
    spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'US' })
      .then(function(data) {
        //console.log('inside getNewReleases', data.body);
        res.send(data.statusCode, data.body);
        done();
        }, function(err) {
          res.send(400, err);
      });
  },

  getRelated: function(req, res) {
        return new Promise(function (resolve, reject) {
            return spotifyApi.getArtistRelatedArtists(req.body.artistId).then(function (data) {

                data.body.artists.sort(function (a, b) {
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

  //AUTHENTICATION REQUIRED FOR THIS CALL
  getListOfCategories: function (req, res) {
    spotifyApi.getCategories({
      limit : 20,
      offset: 0,
      country: 'US'
    })
      .then(function(data) {
        //console.log('inside getNewReleases', data.body)
        res.send(data.statusCode, data.body);
        }, function(err) {
            res.send(400, err);
      })
  },

  getLyricsDetail: function (req, res) {
    var artist = req.body.artist;
    var track = req.body.track;
    lyr.fetch(artist, track, function (err, lyrics) {
      if (err) {
        throw err;
      }
      res.send(lyrics);
    });
  }
};
