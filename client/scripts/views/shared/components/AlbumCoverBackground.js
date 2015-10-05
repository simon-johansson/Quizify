
import _ from 'lodash';
import React from 'react/addons';
import TimeoutTransitionGroup from 'timeout-transition-group';

import styles from 'styles/components/AlbumCoverBackground.scss';
import CSSModules from 'react-css-modules';

const covers = _.shuffle([
  {
    id: '1ds2QsfhAAfRiaFMGDzrdb',
    url: 'https://i.scdn.co/image/6f77e481eb4314bfe0195e0ffbf067cb9bcd24f0'
  },{
    id: '6RsWqX8zABZLhZydXxEFOm',
    url: 'https://i.scdn.co/image/fef8458af72a9816f520a5c73e311db94b2498d9'
  },{
    id: '25khomWgBVamSdKw7hzm3l',
    url: 'https://i.scdn.co/image/fef8458af72a9816f520a5c73e311db94b2498d9'
  },{
    id: '4WjH9Bzt3kx7z8kl0awxh4',
    url: 'https://i.scdn.co/image/848e29273dab48db74bbd7d2ca85aaa32e868a95'
  },{
    id: '0sQLhT32E9ZG2zn5iYR6nN',
    url: 'https://i.scdn.co/image/7525026af26d2ef0bf6eb93cac5c1f119fcb0caa'
  },{
    id: '22mek4IiqubGD9ctzxc69s',
    url: 'https://i.scdn.co/image/3186ff2fd55bf05a34111504109fa24e9c805fff'
  },{
    id: '6nmz4imkDcmtwMjocAzFSx',
    url: 'https://i.scdn.co/image/aa533378f184bcb1e60d5f52aa88e44ba67be0e1'
  },{
    id: '0kN5Ohxu97lwdDmP5n7FZE',
    url: 'https://i.scdn.co/image/bf815cb3b49eb81556fc1a7bb1e5247c688e6de5'
  },{
    id: '70OTIpw8x8UXUsuCHW9i1i',
    url: 'https://i.scdn.co/image/dd5fc5228adcd7049373e3c925259f6a4a5978b0'
  },{
    id: '6kBp8w67thoYqTUOQVSGFg',
    url: 'https://i.scdn.co/image/9ac7655af369d6f112364ffc4f3bd37be309c6ab'
  },{
    id: '3zkWCteF82vJwv0hRLba76',
    url: 'https://i.scdn.co/image/9e36f1824bf13881f3da17413d229114a43df17a'
  },{
    id: '5tf1VVWniHgryyumXyJM7w',
    url: 'https://i.scdn.co/image/53fea48ae7ad87d8dea8fbf28ba2573b8a332a11'
  },{
    id: '66hayvUbTotekKU3H4ta1f',
    url: 'https://i.scdn.co/image/7cba10274638d0d3834ef3afb0722b5d9011d4f1'
  },{
    id: '6fQcqEcXfnY0L6VwS0c3gT',
    url: 'https://i.scdn.co/image/2b36932a11c49e2c5f34c757f30162980001e04e'
  },{
    id: '5afHIkEcVhCF1Z1CTqMUXB',
    url: 'https://i.scdn.co/image/f44b6e19fd4a43fdf7eaf6148992cac3fc2bd2f8'
  },{
    id: '1HNkqx9Ahdgi1Ixy2xkKkL',
    url: 'https://i.scdn.co/image/c6574e297a501e44d051f9130c883e1fdfcb3099'
  },{
    id: '0lLDaAdXcjOQ7Mf2NXzXay',
    url: 'https://i.scdn.co/image/f89bbc1a5a9c72faf1d05757f6da18a4d7bc8c55'
  },{
    id: '5iNRPN7oYQvdB9AmeSW6d3',
    url: 'https://i.scdn.co/image/5aa0bd2874ec6ae0885adc84bb02d5ffce6f8cc2'
  },{
    id: '5MMp4HNtX6T2xT9w6Xmaxn',
    url: 'https://i.scdn.co/image/678d33945b15722060d9882b0fa5393732a6101b'
  },{
    id: '6ukMqDxnOPOgoHdak7Kyp3',
    url: 'https://i.scdn.co/image/f210b2d4d61302c3cb742aa1111abfa829a04323'
  },{
    id: '2S5LNtRVRPbXk01yRQ14sZ',
    url: 'https://i.scdn.co/image/438e3b57abfa398f55a267911e91b049aed0b6e2'
  },{
    id: '4Ld3RS6KBXGsvtfmnjxlVl',
    url: 'https://i.scdn.co/image/7fd99b6dfe8005a8f63ccd5ef48d850044d6820e'
  },{
    id: '7zlF2G7QFPdj9lmmGNVuNq',
    url: 'https://i.scdn.co/image/39e93104da82314d48bb1ea38f8c2e8e3f261a4e'
  },{
    id: '7wqSzGeodspE3V6RBD5W8L',
    url: 'https://i.scdn.co/image/520cb06d752e4034a6a37bb35e553064f3f15b76'
  },{
    id: '5eCgNATwXgRc4mZx9NymGJ',
    url: 'https://i.scdn.co/image/b8067976de1d33cda461d77c393993008f362c63'
  },{
    id: '4vEUY73dVOg97Ajbqq9zgV',
    url: 'https://i.scdn.co/image/d7d950ecb91a04f2a43f2c6726808441eb15fdf2'
  },{
    id: '0xCmwofyCiXdhoBsMSNj2w',
    url: 'https://i.scdn.co/image/4c592e6d0eb06b63b26c3bc58d8ad40770f81b80'
  },{
    id: '7oGZAicScQt96OAW4AruYy',
    url: 'https://i.scdn.co/image/6db4601516dd20b3bc19279bfdbcb168c2335c3c'
  },{
    id: '5NQbUaeTEOGdD6hHcre0dZ',
    url: 'https://i.scdn.co/image/7c0b1feae88f8523e3ca4adf95114086c5d4c310'
  },{
    id: '34gCuhDGsG4bRPIf9bb02f',
    url: 'https://i.scdn.co/image/c6574e297a501e44d051f9130c883e1fdfcb3099'
  },{
    id: '1KK0j3djUgx5tuOMwesdAT',
    url: 'https://i.scdn.co/image/9b7fd0cdd78ae43ca0a6bb457812c18c0caf1ef6'
  },{
    id: '4kbj5MwxO1bq9wjT5g9HaA',
    url: 'https://i.scdn.co/image/fae75f376d3e7e076ccd714785cb76129b82a15f'
  },{
    id: '1CvhKmrutTAta5awpJcFDn',
    url: 'https://i.scdn.co/image/625395bcf1aa439b0a86426262a51703c37b84af'
  },{
    id: '4iZPNYqzI2L0uwuUKun7Aa',
    url: 'https://i.scdn.co/image/76e8c388e32f952cddae184cc72f41860086c6ee'
  },{
    id: '5kZRoc6Gz7u5eu4a0YM2LS',
    url: 'https://i.scdn.co/image/0336e59b85f37ed971875cb734379be34a9d30ab'
  }
]);

