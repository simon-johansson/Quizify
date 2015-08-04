'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/PlayerActionCreators');
var Store = require('stores/PlayerStore');

class JoinGameForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // playerId: null,
      playerName: Store.getPlayerName(),
      gameId: null,
    };
  }

  componentDidMount() {
    let gameId = this.props.id;
    this.setState({ gameId: gameId });
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
