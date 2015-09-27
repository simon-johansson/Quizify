
import {join} from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {root as rootDir, clientDir} from './environment';
import webpackconfig from '../../webpack.dev.config';
const compiler = webpack(webpackconfig);

const environments = {

  production(app) {
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static(join(rootDir, clientDir)));
    app.use(favicon(join(rootDir, clientDir, 'favicons', 'favicon.ico')));
    // app.use(morgan('dev'));
  },

  development(app) {
    app.use(express.static(join(rootDir, clientDir)));
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackconfig.output.publicPath,
      stats: {colors: true}
    }));
    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }));
  }
};


export default app => {
  const env = app.get('env');
  try {
    environments[env](app);
  }
  catch(err) {
    console.log(err);
  }
};


