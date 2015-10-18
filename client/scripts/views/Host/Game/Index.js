
import React from 'react/addons';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';
import Question from './components/Question';
import Countdown from './components/Countdown';
import Leaderboard from '../shared/components/Leaderboard';

let _ = require('lodash'); // Remove

import styles from 'styles/views/Host/Game.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 5,
      currentRound: {},
      roundsPlayed: 0,
      totalNumberOfRounds: 3,
      players: HostStore.getPlayers()
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    HostActions.startGame();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(state, message) {
    this.setState({
      currentRound: HostStore.getCurrentRound(),
      roundsPlayed: HostStore.getRoundsPlayed(),
    });

    if(this.state.currentRound.hasEnded) {
      this.setState({countdown: 5});
    }

    if(message === 'newRound') {
      let artist = this.state.currentRound.track.artist;
      let alternatives = _.map(
        _.slice(_.shuffle(artist.related), 0, 3),
        (related) =>   {
          return related;
        });
      alternatives.push(artist.name);
      HostActions.newRound({
        alternatives: alternatives
      });
    }
  }

  _prepareNewRound() {
    const {roundsPlayed, totalNumberOfRounds} = this.state;
    if(roundsPlayed < totalNumberOfRounds) {
      this.setState({countdown: 0});
      HostActions.prepareNewRound();
    } else {
      console.log('End game!');
    }
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="development-helpers">
          <p>Host game dev helpers</p>
          <button onClick={window.endRound}>End round</button>
          <button onClick={window.endGame}>End game</button>
        </div>
      );
    }
  }

  render() {
    const {currentRound, countdown, players} = this.state;

    return (
      <div className="Game-view">
        { this._developmentHelpers() }

        { currentRound.isShowing &&
          <Question
            track={currentRound.track}
            points={currentRound.points}
            showTrackDetails={currentRound.hasEnded}
            onTrackEnded={HostActions.endRound}
            onTrackPlaying={HostActions.decrementPoints}
          />
        }

        { !!countdown &&
          <Countdown
            counter={countdown}
            onFinished={this._prepareNewRound.bind(this)}
          />
        }

        <Leaderboard heading="Leaderboard" players={players} />

      </div>
    );
  }
}


