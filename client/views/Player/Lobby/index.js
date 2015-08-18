'use strict';

const React = require('react/addons');
const Reflux = require('reflux');

const Actions = require('actions/PlayerActionCreators');
const Store = require('stores/PlayerStore');

const JoinGameForm = require('./JoinGameForm');
const JoinedGameInstructions = require('./JoinedGameInstructions');

class PlayerLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joindGame: false,
      gameId: this.props.params ? this.props.params.gameId : null,
      players: [],
      playerName: Store.getPlayerName() || '',
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  _onStoreChange(data) {
    this.setState({
      joindGame: Store.hasJoinedGame(),
      players: Store.getPlayers(),
      playerName: Store.getPlayerName(),
    });
  }

  render() {
    let {joindGame, gameId, players, playerName} = this.state;
    return (
        <div className="PlayerLobby-view">
          { joindGame ?
            <JoinedGameInstructions playerName={playerName} players={players} /> :
            <JoinGameForm playerName={playerName} gameId={gameId} />
          }
        </div>
      );
  }
}

module.exports = PlayerLobby;
