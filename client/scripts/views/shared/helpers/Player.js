'use strict';

var React = require('react/addons');
var Player = require('../components/Player');

var helpers = {

	getPlayerElements: function (players) {
   		return players.map(function (player, i) {
     			let {playerName, playerId} = player;
     			return (<Player playerName={playerName} key={playerId} index={i + 1} />);
   		});
	}
};

module.exports = helpers;
