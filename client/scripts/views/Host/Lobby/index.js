'use strict';

import React from 'react/addons';
import {Link} from 'react-router';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';

import PlayerHelpers from 'views/shared/helpers/Player';
import JoinGameInstructions from './components/JoinGameInstructions';
import StartGameButton from './components/StartGameButton';

import styles from 'styles/views/Host/Lobby.css';
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
    HostActions.createGame();
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
        <div styleName="dev-helpers">
          <p>Host lobby dev helpers</p>
          <button onClick={window.addPlayers}>Add player to game</button>
          <button onClick={window.removePlayer}>Remove player from game</button>
        </div>
      );
    }
  }

  _getPlayerElements(players) {
    return PlayerHelpers.getPlayerElements(players);
  }

  render() {
    const {url, gameId, deepLink} = this.state;
    const players = this._getPlayerElements(this.state.players);
    return (
      <div styleName="styles">
        { this._developmentHelpers() }
        <JoinGameInstructions url={url} deepLink={deepLink} gameId={gameId} />
        <div styleName="players">
          { players }
        </div>
        <StartGameButton canStartGame={!!players.length} link={'HostGame'} />
      </div>
    );
  }
}
