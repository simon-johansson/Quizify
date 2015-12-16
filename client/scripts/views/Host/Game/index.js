
import React from 'react/addons';

import HostActions from 'actions/HostActionCreators';
import HostStore from 'stores/HostStore';
import Question from './components/Question';
import Points from './components/Points';
import Countdown from './components/Countdown';
import Leaderboard from '../shared/components/Leaderboard';

let _ = require('lodash'); // Remove !!

import styles from 'styles/views/Host/Game.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Game extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      countdown: 5,
      currentRound: {},
      roundsPlayed: 0,
      totalNumberOfRounds: HostStore.getTotalNumberOfRounds(),
      players: HostStore.getPlayers(),
      gameOver: false
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
      gameOver: HostStore.getGameOver()
    });

    if(this.state.currentRound.hasEnded) {
      this.setState({countdown: 5});
    }

    if(this.state.gameOver) {
      this.context.router.transitionTo('HostLobby');
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

    if(message === 'answer') {
      const {currentRound, players} = this.state;
      let correctAnswer = currentRound.track.artist;
      HostActions.answerReceived({
        points: state.points,
        playerId: state.clientId
      });
      if (currentRound.answers.length === players.length) {
        // Send data for player to know if answer is correct
        HostActions.endRound();
      };
    }
  }

  _prepareNewRound() {
    const {roundsPlayed, totalNumberOfRounds, players} = this.state;
    if(roundsPlayed < totalNumberOfRounds) {
      this.setState({countdown: 0});
      HostActions.prepareNewRound();
    } else {
      HostActions.endGame(players);
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
    const gameHasStarted = true;

    if (currentRound.points <= 0) {
      HostActions.endRound();
    }

    return (
      <div styleName="Game">
        { this._developmentHelpers() }

        <section>
          { currentRound.isShowing &&
            <Question
              track={currentRound.track}
              showTrackDetails={currentRound.hasEnded}
              onTrackStarted={HostActions.trackStarted}
              onTrackEnded={HostActions.endRound}
              onTrackPlaying={HostActions.decrementPoints}
            />
          }

          <Points
            current={currentRound.points}
            shouldDecrement={currentRound.isPlaying}
          />

          { !!countdown &&
            <Countdown
              counter={countdown}
              onFinished={this._prepareNewRound.bind(this)}
            />
          }
        </section>

        <Leaderboard
          heading="Leaderboard"
          players={players}
          currentRound={currentRound}
          gameHasStarted={gameHasStarted}
        />

      </div>
    );
  }
}
