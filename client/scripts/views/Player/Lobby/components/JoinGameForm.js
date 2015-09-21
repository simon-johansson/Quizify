'use strict';

import React from 'react/addons';
import Actions from 'actions/PlayerActionCreators';

export default class JoinGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: props.playerName,
      gameId: props.gameId,
    };
  }

  _onNameChange(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  _onGameIdChange(event) {
    this.setState({
      gameId: event.target.value
    });
  }

  _onJoin(event) {
    const {playerName, gameId} = this.state;
    Actions.joinGame({playerName, gameId});
  }

  render() {
    let {playerName, gameId} = this.state;
    return (
        <div className="JoinGameForm">
          <span>Name</span>
          <input className="player-name-input" type="text" value={playerName} onChange={this._onNameChange.bind(this)} />
          <br/>
          <span>Game ID</span>
          <input className="game-id-input" type="text" value={gameId} onChange={this._onGameIdChange.bind(this)} />
          <br/>
          <button onClick={this._onJoin.bind(this)}>Join game</button>
        </div>
      );
  }
}

JoinGameForm.propTypes = {
  playerName: React.PropTypes.string.isRequired,
  gameId: React.PropTypes.string.isRequired,
};

JoinGameForm.defaultProps = {
  playerName: '',
  gameId: '',
};
