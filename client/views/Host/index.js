'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');
var Reflux = require('reflux');

require('styles/views/Host/Host.scss');

class Host extends React.Component {

  constructor(props, context) {
     super(props, context);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='Host-view'>
        <RouteHandler/>
      </div>
    );
  }
}

module.exports = Host;
