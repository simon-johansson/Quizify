'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const stubContext = require('react-stub-context');
var ServerCommunication = require('utils/ServerCommunication');
var QuizifyApp = require('views/QuizifyApp.js');

function noop() {}

var Router = function() {};
Router.makeHref = function () { return 'link'; };
Router.setRouteComponentAtDepth = Router.isActive = Router.getRouteAtDepth = noop;
QuizifyApp = stubContext(QuizifyApp, { router: Router });

describe('QuizifyApp', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach( () => {
    sandbox.spy(ServerCommunication, "connect");
    sandbox.spy(ServerCommunication, "bindClientEvents");
  });

  afterEach(() => sandbox.restore());

  it('should create a new instance of QuizifyApp', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(QuizifyApp, {}));
    expect(render).to.exist;
  });

  it('should connect to server on mount', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(QuizifyApp, {}));
    expect(ServerCommunication.connect).to.have.been.calledOnce;
    expect(ServerCommunication.bindClientEvents).to.have.been.calledOnce;
  });

  it('view should contain links to "Home" and "About"', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(QuizifyApp, {}));
    var links = TestUtils.scryRenderedDOMComponentsWithTag(render, 'a');

    expect(links).to.have.length(2);
    links.forEach( (link) => {
      expect(link.getDOMNode().getAttribute('href')).to.eql('link');
      expect(link.getDOMNode().textContent).to.match(/^Home|About/);
    });
  });

});
