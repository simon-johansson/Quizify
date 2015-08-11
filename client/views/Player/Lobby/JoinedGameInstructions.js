'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/PlayerActionCreators');
var Store = require('stores/PlayerStore');

var PlayerHelpers = require('../../helpers/Player');

class JoinedGameInstructions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerName: Store.getPlayerName(),
      players: []
    };
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  _onStoreChange(data) {
    this.setState({
      players: data.players
    });
  }

  _getPlayerElements(players) {
    return PlayerHelpers.getPlayerElements(players);
  }

  render() {
    let {playerName} = this.state;
    let players = this._getPlayerElements(this.state.players);
    return (
        <div className="JoinedGameInstructions">
          <h2>Hello {playerName}</h2>
          <h3>Wait for host to start the game</h3>
          <br/>
          <p>Players already connected:</p>
          { players }
        </div>
      );
  }
}

module.exports = JoinedGameInstructions;
