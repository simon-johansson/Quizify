'use strict';

describe('Home', function () {
  var React = require('react/addons');
  var Home, component;

  beforeEach(function () {
    Home = require('components/Home.js');
    component = React.createElement(Home);
  });

  it('should create a new instance of Home', function () {
    expect(component).toBeDefined();
  });
});
