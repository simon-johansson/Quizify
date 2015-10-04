
import React from 'react/addons';
import {Link} from 'react-router';

import styles from 'styles/views/Home.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Home extends React.Component {
  render() {
    return (
      <div styleName="styles">
        <h1>Realtime Multiplayer Music Quiz</h1>
        <p>Use your mobile as a controller, up to 8 players!</p>
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

