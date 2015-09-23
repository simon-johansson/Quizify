
import React from 'react/addons';
React.initializeTouchEvents(true);

import styles from 'styles/components/Latency.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Latency extends React.Component {
  static propTypes = {
    latency: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    latency: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  _toggleLatencyElements() {
    this.setState({
      showing: !this.state.showing,
    });
  }

  _createLatencyElements(latency, latencyClass) {
    return (
      <div>
        <div styleName={latencyClass}>
          <figure/>
          <figure/>
          <figure/>
          <figure/>
        </div>
        <div className="numbers">
          { latency } ms
        </div>
      </div>
    );
  }

  render() {
    let {latency} = this.props;
    let latencyClass = 'level-1';
    if (latency <= 450) { latencyClass = 'level-2';}
    if (latency <= 300) { latencyClass = 'level-3';}
    if (latency <= 150) { latencyClass = 'level-4';}
    return (
        <div
          onTouchStart={this._toggleLatencyElements.bind(this)}
          styleName="styles"
        >
          { this.state.showing ?
            this._createLatencyElements(latency, latencyClass) :
            <div styleName="click-to-show">
              <span>Click for latency</span>
            </div>
          }
        </div>
      );
  }
}
