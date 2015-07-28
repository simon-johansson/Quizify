'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/ClientActionCreators');
var Store = require('stores/PlayerStore');

require('styles/views/Player/Player.scss');

class Player extends React.Component {

  constructor(props, context) {
     super(props, context);
     this.state = {
       playerId: null,
       gameId: null
     };
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    Actions.leaveGame(this.state.playerId, this.state.gameId);
  }

  _onStoreChange(data) {
    this.setState({
      playerId: data.playerId,
      gameId: data.gameId,
    });
  }

  render() {
    return (
      <div className='Player-view'>
        <RouteHandler/>
      </div>
    );
  }
}

module.exports = Player;
