'use strict';

import React from 'react/addons';

import Actions from 'actions/PlayerActionCreators';
import Store from 'stores/PlayerStore';

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
    console.log("mounted game");
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange() {
    this.setState({
      currentRound: Store.getState().currentRound,
      roundsPlayed: Store.getState().roundsPlayed,
    });
  }

  _startNewRound() {
    // const {roundsPlayed, totalNumberOfRounds} = this.state;
    // if(roundsPlayed < totalNumberOfRounds) {
    //   this.setState({countdown: 0});
    //   HostActions.showQuestion();
    // } else {
    //   console.log('End game!');
    // }
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="fake-player-helpers">
          <p>Player game dev helpers</p>
          <button onClick={window.newRound}>End round</button>
          <button onClick={window.endGame}>End game</button>
        </div>
      );
    }
  }

  render() {
    const {currentRound, countdown} = this.state;

    return (
       <div className="Game-view">
        { this._developmentHelpers() }

        

      </div>
    );
  }
}


