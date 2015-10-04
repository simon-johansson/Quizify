
import React from 'react/addons';
import QRCode from 'react-qr';
import PlayerHelpers from 'views/shared/helpers/Player';

import styles from 'styles/components/JoinGameInstructions.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class JoinGameInstructions extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    gameId: React.PropTypes.string.isRequired,
    deepLink: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    url: '...',
    gameId: '...',
    deepLink: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div styleName="styles">
          <p>1. Use your mobile to join at:</p>
          <h2 styleName="url">{ this.props.url }</h2>
          <p>2. Enter the following Game ID:</p>
          <h2 styleName="id">{ this.props.gameId }</h2>
          {/* <h1><i>OR</i></h1> */}
          {/* <p>Scan this QR-code:</p> */}
          { this.props.deepLink &&
            <QRCode text={this.props.deepLink}/>
          }
        </div>
      );
  }
}
