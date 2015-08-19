'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const JoinedGameInstructions = require('../Lobby/JoinedGameInstructions');

describe('JoinedGameInstructions', () => {

  beforeEach( () => {
    JoinedGameInstructions.__Rewire__('PlayerHelpers', {
      getPlayerElements: players => {
        return players.map((player, i) =>
          <div key={i} >{player}</div>
        );
      }
    });
  });

  it('should create a new instance of JoinedGameInstructions', () => {
    var render = TestUtils.renderIntoDocument(<JoinedGameInstructions />);
    expect(render).to.exist;
  });

  it('should contain the players name', () => {
    const markup = React.renderToStaticMarkup(<JoinedGameInstructions playerName={"Madonna"} />);
    expect(markup).to.contain('Madonna');
  });

  it('should show other players that have joined game', () => {
    const instance = TestUtils.renderIntoDocument(<JoinedGameInstructions players={['Simon', 'Benny', 'Jose']} />);
    const players = TestUtils.findRenderedDOMComponentWithClass(instance, 'players');
    expect(players.getDOMNode().textContent).to.eql('SimonBennyJose');
  });
});
