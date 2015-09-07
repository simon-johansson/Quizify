'use strict';

import React from 'react/addons';
import 'styles/views/About.scss';

export default class About extends React.Component {
  render () {
    return (
      <div className="About-view">
        <h2>About</h2>
        <h3>Made by:</h3>
        <p>Jose Granjo & Simon Johansson</p>
      </div>
    );
  }
}

