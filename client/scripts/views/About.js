'use strict';

var React = require('react/addons');
var CSSModules = require('react-css-modules');
var styles = require('styles/views/About.scss');

class About extends React.Component {
  render () {
    return (
      <div className="About-view" styleName="About-view bg">
        <h2>About</h2>
        <h3>Made by:</h3>
        <p>Jose Granjo & Simon Johansson</p>
      </div>
    );
  }
}

// module.exports = CSSModules(About, styles, {allowMultiple: true});
module.exports = About;

