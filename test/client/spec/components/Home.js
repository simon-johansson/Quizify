'use strict';

function noop() {}

describe('Home', () => {
  var React, Router, TestUtils, stubContext, Home;

  beforeEach( () => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    stubContext = require('react-stub-context');
    Home = require('components/Home.js');

    Router = function() {};
    Router.makeHref = function () { return 'link'; };
    Router.isActive = noop;

    Home = stubContext(Home, { router: Router });
  });

  it('should create a new instance of Home', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(Home, {}));
    expect(render).to.exist;
  });

  it('view should contain links to "Create" and "Join"', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(Home, {}));
    var links = TestUtils.scryRenderedDOMComponentsWithTag(render, 'a');

    expect(links).to.have.length(2);
    links.forEach( (link) => {
      expect(link.getDOMNode().getAttribute('href')).to.eql('link');
      expect(link.getDOMNode().textContent).to.match(/^Create|Join/);
    });
  });

});
