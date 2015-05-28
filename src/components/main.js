'use strict';

var socket = require('socket.io-client')();
var React = require('react');
var Router = require('react-router');

var QuizifyApp = require('./QuizifyApp');
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

// Socket.io test
socket.on('connect', function(){
  console.log('connected');
});
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
