'use strict';

import Emitter from 'component-emitter';
import events from 'shared/socketEvents';
import ServerCommunication from '../ServerCommunication';
import utils from '../ServerCommunication/utils';

const socket = {};
Emitter(socket);
ServerCommunication.setSocketInstance(socket);

describe('ServerCommunication', () => {
  const sandbox = sinon.sandbox.create();

  describe('utils', () => {

    describe('#wrapper', () => {
      const {wrapper} = utils;
      const action = {
        failed() {},
        completed() {}
      };

      beforeEach( () => {
        sandbox.spy(action, "failed");
        sandbox.spy(action, "completed");
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should be a function', () => {
        expect(wrapper).to.exist;
        expect(wrapper).to.be.a('function');
      });

      it('should call actions "failed" callback if payload contains error', () => {
        const data = {errorMessage: 'Error!'};
        wrapper(action, data);
        expect(action.failed).to.have.been.calledOnce;
        expect(action.completed).to.have.callCount(0);
        expect(action.failed).to.have.been.calledWith('Error!');
      });

      it('should call actions "completed" callback if payload does not contain error', () => {
        const data = {playerName: 'Simon'};
        wrapper(action, data);
        expect(action.completed).to.have.been.calledOnce;
        expect(action.failed).to.have.callCount(0);
        expect(action.completed).to.have.been.calledWith(data);
      });
    });
  });

  describe('#connect', () => {

    beforeEach( () => {
      sandbox.spy(socket, "on");
      sandbox.spy(socket, "emit");
    });

    afterEach(() => sandbox.restore());

    it('should be a function', () => {
      expect(ServerCommunication.connect).to.exist;
      expect(ServerCommunication.connect).to.be.a('function');
    });

    it('should be able to connect to websocket', () => {
      ServerCommunication.connect();
      expect(socket.on).to.have.been.calledOnce;
      expect(socket.on).to.have.been.calledWith('connect');
    });
  });

  describe('#bindClientEvents', () => {
    const ClientActions = require('actions/ClientActionCreators');
    const outgoing = events.toServer.fromClient;
    const incoming = events.fromServer.toClient;

    beforeEach( () => {
      sandbox.spy(socket, "on");
      sandbox.spy(socket, "emit");
      sandbox.spy(ClientActions.leaveGame, "completed");
      // sandbox.spy(ClientActions.newRound, "completed");
    });

    afterEach(() => sandbox.restore());

    it('should be a function', () => {
      expect(ServerCommunication.bindClientEvents).to.exist;
      expect(ServerCommunication.bindClientEvents).to.be.a('function');
    });

    it('should be able to bind client socket events', () => {
      expect(ServerCommunication.bindClientEvents).to.not.throw(Error);
    });

    it('should emit leaveGame event when leaveGame action is called', (done) => {
      const data = {playerName: 'Simon', gameId: 'abc123'};
      const ev = outgoing.leaveGame;

      ServerCommunication.bindClientEvents();
      ClientActions.leaveGame('Simon', 'abc123');
      _.delay(() => {
        expect(socket.emit).to.have.been.called;
        expect(socket.emit).to.have.been.calledWith(ev, data);
        done();
      }, 10);
    });

    it('should call leaveGame.completed action when leaveGame socket event is recived without an error', () => {
      const data = {playerName: 'Simon', gameId: 'abc123'};
      const ev = incoming.leaveGame;

      ServerCommunication.bindClientEvents();
      socket.emit(ev, data);

      expect(ClientActions.leaveGame.completed).to.have.been.called;
      expect(ClientActions.leaveGame.completed).to.have.been.calledWith(data);
    });

    it.skip('should call newRound.completed action when newRound socket event is recived without an error', () => {
      const data = {title: 'Heart of Gold'};
      const ev = incoming.newRound;

      ServerCommunication.bindClientEvents();
      socket.emit(ev, data);

      expect(ClientActions.newRound.completed).to.have.been.called;
      expect(ClientActions.newRound.completed).to.have.been.calledWith(data);
    });
  });

  describe('#bindHostEvents', () => {
    const HostActions = require('actions/HostActionCreators');
    const outgoing = events.toServer.fromHost;
    const incoming = events.fromServer.toHost;

    beforeEach( () => {
      sandbox.spy(socket, "on");
      sandbox.spy(socket, "emit");
      sandbox.spy(HostActions.createGame, "completed");
      sandbox.spy(HostActions, "requestNewRound");
      sandbox.spy(HostActions, "playerJoinedGame");
      sandbox.spy(HostActions, "listPlayers");
    });

    afterEach(() => sandbox.restore());

    it('should be a function', () => {
      expect(ServerCommunication.bindHostEvents).to.exist;
      expect(ServerCommunication.bindHostEvents).to.be.a('function');
    });

    it('should be able to bind host socket events', () => {
      expect(ServerCommunication.bindHostEvents).to.not.throw(Error);
    });

    it('should emit createGame event when createGame action is called', (done) => {
      const ev = outgoing.createGame;

      ServerCommunication.bindHostEvents();
      HostActions.createGame();
      _.delay(() => {
        expect(socket.emit).to.have.been.called;
        expect(socket.emit).to.have.been.calledWith(ev);
        done();
      }, 10);
    });

    it('should emit listPlayers event when listPlayers action is called', (done) => {
      const ev = outgoing.listPlayers;
      const data = ['Simon', 'Jose', 'Benny'];

      ServerCommunication.bindHostEvents();
      HostActions.listPlayers(data);

      _.delay(() => {
        expect(socket.emit).to.have.been.called;
        expect(socket.emit).to.have.been.calledWith(ev, data);
        done();
      }, 10);
    });

    it('should emit requestNewRound event when requestNewRound action is called', (done) => {
      const ev = outgoing.requestNewRound;

      ServerCommunication.bindHostEvents();
      HostActions.requestNewRound();

      _.delay(() => {
        expect(socket.emit).to.have.been.called;
        expect(socket.emit).to.have.been.calledWith(ev);
        done();
      }, 10);
    });

    it('should call playerJoinedGame action when playerJoined socket event is recived', () => {
      const data = {playerName: 'Mr. Sam Cooke'};
      const ev = incoming.playerJoined;

      ServerCommunication.bindHostEvents();
      socket.emit(ev, data);

      expect(HostActions.playerJoinedGame).to.have.been.called;
      expect(HostActions.playerJoinedGame).to.have.been.calledWith(data);
    });
  });

  describe('#bindPlayerEvents', () => {

    it('should be a function', () => {
      expect(ServerCommunication.bindPlayerEvents).to.exist;
      expect(ServerCommunication.bindPlayerEvents).to.be.a('function');
    });

    it('...', () => {
    });
  });
});
