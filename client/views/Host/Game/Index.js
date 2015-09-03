'use strict';

var React = require('react/addons');

var Question = require('./Question');
var Countdown = require('./Countdown');
var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0,
      currentRound: {},
      roundsPlayed: 0,
      totalNumberOfRounds: 3,
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    HostActions.startGame();
    this._startCountdown();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange() {
    let currentRound = HostStore.getCurrentRound();
    this.setState({
      currentRound: HostStore.getCurrentRound(),
      roundsPlayed: HostStore.getRoundsPlayed(),
    });

    if(this.state.currentRound.hasEnded) {
      this._startCountdown();
    }
  }

  _startCountdown() {
    this.setState({countdown: 3});
    var interval = setInterval(() => {
      let {countdown} = this.state;
      if(countdown > 1) {
        this.setState({countdown: countdown - 1});
      } else {
        clearInterval(interval);
        this.setState({countdown: 0});
        this._startNewRound();
      }
    }, 1000);
  }

  _startNewRound() {
    const {roundsPlayed, totalNumberOfRounds} = this.state;
    if(roundsPlayed < totalNumberOfRounds) {
      HostActions.showQuestion();
    } else {
      console.log('End game!');
    }
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="fake-player-helpers">
          <p>Host game dev helpers</p>
          <button onClick={window.endRound}>End round</button>
          <button onClick={window.endGame}>End game</button>
          {/* <label for="countdown">Set countdown</label> */}
          {/* <input type="text" name="countdown" id="countdown" value={this.state.countdown}/> */}
        </div>
      );
    }
  }

  render() {
    let { currentRound, countdown } = this.state;

    return (
      <div className="Game-view">
        { this._developmentHelpers() }

        { currentRound.isShowing &&
          <Question track={currentRound.track} showTrackDetails={currentRound.hasEnded} />
        }

        <Countdown counter={countdown} />
      </div>
    );
  }
}

module.exports = Game;

