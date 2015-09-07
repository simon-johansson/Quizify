'use strict';

import React from 'react/addons';
import {Link} from 'react-router';

import 'styles/views/Home.scss';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home-view">
        <Link to="HostLobby">
          <button>Create</button>
        </Link>
        <Link to="PlayerLobby">
          <button>Join</button>
        </Link>
      </div>
    );
  }
}

