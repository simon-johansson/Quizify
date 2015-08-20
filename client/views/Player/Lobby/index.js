'use strict';

const React = require('react/addons');
const Store = require('stores/PlayerStore');
const JoinGameForm = require('./JoinGameForm');
const JoinedGameInstructions = require('./JoinedGameInstructions');

class PlayerLobby extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   joinedGame: props.joinedGame,
    //   gameId: props.gameId,
    //   players: props.players,
    //   playerName: props.playerName,
    // };
  }

  render() {
    let {joinedGame, gameId, players, playerName} = this.props;
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
