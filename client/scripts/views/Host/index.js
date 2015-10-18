
import React from 'react/addons';
import { RouteHandler, Link } from 'react-router';
import HostStore from 'stores/HostStore';
import ServerCommunication from 'utils/ServerCommunication';

import styles from 'styles/views/Host/Host.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
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
      <div styleName='Host'>
        <RouteHandler/>
      </div>
    );
  }
}
