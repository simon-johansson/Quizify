'use strict';

const React = require('react/addons');
const Actions = require('actions/PlayerActionCreators');

class JoinGameForm extends React.Component {
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
    Actions.joinGame(this.state.playerName, this.state.gameId);
  }

  render() {
    let {playerName, gameId} = this.state;
    return (
        <div className="JoinGameForm">
          <span>Name</span>
          <input type="text" value={playerName} onChange={this._onNameChange.bind(this)} />
          <br/>
          <span>Game ID</span>
          <input type="text" value={gameId} onChange={this._onGameIdChange.bind(this)} />
          <br/>
          <button onClick={this._onJoin.bind(this)}>Join game</button>
        </div>
      );
  }
}

module.exports = JoinGameForm;
