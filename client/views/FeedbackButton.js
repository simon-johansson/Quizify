'use strict';

var React = require('react/addons');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

require('styles/components/FeedbackButton.scss');

var FeedbackButton = React.createClass({
    mixins: [ReactScriptLoaderMixin],
    getInitialState: function() {
      window.doorbellOptions = {
        hideButton: true,
        appKey: 'q1ntcPjbfs4r0DsOW7kFKE7Il4n7kZwfRzSeDh502ukmNokB38KVDHlLOubWB0G6',
      };

      return {
        scriptLoading: true,
        scriptLoadError: false,
      };
    },

    // this function tells ReactScriptLoaderMixin where to load the script from
    getScriptURL: function() {
      return `https://embed.doorbell.io/button/1734?t=${new Date().getTime()}`;
    },

    // ReactScriptLoaderMixin calls this function when the script has loaded
    // successfully.
    onScriptLoaded: function() {
      this.setState({scriptLoading: false});
    },

    // ReactScriptLoaderMixin calls this function when the script has failed to load.
    onScriptError: function() {
      this.setState({scriptLoading: false, scriptLoadError: true});
    },

    showModal: function () {
      window.doorbell.show(); // The doorbell object gets created by the doorbell.js script
    },

    render: function() {
      var el = null;
      var text = 'We want your feedback!';

      if (!this.state.scriptLoading && !this.state.scriptLoadError) {
        el = <button className="feedback-button" onClick={this.showModal}>{text}</button>;
      }
      return el;
    }
});

module.exports = FeedbackButton;

