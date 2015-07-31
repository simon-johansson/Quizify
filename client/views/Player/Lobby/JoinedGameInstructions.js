'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions = require('actions/PlayerActionCreators');
var Store = require('stores/PlayerStore');

class JoinedGameInstructions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerName: Store.getPlayerName(),
    };
  }

  componentDidMount() {
  }

  render() {
    let {playerName} = this.state;
    return (
        <div className="JoinedGameInstructions">
          <h2>Hello {playerName}</h2>
          <h3>Wait for host to start the game</h3>
          <br/>
          <p>This is how the game works...</p>
        </div>
      );
  }
}

module.exports = JoinedGameInstructions;
