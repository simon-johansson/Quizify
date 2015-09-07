'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

import styles from 'styles/views/Host/Host.css';
import CSSModules from 'react-css-modules';

var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

var PlayerHelpers = require('views/shared/helpers/Player');
var JoinGameInstructions = require('./components/JoinGameInstructions');
var StartGameButton = require('./components/StartGameButton');

var Router = require('react-router');
var { Link } = Router;

class HostLobby extends React.Component {
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
        <div className="fake-player-helpers">
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
      <div className="HostLobby-view">
        { this._developmentHelpers() }
        <JoinGameInstructions url={url} deepLink={deepLink} gameId={gameId} />
        { players }
        <StartGameButton canStartGame={!!players.length} link={'HostGame'} />
      </div>
    );
  }
}

HostLobby.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default CSSModules(HostLobby, styles);
