
import React from 'react/addons';
import { RouteHandler, Link } from 'react-router';
import HostStore from 'stores/HostStore';
import ServerCommunication from 'utils/ServerCommunication';

import 'styles/views/Host/Host.scss';

export default class Host extends React.Component {
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
