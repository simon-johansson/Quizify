'use strict';

var SpotifyWebApi = require('spotify-web-api-node');

var { clientId, clientSecret }  = require('../../config/secrets').spotifyKeys;
var { spotifyTokenRefreshRate } = require('../../config/environment');
var client;

function setAccessTokenTimeout(expirationInSeconds) {
  let expirationInMilliseconds = expirationInSeconds * 1000;
  setTimeout(function () {
    refreshAccessToken();
  }, expirationInMilliseconds || spotifyTokenRefreshRate);
}

function refreshAccessToken() {
  client.clientCredentialsGrant()
    .then(function(data) {
      console.log('Access token has been set');
      console.log(`The access token expires in ${data.body.expires_in} seconds`);
      console.log(`The access token is ${data.body.access_token}`);

      client.setAccessToken(data.body.access_token);
      setAccessTokenTimeout(parseInt(data.body.expires_in));
    })
    .catch(function(err) {
      throw new Error(err);
    });
}

(function () {
  let keys = { clientId, clientSecret };
  client = new SpotifyWebApi(keys);
  refreshAccessToken();
})();

module.exports = client;
