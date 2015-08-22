'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var QRCode = require('react-qr');

var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

var PlayerHelpers = require('../../helpers/Player');

var Router = require('react-router');
var { Link } = Router;

class HostLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.gameId || '',
      players: props.players || [],
      url: props.url || '',
      deepLink: props.deepLink || ''
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    HostActions.createGame();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(data) {
    this.setState({
      id: HostStore.getGameId(),
      players: HostStore.getPlayers(),
      url: HostStore.getSiteUrl(),
      deepLink: HostStore.getGameDeepLink(),
    });

    // Not effiecient? The players list will be broadcasted even if it does not change?!
    HostActions.listPlayers({
      players: HostStore.getPlayers()
    });
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="fake-player-helpers">
          <p>Host lobby dev helpers</p>
          <button onClick={window.addPlayers}>Add player to game</button>
          <button onClick={window.removePlayer}>Remove player from game</button>
        </div>
      );
    }
  }

  _getPlayerElements(players) {
    return PlayerHelpers.getPlayerElements(players);
  }

  _startGame() {
    
    // Maybe this should be a redirect to a new page insted
    // HostActions.requestNewRound();
  }

  render() {
    let players = this._getPlayerElements(this.state.players);
    let button = players.length ? <button className="start-game-btn" onClick={this._startGame.bind(this)}><Link to="host-game" >Start game<br/>(up to 8 players)</Link></button> : null;
    let qrCode = this.state.deepLink ? <QRCode text={this.state.deepLink}/> : null;
    return (
      <div className="HostLobby-view">
        { this._developmentHelpers() }
        <p>1. Open this site on your mobile device:</p>
        <h2 className="site-url">{ this.state.url }</h2>
        <p>2. Then click JOIN and enter the following Game ID:</p>
        <h2 className="game-id">{ this.state.id }</h2>
        <h1><i>OR</i></h1>
        <p>Scan this QR-code:</p>
        { qrCode }
        <br/>
        <br/>
        <div className="players">
          { players }
        </div>
        { button }
      </div>
    );
  }
}

module.exports = HostLobby;

