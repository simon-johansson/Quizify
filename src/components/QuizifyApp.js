'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

var QuizifyApp = React.createClass({
  render: function() {
    return (
      <div ref="p" className='main'>
        <h1>Quizify</h1>
      </div>
    );
  }
});

module.exports = QuizifyApp;
