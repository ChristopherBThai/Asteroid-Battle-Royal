
exports.createClient = function(io,socket){
	socket.on('createBullet',function(data){
		data.ownerId = socket.id;
		socket.broadcast.emit('newBullet', data);
	});
}
