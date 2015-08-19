'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Player = require('../Player.js');

describe('Player', () => {

  it('should create a new instance of Player component', () => {
    var render = TestUtils.renderIntoDocument(<Player />);
    expect(render).to.exist;
  });

  it('should contain the players name', () => {
    const markup = React.renderToStaticMarkup(<Player playerName={"Elvis"} />);
    expect(markup).to.contain('Elvis');
  });

  it('should contain the players index', () => {
    const markup = React.renderToStaticMarkup(<Player index={"3"} />);
    expect(markup).to.contain('3');
  });
});
