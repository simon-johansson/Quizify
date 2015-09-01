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
    let {showTrackDetails} = this.props;
    let {title, images} = this.props.track;
    return (
        <div className="Question">
          { showTrackDetails ?
            this._trackDetails(title, images) :
            <h2>Name the artist</h2>
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
  track: {},
};

module.exports = Question;
