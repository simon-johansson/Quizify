
import React from 'react/addons';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';
import Question from './components/Question';
import Countdown from './components/Countdown';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 5,
      currentRound: {},
      roundsPlayed: 0,
      totalNumberOfRounds: 3,
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    HostActions.startGame();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange() {
    this.setState({
      currentRound: HostStore.getCurrentRound(),
      roundsPlayed: HostStore.getRoundsPlayed(),
    });

    if(this.state.currentRound.hasEnded) {
      this.setState({countdown: 5});
    }
  }

  _startNewRound() {
    const {roundsPlayed, totalNumberOfRounds} = this.state;
    if(roundsPlayed < totalNumberOfRounds) {
      this.setState({countdown: 0});
      HostActions.newRound({
        alternatives: [ 'Adam Lambert', 'Rabbii', 'The Knife', 'Gorillaz' ]
      });
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
    const {currentRound, countdown} = this.state;

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
      </div>
    );
  }
}


