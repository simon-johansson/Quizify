'use strict';

import React from 'react/addons';

export default class GameEnd extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    let { points } = this.props;
    return (
        <div className="GameEnd-view" style={{color: "white"}}>
          You ended the game with {points} points! :D
        </div>
      );
  }
}

GameEnd.propTypes = {
  points: React.PropTypes.number.isRequired
};

GameEnd.defaultProps = {
  points: 'Unknown points'
};
