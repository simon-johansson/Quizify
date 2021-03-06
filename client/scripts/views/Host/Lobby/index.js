
import React from 'react/addons';
import {Link} from 'react-router';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';

import {getPlayerElements} from 'views/shared/helpers/Player';
import JoinGameInstructions from './components/JoinGameInstructions';
import Leaderboard from '../shared/components/Leaderboard';

import styles from 'styles/views/Host/Lobby.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class HostLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.gameId || '',
      players: props.players || [],
      url: props.url || '',
      deepLink: props.deepLink || ''
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    if(HostStore.getGameId()) {
      let {state} = this;
      state.gameId = HostStore.getGameId();
      state.players = HostStore.getPlayers();
      state.url = HostStore.getUrl();
      state.deepLink = HostStore.getDeepLink();
      console.log(this.state);
      this.forceUpdate();
    } else {
      HostActions.createGame();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(state, msg) {
    this.setState(state);
    if(msg === 'playerJoinedGame') {
      HostActions.listPlayers({
        players: HostStore.getPlayers()
      });
    }
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="development-helpers">
          <p>Host lobby dev helpers</p>
          <button onClick={window.addPlayers}>Add player to game</button>
          <button onClick={window.removePlayer}>Remove player from game</button>
        </div>
      );
    }
  }

  _getPlayerElements(players) {
    return getPlayerElements(players);
  }

  render() {
    const {url, gameId, deepLink, players} = this.state;
    const gameHasStarted = false;
    // const players = this._getPlayerElements(this.state.players);
    return (
      <div styleName="Lobby">
        { this._developmentHelpers() }
        <JoinGameInstructions
          url={url}
          deepLink={deepLink}
          gameId={gameId}
        />

        <div styleName="wrapper">
          <section styleName="settings">
            <header>
              Settings
            </header>
          </section>

          <section styleName="rules">
            <header>
              Rules
            </header>
            <ul>
              <li>
                The goal is to guess the artist behind the song,
                you will get 4 alternatives.
              </li>
              <li>
                The faster you answer the more points you'll get but
                you can't change your mind once you have answered.
              </li>
              <li>
                Round ends when everyone has answered or
                the song has ended.
              </li>
              <li>
                The player with most points after 8 rounds is
                the winner.
              </li>
            </ul>
          </section>
        </div>

        <Leaderboard
          heading="Players"
          players={players}
          gameHasStarted={gameHasStarted}
        />
      </div>
    );
  }
}
