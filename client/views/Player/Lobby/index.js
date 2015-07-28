'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/PlayerActionCreators');
var Store = require('stores/PlayerStore');

class PlayerLobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerId: null,
      playerName: null,
      gameId: null
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  // Really need all the setter functions?
  _onStoreChange(data) {
    this.setState({
      playerId: data.playerId
    });
  }

  // Really need all the setter functions?
  _onNameChange(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  // Really need all the setter functions?
  _onGameIdChange(event) {
    this.setState({
      gameId: event.target.value
    });
  }

  _onJoin(event) {
    Actions.joinGame(this.state.playerName, this.state.gameId);
  }

  render() {
    let {playerName, gameId, playerId} = this.state;
    return (
        <div className="PlayerLobby-view">
          <span>Name</span>
          <input type="text" value={playerName} onChange={this._onNameChange.bind(this)} />
          <span>ID</span>
          <input type="text" value={gameId} onChange={this._onGameIdChange.bind(this)} />
          <button onClick={this._onJoin.bind(this)}>Join</button>
          <span>{playerId}</span>
        </div>
      );
  }
}

module.exports = PlayerLobby;
