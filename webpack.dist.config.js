/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var path = require('path');
var webpack = require('webpack');

var buildPath = path.resolve(__dirname, 'dist', 'build');
var mainPath = path.resolve(__dirname, 'client', 'components', 'main.js');

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
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/client/styles',
      'mixins': __dirname + '/client/mixins',
      'components': __dirname + '/client/components/',
      'stores': __dirname + '/client/stores/',
      'actions': __dirname + '/client/actions/',
      'utils': __dirname + '/client/utils/'
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
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
