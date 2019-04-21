var asteroids = {};
var cid = 1;
const bounds = 6000;
const maxAsteroids = 75;
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
	socket.on('AsteroidHit',splitAsteroid);
}

function createAsteroid(socket){
	if(Object.keys(asteroids).length > maxAsteroids) return;

	let tempcid = cid++;
	asteroids[tempcid] = {
		x:Math.random()*bounds,
		y:Math.random()*bounds,
		xvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
		yvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
		size:minSize + Math.random()*maxSize,
		id:tempcid
	}

	console.log("asteroid created with id "+tempcid);

	io.emit("newAsteroid",asteroids[tempcid]);

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

function splitAsteroid(id)
{
	let asteroid = asteroids[id];
	if(asteroid)
	{
		delete asteroids[id];
		if(asteroid.size >= 60)
		{
			let tempcid = cid++;
			asteroids[tempcid] = {
				x:asteroid.x,
				y:asteroid.y,
				xvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
				yvel:(minVel + Math.random()*maxVel) * (Math.random()>.5?1:-1),
				size:asteroid.size/2,
				id:tempcid
			}

			let tempcid2 = cid++;
			asteroids[tempcid2] = {
				x:asteroid.x,
				y:asteroid.y,
				xvel:asteroids[tempcid].xvel * -1,
				yvel:asteroids[tempcid].yvel * -1,
				size:asteroid.size/2,
				id:tempcid2
			}

			io.emit("newAsteroid",asteroids[tempcid]);
			io.emit("newAsteroid",asteroids[tempcid2]);
		}
	}


}
