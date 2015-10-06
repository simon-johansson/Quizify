
import React from 'react/addons';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';
import Question from './components/Question';
import Countdown from './components/Countdown';
import Leaderboard from '../shared/components/Leaderboard';

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

    if(message === 'changeTrack') {
      HostActions.newRound({
        alternatives: this.state.currentRound.track.artist.related
      });
    }
  }

  _startNewRound() {
    const {roundsPlayed, totalNumberOfRounds} = this.state;
    if(roundsPlayed < totalNumberOfRounds) {
      this.setState({countdown: 0});
      HostActions.changeTrack();
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
          {/* <label for="countdown">Set countdown</label> */}
          {/* <input type="text" name="countdown"
          id="countdown" value={this.state.countdown}/> */}
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
            showTrackDetails={currentRound.hasEnded}
            onTrackEnded={HostActions.endRound}
          />
        }

        <Countdown
          counter={countdown}
          onFinished={this._startNewRound.bind(this)}
        />
        <Leaderboard heading="Leaderboard" players={players} />
      </div>
    );
  }
}


