'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const stubContext = require('react-stub-context');
const nop = require('nop');
var Host = require('views/Host');
var ServerCommunication = require('utils/ServerCommunication');
var HostStore = require('stores/HostStore');

var Router = function() {};
Router.makeHref = function () { return 'link'; };
Router.setRouteComponentAtDepth = Router.isActive = Router.getRouteAtDepth = nop;
Host = stubContext(Host, { router: Router });

describe('Host', () => {
  var sandbox;

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
    sandbox.spy(ServerCommunication, "bindHostEvents");
    sandbox.spy(ServerCommunication, "unbindHostEvents");
    sandbox.spy(HostStore, "setInitialState");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new instance of Host Lobby', () => {
    var render = TestUtils.renderIntoDocument(<Host />);
    expect(render).to.exist;
  });

  it('should bind host websocket events when mounted', () => {
    var render = TestUtils.renderIntoDocument(<Host />);
    expect(ServerCommunication.bindHostEvents).to.have.been.calledOnce;
  });

  it('should unbind host websocket events when unmounted', () => {
    var container = document.createElement('div');
    var render = React.render(<Host />, container);
    React.unmountComponentAtNode(container);
    expect(ServerCommunication.unbindHostEvents).to.have.been.calledOnce;
  });

  it.skip('should set host store to initial state when unmounted', () => {
    var container = document.createElement('div');
    var render = React.render(<Host />, container);
    React.unmountComponentAtNode(container);
    expect(HostStore.setInitialState).to.have.been.calledOnce;
  });
});
