'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { RouteHandler, Link } = Router;

var ServerCommunication = require('utils/ServerCommunication');
var Actions = require('actions/ClientActionCreators');
var PlayerStore = require('stores/PlayerStore');
var Latency = require('./components/Latency');
var RotateDevice = require('./components/RotateDevice');

require('styles/views/Player/Player.scss');

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      joinedGame: false,
      gameId: props.params.gameId,
      players: [],
      playerName: PlayerStore.getPlayerName(),
      isUsingMobile: PlayerStore.isUsingMobile(),
    };
  }

  componentDidMount() {
    ServerCommunication.bindPlayerEvents();
    this.unsubscribe = PlayerStore.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    Actions.leaveGame(this.state.playerId, this.state.gameId);
  }

  _onStoreChange(state, change) {
    this.setState({
      joinedGame: PlayerStore.hasJoinedGame(),
      players: PlayerStore.getPlayers(),
      playerName: PlayerStore.getPlayerName(),
      latency: PlayerStore.getLatency()
    });
    if (change === 'startGame') {
      this.onStartGame();
    }
  }

  onStartGame() {
    this.context.router.transitionTo('PlayerGame');
  }

  render() {
    return (
      <div className='Player-view'>
        <RotateDevice mobile={this.state.isUsingMobile} />
        <RouteHandler
          joinedGame={this.state.joinedGame}
          players={this.state.players}
          playerName={this.state.playerName}
          gameId={this.state.gameId}
        />
        <Latency latency={this.state.latency} />
      </div>
    );
  }
}

Player.defaultProps = {
  params: React.PropTypes.shape({
    gameId: '',
  })
};

Player.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Player;
