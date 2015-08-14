'use strict';

var React = require('react');

var Router = require('react-router');
var { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

var ga = require('react-ga');

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

ga.initialize('UA-000000-01', {debug: true});

Router.run(routes, HashLocation, (Root, state) => {
  ga.pageview(state.pathname);
  React.render(<Root/>, document.getElementById('content'));
});
