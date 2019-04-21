var objects = require('../object.js');
var players = objects.players;

exports.createClient = function(io,socket){

	socket.on('dead',function(id){
		if(!id) return;
		let bonus = 0;
		if(players[socket.id]) bonus += Mah.round(players[socket.id].score/2);
		let score = addPoints(id,300+bonus);
		if(!score) return;
		io.emit('updateScore',{id,score});
	});

	socket.on('AsteroidHit',function(aid){
		let score = addPoints(socket.id,10);
		if(!score) return;
		io.emit('updateScore',{id:socket.id,score});
	});
}

function addPoints(id,points){
	let player = players[id];
	if(!player) return;
	player.score += points;
	console.log(player.score);
	return player.score;
}
