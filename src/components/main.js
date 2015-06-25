'use strict';

var React = require('react');

var Router = require('react-router');
var { Route, NotFoundRoute, HashLocation, DefaultRoute } = Router;

var QuizifyApp = require('./QuizifyApp');
var Home = require('./Home');
var Lobby = require('./Lobby');
var About = require('./About');

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

    <Route name="lobby" path="lobby" handler={ Lobby }/>
    <Route name="about" path="about" handler={ About }/>
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

Router.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('content'));
});
