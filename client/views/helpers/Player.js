'use strict';

var React = require('react/addons');
var Player = require('../shared/Player');

var helpers = {

	getPlayerElements: function (players) {
   		let playerElements = [];
   		players.forEach(function (player, i) {
     			let index = i + 1;
     			let {playerName} = player;
     			playerElements.push(<Player playerName={playerName} index={index} />);
   		});
   		return playerElements;
	}
};

module.exports = helpers;
