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
      lobbyId: null
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
  _onLobbyIdChange(event) {
    this.setState({
      lobbyId: event.target.value
    });
  }

  _onJoin(event) {
    Actions.joinLobby({
      playerName: this.state.playerName,
      lobbyId: this.state.lobbyId
    });
  }

  render() {
    let {playerName, lobbyId, playerId} = this.state;
    return (
        <div className="PlayerLobby-view">
          <span>Name</span>
          <input type="text" value={playerName} onChange={this._onNameChange.bind(this)} />
          <span>ID</span>
          <input type="text" value={lobbyId} onChange={this._onLobbyIdChange.bind(this)} />
          <button onClick={this._onJoin.bind(this)}>Join</button>
          <span>{playerId}</span>
        </div>
      );
  }
}

module.exports = PlayerLobby;
