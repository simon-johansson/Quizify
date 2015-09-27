
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  GA_TRACKING_ID} = process.env;

export default {
  spotifyKeys: {
    clientId: SPOTIFY_CLIENT_ID || '',
    clientSecret: SPOTIFY_CLIENT_SECRET || '',
  },
  googleAnalytics: GA_TRACKING_ID || '',
};
