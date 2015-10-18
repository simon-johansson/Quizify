
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var secrets = require('./server/config/secrets');
var buildPath = path.resolve(__dirname, 'dist', 'build');

var sassNeatPaths = require('node-neat').with([
    path.resolve(__dirname, './client/styles')
  ]).map( neatPath => {
    return 'includePaths[]=' + neatPath;
}).join('&');

module.exports = merge(webpackConfig, {

  output: {
    path: buildPath,
  },

  debug: false,
  devtool: false,

  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    }, {
      test: /\.scss/,
      // loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      loader:  ExtractTextPlugin.extract('style', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader?' + sassNeatPaths),
    }]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GA_TRACKING_ID: JSON.stringify(secrets.googleAnalytics),
      }
    })
  ],
});
