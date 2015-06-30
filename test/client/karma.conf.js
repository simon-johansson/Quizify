'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['phantomjs-shim', 'mocha', 'sinon-chai'],
    files: [
      './helpers/**/*.js',
      './spec/components/**/*.js',
      './spec/stores/**/*.js'
    ],
    preprocessors: {
      './spec/components/**/*.js': ['webpack'],
      './spec/stores/**/*.js': ['webpack'],
      './spec/actions/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        }]
      },
      postLoaders: [{
        test: /src\/.*\.js$/,
        loader: 'istanbul-instrumenter',
        exclude: /(test|node_modules|bower_components|dist|server)/,
      }],
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/'),
          'stores': path.join(process.cwd(), './src/stores/'),
        }
      }
    },
    webpackServer: {
      noInfo: true, //please don't spam the console when running in karma!
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS', 'Firefox'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    captureTimeout: 60000,
    singleRun: true,
    plugins: [
      require("karma-webpack"),
      require("istanbul-instrumenter-loader"),
      require("karma-mocha"),
      require("karma-coverage"),
      require("karma-phantomjs-launcher"),
      require("karma-phantomjs-shim"),
      require("karma-firefox-launcher"),
      require("karma-spec-reporter"),
      require("karma-sinon-chai"),
    ],
  });
};
