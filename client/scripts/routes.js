'use strict';

import React from 'react';
import Router, { Route, NotFoundRoute, HashLocation, DefaultRoute } from 'react-router';
import ga from 'react-ga';

import SpotifyQuizApp from 'views/SpotifyQuizApp';
import Home from 'views/Home';
import About from 'views/About';

import HostRoutes from 'views/Host/routes';
import PlayerRoutes from 'views/Player/routes';

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
    <DefaultRoute name="Home" handler={ Home }/>
    <Route name="About" path="about" handler={ About }/>

    {HostRoutes}
    {PlayerRoutes}

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
