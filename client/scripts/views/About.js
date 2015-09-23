
import React from 'react/addons';

// import styles from 'styles/views/Host/Host.css';
import styles from 'styles/views/About.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class About extends React.Component {
  render() {
    return (
      <div className="About-view">
        <h2 styleName='black'>About</h2>
        <h3>Made by:</h3>
        <p>Jose Granjo & Simon Johansson</p>
      </div>
    );
  }
}


