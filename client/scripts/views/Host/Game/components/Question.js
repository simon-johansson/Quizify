
import React from 'react/addons';
import nop from 'nop';

import styles from 'styles/components/Question.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Question extends React.Component {
  static propTypes = {
    track: React.PropTypes.object.isRequired,
    points: React.PropTypes.number.isRequired,
    showTrackDetails: React.PropTypes.bool.isRequired,
    onTrackEnded: React.PropTypes.func.isRequired,
    onTrackPlaying: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    track: {
      title: '',
      images: []
    },
    points: 3000,
    showTrackDetails: false,
    onTrackEnded: nop,
    onTrackPlaying: nop,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {track} = this.props;
    this._playTrack(track);
  }

  componentWillReceiveProps(nextProps) {
    const {track} = this.props;
    if(nextProps.track.meta.id !== track.meta.id) {
      this._playTrack(nextProps.track);
    }
    if(nextProps.showTrackDetails) {
      track.fadeOut();
    }
  }

  _playTrack(track) {
    track.play( {
      onEnd: this.props.onTrackEnded,
      onTick: this.props.onTrackPlaying
    });
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
    let {track, points, showTrackDetails} = this.props;
    return (
      <div styleName="Question">

        {  track && !showTrackDetails &&
          <div>
            <h2>Name the artist</h2>
            <h3>{points}</h3>
          </div>
        }

        { track && showTrackDetails &&
          this._trackDetails(track.title, track.images)
        }

      </div>
    );
  }
}
