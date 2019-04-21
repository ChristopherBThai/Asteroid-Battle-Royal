const starCount = 1000;
const minStarSize = 0.5;
const maxStarSize = 2;

function createBackground(self){

	var graphics = self.add.graphics({ fillStyle: { color: 0xffffff } });

	for(let i = 0;i<starCount;i++){
		drawCircle(self,graphics);
	}

}

function drawCircle(self,graphics){
	let x = self.physics.world.bounds.width*Math.random();
	let y = self.physics.world.bounds.height*Math.random();
	let size = minStarSize + ((maxStarSize-minStarSize)*Math.random());

	var circle = new Phaser.Geom.Circle(x,y,size);
	graphics.fillCircleShape(circle);
}
