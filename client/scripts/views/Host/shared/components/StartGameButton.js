
import React from 'react/addons';
import { Link } from 'react-router';

import styles from 'styles/components/StartGameButton.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class StartGameButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  static propTypes = {
    canStartGame: React.PropTypes.bool.isRequired,
    link: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    canStartGame: false,
    link: '',
  }

  constructor(props) {
    super(props);
  }

  onClick() {
    this.context.router.transitionTo('HostGame');
  }

  render() {
    const {canStartGame} = this.props;
    let buttonStyle = canStartGame ? 'enabled' : 'disabled';
    return (
      <div styleName="StartGameButton">
        <button
          onClick={canStartGame ? ::this.onClick : null}
          styleName={buttonStyle}
        >
          Start game (up to 8 players)
        </button>
      </div>
    );
  }
}

