'use strict';

const React = require('react');

const Router = require('react-router');
const { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

const ga = require('react-ga');

const QuizifyApp = require('./QuizifyApp');
const Home = require('./Home');
const About = require('./About');
const Host = require('./Host');
const HostLobby = require('./Host/Lobby');
const Player = require('./Player');
const PlayerLobby = require('./Player/Lobby');

class NotFound extends React.Component {
  render () {
    return (
      <div>
        <h2>Error!</h2>
      </div>
    );
  }
}

const routes = (
  <Route path="/" handler={ QuizifyApp }>
    <DefaultRoute name="home" handler={ Home }/>
    <Route name="about" path="about" handler={ About }/>

    <Route name="host" path="create" handler={ Host }>
      <DefaultRoute name="host-lobby" handler={ HostLobby }/>
    </Route>
    <Route name="player" path="join" handler={ Player }>
      <DefaultRoute name="player-lobby" handler={ PlayerLobby }/>
      <Route path=":gameId" handler={ PlayerLobby }/>
    </Route>
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

ga.initialize('UA-000000-01', {debug: true});

Router.run(routes, HashLocation, (Root, state) => {
  ga.pageview(state.pathname);
  React.render(<Root/>, document.getElementById('content'));
});
