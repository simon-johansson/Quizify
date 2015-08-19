'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const JoinGameForm = require('../Lobby/JoinGameForm');
const PlayerActions = require('actions/PlayerActionCreators');

describe('JoinGameForm', function () {
  var sandbox;

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
    sandbox.spy(PlayerActions, "joinGame");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new instance of JoinGameForm', () => {
    let render = TestUtils.renderIntoDocument(<JoinGameForm />);
    expect(render).to.exist;
  });

  it('should contain two input fileds for player name and game id', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm />);
    var nameInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'player-name-input');
    var idInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'game-id-input');

    expect(nameInput).to.exist;
    expect(nameInput.getDOMNode().nodeName).to.eql('INPUT');
    expect(nameInput.getDOMNode().type).to.eql('text');
    expect(nameInput.getDOMNode().value).to.eql('');

    expect(idInput).to.exist;
    expect(idInput.getDOMNode().nodeName).to.eql('INPUT');
    expect(idInput.getDOMNode().type).to.eql('text');
    expect(idInput.getDOMNode().value).to.eql('');
  });

  it('should contain "join game"-button', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm />);
    var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');

    expect(button).to.exist;
    expect(button.getDOMNode().nodeName).to.eql('BUTTON');
    expect(button.getDOMNode().textContent).to.eql('Join game');
  });

  it('should auto fill the player name field if name prop is passed in', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm playerName='Simon' />);
    var nameInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'player-name-input');

    expect(nameInput.getDOMNode().value).to.eql('Simon');
  });

  it('should auto fill the game id field if id prop is passed in', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm gameId='1234' />);
    var idInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'game-id-input');

    expect(idInput.getDOMNode().value).to.eql('1234');
  });

  it('should set new state when player name is filled in', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm />);
    var nameInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'player-name-input');

    expect(instance.state.playerName).to.eql('');
    expect(nameInput.getDOMNode().value).to.eql('');

    TestUtils.Simulate.change(nameInput, {target: {value: 'Ozzy'}});
    expect(instance.state.playerName).to.eql('Ozzy');
    expect(nameInput.getDOMNode().value).to.eql('Ozzy');
  });

  it('should set new state when game id is filled in', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm />);
    var idInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'game-id-input');

    expect(instance.state.gameId).to.eql('');
    expect(idInput.getDOMNode().value).to.eql('');

    TestUtils.Simulate.change(idInput, {target: {value: '4321'}});
    expect(instance.state.gameId).to.eql('4321');
    expect(idInput.getDOMNode().value).to.eql('4321');
  });

  it('should attempt to join game when "join game"-button is pressed', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm />);
    var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
    TestUtils.Simulate.click(button);
    expect(PlayerActions.joinGame).to.have.been.calledOnce;
  });

  it('should send player name and game id when attempting to join game', () => {
    let instance = TestUtils.renderIntoDocument(<JoinGameForm playerName='Simon' gameId='123' />);
    var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
    TestUtils.Simulate.click(button);
    expect(PlayerActions.joinGame).to.have.been.calledWithExactly('Simon', '123');
  });

  it.skip('should get error if no name has been supplied when trying to join game', () => {});
  it.skip('should get error if no game id has been supplied when trying to join game', () => {});
});
