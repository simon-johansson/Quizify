
import React from 'react/addons';
import Router from 'react-router';
const { RouteHandler, Link } = Router;

import ServerCommunication from 'utils/ServerCommunication';
import Actions from 'actions/ClientActionCreators';
import PlayerStore from 'stores/PlayerStore';
import Latency from './components/Latency';
import RotateDevice from './components/RotateDevice';

import 'styles/views/Player/Player.scss';

export default class Player extends React.Component {
  static defaultProps = {
    params: React.PropTypes.shape({
      gameId: '',
    })
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      joinedGame: false,
      gameId: props.params.gameId,
      players: [],
      playerName: PlayerStore.getPlayerName(),
      isUsingMobile: PlayerStore.getIsUsingMobile(),
    };
  }

  componentDidMount() {
    ServerCommunication.bindPlayerEvents();
    this.unsubscribe = PlayerStore.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    const {playerId, gameId} = this.state;
    Actions.leaveGame({playerId, gameId});
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
