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
      track: null,
      countdown: 3,
      round: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this._onStoreChange.bind(this));
    this._startNextRoundCountdown();
    HostActions.startGame();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(data) {
    this.setState({
      track: HostStore.getTrack()
    });
  }

  _startNextRoundCountdown() {
    var interval = setInterval(() => {
      if(this.state.countdown) {
        this.setState({
          countdown: this.state.countdown - 1,
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  render() {
    let { track, round, countdown } = this.state;
    let currentRoundHasEnded = false;
    return (
      <div className="Game-view">
        { countdown ?
          <Countdown counter={countdown} /> :
          <Question track={track} showTrackDetails={currentRoundHasEnded} />
        }
      </div>
    );
  }
}

module.exports = Game;

