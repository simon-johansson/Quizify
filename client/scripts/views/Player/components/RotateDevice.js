'use strict';

import React from 'react/addons';
import 'styles/views/RotateDevice.scss';

export default class RotateDevice extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.mobile) {
      window.onresize = () => this.forceUpdate();
    }
  }

  _instructions() {
    return (
      <div className="rotate-device-instructions">
        <h2>Please rotate your device!</h2>
        <img src="images/rotate.png" />
      </div>
    );
  }

  render () {
    let {mobile} = this.props;
    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <div className="RotateDevice-view">
        { width > height && mobile &&
          this._instructions()
        }
      </div>
    );
  }
}

RotateDevice.propTypes = {
  mobile: React.PropTypes.bool.isRequired,
};

RotateDevice.defaultProps = {
  mobile: false,
};

