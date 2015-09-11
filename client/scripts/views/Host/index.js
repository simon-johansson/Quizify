'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');

var HostStore = require('stores/HostStore');
var ServerCommunication = require('utils/ServerCommunication');

require('styles/views/Host/Host.scss');

class Host extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    ServerCommunication.bindHostEvents();
  }

  componentWillUnmount() {
    ServerCommunication.unbindHostEvents();
    HostStore.setInitialState();
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