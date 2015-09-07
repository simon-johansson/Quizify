'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const PlayerLobby = require('../Lobby/index');

var JoinGameFormMock = React.createClass({
  render: function () {
    return <div className="form-mock-component" />;
  }
});

var JoinedGameInstructionsMock = React.createClass({
  render: function () {
    return <div className="instructions-mock-component" />;
  }
});

describe('PlayerLobby', function () {
  const formType = React.renderToStaticMarkup(<JoinGameFormMock />);
  const instructionsType = React.renderToStaticMarkup(<JoinedGameInstructionsMock />);

  beforeEach( () => {
    PlayerLobby.__Rewire__('JoinGameForm', JoinGameFormMock);
    PlayerLobby.__Rewire__('JoinedGameInstructions', JoinedGameInstructionsMock);
  });

  it('should create a new instance of PlayerLobby', () => {
    let render = TestUtils.renderIntoDocument(<PlayerLobby />);
    expect(render).to.exist;
  });

  it('should show JoinGameForm component before a game has been joined', () => {
    let markup = React.renderToStaticMarkup(<PlayerLobby />);
    expect(markup).to.contain(formType);
    expect(markup).to.not.contain(instructionsType);
  });

  it('should show JoinedGameInstructions when a game has been joined', () => {
    let markup = React.renderToStaticMarkup(<PlayerLobby joinedGame={true} />);
    expect(markup).to.contain(instructionsType);
    expect(markup).to.not.contain(formType);
  });
});
