'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/PlayerActionCreators');
var Store = require('stores/PlayerStore');

var JoinGameForm = require('./JoinGameForm');
var JoinedGameInstructions = require('./JoinedGameInstructions');

class PlayerLobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joindGame: false,
      gameId: this.props.params ? this.props.params.gameId : null,
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  _onStoreChange(data) {
    this.setState({
      joindGame: data.joindGame
    });
  }

  render() {
    let {joindGame, gameId} = this.state;
    return (
        <div className="PlayerLobby-view">
          { joindGame ? <JoinedGameInstructions /> : <JoinGameForm id={gameId} /> }
        </div>
      );
  }
}

module.exports = PlayerLobby;
