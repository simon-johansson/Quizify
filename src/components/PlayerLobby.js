'use strict';

var React = require('react/addons');
var Reflux = require('reflux'); 

var Actions = require('../actions/PlayerActionCreators');
var Store = require('../stores/PlayerStore');

require('styles/PlayerLobby.scss');

class PlayerLobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerId: null,
      playerName: null,
      lobbyId: null
    }; 
  } 

  componentWillMount() {
    // this.unsubscribe();
  }
  
  componentDidMount() {
    this.unsubscribe = Store.listen(this.onIdChange.bind(this));
  }

  onIdChange(playerId) {
    this.setState({
      playerId: playerId
    });
  }

  onNameChange(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  onLobbyIdChange(event) {
    this.setState({
      lobbyId: event.target.value
    });
  }

  join(event) {
    Actions.joinLobby({
      playerName: this.state.playerName,
      lobbyId: this.state.lobbyId
    });
  }
  
  render() {
    let {playerName,lobbyId,playerId} = this.state;
    return (
        <div className="PlayerLobby">
          <span>Name</span>
          <input type="text" value={playerName} onChange={this.onNameChange.bind(this)} />
          <span>ID</span>
          <input type="text" value={lobbyId} onChange={this.onLobbyIdChange.bind(this)} />
          <button onClick={this.join.bind(this)}>Join</button>
          <span>{playerId}</span>
        </div>
      );
  }
}

module.exports = PlayerLobby;