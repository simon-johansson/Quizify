'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');
var Reflux = require('reflux');

// CSS
require('normalize.css');
require('styles/main.scss');

class QuizifyApp extends React.Component {

  constructor(props, context) {
     super(props, context);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='QuizifyApp'>
        <h1>Quizify</h1>
        <ul>
          <li>
            <Link to="home">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="about">
              <span>About</span>
            </Link>
          </li>
        </ul>

        <RouteHandler/>
      </div>
    );
  }
}

QuizifyApp.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = QuizifyApp;
