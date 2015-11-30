
import React from 'react/addons';
import nop from 'nop';

import HostActions from 'actions/HostActionCreators';

import styles from 'styles/components/Points.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Points extends React.Component {
  static propTypes = {
    current: React.PropTypes.number.isRequired,
    shouldDecrement: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    current: 20,
    shouldDecrement: false,
  }

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldDecrement && !this.timeout) {
      this._decrement();
    } else if (!nextProps.shouldDecrement) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  _decrement() {
    if (this.props.current) {
      this.timeout = setTimeout(() => {
        HostActions.decrementPoints();
        this._decrement();
      }, 100);
    }
  }

  render() {
    let {current, shouldDecrement} = this.props;
    return (
        <div styleName="Points">
          { !!current && shouldDecrement &&
            <h1>{current}</h1>
          }
        </div>
      );
  }
}
