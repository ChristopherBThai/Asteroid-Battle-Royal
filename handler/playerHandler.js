var objects = require('../object.js');
var players = objects.players;

exports.createClient = function(io,socket){
	// create a new player and add it to our players object
	createPlayer(socket.id)

	// send the players object to the new player
	socket.emit('currentPlayers', getAllPlayers());
	// update all other players of the new player
	socket.broadcast.emit('newPlayer', players[socket.id]);

	// when a player disconnects, remove them from our players object
	socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
		deletePlayer(socket.id);
		// emit a message to all players to remove this player
		io.emit('disconnect', socket.id);
	});

	// when a player moves, update the player data
	socket.on('playerMovement', function (movementData) {
		movePlayer(movementData);
		// emit a message to all players about the player that moved
		socket.broadcast.emit('playerMoved', players[socket.id]);
	});

}

// Creates a brand new player with default variables
var createPlayer = exports.createPlayer = function(id){
  players[id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: id,
  };

  return objects.players[id];
}

// Deletes a player from our list
var deletePlayer = exports.deletePlayer = function(id){
	delete players[id];
}

// Returns all existing players
var getAllPlayers = exports.getAllPlayers = function(){
	return players
}

// Called when a player is moved
var movePlayer = exports.movePlayer = function(id,data){
	console.log(data);
	players[id].x = data.x;
	players[id].y = data.y;
	players[id].rotation = data.rotation;
}
