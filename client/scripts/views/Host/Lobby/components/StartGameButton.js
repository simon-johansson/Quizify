'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Link } = Router;

class StartGameButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="StartGameButton">
          { this.props.canStartGame &&
            <Link to={this.props.link}>
              <button className="start-game-btn">
                Start game<br/>(up to 8 players)
              </button>
            </Link>
          }
        </div>
      );
  }
}

StartGameButton.propTypes = {
  canStartGame: React.PropTypes.bool.isRequired,
  link: React.PropTypes.string.isRequired,
};

StartGameButton.defaultProps = {
  canStartGame: false,
  link: '',
};

module.exports = StartGameButton;
