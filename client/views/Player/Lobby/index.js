'use strict';

const React = require('react/addons');
const Store = require('stores/PlayerStore');
const JoinGameForm = require('./JoinGameForm');
const JoinedGameInstructions = require('./JoinedGameInstructions');

class PlayerLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedGame: props.joinedGame || false,
      gameId: props.params ? props.params.gameId : null,
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
      joinedGame: Store.hasJoinedGame(),
      players: Store.getPlayers(),
      playerName: Store.getPlayerName(),
    });
  }

  render() {
    let {joinedGame, gameId, players, playerName} = this.state;
    return (
        <div className="PlayerLobby-view">
          { joinedGame ?
            <JoinedGameInstructions playerName={playerName} players={players} /> :
            <JoinGameForm playerName={playerName} gameId={gameId} />
          }
        </div>
      );
  }
}

module.exports = PlayerLobby;
