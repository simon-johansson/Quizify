
import React from 'react/addons';
import Player from '../components/Player';

export const getPlayerElements = (players) => {
  return players.map((player, i) => {
 	  let {playerName, playerId} = player;
    return (
      <Player playerName={playerName} key={playerId} index={i + 1} />
    );
 	});
};

