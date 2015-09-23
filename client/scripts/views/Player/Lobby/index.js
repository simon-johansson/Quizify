
import React from 'react/addons';
import Store from 'stores/PlayerStore';
import JoinGameForm from './components/JoinGameForm';
import JoinedGameInstructions from './components/JoinedGameInstructions';

export default class PlayerLobby extends React.Component {
  static propTypes = {
    joinedGame: React.PropTypes.bool.isRequired,
    gameId: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired,
    playerName: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    joinedGame: false,
    gameId: '',
    players: [],
    playerName: ''
  }

  constructor(props) {
    super(props);
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="development-helpers">
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
            <JoinedGameInstructions
              playerName={playerName}
              players={players}
            /> :
            <JoinGameForm
              playerName={playerName}
              gameId={gameId}
            />
          }
        </div>
      );
  }
}
