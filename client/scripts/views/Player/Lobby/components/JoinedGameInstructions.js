
import React from 'react/addons';
import {getPlayerElements} from 'views/shared/helpers/Player';

export default class JoinedGameInstructions extends React.Component {
  static propTypes = {
    playerName: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    playerName: '',
    players: [],
  }

  constructor(props) {
    super(props);
  }

  _getPlayerElements(players) {
    return getPlayerElements(players);
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
