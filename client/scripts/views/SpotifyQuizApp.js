
import React from 'react/addons';
import { RouteHandler, Link } from 'react-router';

import PlayerStore from 'stores/PlayerStore';
import ServerCommunication from 'utils/ServerCommunication';
import FeedbackButton from './shared/components/FeedbackButton';
import AlbumCoverBackground from './shared/components/AlbumCoverBackground';

// CSS
import 'normalize.css';
import 'styles/general.scss';

import styles from 'styles/views/SpotifyQuizApp.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
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
      this.context.router.transitionTo('PlayerLobby');
    }
  }

  render() {
    return (
      <div styleName='app'>
        <div styleName='title'>
          <h1>Title</h1>
        </div>


        <RouteHandler/>
        <FeedbackButton/>
        <AlbumCoverBackground />
      </div>
    );
  }
}
