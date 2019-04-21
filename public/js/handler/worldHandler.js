const worldHeight = 4000;
const worldWidth = 4000;

function createWorld(self){
	self.physics.world.bounds.width = worldWidth;
	self.physics.world.bounds.height = worldHeight;
}
