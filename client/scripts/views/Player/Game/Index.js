
import React from 'react/addons';

import Actions from 'actions/PlayerActionCreators';
import Store from 'stores/PlayerStore';

import GameEnd from './components/GameEnd';
import Round from './components/Round';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        points: null,
        hasEnded: null
      }
    };
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(state, change) {
    if (change !== 'latency') { // REMOVE !!!
      console.log(state);
      this.setState(state);
    }
  }

  _developmentHelpers() {
    if(process.env.NODE_ENV === 'development') {
      return (
        <div className="fake-player-helpers">
          <p>Player game dev helpers</p>
          <button onClick={window.newRound}>New round</button>
          <button onClick={window.answerReceivedPlayer}>Receive Answer</button>
          <button onClick={window.endRoundPlayer}>End round</button>
          <button onClick={window.endGamePlayer}>End game</button>
          <button onClick={window.startGame}>Start game</button>
        </div>
      );
    }
  }

  render() {
    let { hasEnded, points } = this.state.game;

    return (
       <div className="Game-view">
        { this._developmentHelpers() }
        {
          hasEnded ?
          <GameEnd points={points} /> :
          <Round />
        }
      </div>
    );
  }

}


