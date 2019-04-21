var asteroids = {};
var cid = 1;
const bounds = 4000;
const maxAsteroids = 15;
const maxVel = 2;
const minVel = .5;
const minSize = 30;
const maxSize = 250;
var io;


exports.initAsteroid = function(tempio){

	io = tempio;

	setInterval(createAsteroid,1000);
	setInterval(updateAsteroid,1000/30);

}

exports.createClient = function(io,socket){
	socket.emit('currentAsteroids', asteroids);
}

function createAsteroid(socket){
	if(Object.keys(asteroids).length > maxAsteroids) return;

	asteroids[cid] = {
		x:Math.random()*bounds,
		y:Math.random()*bounds,
		xvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
		yvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
		size:minSize + Math.random()*maxSize,
		id:cid
	}

	console.log(asteroids[cid]);

	console.log("asteroid created with id "+cid);

	io.emit("newAsteroid",asteroids[cid]);

	cid++;
}

function updateAsteroid(){
	for(let i in asteroids){
		let asteroid = asteroids[i];
		asteroid.x += asteroid.xvel;
		asteroid.y += asteroid.yvel;
		if(asteroid.x<0 || asteroid.x>bounds)
			asteroid.xvel*= -1;
		if(asteroid.y<0 || asteroid.y>bounds)
			asteroid.yvel*= -1;
	}

	io.emit("updateAsteroids",asteroids);
}
