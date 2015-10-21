
import {find, sortByOrder} from 'lodash';
import React from 'react/addons';
import { Link } from 'react-router';

import StartGameButton from './StartGameButton';

import styles from 'styles/components/Leaderboard.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Leaderboard extends React.Component {

  static propTypes = {
    players: React.PropTypes.array.isRequired,
    currentRound: React.PropTypes.object.isRequired,
    heading: React.PropTypes.string.isRequired,
    gameHasStarted: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    players: [],
    currentRound: {},
    heading: '',
    gameHasStarted: false
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
    const {players, currentRound, gameHasStarted} = this.props;
    const playersSorted = sortByOrder(players, ['points'], ['desc']);
    const playerElements = playersSorted.map((player, i) => {
      const {clientId, playerName, points} = player;
      // console.log(this.props.cachedPoints);
      const roundAnswer = find(currentRound.answers, {clientId}) || {};
      let style = 'neutral';
      if (currentRound.hasEnded) {
        if (roundAnswer.correct) {
          style = 'correct';
        } else {
          style = 'hidden';
        }
      };
      return (
        <tr key={i}>
          <td>
            <span styleName="position">{i + 1}.</span>
            {player.playerName}
            { this._developmentHelpers(clientId) }
          </td>
          <td styleName="points">
            { roundAnswer.points &&
              <span styleName={style}>{roundAnswer.points} + </span>
            }
            {`${points ? points : '-'}`}
          </td>
        </tr>
      );
    });
    return (
      <div styleName="Leaderboard">
        <header>
          {this.props.heading}
          {}
        </header>
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
            {playerElements}
          </tbody>
        </table>
        { !gameHasStarted &&
          <StartGameButton enabled={!!playerElements.length} />
        }
      </div>
    );
  }
}

