'use strict';

import React from 'react/addons';
import nop from 'nop';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {track} = this.props;
    track.play(this.props.onTrackEnded);
  }

  componentWillReceiveProps(nextProps) {
    const {track} = this.props;
    if(nextProps.track.meta.id !== track.meta.id) {
      nextProps.track.play(this.props.onTrackEnded);
    }
    if(nextProps.showTrackDetails) {
      track.fadeOut();
    }
  }

  _trackDetails(title, images) {
    return (
      <div>
        <h1>{title}</h1>
        <img src={images[1].url} />
      </div>
    );
  }

  render() {
    let {track, showTrackDetails} = this.props;
    return (
      <div className="Question">

        {  track && !showTrackDetails &&
          <h2>Name the artist</h2>
        }

        { showTrackDetails && track &&
          this._trackDetails(track.title, track.images)
        }

      </div>
    );
  }
}

Question.propTypes = {
  track: React.PropTypes.object.isRequired,
  showTrackDetails: React.PropTypes.bool.isRequired,
  onTrackEnded: React.PropTypes.func.isRequired,
};

Question.defaultProps = {
  track: {
    title: '',
    images: []
  },
  showTrackDetails: false,
  onTrackEnded: nop,
};
