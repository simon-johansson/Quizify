
import Reflux from 'reflux';

const ClientActionCreators = Reflux.createActions({
  'leaveGame': {
    children: ['completed', 'failed']
  }
});

ClientActionCreators.latency = Reflux.createAction();

export default ClientActionCreators;
