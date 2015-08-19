'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Link } = Router;

require('styles/views/Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="Home-view">
        <Link to="host-lobby">
          <button>Create</button>
        </Link>
        <Link to="player-lobby">
          <button>Join</button>
        </Link>
      </div>
    );
  }
}

module.exports = Home;

