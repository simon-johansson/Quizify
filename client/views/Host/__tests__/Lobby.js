'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Lobby = require('views/Host/Lobby');
const HostActions = require('actions/HostActionCreators');

describe('HostLobby', () => {
  var sandbox;

  beforeEach( () => {
    Lobby.__Rewire__('PlayerHelpers', {
      getPlayerElements: players => {
        return players.map((player, i) =>
          <div key={i} >{player}</div>
        );
      }
    });

    sandbox = sinon.sandbox.create();
    sandbox.spy(HostActions, "createGame");
    sandbox.spy(HostActions, "requestNewRound");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new instance of Host Lobby', () => {
    var render = TestUtils.renderIntoDocument(<Lobby />);
    expect(render).to.exist;
  });

  it('should call createGame action when mounted', () => {
    var render = TestUtils.renderIntoDocument(<Lobby />);
    expect(HostActions.createGame).to.have.been.calledOnce;
  });

  it('should show url to site', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby url='http://spotifyquiz.com' />);
    const url = TestUtils.findRenderedDOMComponentWithClass(markup, 'site-url');
    expect(url.getDOMNode().textContent).to.eql('http://spotifyquiz.com');
  });

  it('should show gameId of current game', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby gameId='1234' />);
    const gameId = TestUtils.findRenderedDOMComponentWithClass(markup, 'game-id');
    expect(gameId.getDOMNode().textContent).to.eql('1234');
  });

  it('should generate QR-code with deep link to game', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby deepLink='http://spotifyquiz.com/1234' />);
    const qrCode = TestUtils.findRenderedDOMComponentWithClass(markup, 'react-qr');
    expect(qrCode.getDOMNode().src).to.eql('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACbCAAAAABQCrZQAAABrElEQVR42u3aQY4DIQwF0b7/pZMLYKfc7WBaKlYZTQbeLBD2h+tz7ri0adtuu36P5R8vfgEmoKtp0zZki/fLYuocmH+PrqZN26RtuV+iWUurh/PFq2nTdrYt/DE/lUKlNm1vtYEaLKRq0/Ya24+KqrwxwcnXVFtq09ZmI51236f2zEGbtg4bTmDTSg7kXn/MorVp67CBPUTleXFWWkObtv22eiFG+5abjY82bUO2fIfdPIbCfw5PoE3boI0mtbSIownxcnpt2mZsoJKjd+Kl2q9WW2rT9ldbva+nd360yYnvPrRpO8L25BI872pINKZN2xE2MHXpmRSYalm/adO200ZfNOX1G817cRWoTdugredRII0D8Fspbdp22uhc4JCil+q1zEGbthlbnsrW39rSiECbtoNs+U4sLVx6kRi/adSmbZPtyZEDCsB6NKZN25CN7qbSpSEIBvCbRm3adtpuNiB04VIQrE3buK3Uwz9ugfCZpU3bibabb0E+5aFN22ts9Dq81Otr03aGLa/fcFJbCXjjI1GbthkbTWVB6EvPrM7MQZu2DtuZQ5u2neMLX2nDCs7ofM4AAAAASUVORK5CYII=');
  });

  it('should not show any players if non have joined', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby />);
    const players = TestUtils.findRenderedDOMComponentWithClass(markup, 'players');
    expect(players.getDOMNode().textContent).to.eql('');
  });

  it('should show joined players', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby players={['Simon', 'Benny', 'Jose']} />);
    const players = TestUtils.findRenderedDOMComponentWithClass(markup, 'players');
    expect(players.getDOMNode().textContent).to.eql('SimonBennyJose');
  });

  it('should not be able to start game if no players have joined', () => {
    const markup = React.renderToStaticMarkup(<Lobby />);
    expect(markup).to.not.contains('start-game-btn');
  });

  it('should be able to start game if one or more players have joined', () => {
    const markup = TestUtils.renderIntoDocument(<Lobby players={['Simon', 'Benny', 'Jose']} />);
    const button = TestUtils.findRenderedDOMComponentWithClass(markup, 'start-game-btn');
    TestUtils.Simulate.click(button);
    expect(button.getDOMNode().textContent).to.eql('Start game(up to 8 players)');
    expect(HostActions.requestNewRound).to.have.been.calledOnce;
  });

});
