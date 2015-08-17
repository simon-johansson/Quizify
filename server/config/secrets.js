'use strict'

module.exports = {
  spotifyKeys: {
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  },
  googleAnalytics: {
    id: process.env.GA_TRACKING_ID || '',
  }
};
