
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
        <div styleName="JoinGameInstructions">
          <header>
            How to join the game
          </header>
          <section>
            {/* <h2>To join the game</h2> */}
            <p><i>1.</i> On your mobile, go to:</p>
            {/* <p styleName="bold">{ this.props.url }</p> */}
            <p styleName="bold">musicquiz.io</p>
            <p><i>2.</i> Enter the game code:</p>
            <p styleName="bold">{ this.props.gameId }</p>
            <p><i>or</i>, scan this QR-code:</p>
            { this.props.deepLink &&
              <QRCode text={this.props.deepLink}/>
            }
          </section>
        </div>
      );
  }
}
