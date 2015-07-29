'use strict';

var React = require('react');

var Router = require('react-router');
var { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

var socket = require('utils/WebSocketService').connect();

var QuizifyApp = require('./QuizifyApp');
var Home = require('./Home');
var About = require('./About');
var Host = require('./Host');
var HostLobby = require('./Host/Lobby');
var Player = require('./Player');
var PlayerLobby = require('./Player/Lobby');

class NotFound extends React.Component {
  render () {
    return (
      <div>
        <h2>Error!</h2>
      </div>
    );
  }
}

var routes = (
  <Route path="/" handler={ QuizifyApp }>
    <DefaultRoute name="home" handler={ Home }/>
    <Route name="about" path="about" handler={ About }/>

    <Route name="host" path="host" handler={ Host }>
      <Route name="host-lobby" path="lobby" handler={ HostLobby }/>
    </Route>
    <Route name="player" path="player" handler={ Player }>
      <Route name="player-lobby" path="lobby" handler={ PlayerLobby }/>
      <Route path="lobby/:gameId" handler={ PlayerLobby }/>
    </Route>
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

Router.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('content'));
});
