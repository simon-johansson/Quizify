
import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import Host from './';
import HostLobby from './Lobby';
import HostGame from './Game';

export default (
  <Route name="Host" path="host" handler={ Host }>
    <DefaultRoute name="HostLobby" handler={ HostLobby }/>
    <Route name="HostGame" path="game" handler={ HostGame } />
  </Route>
);
