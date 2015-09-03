'use strict';

var React = require('react/addons');

require('styles/views/RotateDevice.scss');

class RotateDevice extends React.Component {
  constructor(props) {
     super(props);
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
    let {width, height, mobile} = this.props;
    let showing = (width > height && mobile !== null) ? true : false;
    return (
      <div className="RotateDevice-view">
        { showing ? this._instructions() : null }
      </div>
    );
  }
}

RotateDevice.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  mobile: React.PropTypes.bool.isRequired,
};

RotateDevice.defaultProps = {
  width: 0,
  height: 0,
  mobile: false,
};

module.exports = RotateDevice;

