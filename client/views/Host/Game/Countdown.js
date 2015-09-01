'use strict';

var React = require('react/addons');

class Countdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {counter} = this.props;
    let el = counter ? <h1>{counter}</h1> : null;
    return (
        <div className="Countdown">
          { el }
        </div>
      );
  }
}

Countdown.propTypes = {
  counter: React.PropTypes.number.isRequired,
};

Countdown.defaultProps = {
  counter: 0,
};

module.exports = Countdown;
