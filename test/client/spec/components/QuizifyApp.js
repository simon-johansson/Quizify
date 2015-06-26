'use strict';

function noop() {}

describe('QuizifyApp', () => {
  var React, Router, TestUtils, stubContext, QuizifyApp;

  beforeEach( () => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    stubContext = require('react-stub-context');
    QuizifyApp = require('components/QuizifyApp.js');

    Router = function() {};
    Router.makeHref = function () { return 'link'; };
    Router.setRouteComponentAtDepth = Router.isActive = Router.getRouteAtDepth = noop;

    QuizifyApp = stubContext(QuizifyApp, { router: Router });
  });

  it('should create a new instance of QuizifyApp', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(QuizifyApp, {}));
    expect(render).to.exist;
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
