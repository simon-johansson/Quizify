
import React from 'react/addons';

import styles from 'styles/views/RotateDevice.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class RotateDevice extends React.Component {
  static propTypes = {
    mobile: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    mobile: false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {mobile} = this.props;
    let instructions = null;
    if(mobile) {
      instructions = (
        <div>
          <h2>Please rotate your device!</h2>
          <img src="images/rotate.png" />
        </div>
      );
    }

    return (
      <div styleName="styles">
        { instructions }
      </div>
    );
  }
}

