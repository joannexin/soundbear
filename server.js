if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express                 = require('express');
const bodyParser              = require('body-parser');
const path                    = require('path');
const webpack                 = require('webpack');
const webpackDevMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware    = require('webpack-hot-middleware');
const config                  = require('./webpack.config');
const spotifyConfig           = require('./config');
const dbURL                   = process.env.DATABASE_LINK;
const helpers                 = require('./server/serverHelpers.js');
const Models                  = require('./db/schema.js');
const Sequelize               = require('sequelize');
const request                 = require('request');
const spotifyHelper           = require("./server/spotifyApiHelpers.js");
const logger                  = require("./server/logger.js");

const app = module.exports = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  noInfo: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.post('/getSongs', helpers.getSpotifyData);
app.post('/artistTracks', helpers.getArtistTopTracks);
app.post('/artistAlbums', helpers.getArtistAlbums);
app.post('/lyrics', helpers.getLyricsDetail);
app.post('/artistsTree', helpers.getRelated);
app.post('/artistInfo', helpers.getArtistInfo);
app.post('/albumInfo', helpers.getAlbumInfo);
app.get('/mostPopular', helpers.getMostPopular);


app.listen(process.env.PORT || 8080, function() {
  spotifyHelper.getAccessToken();
  const timer = setInterval(() => { spotifyHelper.getAccessToken(); }, 3600000);

  logger.log("---------------------------------------");
  logger.log('Server started, listening on port: ' + 8080);
});
