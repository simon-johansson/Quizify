'use strict';

var React = require('react/addons');

require('styles/views/About.scss');

var About = React.createClass({
  render () {
    return (
      <div>
        <h2>About</h2>
        <h3>Made by:</h3>
        <p>Jose Granjo & Simon Johansson</p>
      </div>
    );
  }
});

module.exports = About;

