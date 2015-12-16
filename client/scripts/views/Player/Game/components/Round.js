
import React from 'react/addons';

import Actions from 'actions/PlayerActionCreators';
import Store from 'stores/PlayerStore';

import styles from 'styles/views/Player/Round.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Round extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: Store.getPlayerId(),
      round:  {
        alternatives: null,
        points: null,
        correct: null
      },
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
      this.setState(state);
    }
    if (change === 'answerReceived') {
      console.log(state);
    }
  }

  answer(data) {
    let id = this.state.playerId;
    Actions.answer({
      answer: data.target.textContent,
      timestamp: new Date()
    });
  }

  render() {
    const { round } = this.state;
    const waitMessage = <div style={{color:'white'}}>Wait</div>;
    let alternatives = [];

    if (round.alternatives) {
      alternatives = round.alternatives.map(alternative => {
        let style = 'alternative';
        let isDisabled = round.answer ? true : false;
        if (round.answer === alternative) {
          style += '-selected';
        } else if (isDisabled) {
          style += '-disabled';
        }
        return (
          <button styleName={style}
            disabled={isDisabled}
            onClick={this.answer.bind(this)}>
            {alternative}
          </button>
        );
      }.bind(this));
    }

    return (
       <div styleName="round-view">
        {
          round.alternatives ?
          <div style={{color:'white'}}>{alternatives}</div> :
          (
            round.correct === null ? waitMessage :
            (round.correct ?
            <div style={{color:'white'}}>
              Well Done! 🙌
            </div> :
            <div style={{color:'white'}}> Well Done! 🙌 </div>)
          )
        }
        { round.correct === null ? round.points : '' }
      </div>
    );
  }
}
