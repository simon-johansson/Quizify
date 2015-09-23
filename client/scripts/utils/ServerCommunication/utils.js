
import nop from 'nop';

const wrapper = (action, data = {}) => {
  let {failed, completed} = action;
  if(failed && completed) {
    return data.errorMessage ? failed(data.errorMessage) : completed(data);
  } else {
    return action(data);
  }
};

export const bindBouncingListeners = (socket, listeners, actions, ev) => {
  listeners.forEach(listener => {
    actions[listener].listen((dataToServer = {}) => {
      // console.log('emitting ', listener);
      socket.emit(
        ev[listener], dataToServer,
        dataFromServer => wrapper(actions[listener], dataFromServer)
      );
    });
  });
};

export const bindOutgoingListeners = (socket, listeners, actions, ev) => {
  listeners.forEach(listener => {
    actions[listener].listen(dataToServer => {
      // console.log('emitting ', listener, data);
      socket.emit(ev[listener], dataToServer);
    });
  });
};

export const bindIncomingListeners = (socket, listeners, actions, ev) => {
  listeners.forEach(listener => {
    socket.on(ev[listener], dataFromServer => {
      wrapper(actions[listener], dataFromServer);
    });
  });
};

export const unbindRefluxActions = (listeners, actions) => {
  listeners.forEach(listener => {
    actions[listener].listen = nop;
  });
};

export const unbindSocketEvents = (socket, listeners, ev) => {
  listeners.forEach(listener => {
    socket.off(ev[listener]);
  });
};

