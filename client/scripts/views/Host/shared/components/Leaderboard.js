
import React from 'react/addons';
import { Link } from 'react-router';

import StartGameButton from './StartGameButton';

import styles from 'styles/components/Leaderboard.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Leaderboard extends React.Component {

  static propTypes = {
    players: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    players: [],
  }

  constructor(props) {
    super(props);
  }

  render() {
    const players = this.props.players.map((player, i) => {
      return (
        <tr key={i}>
          <td>{player.playerName}</td>
          <td>-</td>
        </tr>
      );
    });
    return (
      <div styleName="Leaderboard">
        <header>Lobby</header>
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
        <StartGameButton canStartGame={!!players.length} />
      </div>
    );
  }
}

