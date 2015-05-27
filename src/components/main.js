'use strict';

var QuizifyApp = require('./QuizifyApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={QuizifyApp}>
    <Route name="/" handler={QuizifyApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});

var socket = window.io.connect();
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
