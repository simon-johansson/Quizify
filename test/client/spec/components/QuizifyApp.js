'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var React = require('react');
var expect = require('chai').expect;
var QuizifyApp = require('components/QuizifyApp.js');

describe('QuizifyApp', function () {

  it('should create a new instance of QuizifyApp', function () {
    var quizifyApp = TestUtils.renderIntoDocument(<QuizifyApp/>);
    expect(quizifyApp).to.exist;
  });

  it('should contain the correct text', function () {
    var quizifyApp = TestUtils.renderIntoDocument(<QuizifyApp/>);
    var node = TestUtils.findRenderedDOMComponentWithTag(quizifyApp, "div");
    expect(node.getDOMNode().textContent).to.eql('Quizify');
  });
});
