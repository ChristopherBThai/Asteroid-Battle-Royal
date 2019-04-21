function createAsteroid(self){
	let socket = self.socket;
	
	socket.on('currentAsteroids', function (ast) {
		Object.keys(ast).forEach(function (id) {
			addAsteroid(self, ast[id]);
		});
	});

	socket.on('updateAsteroids',function(ast){
		asteroidMoved(self,ast);
	});

}

function addAsteroid(self,tempast){
	const asteroid = self.add.sprite(tempast.x, tempast.y, 'asteroid').setOrigin(0.5, 0.5).setDisplaySize(tempast.size, tempast.size);
	asteroid.id = tempast.id;
	self.asteroids.add(asteroid);
}

function asteroidMoved(self,tempast){
	self.asteroids.getChildren().forEach(function (oldasteroid) {
		let id = oldasteroid.id;
		let newAsteroid = tempast[id];

		if(newAsteroid){
			//asteroid.setRotation(playerInfo.rotation);
			oldasteroid.setPosition(newAsteroid.x, newAsteroid.y);
		}else{
			//oldasteroid.delete();
		}

	});
}
