'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Link } = Router;

//var Actions = require('actions/xxx')

require('styles/views/Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="Home-view">
        <Link to="hostLobby">
          <button>Create</button>
        </Link>
        <Link to="playerLobby">
          <button>Join</button>
        </Link>
      </div>
    );
  }
}

module.exports = Home;

