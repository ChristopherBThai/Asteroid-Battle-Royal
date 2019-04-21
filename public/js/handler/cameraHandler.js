
function createCamera(self){
	self.cameras.main.setBounds(0,0,
			self.physics.world.bounds.width, 
			self.physics.world.bounds.height);
	//self.cameras.main.setZoom(0.4);
	self.cameras.main.setBackgroundColor("#2d2d2d");
	self.cameras.main.startFollow(self.ship);
	//this.cameras.main.setBackgroundColor('#ccccff');
}

