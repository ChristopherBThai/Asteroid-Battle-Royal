const angularVel = 50;
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

	socket.on('newAsteroid', function (ast) {
		addAsteroid(self, ast);
	});

}

function addAsteroid(self,tempast){
	const asteroid = self.add.sprite(tempast.x, tempast.y, 'asteroid').setOrigin(0.5, 0.5).setDisplaySize(tempast.size, tempast.size);
	asteroid.id = tempast.id;
	asteroid.setAngle(Math.random()*360);
	self.asteroids.add(asteroid);
}

function asteroidMoved(self,tempast){
	self.asteroids.getChildren().forEach(function (oldasteroid) {
		let id = oldasteroid.id;
		let newAsteroid = tempast[id];

		if(newAsteroid){
			//asteroid.setRotation(playerInfo.rotation);
			//var asteroidRadius = Math.pow(Math.pow(oldAsteroid.x,2),Math.pow(oldAsteroid.y,2),.5);			

			var asteroidRadius = newAsteroid.size/2;
			for(let i in bulletArray)
			{
				let tempRadius = 15/2;
				let tempDistance = Math.sqrt(Math.pow(bulletArray[i].x - newAsteroid.x,2) + Math.pow(bulletArray[i].y - newAsteroid.y,2));
				if(tempDistance <= tempRadius + asteroidRadius)
					{
						bulletArray[i].destroy();
						delete bulletArray[i];
						console.log("I hit it");
						self.socket.emit('AsteroidHit',id);
					}
			}


			var distance = Math.pow(Math.pow(newAsteroid.x-self.ship.x,2) + Math.pow(newAsteroid.y-self.ship.y,2),.5);
			if(distance <= asteroidRadius + self.ship.radius)
			{
				self.socket.emit('dead');
				self.dead = true;
			}
			
			oldasteroid.setPosition(newAsteroid.x, newAsteroid.y);
		}else{
			oldasteroid.destroy();
		}

	});
}
