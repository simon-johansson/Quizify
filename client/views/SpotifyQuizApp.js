'use strict';

var Router = require('react-router');
var { RouteHandler, Link } = Router;

var React = require('react/addons');

var MobileDetect = require('mobile-detect');
var md = new MobileDetect(window.navigator.userAgent);

var ServerCommunication = require('utils/ServerCommunication');
var FeedbackButton = require('./FeedbackButton');
var RotateDevice = require('./RotateDevice');

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
    if(md.mobile()) {
      this.context.router.transitionTo('player-lobby');
      window.onresize = () => this.forceUpdate();
    }
  }

  render() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mobile = md.mobile();

    return (
      <div className='SpotifyQuizApp'>
        <RotateDevice width={width} height={height} mobile={mobile} />
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
