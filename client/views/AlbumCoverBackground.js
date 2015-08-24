'use strict';

const _     = require('lodash');
const React = require('react/addons');
const TimeoutTransitionGroup = require('timeout-transition-group');

class AlbumCover extends React.Component {
  render() {
    let src = this.props.src;
    return (
      <li className="album-cover">
        <TimeoutTransitionGroup transitionName="album-spinner"
                                enterTimeout={800}
                                leaveTimeout={500}>
          <img src={src} width="200" height="200" key={src} />
        </TimeoutTransitionGroup>
      </li>
    )
  }
}

class AlbumCovers extends React.Component {
  // propType:
  //   data: React.PropTypes.array

  tilesVisibleOnScreen() {
    let buffer = 5;
    return Math.floor((window.innerHeight * window.innerWidth) / (200 * 200)) + buffer;
  }

  render() {
    let subset = this.props.data.slice(0, this.tilesVisibleOnScreen());
    let tileNodes = subset.map((track, index) => {
      return (
        <Tile src={track.url} key={index} ></Tile>
      );
    })
    return (
      <ul className="album-covers">
        <TimeoutTransitionGroup transitionName="album-spinner"
                                enterTimeout={800}>
          {tileNodes}
        </TimeoutTransitionGroup>
      </ul>
    )
  }

class Background extends React.Component {
  loadAlbumCoversFromServer() {
    $.ajax
      url: @props.url
      dataType: 'json',
      success: (data) =>
        @setState { data: _.shuffle data }
        @setState { spinner: _.cloneDeep data }
      error: (xhr, status, err) ->
        console.error @props.url, status, err.toString()
  }

  getInitialState: ->
    {data: []}

  animateTile: ->
    unless @state.spinner.length
      @setState {spinner: _.cloneDeep @state.data}
    spinnerCopy = _.cloneDeep @state.spinner
    dataCopy    = _.cloneDeep @state.data
    dataCopy[_.random(dataCopy.length - 1)] = spinnerCopy.pop()
    @setState {spinner: spinnerCopy, data: dataCopy}

  componentDidMount: ->
    @loadAlbumCoversFromServer()
    setInterval @animateTile, _.random(1500, 1700)

  render: ->
    (
      <div className="dynamic-background">
        <Tiles data={this.state.data} />
        <div className="gradient-overlay"></div>
      </div>
    )
}

module.exports = SpotifyBackground;

