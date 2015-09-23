
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const config = require('./environment');
const webpack = require('webpack');
const webpackconfig = require('../../webpack.dev.config');
const compiler = webpack(webpackconfig);

module.exports = app => {
  const env = app.get('env');

  if(env === 'production') {
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static(path.join(config.root, 'dist')));
    app.use(favicon(path.join(config.root, 'dist', 'favicons', 'favicon.ico')));
    // app.use(morgan('dev'));
  }

  if(env === 'test') {
    // app.use(morgan('dev'));
  }

  if(env === 'development') {

    app.use(express.static(path.join(config.root, 'client')));

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackconfig.output.publicPath,
      stats: {colors: true}
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log
    }));

    app.get('/', function (req, res) {
      res.sendFile(path.join(config.root, 'client', 'index.html'));
    });
  }
};


