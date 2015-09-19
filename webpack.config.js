
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var secrets = require('./server/config/secrets');
var mainPath = path.resolve(__dirname, 'client', 'scripts', 'main.js');

module.exports = {

  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  entry: [mainPath],

  stats: {
    colors: true,
    reasons: true
  },

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
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ]

};
