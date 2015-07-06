'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

var Player = require('./Player');

class HostLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      players: []
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));

    // Triggering of the createLobby could also be done in
    // the Home component when clicking on the "Create" button
    HostActions.createLobby();
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  _onStoreChange(data) {
    this.setState({
      id: data.lobbyId,
      players: data.players
    });
  }

  render() {
    let {players} = this.state;
    let playerElements = [];
    players.forEach(function (player, i) {
      let index = i + 1;
      let {playerName} = player;
      playerElements.push(<Player username={playerName} index={index} />);
    });
    return (
      <div className="HostLobby-view">
        <p>Open this site on your mobile device:</p>
        <h2>quizify.trol.la</h2>
        <p>Then click JOIN and enter the following Game ID:</p>
        <h2> { this.state.id } </h2>
        { playerElements }
      </div>
    );
  }
}

module.exports = HostLobby;

