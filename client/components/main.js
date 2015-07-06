'use strict';

var React = require('react');

var Router = require('react-router');
var { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

var socket = require('utils/WebSocketService').connect();

var QuizifyApp = require('./QuizifyApp');
var Home = require('./Home');
var About = require('./About');
var HostLobby = require('./HostLobby');
var PlayerLobby = require('./PlayerLobby');

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

    <Route name="hostLobby" path="host-lobby" handler={ HostLobby }/>
    <Route name="about" path="about" handler={ About }/>
    <Route name="playerLobby" path="player-lobby" handler={ PlayerLobby }/>
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

Router.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('content'));
});
