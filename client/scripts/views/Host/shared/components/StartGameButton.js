
import React from 'react/addons';

import styles from 'styles/components/StartGameButton.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class StartGameButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  static propTypes = {
    enabled: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    enabled: false,
  }

  constructor(props) {
    super(props);
  }

  onClick() {
    this.context.router.transitionTo('HostGame');
  }

  render() {
    const {enabled} = this.props;
    let buttonStyle = enabled ? 'enabled' : 'disabled';
    return (
      <div styleName="StartGameButton">
        <button
          onClick={enabled ? ::this.onClick : null}
          styleName={buttonStyle}
        >
          Start game (up to 8 players)
        </button>
      </div>
    );
  }
}

