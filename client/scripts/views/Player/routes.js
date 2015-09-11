'use strict';

import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import Player from './';
import PlayerLobby from './Lobby';

export default (
  <Route name="Player" path="player" handler={ Player }>
    <DefaultRoute name="PlayerLobby" handler={ PlayerLobby }/>
    <Route path=":gameId" handler={ PlayerLobby }/>
  </Route>
);