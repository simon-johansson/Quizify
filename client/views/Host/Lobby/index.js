'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var QRCode = require('react-qr');

var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

var Player = require('./Player');

class HostLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      players: [],
      url: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));

    // Triggering of the createLobby could also be done in
    // the Home component when clicking on the "Create" button
    HostActions.createGame();
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  _onStoreChange(data) {
    this.setState({
      id: data.gameId,
      players: data.players,
      url: `http://beta.spotifyquiz.com/#/player/lobby/${data.gameId}`
    });
    // Not effiecient? The players list will be broadcasted even if it does not change?!
    HostActions.listPlayers({
      players: data.players
    });
  }

  _getPlayerElements(players) {
    let playerElements = [];
    players.forEach(function (player, i) {
      let index = i + 1;
      let {playerName} = player;
      playerElements.push(<Player username={playerName} index={index} />);
    });
    return playerElements;
  }

  _startGame() {
    console.log('Start');
  }

  render() {
    let players = this._getPlayerElements(this.state.players);
    let button = players.length ? <button onClick={this._startGame.bind(this)}>Start game<br/>(up to 8 players)</button> : null;
    let qrCode = this.state.url ? <QRCode text={this.state.url}/> : null;
    return (
      <div className="HostLobby-view">
        <p>1. Open this site on your mobile device:</p>
        <h2>spotifyquiz.com</h2>
        <p>2. Then click JOIN and enter the following Game ID:</p>
        <h2> { this.state.id } </h2>
        <h1><i>OR</i></h1>
        <p>Scan this QR-code:</p>
        { qrCode }
        <br/>
        <br/>
        { players }
        { button }
      </div>
    );
  }
}

module.exports = HostLobby;

