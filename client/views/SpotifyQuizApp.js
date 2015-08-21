'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');

var ServerCommunication = require('utils/ServerCommunication');
var FeedbackButton = require('./FeedbackButton');

// CSS
require('normalize.css');
require('styles/main.scss');

class SpotifyQuizApp extends React.Component {
  constructor(props, context) {
     super(props, context);
  }

  componentDidMount() {
    ServerCommunication.connect();
    ServerCommunication.bindClientEvents();
  }

  render() {
    return (
      <div className='SpotifyQuizApp'>
        <h1>SpotifyQuiz</h1>
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
        <FeedbackButton/>
      </div>
    );
  }
}

SpotifyQuizApp.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = SpotifyQuizApp;
