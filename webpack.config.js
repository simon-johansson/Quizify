/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

var buildPath = path.resolve(__dirname, 'client', 'build');
var mainPath = path.resolve(__dirname, 'client', 'views', 'main.js');

module.exports = {

  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build/'
  },

  cache: true,
  debug: true,
  devtool: '#inline-source-map',
  entry: [
      // 'webpack/hot/only-dev-server',

      // For hot style updates
      'webpack/hot/dev-server',
      // The script refreshing the browser on none hot updates
      'webpack-dev-server/client?http://localhost:8080',
      mainPath
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/client/styles',
      'mixins': __dirname + '/client/mixins',
      'views': __dirname + '/client/views/',
      'stores': __dirname + '/client/stores/',
      'actions': __dirname + '/client/actions/',
      'utils': __dirname + '/client/utils/',
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
      loader: 'react-hot!babel-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
