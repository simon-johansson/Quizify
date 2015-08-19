'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

require('styles/components/Player.scss');

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let {playerName, index} = this.props;
    return (
      <div>
        Player { index } - { playerName }
      </div>
    );
  }
}

Player.propTypes = {
  playerName: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
};

Player.defaultProps = {
  playerName: '',
  index: '',
};

module.exports = Player;
