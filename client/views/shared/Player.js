'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

require('styles/components/Player.scss');

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        Player { this.props.index } - { this.props.username }
      </div>
    );
  }
}

Player.propTypes = {
  index: React.PropTypes.number,
  username: React.PropTypes.string,
};

module.exports = Player;
