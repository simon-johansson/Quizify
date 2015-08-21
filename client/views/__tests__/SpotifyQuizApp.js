'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const stubContext = require('react-stub-context');
var ServerCommunication = require('utils/ServerCommunication');
var SpotifyQuizApp = require('views/SpotifyQuizApp');

function noop() {}

var Router = function() {};
Router.makeHref = function () { return 'link'; };
Router.setRouteComponentAtDepth = Router.isActive = Router.getRouteAtDepth = noop;
SpotifyQuizApp = stubContext(SpotifyQuizApp, { router: Router });

describe('SpotifyQuizApp', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach( () => {
    sandbox.spy(ServerCommunication, "connect");
    sandbox.spy(ServerCommunication, "bindClientEvents");
  });

  afterEach(() => sandbox.restore());

  it('should create a new instance of SpotifyQuizApp', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(SpotifyQuizApp, {}));
    expect(render).to.exist;
  });

  it('should connect to server on mount', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(SpotifyQuizApp, {}));
    expect(ServerCommunication.connect).to.have.been.calledOnce;
    expect(ServerCommunication.bindClientEvents).to.have.been.calledOnce;
  });

  it('view should contain links to "Home" and "About"', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(SpotifyQuizApp, {}));
    var links = TestUtils.scryRenderedDOMComponentsWithTag(render, 'a');

    expect(links).to.have.length(2);
    links.forEach( (link) => {
      expect(link.getDOMNode().getAttribute('href')).to.eql('link');
      expect(link.getDOMNode().textContent).to.match(/^Home|About/);
    });
  });

});
