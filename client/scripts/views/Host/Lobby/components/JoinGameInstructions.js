
import React from 'react/addons';
import QRCode from 'react-qr';
import PlayerHelpers from 'views/shared/helpers/Player';

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
        <div className="JoinGameInstructions">
          <p>1. Open this site on your mobile device:</p>
          <h2 className="site-url">{ this.props.url }</h2>
          <p>2. Then click JOIN and enter the following Game ID:</p>
          <h2 className="game-id">{ this.props.gameId }</h2>
          <h1><i>OR</i></h1>
          <p>Scan this QR-code:</p>
          { this.props.deepLink &&
            <QRCode text={this.props.deepLink}/>
          }
        </div>
      );
  }
}
