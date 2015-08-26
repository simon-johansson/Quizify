'use strict';

const React = require('react/addons');
const Store = require('stores/PlayerStore');
const JoinGameForm = require('./JoinGameForm');
const JoinedGameInstructions = require('./JoinedGameInstructions');

class PlayerLobby extends React.Component {
  constructor(props) {
    super(props);
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="fake-player-helpers">
          <p>Player lobby dev helpers</p>
          <button onClick={window.joinFakeGame}>Join game</button>
          <button onClick={window.listPlayer}>Add player to game</button>
          <button onClick={window.startGame}>Start game</button>
        </div>
      );
    }
  }

  render() {
    let {joinedGame, gameId, players, playerName} = this.props;
    return (
        <div className="PlayerLobby-view">
          { this._developmentHelpers() }
          { joinedGame ?
            <JoinedGameInstructions playerName={playerName} players={players} /> :
            <JoinGameForm playerName={playerName} gameId={gameId} />
          }
        </div>
      );
  }
}

PlayerLobby.propTypes = {
  joinedGame: React.PropTypes.bool.isRequired,
  gameId: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
  playerName: React.PropTypes.string.isRequired,
};

PlayerLobby.defaultProps = {
  joinedGame: false,
  gameId: '',
  players: [],
  playerName: ''
};

module.exports = PlayerLobby;
