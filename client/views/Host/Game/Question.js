'use strict';

var React = require('react/addons');

class Question extends React.Component {
  constructor(props) {
    super(props);
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
};

Question.defaultProps = {
  track: {
    title: '',
    images: []
  },
};

module.exports = Question;
