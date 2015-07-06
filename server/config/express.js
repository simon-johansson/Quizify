'use strict';

var path           = require('path');

var express        = require('express');
var httpProxy      = require('http-proxy');
var favicon        = require('serve-favicon');
var morgan         = require('morgan');
var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var errorHandler   = require('errorhandler');
var config         = require('./environment');

module.exports = app => {

  var env = app.get('env');
  // app.set('views', `${config.root}/server/views`);
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.set('appPath', `${config.root}/client`);

  if(env === 'production') {
    app.use(express.static(path.join(config.root, 'dist')));
    app.use(favicon(path.join(config.root, 'dist', 'favicon.ico')));
    // app.use(morgan('dev'));
  }

  if(env === 'test') {
    // app.use(morgan('dev'));
  }

  if(env === 'development') {
    var proxy = httpProxy.createProxyServer({ ws: true });

    app.use(express.static(path.join(config.root, 'client')));
    app.use(morgan('dev'));
    app.use(errorHandler());

    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    var bundle = require('./bundle.js');
    bundle();

    // Any requests to /build is proxied to webpack-dev-server
    app.all('/build/*', function (req, res) {
      proxy.web(req, res, {
          target: 'http://localhost:8080'
      });
    });

    // It is important to catch any errors from the proxy or the
    // server will crash. An example of this is connecting to the
    // server when webpack is bundling
    proxy.on('error', function(e) {
      console.log('Could not connect to proxy, please try again...');
    });
  }
};


