'use strict';

var React = require('react/addons');
var PlayerHelpers = require('../../helpers/Player');

class JoinedGameInstructions extends React.Component {
  constructor(props) {
    super(props);
  }

  _getPlayerElements(players) {
    return PlayerHelpers.getPlayerElements(players);
  }

  render() {
    let {playerName} = this.props;
    let players = this._getPlayerElements(this.props.players);
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
