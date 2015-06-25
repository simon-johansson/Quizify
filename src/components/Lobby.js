'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var HostActions = require('../actions/HostActionCreators');
var HostStore = require('../stores/HostStore');

require('styles/views/Lobby.scss');

class Lobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = HostStore.listen(this.onIdChange.bind(this));

    // Triggering of the createLobby could also be done in
    // the Home component when clicking on the "Create" button
    HostActions.createLobby();
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  onIdChange(roomID) {
    this.setState({
      id: roomID
    });
  }

  render() {
    return (
      <div className="Lobby-view">
        <p>Open this site on your mobile device:</p>
        <h2>quizify.trol.la</h2>
        <p>Then click JOIN and enter the following Game ID:</p>
        <h2> { this.state.id } </h2>
      </div>
    );
  }
}

module.exports = Lobby;

