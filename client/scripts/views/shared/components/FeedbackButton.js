
import React from 'react/addons';
import {ReactScriptLoaderMixin} from 'react-script-loader';

import 'styles/components/FeedbackButton.scss';

const FeedbackButton = React.createClass({
    mixins: [ReactScriptLoaderMixin],

    getInitialState: function () {
      window.doorbellOptions = {
        hideButton: true,
        appKey: [
          'q1ntcPjbfs4r0DsOW7kFKE7Il4n7kZwf',
          'RzSeDh502ukmNokB38KVDHlLOubWB0G6'
        ].join(''),
      };

      return {
        scriptLoading: true,
        scriptLoadError: false,
      };
    },

    // this function tells ReactScriptLoaderMixin where to load the script from
    getScriptURL: function () {
      return `https://embed.doorbell.io/button/1734?t=${new Date().getTime()}`;
    },

    // ReactScriptLoaderMixin calls this function when the script has loaded
    // successfully.
    onScriptLoaded: function () {
      this.setState({scriptLoading: false});
    },

    // ReactScriptLoaderMixin calls this function when the script has
    // failed to load.
    onScriptError: function () {
      this.setState({scriptLoading: false, scriptLoadError: true});
    },

    showModal: function () {
      // The doorbell object gets created by the doorbell.js script
      window.doorbell.show();
    },

    render: function () {
      let el = null;
      // Found any bugs yet?
      // How was your experience?
      let text = 'We want your feedback!';

      if (!this.state.scriptLoading && !this.state.scriptLoadError) {
        el = (
          <button className="feedback-button" onClick={this.showModal}>
            {text}
          </button>
        );
      }
      return el;
    }
});

export default FeedbackButton;

