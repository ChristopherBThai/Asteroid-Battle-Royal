
function createCamera(self){
	self.cameras.main.setBounds(0,0,
			self.physics.world.bounds.width, 
			self.physics.world.bounds.height);
	//self.cameras.main.setZoom(0.4);
	//self.cameras.main.setBackgroundColor("#252525");
	self.cameras.main.setBackgroundColor("#36293F");
	//this.cameras.main.setBackgroundColor('#ccccff');
}

function bindCamera(self){
	self.cameras.main.startFollow(self.ship);
}

