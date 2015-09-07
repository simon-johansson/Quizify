'use strict';

import React from 'react/addons';
import nop from 'nop';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    const {counter} = this.props;
    this.state = {counter};
    this.time = 1000;
    this.timer = false;
  }

  componentDidMount() {
    this._start(this.props.counter);
  }

  componentWillReceiveProps(nextProps) {
    this._start(nextProps.counter);
  }

  _start(counter) {
    if (!this._isRunning() && counter > 0) {
      this.setState({counter});
      this.timer = setInterval(this._onTick.bind(this), this.time);
    }
  }

  _isRunning() {
    return this.timer !== false;
  }

  _onTick() {
    if(this.state.counter > 1) {
      this._decrementCounter();
    } else {
      this._onCountdownEnded();
    }
  }

  _decrementCounter() {
    let c = this.state.counter - 1;
    this.setState({counter: c});
    this.props.onTick(c);
  }

  _onCountdownEnded() {
    this._resetCouter();
    this.props.onFinished();
  }

  _resetCouter() {
    clearInterval(this.timer);
    this.timer = false;
    this.setState({counter: 0});
  }

  render() {
    let {counter} = this.state;
    return (
        <div className="Countdown">
          { !!counter &&
            <h1>{counter}</h1>
          }
        </div>
      );
  }
}

Countdown.propTypes = {
  counter: React.PropTypes.number.isRequired,
  onFinished: React.PropTypes.func.isRequired,
  onTick: React.PropTypes.func.isRequired,
};

Countdown.defaultProps = {
  counter: 0,
  onFinished: nop,
  onTick: nop,
};
