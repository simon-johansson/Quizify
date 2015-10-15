
import React from 'react/addons';
import { Link } from 'react-router';

import StartGameButton from './StartGameButton';

import styles from 'styles/components/Leaderboard.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Leaderboard extends React.Component {

  static propTypes = {
    players: React.PropTypes.array.isRequired,
    heading: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    players: [],
    heading: '',
  }

  constructor(props) {
    super(props);
  }

  _developmentHelpers(id) {
    if(process.env.NODE_ENV === 'development' &&
       window.location.hash === '#/host/game') {
      return (
        <div className="development-helpers-inline">
          <button
            onClick={window.giveRightAnswer.bind(this, id)}>
            right
          </button>
          <button
            onClick={window.giveWrongAnswer.bind(this, id)}>
            wrong
          </button>
        </div>
      );
    }
  }

  render() {
    const gameHasStarted = false;
    const players = this.props.players.map((player, i) => {
      const {playerId, playerName} = player;
      return (
        <tr key={i}>
          <td>
            {player.playerName}
            { this._developmentHelpers(playerId) }
          </td>
          <td>-</td>
        </tr>
      );
    });
    return (
      <div styleName="Leaderboard">
        <header>{this.props.heading}</header>
        <table>
          <col width="140" />
          <col width="60" />
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {players}
          </tbody>
        </table>
        { !gameHasStarted &&
          <StartGameButton enabled={!!players.length} />
        }
      </div>
    );
  }
}

