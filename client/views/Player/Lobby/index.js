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
    let {joindGame} = this.state;
    return (
        <div className="PlayerLobby-view">
          { joindGame ? <JoinedGameInstructions /> : <JoinGameForm /> }
        </div>
      );
  }
}

module.exports = PlayerLobby;
