
import _ from 'lodash';
import React from 'react/addons';
import TimeoutTransitionGroup from 'timeout-transition-group';

import styles from 'styles/components/AlbumCoverBackground.scss';
import CSSModules from 'react-css-modules';

const covers = [
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
  },{
    id: '7a6GeFdPlbQtd7BwVlZ52k',
    url: 'https://i.scdn.co/image/11ad2ee982b2683c4c49b34fb2ee50c835dde424'
  },{
    id: '477daPpd3DnneaHhvjM35l',
    url: 'https://i.scdn.co/image/a927181bf5006569052b54b646be0f01b1f6bea3'
  },{
    id: '27GmP9AWRs744SzKcpJsTZ',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '2u5B53qh8UGDnPcdJATcDl',
    url: 'https://i.scdn.co/image/da8f15c14a4868be853babeb97fc764be8867bb5'
  },{
    id: '41Fflg7qHiVOD6dEPvsCzO',
    url: 'https://i.scdn.co/image/2910f0b081430686f99287edc1a089fd0e1f93ba'
  },{
    id: '32OlwWuMpZ6b0aN2RZOeMS',
    url: 'https://i.scdn.co/image/620e780abe344fe99eae8472e66b2a09c5bed465'
  },{
    id: '3ESSGgWzRf1xvP7G5hHMhB',
    url: 'https://i.scdn.co/image/5aa0bd2874ec6ae0885adc84bb02d5ffce6f8cc2'
  },{
    id: '44aN5xKL3kGHvQ5bXVk6B8',
    url: 'https://i.scdn.co/image/aa82e12fe28ea0602243644271309503d396ae7d'
  },{
    id: '2sNvitW3TxiTeC9xT9f2ZZ',
    url: 'https://i.scdn.co/image/33a1770f26490cfd6768fa9e62a6875fa209a1d8'
  },{
    id: '3jEPu6FD1icy9cLllhB2XK',
    url: 'https://i.scdn.co/image/0f5b23524e18e174580bbbe177390227d089f55f'
  },{
    id: '5eWgDlp3k6Tb5RD8690s6I',
    url: 'https://i.scdn.co/image/462342903cda2a69377d73f1c837a9ffa73de031'
  },{
    id: '285HeuLxsngjFn4GGegGNm',
    url: 'https://i.scdn.co/image/9b092f765831793404d46b816d688135ff32735f'
  },{
    id: '0CQTJlVR2tPLsZ8mtpY8Cr',
    url: 'https://i.scdn.co/image/e57ffe8598b4255e9700484cbefdd10133eeb7e7'
  },{
    id: '7vqUr6K2Js9Paq4kdNSOm6',
    url: 'https://i.scdn.co/image/42f6403f96373d8b4dbd514445f9aea2196c61a4'
  },{
    id: '5UPwc30oJ4KhQYctNfv34x',
    url: 'https://i.scdn.co/image/fef8458af72a9816f520a5c73e311db94b2498d9'
  },{
    id: '7y2YUIyCuVhBidENVT0068',
    url: 'https://i.scdn.co/image/e861a8496004ec7ad816fff5288e86a94d82356b'
  },{
    id: '7jv4Mb21bdd9SDVOm9Fm9l',
    url: 'https://i.scdn.co/image/0018882db812638c47a507fcf7ffa677f7599944'
  },{
    id: '6bRbeEgg8v8BQ0HuVuPE7v',
    url: 'https://i.scdn.co/image/6fa19f4aa3a85366771aeb203a1bc8641db6584c'
  },{
    id: '0fYVliAYKHuPmECRs1pbRf',
    url: 'https://i.scdn.co/image/0d22274c284ec02c4bb3a5aef193cd879810e279'
  },{
    id: '3icbmPGKTsKAa0IinkizCM',
    url: 'https://i.scdn.co/image/96eaa0e70cfb594a10b7695cf505e0e6ccaf02cb'
  },{
    id: '1PTqbs9FV8hSJCS7OOF5OC',
    url: 'https://i.scdn.co/image/f1c9f7d10e98537d230902b0ee6971f18165fd55'
  },{
    id: '33NHr7lu7tCMjK05jUj1v0',
    url: 'https://i.scdn.co/image/267afbe410515b8077eba14e760a279eaecf0a01'
  },{
    id: '7dS5EaCoMnN7DzlpT6aRn2',
    url: 'https://i.scdn.co/image/04819888ff45e441e96b03e620ce323de86d7c10'
  },{
    id: '2AGottAzfC8bHzF7kEJ3Wa',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '5lFDtgWsjRJu8fPOAyJIAK',
    url: 'https://i.scdn.co/image/9c6eb30ff5270c115b1ecd2b74430e505c281f25'
  },{
    id: '1WoOzgvz6CgH4pX6a1RKGp',
    url: 'https://i.scdn.co/image/5aa0bd2874ec6ae0885adc84bb02d5ffce6f8cc2'
  },{
    id: '7jslhIiELQkgW9IHeYNOWE',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '0hy1SOTEn9ifXTzOwnCwEr',
    url: 'https://i.scdn.co/image/cb53ed2859a3966d597094cd82735aaed675061e'
  },{
    id: '0r4SsYcwvd8URat6AS2m6f',
    url: 'https://i.scdn.co/image/8bda10ee261982586794a31228fd5e203686a08b'
  },{
    id: '2jplimH0b7Abf5LQSPx27A',
    url: 'https://i.scdn.co/image/ea6428bfe0266bacbd4149e1f28414284c46bbd3'
  },{
    id: '6Xs7OKt6i0Ddq8B4M5Dgvr',
    url: 'https://i.scdn.co/image/b8d7a38c2125e932f9d16e46ae738e2f54e0cb32'
  },{
    id: '6YwLgicpvVuMt1eE2OldwQ',
    url: 'https://i.scdn.co/image/e493fa011b2a406be780c8c86c16def8611ee3a1'
  },{
    id: '3lSR267IJfT54p0Gfuw7mi',
    url: 'https://i.scdn.co/image/94a277d6ca8fed7988acc521b61620cf23943299'
  },{
    id: '1sNSG13fsK6KPKKNIQXXrh',
    url: 'https://i.scdn.co/image/c57b056a0fcafc7801cdc8fb2e49f8781ee9cbe7'
  },{
    id: '7IHOIqZUUInxjVkko181PB',
    url: 'https://i.scdn.co/image/8880999bbe1ce30df6c52bc928d516287d26d39b'
  },{
    id: '46lFttIf5hnUZMGvjK0Wxo',
    url: 'https://i.scdn.co/image/d87d7b97348c80ef8dbd46d36c12f4836381dd61'
  },{
    id: '05cXQMJcrM9msUYu11mOrs',
    url: 'https://i.scdn.co/image/a56c49f3819c2c7312ced8e31236cccc3d588dab'
  },{
    id: '5SqSckut3FcoQKmGkMWgp1',
    url: 'https://i.scdn.co/image/fef8458af72a9816f520a5c73e311db94b2498d9'
  },{
    id: '4oWmroatZtMmlgc3havMrv',
    url: 'https://i.scdn.co/image/cb102704e11b18308c590831873a509ed9b73789'
  },{
    id: '0GR7iJLhj80KD5LkA14ZRn',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '5lnsCyEKWofnC00U4Ax0ti',
    url: 'https://i.scdn.co/image/a39617793ffedfeb6c105567af2e5253c3808ac6'
  },{
    id: '1iuljeYz6ZG3GTJOZZkoer',
    url: 'https://i.scdn.co/image/5aa0bd2874ec6ae0885adc84bb02d5ffce6f8cc2'
  },{
    id: '0Gi17qCJh9e9RJxLaYkm9l',
    url: 'https://i.scdn.co/image/fef8458af72a9816f520a5c73e311db94b2498d9'
  },{
    id: '2uTG00P1DkhB97pdITkl2O',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '3aIhJDHxr1kgTSnutJxPTH',
    url: 'https://i.scdn.co/image/d87d7b97348c80ef8dbd46d36c12f4836381dd61'
  },{
    id: '3853uIOwh2L9F8TkDd1F49',
    url: 'https://i.scdn.co/image/c3b9fd80a5f3cb4da0c7de4c3ce7f57b266dfa2d'
  },{
    id: '0B5OTb36fzLayn6XQHg5A1',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '63CSozvYUEudPp12679UVF',
    url: 'https://i.scdn.co/image/02b6322bf1ddeabd574d05610ba4aa234bfaf6b9'
  },{
    id: '6UIt4r9bLP7dN7YZmsAa5h',
    url: 'https://i.scdn.co/image/e0f898464733b25341882e2e84832daaf62ed642'
  },{
    id: '7rVrQF43tH4mI0542hijUC',
    url: 'https://i.scdn.co/image/905cf38d253ac81e4ed128625d876498091d6f97'
  },{
    id: '5XzmZjXhMjDHr7ZfJ6DELQ',
    url: 'https://i.scdn.co/image/1dd75fe38b211d56a31e14cbf73824e5e9100435'
  },{
    id: '40EB7ABUO6MoWMUwPKptJ7',
    url: 'https://i.scdn.co/image/6c221281d6d3d6d241ad746bfd4a1d0b00658424'
  },{
    id: '0tDC3KJPPu5eonGTtCURpq',
    url: 'https://i.scdn.co/image/53fea48ae7ad87d8dea8fbf28ba2573b8a332a11'
  },{
    id: '76kyKtPLsFbQkdQ86QrkF4',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '49aLCvvEKM5EA8IYwDmtaE',
    url: 'https://i.scdn.co/image/ef32f2500aef548ee2b0589773c84c400472d59a'
  },{
    id: '6bqtKURdSWkInAJHDkuaL0',
    url: 'https://i.scdn.co/image/f2405b82d0578dd815a3082ca0f7ec4e18e937a1'
  },{
    id: '1Gzv0cMy3xm7sgN5gd7WkU',
    url: 'https://i.scdn.co/image/ecc0c638a470afa93fa5bb291cf84741957d85f8'
  },{
    id: '62vpWI1CHwFy7tMIcSStl8',
    url: 'https://i.scdn.co/image/4fb9d637d51744a883ec30c0bce5fea337b6a8bc'
  },{
    id: '2LLFl56eIFGFlnrplUC26f',
    url: 'https://i.scdn.co/image/98b3e013d54ba44d5e27b5e442d1108f277baab5'
  },{
    id: '4SNtBMJa7Wpk1tJzMSUv9B',
    url: 'https://i.scdn.co/image/e22bd9ab01e2d8c381e198f7e6344ea79ba4745b'
  },{
    id: '1HbcclMpw0q2WDWpdGCKdS',
    url: 'https://i.scdn.co/image/c6574e297a501e44d051f9130c883e1fdfcb3099'
  },{
    id: '1KtVVUM6OkpyOsbVfbMybX',
    url: 'https://i.scdn.co/image/bae3fdea03d703ec0e06b5a584d17a6af8f3ed1a'
  },{
    id: '6kwAbEjseqBob48jCus7Sz',
    url: 'https://i.scdn.co/image/fc213d7efcde95a9da0e9ed97cffd2fa7af90dec'
  },{
    id: '4VrWlk8IQxevMvERoX08iC',
    url: 'https://i.scdn.co/image/fc213d7efcde95a9da0e9ed97cffd2fa7af90dec'
  },{
    id: '4jTiyLlOJVJj3mCr7yfPQD',
    url: 'https://i.scdn.co/image/c2cc1553f8f800267e265e75a633d1996acec087'
  }
];

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
    };
  }

  // animateTile() {
  //   unless @state.spinner.length
  //     @setState {spinner: _.cloneDeep @state.data}
  //   spinnerCopy = _.cloneDeep @state.spinner
  //   dataCopy    = _.cloneDeep @state.data
  //   dataCopy[_.random(dataCopy.length - 1)] = spinnerCopy.pop()
  //   @setState {spinner: spinnerCopy, data: dataCopy}
  // }

  componentDidMount() {
    // this.loadAlbumCoversFromServer();
    // setInterval(() => {
      // this.animateTile();
    // }, _.random(1500, 1700));
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

