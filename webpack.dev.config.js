
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackConfig = require('./webpack.config.js');
var secrets = require('./server/config/secrets');
var buildPath = path.resolve(__dirname, 'client', 'build');

var sassNeatPaths = require('node-neat').with([
    path.resolve(__dirname, './client/styles')
  ]).map( neatPath => {
    return 'includePaths[]=' + neatPath;
}).join('&');

module.exports = merge(webpackConfig, {

  output: {
    path: buildPath,
  },

  eslint: {
    configFile: './.eslintrc'
  },

  cache: true,
  debug: true,
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
  ],

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.scss/,
      // loader: 'style-loader!css-loader!sass-loader?modules',
      // loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
      // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader')
      loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader?sourceMap&' + sassNeatPaths,
    }, {
      test: /\.css$/,
      // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      // loader: 'style-loader!css-loader?modules',
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    }]
  },

  plugins: [
    // new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:  JSON.stringify('development'),
        GA_TRACKING_ID: JSON.stringify(secrets.googleAnalytics),
      }
    })
  ]

});

