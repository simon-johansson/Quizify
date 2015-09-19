'use strict';

import React from 'react/addons';
import { RouteHandler, Link } from 'react-router';

import PlayerStore from 'stores/PlayerStore';
import ServerCommunication from 'utils/ServerCommunication';
import FeedbackButton from './shared/components/FeedbackButton';

// CSS
import 'normalize.css';
import 'styles/main.scss';

export default class SpotifyQuizApp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    ServerCommunication.connect();
    ServerCommunication.bindClientEvents();

    if(PlayerStore.isUsingMobile()) {
      this.context.router.transitionTo('player-lobby');
    }
  }

  render() {
    return (
      <div className='SpotifyQuizApp'>
        <h1>SpotifyQuiz</h1>
        <ul>
          <li>
            <Link to="Home">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="About">
              <span>About</span>
            </Link>
          </li>
        </ul>

        <RouteHandler/>
        <FeedbackButton/>
      </div>
    );
  }
}