class AlbumCover extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    src: '',
  }

  handleClick() {
    console.log('Test');
  }

  render() {
    let src = this.props.src;
    return (
      <li className="album-cover">
        <TimeoutTransitionGroup transitionName="album-spinner"
                                enterTimeout={800}
                                leaveTimeout={500}>
          <img
            onClick={this.handleClick}
            src={src}
            width="200"
            height="200"
            key={src}
          />
        </TimeoutTransitionGroup>
      </li>
    );
  }
}

class AlbumCovers extends React.Component {
  static propTypes = {
    covers: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    covers: [],
  }

  constructor(props) {
    super(props);
  }

  tilesVisibleOnScreen() {
    const buffer = 5;
    const {innerHeight, innerWidth} = window;
    return Math.floor((innerHeight * innerWidth) / (200 * 200)) + buffer;
  }

  render() {
    let covers = this.props.covers;
    let subset = covers.slice(0, this.tilesVisibleOnScreen());
    let tileNodes = subset.map((track, index) => {
      return (
        <AlbumCover src={track.url} key={index} />
      );
    });
    return (
      <ul>
        <TimeoutTransitionGroup transitionName="album-spinner"
                                enterTimeout={800}>
          {tileNodes}
        </TimeoutTransitionGroup>
      </ul>
    );
  }
}

@CSSModules(styles)
export default class Background extends React.Component {
  // loadAlbumCoversFromServer() {
  //   $.ajax
  //     url: @props.url
  //     dataType: 'json',
  //     success: (data) =>
  //       @setState { data: _.shuffle data }
  //       @setState { spinner: _.cloneDeep data }
  //     error: (xhr, status, err) ->
  //       console.error @props.url, status, err.toString()
  // }

  constructor(props) {
    super(props);
    this.state = {
      data: covers,
      spinner: []
    };
  }

  animateTile() {
    if(!this.state.spinner.length) {
      this.setState({spinner: _.cloneDeep(this.state.data)});
    }
    const spinnerCopy = _.cloneDeep(this.state.spinner);
    let dataCopy = _.cloneDeep(this.state.data);
    dataCopy[_.random(dataCopy.length - 1)] = spinnerCopy.pop();
    this.setState({spinner: spinnerCopy, data: dataCopy});
  }

  componentDidMount() {
    // this.loadAlbumCoversFromServer();
    setInterval(() => {
      this.animateTile();
    }, _.random(1500, 1700));
  }

  render() {
    return (
      <div styleName="styles">
        <AlbumCovers covers={this.state.data} />
        <div styleName="overlay"></div>
      </div>
    );
  }
}

