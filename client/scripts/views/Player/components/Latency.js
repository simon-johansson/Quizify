
import React from 'react/addons';
React.initializeTouchEvents(true);

import 'styles/components/Latency.scss';

export default class Latency extends React.Component {
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
        <div className={`${latencyClass} latency-figures`}>
          <figure/>
          <figure/>
          <figure/>
          <figure/>
        </div>
        <div className="latency-numbers">
          { latency } ms
        </div>
      </div>
    );
  }

  render() {
    let {latency} = this.props;
    let latencyClass = '';
    if (latency <= 450) { latencyClass += 'level-2';}
    if (latency <= 300) { latencyClass += ' level-3';}
    if (latency <= 150) { latencyClass += ' level-4';}
    return (
        <div
          onTouchStart={this._toggleLatencyElements.bind(this)}
          className="latency-indicator"
        >
          { this.state.showing ?
            this._createLatencyElements(latency, latencyClass) :
            <div className="click-to-show-latency">
              <span>Click for latency</span>
            </div>
          }
        </div>
      );
  }
}

Latency.propTypes = {
  latency: React.PropTypes.number.isRequired,
};

Latency.defaultProps = {
  latency: 0,
};
