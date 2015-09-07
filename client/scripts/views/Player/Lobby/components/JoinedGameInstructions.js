'use strict';

import React from 'react/addons';
import PlayerHelpers from 'views/shared/helpers/Player';

export default class JoinedGameInstructions extends React.Component {
  constructor(props) {
    super(props);
  }

  _getPlayerElements(players) {
    return PlayerHelpers.getPlayerElements(players);
  }

  render() {
    let {playerName, players} = this.props;
    let playerElements = this._getPlayerElements(players);
    return (
        <div className="JoinedGameInstructions">
          <h2>Hello {playerName}</h2>
          <h3>Wait for host to start the game</h3>
          <br/>
          <p>Players already connected:</p>
          <div className="players">
            { playerElements }
          </div>
        </div>
      );
  }
}

JoinedGameInstructions.propTypes = {
  playerName: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

JoinedGameInstructions.defaultProps = {
  playerName: '',
  players: [],
};
