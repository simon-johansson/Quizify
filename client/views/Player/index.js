'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');
var Reflux = require('reflux');

require('styles/views/Player/Player.scss');

class Player extends React.Component {

  constructor(props, context) {
     super(props, context);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='Player-view'>
        <RouteHandler/>
      </div>
    );
  }
}

module.exports = Player;
