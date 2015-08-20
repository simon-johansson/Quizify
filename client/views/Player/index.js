'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');

var ServerCommunication = require('utils/ServerCommunication');
var Actions = require('actions/ClientActionCreators');
var Store = require('stores/PlayerStore');

require('styles/views/Player/Player.scss');

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      joinedGame: false,
      gameId: props.params.gameId,
      players: [],
      playerName: Store.getPlayerName() || '',
    };
  }

  componentDidMount() {
    ServerCommunication.bindPlayerEvents();
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    Actions.leaveGame(this.state.playerId, this.state.gameId);
  }

  _onStoreChange(data) {
    this.setState({
      joinedGame: Store.hasJoinedGame(),
      players: Store.getPlayers(),
      playerName: Store.getPlayerName(),
    });
  }

  render() {
    console.log('test');
    return (
      <div className='Player-view'>
        <RouteHandler
          joinedGame={this.state.joinedGame}
          players={this.state.players}
          playerName={this.state.playerName}
          gameId={this.state.gameId}
        />
      </div>
    );
  }
}

Player.defaultProps = {
  params: React.PropTypes.shape({
    gameId: '',
  })
};

module.exports = Player;
