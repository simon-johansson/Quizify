/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var path = require('path');
var webpack = require('webpack');

var secrets = require('./server/config/secrets');

var buildPath = path.resolve(__dirname, 'dist', 'build');
var mainPath = path.resolve(__dirname, 'client', 'scripts', 'main.js');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  output: {
    publicPath: '/build/',
    path: buildPath,
    filename: 'bundle.js'
  },

  debug: false,
  devtool: false,
  entry: mainPath,

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        GA_TRACKING_ID: JSON.stringify(secrets.googleAnalytics),
      }
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/client/styles',
      'mixins': __dirname + '/client/scripts/mixins',
      'views': __dirname + '/client/scripts/views/',
      'stores': __dirname + '/client/scripts/stores/',
      'actions': __dirname + '/client/scripts/actions/',
      'utils': __dirname + '/client/scripts/utils/',
      'shared': __dirname + '/shared/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],

    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
