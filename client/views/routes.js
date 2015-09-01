'use strict';

const React = require('react');

const Router = require('react-router');
const { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

const ga = require('react-ga');

const SpotifyQuizApp = require('./SpotifyQuizApp');
const Home = require('./Home');
const About = require('./About');
const Host = require('./Host');
const HostLobby = require('./Host/Lobby');
const Player = require('./Player');
const PlayerLobby = require('./Player/Lobby');
const HostGame = require('./Host/Game');

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
  <Route path="/" handler={ SpotifyQuizApp }>
    <DefaultRoute name="home" handler={ Home }/>
    <Route name="about" path="about" handler={ About }/>

    <Route name="host" path="host" handler={ Host }>
      <DefaultRoute name="host-lobby" handler={ HostLobby }/>
      <Route name="host-game" path="start" handler={ HostGame }>
    </Route>
    </Route>
    <Route name="player" path="player" handler={ Player }>
      <DefaultRoute name="player-lobby" handler={ PlayerLobby }/>
      <Route path=":gameId" handler={ PlayerLobby }/>
    </Route>
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

if(process.env.NODE_ENV === 'production') {
  ga.initialize(process.env.GA_TRACKING_ID);
} else {
  ga.initialize('UA-000000-01', {debug: false});
}

Router.run(routes, HashLocation, (Root, state) => {
  ga.pageview(state.pathname);
  React.render(<Root/>, document.getElementById('content'));
});
