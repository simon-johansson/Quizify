
import React from 'react/addons';

import Actions from 'actions/PlayerActionCreators';
import Store from 'stores/PlayerStore';

export default class Round extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  answer(data) {
    Actions.answer(data.target.textContent);
  }

  render() {
    const { round } = this.state;
    const waitMessage = <div style={{color:'white'}}>Wait</div>;
    let alternatives = [];

    if (round.alternatives) {
      alternatives = round.alternatives.map(alternative => {
        return (
          <button onClick={this.answer}>{alternative}</button>
        );
      }.bind(this));
    }

    return (
       <div className="Round-view">
        {
          round.alternatives ?
          <div style={{color:'white'}}>{alternatives}</div> :
          (
            round.correct === null ? waitMessage :
            (round.correct ?
            <div style={{color:'white'}}>
              Your answer is correct and you got {round.points} points!
            </div> :
            <div style={{color:'white'}}> :( </div>)
          )
        }
        { round.correct === null ? round.points : '' }
      </div>
    );
  }
}


