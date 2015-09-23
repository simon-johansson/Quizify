
import React from 'react/addons';
import Reflux from 'reflux';

import 'styles/components/Player.scss';

export default class Player extends React.Component {
  static propTypes = {
    playerName: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    playerName: '',
    index: '',
  }

  constructor(props) {
    super(props);
  }

  render() {
    let {playerName, index} = this.props;
    return (
      <div>
        Player { index } - { playerName }
      </div>
    );
  }
}
