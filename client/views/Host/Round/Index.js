'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var QRCode = require('react-qr');

var HostActions = require('actions/HostActionCreators');
var HostStore = require('stores/HostStore');

var PlayerHelpers = require('../../helpers/Player');

class HostLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      countdown: HostStore.getCountdown()
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.onStartNewRound.listen(this._onStoreChange.bind(this));
    HostActions.requestNewRound();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onStoreChange(data) {
    console.log(HostStore.getTrack());
    this.setState({
      track: HostStore.getTrack()
    });

  }


  render() {
    let { track, countdown } = this.state;
    let question = countdown === 0 ? "Who plays the song" + track.title + "?" : "";
    return (
      <div className="HostLobby-view">
        { question }
      </div>
    );
  }
}

module.exports = HostLobby;

