const keys = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(keys.spotify);
const logger = require("./logger.js");

module.exports = {
  getAccessToken: function() {
    // Retrieve an access token
    const grantMe = () => {
      return new Promise((resolve, reject) => {
        spotifyApi.clientCredentialsGrant()
          .then((data) => {
            logger.log('The access token expires in ' + data.body['expires_in']);
            logger.log('The access token is ' + data.body['access_token']);
            if (data.body['access_token']) {
              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body['access_token']);
              resolve();
            } else {
              reject(new Error("Something went wrong when retrieving an access token"));
            }
          }, (err) => {
            logger.log('Something went wrong when retrieving an access token' + err.message);
            throw err;
          });
        });
    };

    const refreshMe = () => {
      return new Promise((resolve, reject) => {
        spotifyApi.refreshAccessToken()
          .then((data) => {
            logger.log('The access token expires in ' + data.body['expires_in']);
            logger.log('The access token is ' + data.body['access_token']);
            if (data.body['access_token']) {
              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body['access_token']);
              resolve();
            } else {
              reject(new Error("Something went wrong when retrieving an access token"));
            }
          }, (err) => {
            logger.log('Something went wrong when retrieving an access token ' + err.message);
            throw err;
          });
        });
    };

    grantMe()
    .catch((e) => {
      logger.log("Error occured " +  e);
      refreshMe();
    });
  },
  getSpotifyAPI: function() {
    this.getAccessToken();
    return spotifyApi;
  }
};
