'use strict';

describe('QuizifyApp', function () {
  var React = require('react/addons');
  var QuizifyApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    QuizifyApp = require('components/QuizifyApp.js');
    component = React.createElement(QuizifyApp);
  });

  it('should create a new instance of QuizifyApp', function () {
    expect(component).toBeDefined();
  });
});
