'use strict';

describe('About', () => {
  var React, TestUtils, About;

  beforeEach( () => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    About = require('views/About.js');
  });

  it('should create a new instance of About', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(About, {}));
    expect(render).to.exist;
  });

  it('view should contain a h2 tag', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(About, {}));
    var h2 = TestUtils.findRenderedDOMComponentWithTag(render, 'h2');
    expect(h2.getDOMNode().textContent).to.eql('About');
  });

});
